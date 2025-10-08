document.addEventListener('DOMContentLoaded', async () => {

    const app = document.getElementById('app');
    const adminFab = document.getElementById('admin-fab');
    const modal = document.getElementById('upload-modal');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close-btn');
    const logoutBtn = document.getElementById('logout-btn');

    let isAdmin = false;
    const AppState = { currentPage: 'albums', currentAlbumId: null };

    const api = {
        getSession: () => fetch('/admin/session').then(r=>r.json()),
        getAlbums: () => fetch('/api/albums').then(r=>r.json()),
        getAlbum: id => fetch(`/api/albums/${id}`).then(r=>r.json()),
        createAlbum: data => fetch('/api/albums', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)}),
        uploadPhotos: (id, formData) => fetch(`/api/albums/${id}/photos`, {method:'POST', body:formData}),
        deletePhoto: id => fetch(`/api/photos/${id}`, {method:'DELETE'})
    };

    // Check admin session
    const session = await api.getSession();
    if (!session.isAdmin) return window.location.href = '/admin/login';
    isAdmin = true;

    // Logout
    logoutBtn.addEventListener('click', async () => {
        await fetch('/admin/logout', {method:'POST'});
        window.location.href = '/admin/login';
    });

    // Render functions (albums/photos)
    const render = async () => {
        app.innerHTML = '<h2>Loading...</h2>';
        if(AppState.currentPage === 'albums'){
            const albums = await api.getAlbums();
            app.innerHTML = albums.map(a => `<div class="album-card" data-id="${a.id}"><img src="${a.coverImage}" alt="${a.name}"><h3>${a.name}</h3></div>`).join('');
            document.querySelectorAll('.album-card').forEach(c=>{
                c.addEventListener('click', ()=>{ AppState.currentPage='photos'; AppState.currentAlbumId=c.dataset.id; render(); });
            });
        } else {
            const album = await api.getAlbum(AppState.currentAlbumId);
            app.innerHTML = `<a id="back">&larr; Back</a><h2>${album.name}</h2><div class="photo-grid">${album.photos.map(p=>`<div><img src="${p.src}"></div>`).join('')}</div>`;
            document.getElementById('back').addEventListener('click', ()=>{ AppState.currentPage='albums'; AppState.currentAlbumId=null; render(); });
        }
    };

    // FAB logic
    adminFab.addEventListener('click', async () => {
        modal.style.display = 'flex';
    });

    // Modal close
    modal.querySelector('.close-modal-btn').addEventListener('click', () => modal.style.display = 'none');

    render();

    // Lightbox
    lightboxClose.addEventListener('click', () => lightbox.style.display='none');
    lightbox.addEventListener('click', e => { if(e.target===lightbox) lightbox.style.display='none'; });

});
