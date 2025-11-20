import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { 
    Users, Briefcase, Loader2, Newspaper, Image, Send, Trash2, Calendar, FileText, UserPlus
} from 'lucide-react';

// --- API Constants ---
const NEWS_API_URL = '/api/news';
const ALBUM_API_URL = '/api/albums';
const EVENT_API_URL = '/api/events';
const RESULT_API_URL = '/api/results';
const STUDENT_API_URL = '/api/students';
const TEACHER_API_URL = '/api/teachers';

const PortalPage = () => {
    // --- UI State ---
    const [activeTab, setActiveTab] = useState('news');
    const [isLoading, setIsLoading] = useState(true);
    
    // --- Data States ---
    const [newsItems, setNewsItems] = useState([]);
    const [albums, setAlbums] = useState([]); 
    const [results, setResults] = useState([]); 
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    
    // --- Form States ---
    // News
    const [newsTitle, setNewsTitle] = useState('');
    const [newsContent, setNewsContent] = useState('');
    const [newsFile, setNewsFile] = useState(null); 
    const [newsPreviewUrl, setNewsPreviewUrl] = useState(null); 

    // Albums
    const [albumTitle, setAlbumTitle] = useState('');
    const [albumDescription, setAlbumDescription] = useState('');
    const [albumCoverImage, setAlbumCoverImage] = useState(''); 
    
    // Events
    const [eventTitle, setEventTitle] = useState(''); 
    const [eventLocation, setEventLocation] = useState('');
    const [eventDate, setEventDate] = useState('');

    // Gallery Uploads
    const [selectedAlbumId, setSelectedAlbumId] = useState('');
    const [photoFiles, setPhotoFiles] = useState([]); 
    const [photoPreviewUrl, setPhotoPreviewUrl] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false); 

    // Results
    const [resultTitle, setResultTitle] = useState('');
    const [resultGrade, setResultGrade] = useState('');
    const [resultFile, setResultFile] = useState(null);

    // Students
    const [studentName, setStudentName] = useState('');
    const [studentGrade, setStudentGrade] = useState('');
    const [studentAdmissionId, setStudentAdmissionId] = useState('');
    const [studentParentEmail, setStudentParentEmail] = useState('');

    // Teachers
    const [teacherName, setTeacherName] = useState('');
    const [teacherSubject, setTeacherSubject] = useState('');
    const [teacherEmail, setTeacherEmail] = useState('');
    const [teacherQualification, setTeacherQualification] = useState('');


    // --- Data Fetch/Refresh Hook ---
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [newsRes, albumRes, resultRes, studentRes, teacherRes] = await Promise.all([
                fetch(NEWS_API_URL),
                fetch(ALBUM_API_URL),
                fetch(RESULT_API_URL),
                fetch(STUDENT_API_URL),
                fetch(TEACHER_API_URL)
            ]);
            
            setNewsItems(await newsRes.json());
            setAlbums(await albumRes.json());
            setResults(await resultRes.json());
            setStudents(await studentRes.json());
            setTeachers(await teacherRes.json());

        } catch (err) {
            console.error("Failed to fetch data from Express API:", err);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [activeTab]);

    // --- Helper: File Preview ---
    const handleNewsFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewsFile(file);
            setNewsPreviewUrl(URL.createObjectURL(file));
        }
    };


    // --- 📰 News Management Handlers ---
    const handleAddNews = async (e) => {
        e.preventDefault();
        if (!newsTitle.trim() || !newsContent.trim() || !newsFile) return alert("Please fill in title, content, and select an image file.");
        
        const formData = new FormData();
        formData.append('title', newsTitle);
        formData.append('content', newsContent);
        formData.append('image', newsFile); 

        try {
            const response = await fetch(NEWS_API_URL, { method: 'POST', body: formData });
            if (response.ok) {
                setNewsTitle(''); setNewsContent(''); setNewsFile(null); setNewsPreviewUrl(null);
                document.getElementById('news-image-upload').value = '';
                fetchData(); 
            } else { alert(`Error publishing news. Status: ${response.status}`); }
        } catch (error) { console.error(error); }
    };

    const handleDeleteNews = async (id) => {
        if (!window.confirm("Delete this article?")) return;
        try {
            const response = await fetch(`${NEWS_API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) fetchData(); 
        } catch (error) { console.error(error); }
    };

    // --- 📅 Event Management Handler ---
    const handleAddEvent = async (e) => {
        e.preventDefault();
        if (!eventTitle.trim() || !eventDate.trim()) return alert("Fill title and date.");

        try {
            const response = await fetch(EVENT_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: eventTitle, location: eventLocation, eventDate: eventDate }),
            });
            if (response.ok) {
                setEventTitle(''); setEventLocation(''); setEventDate(''); 
                fetchData(); 
            } else {
                alert("Failed to create event.");
            }
        } catch (error) { console.error(error); }
    };


    // --- 🖼️ Gallery Management Handlers ---
    const handleCreateAlbum = async (e) => {
        e.preventDefault();
        if (!albumTitle.trim() || !albumDescription.trim()) return alert("Title and Description required.");
        
        try {
            const response = await fetch(ALBUM_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: albumTitle, description: albumDescription, coverImage: albumCoverImage || "" }),
            });
            if (response.ok) {
                setAlbumTitle(''); setAlbumDescription(''); setAlbumCoverImage('');
                fetchData();
                alert("Album created!");
            } else {
                alert(`Failed to create album. Status: ${response.status}`);
            }
        } catch (error) { console.error(error); }
    };

    const handleDeleteAlbum = async (id) => {
        if (!window.confirm("Delete this album?")) return;
        try {
            const response = await fetch(`${ALBUM_API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) fetchData();
        } catch (error) { console.error(error); }
    };

    // --- Drag-and-Drop Handlers ---
    const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
    const handleDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
    const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
    
    const handleDrop = (e) => {
        e.preventDefault(); e.stopPropagation(); setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const files = Array.from(e.dataTransfer.files);
            setPhotoFiles(files);
            setPhotoPreviewUrl(URL.createObjectURL(files[0])); 
            e.dataTransfer.clearData();
        }
    };
    
    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            setPhotoFiles(files);
            setPhotoPreviewUrl(URL.createObjectURL(files[0])); 
        }
    };
    
    const handleAddPhotoSubmit = async (e) => {
        e.preventDefault();
        const filesToUpload = Array.isArray(photoFiles) ? photoFiles : (photoFiles ? [photoFiles] : []);
        if (!selectedAlbumId || filesToUpload.length === 0) return alert("Select album and photo.");
    
        setUploading(true); 
        let successCount = 0;
        for (const file of filesToUpload) {
            const formData = new FormData();
            formData.append('albumId', selectedAlbumId); 
            formData.append('image', file); 
            try {
                const response = await fetch(`${ALBUM_API_URL}/upload-photo`, { method: 'POST', body: formData });
                if (response.ok) successCount++;
            } catch (error) { console.error("Error uploading:", error); }
        }
        setUploading(false); setPhotoFiles([]); setPhotoPreviewUrl(null);
        document.getElementById('photo-upload-input').value = '';
        alert(`${successCount} photos uploaded!`);
        fetchData();
    };

    // --- 📝 Results Handlers ---
    const handleAddResult = async (e) => {
        e.preventDefault();
        if (!resultTitle || !resultGrade || !resultFile) return alert("Fill all fields.");
        setUploading(true);
        const formData = new FormData();
        formData.append('title', resultTitle);
        formData.append('grade', resultGrade);
        formData.append('file', resultFile); 
        try {
            const response = await fetch(RESULT_API_URL, { method: 'POST', body: formData });
            if (response.ok) {
                setResultTitle(''); setResultGrade(''); setResultFile(null);
                document.getElementById('result-file-input').value = '';
                fetchData(); alert("Result published!");
            }
        } catch (error) { console.error(error); } finally { setUploading(false); }
    };
    const handleDeleteResult = async (id) => {
        if(!window.confirm("Delete?")) return;
        await fetch(`${RESULT_API_URL}/${id}`, { method: 'DELETE' });
        fetchData();
    };

    // --- 👥 Student Handlers ---
    const handleAddStudent = async (e) => {
        e.preventDefault();
        if (!studentName || !studentGrade || !studentAdmissionId) return alert("Fill required fields.");
        try {
            const response = await fetch(STUDENT_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: studentName, grade: parseInt(studentGrade), admissionId: studentAdmissionId, parentEmail: studentParentEmail }),
            });
            if (response.ok) {
                setStudentName(''); setStudentGrade(''); setStudentAdmissionId(''); setStudentParentEmail('');
                fetchData(); alert("Student Enrolled!");
            }
        } catch (error) { console.error(error); }
    };
    const handleDeleteStudent = async (id) => {
        if(!window.confirm("Delete student?")) return;
        try {
            const response = await fetch(`${STUDENT_API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) fetchData();
        } catch (error) { console.error(error); }
    };

    // --- 👨‍🏫 Teacher Handlers ---
    const handleAddTeacher = async (e) => {
        e.preventDefault();
        if (!teacherName || !teacherSubject || !teacherEmail) return alert("Name, Subject, Email required.");
        try {
            const response = await fetch(TEACHER_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: teacherName, subject: teacherSubject, email: teacherEmail, qualification: teacherQualification }),
            });
            if (response.ok) {
                setTeacherName(''); setTeacherSubject(''); setTeacherEmail(''); setTeacherQualification('');
                fetchData(); alert("Teacher Added!");
            }
        } catch (error) { console.error(error); }
    };
    const handleDeleteTeacher = async (id) => {
        if(!window.confirm("Delete teacher?")) return;
        try {
            const response = await fetch(`${TEACHER_API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) fetchData();
        } catch (error) { console.error(error); }
    };


    // --- RENDER CONTENT ---
    const renderTabContent = () => {
        switch (activeTab) {
            
            // 👥 STUDENTS TAB
            case 'students':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="bg-white p-6 rounded-lg shadow-lg h-fit">
                            <h3 className="text-2xl font-bold text-school-magenta-700 mb-6">Enroll New Student</h3>
                            <form onSubmit={handleAddStudent} className="space-y-4">
                                <input type="text" placeholder="Full Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
                                <input type="number" placeholder="Grade Level (1-12)" value={studentGrade} onChange={(e) => setStudentGrade(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
                                <input type="text" placeholder="Admission ID (Unique)" value={studentAdmissionId} onChange={(e) => setStudentAdmissionId(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
                                <input type="email" placeholder="Parent Email (Optional)" value={studentParentEmail} onChange={(e) => setStudentParentEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                                <button type="submit" className="w-full flex justify-center items-center px-4 py-2 bg-school-magenta-700 text-white font-semibold rounded-md shadow-md hover:bg-school-magenta-900 transition duration-300">
                                    <UserPlus size={20} className="mr-2" /> Enroll Student
                                </button>
                            </form>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-fit">
                            <h3 className="text-2xl font-bold text-school-blue-900 p-6 border-b">Active Students ({students.length})</h3>
                            {isLoading ? <div className="p-6 text-center"><Loader2 className="animate-spin mx-auto" /></div> : (
                                <ul className="divide-y divide-gray-200 max-h-[800px] overflow-y-auto">
                                    {students.map(item => (
                                        <li key={item._id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                            <div><p className="font-semibold text-gray-900">{item.name}</p><p className="text-sm text-gray-500">Grade: {item.grade} • ID: {item.admissionId}</p></div>
                                            <button onClick={() => handleDeleteStudent(item._id)} className="text-red-500 hover:text-red-700"><Trash2 size={20} /></button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                );

            // 👨‍🏫 TEACHERS TAB
            case 'teachers':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="bg-white p-6 rounded-lg shadow-lg h-fit">
                            <h3 className="text-2xl font-bold text-school-magenta-700 mb-6">Add New Teacher</h3>
                            <form onSubmit={handleAddTeacher} className="space-y-4">
                                <input type="text" placeholder="Full Name" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
                                <input type="text" placeholder="Subject" value={teacherSubject} onChange={(e) => setTeacherSubject(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
                                <input type="email" placeholder="Email Address" value={teacherEmail} onChange={(e) => setTeacherEmail(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
                                <input type="text" placeholder="Qualification" value={teacherQualification} onChange={(e) => setTeacherQualification(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                                <button type="submit" className="w-full flex justify-center items-center px-4 py-2 bg-school-blue-700 text-white font-semibold rounded-md shadow-md hover:bg-school-blue-800 transition duration-300">
                                    <Briefcase size={20} className="mr-2" /> Add Teacher
                                </button>
                            </form>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-fit">
                            <h3 className="text-2xl font-bold text-school-blue-900 p-6 border-b">Faculty List ({teachers.length})</h3>
                            {isLoading ? <div className="p-6 text-center"><Loader2 className="animate-spin mx-auto" /></div> : (
                                <ul className="divide-y divide-gray-200 max-h-[800px] overflow-y-auto">
                                    {teachers.map(item => (
                                        <li key={item._id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                            <div><p className="font-semibold text-gray-900">{item.name}</p><p className="text-sm text-gray-500">{item.subject} • {item.email}</p></div>
                                            <button onClick={() => handleDeleteTeacher(item._id)} className="text-red-500 hover:text-red-700"><Trash2 size={20} /></button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                );
            
            // 📰 NEWS TAB
            case 'news':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="bg-white p-6 rounded-lg shadow-lg space-y-8 h-fit">
                            <div>
                                <h3 className="text-2xl font-bold text-school-magenta-700 mb-6">Publish New Article</h3>
                                <form onSubmit={handleAddNews} className="space-y-4">
                                    <input type="text" placeholder="News Title" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
                                    <textarea placeholder="Content" value={newsContent} onChange={(e) => setNewsContent(e.target.value)} rows="5" required className="w-full px-3 py-2 border rounded-md" />
                                    <label className="block text-sm font-medium text-gray-700 pt-2">Image Upload:</label>
                                    <input type="file" id="news-image-upload" accept="image/*" onChange={handleNewsFileSelect} required className="w-full border rounded-md p-2" />
                                    {newsPreviewUrl && <div className="mt-2 w-full h-32 border rounded-md overflow-hidden"><img src={newsPreviewUrl} alt="Preview" className="w-full h-full object-cover" /></div>}
                                    <button type="submit" className="w-full flex justify-center items-center px-4 py-2 bg-school-magenta-700 text-white font-semibold rounded-md shadow-md hover:bg-school-magenta-900 transition duration-300"><Send size={20} className="mr-2" />Push News</button>
                                </form>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-school-blue-900 mb-6 border-t pt-4">Schedule Event</h3>
                                <form onSubmit={handleAddEvent} className="space-y-4">
                                    <input type="text" placeholder="Event Title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
                                    <input type="text" placeholder="Location" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                                    <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
                                    <button type="submit" className="w-full flex justify-center items-center px-4 py-2 bg-school-blue-700 text-white font-semibold rounded-md shadow-md hover:bg-school-blue-800 transition duration-300"><Calendar size={20} className="mr-2" />Schedule Event</button>
                                </form>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-fit">
                            <h3 className="text-2xl font-bold text-school-blue-900 p-6 border-b">Recent Articles</h3>
                            {isLoading ? <div className="p-6 text-center"><Loader2 className="animate-spin mx-auto" /></div> : (
                                <ul className="divide-y divide-gray-200 max-h-[800px] overflow-y-auto">
                                    {newsItems.map(item => (
                                        <li key={item._id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                            <div><p className="font-semibold text-gray-900">{item.title}</p><p className="text-sm text-gray-500">{item.date}</p></div>
                                            <button onClick={() => handleDeleteNews(item._id)} className="text-red-500 hover:text-red-700"><Trash2 size={20} /></button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                );

            // 🖼️ GALLERY TAB
            case 'gallery':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="bg-white p-6 rounded-lg shadow-lg space-y-8 h-fit">
                            <h3 className="text-2xl font-bold text-school-magenta-700 mb-6">Create Album</h3>
                            <form onSubmit={handleCreateAlbum} className="space-y-4">
                                <input type="text" placeholder="Album Title" value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
                                <textarea placeholder="Description" value={albumDescription} onChange={(e) => setAlbumDescription(e.target.value)} rows="3" required className="w-full px-3 py-2 border rounded-md" />
                                <input type="url" placeholder="Cover URL (Optional)" value={albumCoverImage} onChange={(e) => setAlbumCoverImage(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                                <button type="submit" className="w-full flex justify-center items-center px-4 py-2 bg-school-magenta-700 text-white font-semibold rounded-md shadow-md hover:bg-school-magenta-900 transition duration-300"><Image size={20} className="mr-2" />Create Album</button>
                            </form>
                            <h3 className="text-2xl font-bold text-school-blue-900 mb-6 border-t pt-4">Upload Photos</h3>
                            <form onSubmit={handleAddPhotoSubmit} className="space-y-4">
                                <select value={selectedAlbumId} onChange={(e) => setSelectedAlbumId(e.target.value)} required className="w-full px-3 py-2 border rounded-md">
                                    <option value="">Select Album...</option>
                                    {albums.map(album => <option key={album._id} value={album._id}>{album.title}</option>)}
                                </select>
                                <div onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`mt-4 p-8 text-center border-2 border-dashed rounded-lg transition ${isDragging ? 'border-school-magenta-700 bg-school-magenta-700/10' : 'border-gray-300 bg-gray-50'}`}>
                                    {photoPreviewUrl ? <div className="mx-auto w-32 h-32 border rounded-md overflow-hidden mb-2"><img src={photoPreviewUrl} alt="Preview" className="w-full h-full object-cover" /></div> : <Image size={40} className='mx-auto text-gray-400 mb-2' />}
                                    {photoFiles.length > 0 ? <p className="font-semibold text-school-blue-900">✅ {photoFiles.length} Files Selected</p> : <p className="text-gray-600">Drag & Drop Images</p>}
                                    <input type="file" id="photo-upload-input" accept="image/*" onChange={handleFileSelect} multiple required className="hidden" />
                                    <label htmlFor="photo-upload-input" className="mt-2 block text-school-blue-600 cursor-pointer underline">Browse Files</label>
                                </div>
                                <button type="submit" disabled={uploading} className="w-full flex justify-center items-center px-4 py-2 bg-school-blue-700 text-white font-semibold rounded-md shadow-md hover:bg-school-blue-800 transition duration-300 disabled:bg-gray-400">
                                    {uploading ? <Loader2 size={20} className='mr-2 animate-spin' /> : 'Upload Photos'} 
                                </button>
                            </form>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-fit">
                            <h3 className="text-2xl font-bold text-school-blue-900 p-6 border-b">Existing Albums</h3>
                            {isLoading ? <div className="p-6 text-center"><Loader2 className="animate-spin mx-auto" /></div> : (
                                <ul className="divide-y divide-gray-200 max-h-[800px] overflow-y-auto">
                                    {albums.map(item => (
                                        <li key={item._id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                            <div><p className="font-bold">{item.title}</p><p className="text-sm text-gray-500">{item.description.substring(0, 30)}...</p></div>
                                            <button onClick={() => handleDeleteAlbum(item._id)} className="text-red-500 hover:text-red-700"><Trash2 size={20} /></button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                );

            // 📝 RESULTS TAB
            case 'results':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="bg-white p-6 rounded-lg shadow-lg h-fit">
                            <h3 className="text-2xl font-bold text-school-magenta-700 mb-6">Publish Result</h3>
                            <form onSubmit={handleAddResult} className="space-y-4">
                                <input type="text" placeholder="Result Title" value={resultTitle} onChange={e => setResultTitle(e.target.value)} className="w-full px-3 py-2 border rounded" required />
                                <select value={resultGrade} onChange={e => setResultGrade(e.target.value)} className="w-full px-3 py-2 border rounded" required>
                                    <option value="">Select Class</option>
                                    <option value="Class 10">Class 10</option>
                                    <option value="Class 9">Class 9</option>
                                    <option value="Primary">Primary</option>
                                </select>
                                <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center">
                                    <p className="text-sm text-gray-500 mb-2">Upload PDF/Image</p>
                                    <input type="file" id="result-file-input" accept=".pdf, image/*" onChange={e => setResultFile(e.target.files[0])} required />
                                </div>
                                <button type="submit" disabled={uploading} className="w-full py-2 bg-school-magenta-700 text-white font-bold rounded hover:bg-school-magenta-900">
                                    {uploading ? <Loader2 className="animate-spin mx-auto"/> : "Publish Result"}
                                </button>
                            </form>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-fit">
                            <h3 className="text-2xl font-bold text-school-blue-900 p-6 border-b">Published Results</h3>
                            {isLoading ? <div className="p-6 text-center"><Loader2 className="animate-spin mx-auto" /></div> : (
                                <ul className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                                    {results.map(res => (
                                        <li key={res._id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                            <div><p className="font-bold">{res.title}</p><p className="text-sm text-school-magenta-700">{res.grade}</p><a href={res.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 underline">View</a></div>
                                            <button onClick={() => handleDeleteResult(res._id)} className="text-red-500 hover:text-red-700"><Trash2 size={18}/></button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

   // 🚪 Logout Function
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <PageHeader 
                title="School Management Portal"
                description="Manage students, teachers, news, and gallery data."
            />
            
            <div className="container mx-auto px-6 py-12">
                
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-700">Admin Dashboard</h2>
                    <button 
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-12 border-b bg-white p-4 rounded-lg shadow-sm">
                    {/* ... existing buttons (Students, Teachers, etc) ... */}
                    <button onClick={() => setActiveTab('students')} className={`flex items-center space-x-2 py-2 px-4 font-semibold rounded transition ${activeTab === 'students' ? 'bg-school-magenta-700 text-white' : 'text-gray-500 hover:bg-gray-100'}`}><Users size={20} /> <span>Students</span></button>
                    <button onClick={() => setActiveTab('teachers')} className={`flex items-center space-x-2 py-2 px-4 font-semibold rounded transition ${activeTab === 'teachers' ? 'bg-school-magenta-700 text-white' : 'text-gray-500 hover:bg-gray-100'}`}><Briefcase size={20} /> <span>Teachers</span></button>
                    <button onClick={() => setActiveTab('news')} className={`flex items-center space-x-2 py-2 px-4 font-semibold rounded transition ${activeTab === 'news' ? 'bg-school-magenta-700 text-white' : 'text-gray-500 hover:bg-gray-100'}`}><Newspaper size={20} /> <span>News</span></button>
                    <button onClick={() => setActiveTab('gallery')} className={`flex items-center space-x-2 py-2 px-4 font-semibold rounded transition ${activeTab === 'gallery' ? 'bg-school-magenta-700 text-white' : 'text-gray-500 hover:bg-gray-100'}`}><Image size={20} /> <span>Gallery</span></button>
                    <button onClick={() => setActiveTab('results')} className={`flex items-center space-x-2 py-2 px-4 font-semibold rounded transition ${activeTab === 'results' ? 'bg-school-magenta-700 text-white' : 'text-gray-500 hover:bg-gray-100'}`}><FileText size={20} /> <span>Results</span></button>
                </div>

                {renderTabContent()}

            </div>
        </div>
    );
};

export default PortalPage;