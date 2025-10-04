document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const adminFab = document.getElementById('admin-fab');
    const modal = document.getElementById('upload-modal');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close-btn');

    let isAdmin = false;
    const AppState = { currentPage: 'albums', currentAlbumId: null };

    // --- API ---
    const api = {
        getSession: () => fetch('/api/session').then(r => r.json()),
        getAlbums: () => fetch('/api/albums').then(r => r.json()),
        getAlbum: id => fetch(`/api/albums/${id}`).then(r => r.json()),
        createAlbum: data => fetch('/api/albums', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }),
        uploadPhotos: (id, formData) => fetch(`/api/albums/${id}/photos`, { method: 'POST', body: formData }),
        deletePhoto: id => fetch(`/api/photos/${id}`, { method: 'DELETE' })
    };

    // --- Render ---
    const render = async () => {
        app.innerHTML = '<h2>Loading...</h2>';
        if (AppState.currentPage === 'albums') {
            const albums = await api.getAlbums();
            renderAlbumGrid(albums);
        } else {
            const album = await api.getAlbum(AppState.currentAlbumId);
            renderPhotoGrid(album);
        }
    };

    const renderAlbumGrid = (albums) => {
        app.innerHTML = `
            <div class="album-grid">
                ${albums.map(a => `
                    <div class="album-card" data-id="${a.id}">
                        <img src="${a.coverImage}" class="album-cover" alt="${a.name}">
                        <div class="album-info">
                            <h3>${a.name}</h3>
                            <p>${new Date(a.eventDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        document.querySelectorAll('.album-card').forEach(card =>
            card.addEventListener('click', () => {
                AppState.currentPage = 'photos';
                AppState.currentAlbumId = card.dataset.id;
                render();
            })
        );
    };

    const renderPhotoGrid = (album) => {
        app.innerHTML = `
            <a class="breadcrumb" id="back">&larr; Back</a>
            <h2>${album.name}</h2>
            <p>${album.description}</p>
            <div class="photo-grid">
                ${album.photos.map(p => `
                    <div class="photo-item">
                        <img src="${p.src}" alt="${p.caption}">
                        ${isAdmin ? `<button class="photo-delete-btn" data-id="${p.id}">🗑️</button>` : ''}
                    </div>
                `).join('')}
            </div>
        `;

        document.getElementById('back').addEventListener('click', () => {
            AppState.currentPage = 'albums';
            AppState.currentAlbumId = null;
            render();
        });

        document.querySelectorAll('.photo-grid img').forEach(img =>
            img.addEventListener('click', () => openLightbox(img.src))
        );

        if (isAdmin) {
            document.querySelectorAll('.photo-delete-btn').forEach(btn =>
                btn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    if (confirm('Delete this photo?')) {
                        await api.deletePhoto(btn.dataset.id);
                        render();
                    }
                })
            );
        }
    };

    // --- Admin FAB ---
    const initAdminFab = () => {
        if (!isAdmin || !adminFab) return;

        adminFab.style.display = 'block';

        adminFab.addEventListener('click', async () => {
            try {
                const albums = await api.getAlbums();
                const albumSelect = document.getElementById('album-select');
                albumSelect.innerHTML = albums.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
                modal.style.display = 'flex';
            } catch (err) {
                console.error('Error fetching albums:', err);
            }
        });
    };

    // --- Modal Tabs ---
    const initModalTabs = () => {
        const tabs = modal.querySelectorAll('.tab-link');
        const tabContents = modal.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                tabContents.forEach(c => c.style.display = 'none');
                const content = modal.querySelector(`.tab-content[data-tab="${tab.dataset.tab}"]`);
                if (content) content.style.display = 'block';
            });
        });
    };

    // --- Close Modal ---
    const initModalClose = () => {
        const closeBtn = modal.querySelector('.close-modal-btn');
        if (!closeBtn) return;
        closeBtn.addEventListener('click', () => modal.style.display = 'none');
    };

    // --- Modal Forms ---
    const initModalForms = () => {
        const modalStatus = document.getElementById('modal-status');
        const createAlbumForm = document.getElementById('create-album-form');
        const uploadForm = document.getElementById('upload-photos-form');
        const albumSelect = document.getElementById('album-select');
        const photosInput = document.getElementById('photos-input');

        // Create Album
        createAlbumForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            modalStatus.textContent = 'Creating album...';
            const res = await api.createAlbum({
                name: document.getElementById('album-name').value,
                eventDate: document.getElementById('album-date').value,
                description: document.getElementById('album-description').value
            });
            if (res.ok) {
                modalStatus.textContent = 'Album added!';
                createAlbumForm.reset();
                render();
            } else {
                modalStatus.textContent = 'Error adding album.';
            }
        });

        // Upload Photos
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const albumId = albumSelect.value;
            const files = photosInput.files;

            if (!albumId || files.length === 0) {
                modalStatus.textContent = 'Select album & files.';
                return;
            }

            const formData = new FormData();
            Array.from(files).forEach(f => formData.append('photos', f));

            modalStatus.textContent = 'Uploading...';
            const res = await api.uploadPhotos(albumId, formData);
            if (res.ok) {
                modalStatus.textContent = 'Upload complete!';
                uploadForm.reset();
                modal.style.display = 'none';
                render();
            } else {
                modalStatus.textContent = 'Upload failed.';
            }
        });
    };

    // --- Lightbox ---
    const openLightbox = (src) => {
        lightbox.style.display = 'flex';
        lightboxImg.src = src;
    };
    const closeLightbox = () => lightbox.style.display = 'none';
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    // --- Init ---
    const init = async () => {
        const session = await api.getSession();
        isAdmin = session.isAdmin;

        if (isAdmin) {
            initAdminFab();
            initModalTabs();
            initModalClose();
            initModalForms();
        }

        render();
    };

    init();
});
