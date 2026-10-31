import React, { useState, useEffect } from 'react';
import { 
    Users, 
    Briefcase, 
    Loader2, 
    Newspaper, 
    Image as ImageIcon, 
    Send, 
    Trash2, 
    Calendar, 
    FileText, 
    UserPlus, 
    LogOut,
    Sliders,
    Globe,
    Home,
    Sparkles,
    CheckCircle,
    AlertCircle,
    UploadCloud,
    Plus,
    Building2,
    BookOpen
} from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

// API Endpoints
const NEWS_API_URL = '/api/news';
const ALBUM_API_URL = '/api/albums';
const EVENT_API_URL = '/api/events';
const RESULT_API_URL = '/api/results';
const STUDENT_API_URL = '/api/students';
const TEACHER_API_URL = '/api/teachers';

const PortalPage = () => {
    const { content, saveContent, refreshContent } = useSiteContent();

    // UI Tab State
    const [activeTab, setActiveTab] = useState('cms');
    const [cmsSection, setCmsSection] = useState('general');
    const [isLoading, setIsLoading] = useState(true);
    const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

    // CMS Form State (mirrors content model)
    const [cmsData, setCmsData] = useState({
        general: { ...(content?.general || {}) },
        home: { ...(content?.home || {}) },
        about: { ...(content?.about || {}) },
        admissions: { ...(content?.admissions || {}) },
        academics: { ...(content?.academics || {}) },
        studentLife: { ...(content?.studentLife || {}) },
    });

    // Update local cmsData whenever context updates
    useEffect(() => {
        if (content) {
            setCmsData({
                general: { ...(content.general || {}) },
                home: { ...(content.home || {}) },
                about: { ...(content.about || {}) },
                admissions: { ...(content.admissions || {}) },
                academics: { ...(content.academics || {}) },
                studentLife: { ...(content.studentLife || {}) },
            });
        }
    }, [content]);

    // Data States
    const [newsItems, setNewsItems] = useState([]);
    const [albums, setAlbums] = useState([]); 
    const [events, setEvents] = useState([]);
    const [results, setResults] = useState([]); 
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    
    // News Form
    const [newsTitle, setNewsTitle] = useState('');
    const [newsContent, setNewsContent] = useState('');
    const [newsFile, setNewsFile] = useState(null); 
    const [newsPreviewUrl, setNewsPreviewUrl] = useState(null); 

    // Event Form
    const [eventTitle, setEventTitle] = useState(''); 
    const [eventLocation, setEventLocation] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventFile, setEventFile] = useState(null);

    // Album Form
    const [albumTitle, setAlbumTitle] = useState('');
    const [albumDescription, setAlbumDescription] = useState('');
    const [albumCoverFile, setAlbumCoverFile] = useState(null);
    const [selectedAlbumId, setSelectedAlbumId] = useState('');
    const [photoFiles, setPhotoFiles] = useState([]); 
    const [uploading, setUploading] = useState(false); 

    // Result Form
    const [resultTitle, setResultTitle] = useState('');
    const [resultGrade, setResultGrade] = useState('');
    const [resultFile, setResultFile] = useState(null);

    // Student Form
    const [studentName, setStudentName] = useState('');
    const [studentGrade, setStudentGrade] = useState('');
    const [studentAdmissionId, setStudentAdmissionId] = useState('');
    const [studentParentEmail, setStudentParentEmail] = useState('');

    // Teacher Form
    const [teacherName, setTeacherName] = useState('');
    const [teacherSubject, setTeacherSubject] = useState('');
    const [teacherEmail, setTeacherEmail] = useState('');
    const [teacherQualification, setTeacherQualification] = useState('');

    const showToast = (text, type = 'success') => {
        setStatusMsg({ text, type });
        setTimeout(() => setStatusMsg({ text: '', type: '' }), 4000);
    };

    // Fetch collections
    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            const [newsRes, albumRes, eventRes, resultRes, studentRes, teacherRes] = await Promise.all([
                fetch(NEWS_API_URL),
                fetch(ALBUM_API_URL),
                fetch(`${EVENT_API_URL}?all=true`),
                fetch(RESULT_API_URL),
                fetch(STUDENT_API_URL),
                fetch(TEACHER_API_URL)
            ]);
            
            if (newsRes.ok) setNewsItems(await newsRes.json());
            if (albumRes.ok) setAlbums(await albumRes.json());
            if (eventRes.ok) setEvents(await eventRes.json());
            if (resultRes.ok) setResults(await resultRes.json());
            if (studentRes.ok) setStudents(await studentRes.json());
            if (teacherRes.ok) setTeachers(await teacherRes.json());
        } catch (err) {
            console.error("Failed to fetch dashboard data:", err);
            showToast("Failed to load records from database", "error");
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchAllData();
    }, [activeTab]);

    // Handle CMS Input Change
    const handleCmsChange = (section, field, value) => {
        setCmsData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    // Handle Saving CMS Section
    const handleSaveCms = async (section) => {
        setUploading(true);
        try {
            const res = await saveContent({ [section]: cmsData[section] });
            if (res.success) {
                showToast(`Saved ${section.toUpperCase()} settings successfully!`, 'success');
                refreshContent();
            } else {
                showToast(`Error: ${res.error}`, 'error');
            }
        } catch (err) {
            showToast('Failed to save content', 'error');
        } finally {
            setUploading(false);
        }
    };

    // Upload an image specifically for CMS (e.g. hero banner, principal photo)
    const handleUploadCmsImage = async (e, section, field) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            const res = await fetch('/api/content/upload-image', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (res.ok && data.url) {
                handleCmsChange(section, field, data.url);
                showToast('Image uploaded to Cloudinary!', 'success');
            } else {
                showToast(data.message || 'Image upload failed', 'error');
            }
        } catch (err) {
            showToast('Upload error', 'error');
        } finally {
            setUploading(false);
        }
    };

    // Handlers for News
    const handleAddNews = async (e) => {
        e.preventDefault();
        if (!newsTitle.trim() || !newsContent.trim()) {
            return showToast("Please fill in article title and content", "error");
        }
        
        setUploading(true);
        const formData = new FormData();
        formData.append('title', newsTitle);
        formData.append('content', newsContent);
        if (newsFile) formData.append('image', newsFile); 

        try {
            const response = await fetch(NEWS_API_URL, { method: 'POST', body: formData });
            if (response.ok) {
                setNewsTitle(''); 
                setNewsContent(''); 
                setNewsFile(null); 
                setNewsPreviewUrl(null);
                showToast("Article published successfully!");
                fetchAllData(); 
            } else { 
                showToast("Failed to publish article", "error"); 
            }
        } catch (error) { 
            showToast("Server error publishing news", "error");
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteNews = async (id) => {
        if (!window.confirm("Permanently delete this article?")) return;
        try {
            const res = await fetch(`${NEWS_API_URL}/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showToast("Article deleted");
                fetchAllData();
            }
        } catch (err) {
            showToast("Error deleting article", "error");
        }
    };

    // Handlers for Events
    const handleAddEvent = async (e) => {
        e.preventDefault();
        if (!eventTitle.trim() || !eventDate.trim()) {
            return showToast("Please enter event title and date", "error");
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('title', eventTitle);
        formData.append('location', eventLocation || 'School Campus');
        formData.append('eventDate', eventDate);
        if (eventFile) formData.append('image', eventFile);

        try {
            const response = await fetch(EVENT_API_URL, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                setEventTitle(''); 
                setEventLocation(''); 
                setEventDate(''); 
                setEventFile(null);
                showToast("Event scheduled successfully!");
                fetchAllData(); 
            } else {
                showToast("Failed to schedule event", "error");
            }
        } catch (error) { 
            showToast("Server error creating event", "error");
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteEvent = async (id) => {
        if (!window.confirm("Delete this scheduled event?")) return;
        try {
            const res = await fetch(`${EVENT_API_URL}/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showToast("Event removed");
                fetchAllData();
            }
        } catch (err) {
            showToast("Error deleting event", "error");
        }
    };

    // Handlers for Albums
    const handleCreateAlbum = async (e) => {
        e.preventDefault();
        if (!albumTitle.trim() || !albumDescription.trim()) {
            return showToast("Title and Description required", "error");
        }
        
        setUploading(true);
        const formData = new FormData();
        formData.append('title', albumTitle);
        formData.append('description', albumDescription);
        if (albumCoverFile) formData.append('coverImage', albumCoverFile);

        try {
            const response = await fetch(ALBUM_API_URL, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                setAlbumTitle(''); 
                setAlbumDescription(''); 
                setAlbumCoverFile(null);
                showToast("Album created successfully!");
                fetchAllData();
            } else {
                showToast("Failed to create album", "error");
            }
        } catch (error) { 
            showToast("Server error creating album", "error");
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteAlbum = async (id) => {
        if (!window.confirm("Permanently delete this album and its photos?")) return;
        try {
            const res = await fetch(`${ALBUM_API_URL}/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showToast("Album deleted");
                fetchAllData();
            }
        } catch (err) {
            showToast("Error deleting album", "error");
        }
    };

    const handleUploadPhotosToAlbum = async (e) => {
        e.preventDefault();
        if (!selectedAlbumId || photoFiles.length === 0) {
            return showToast("Select album and image files", "error");
        }

        setUploading(true);
        let count = 0;
        for (const file of photoFiles) {
            const formData = new FormData();
            formData.append('albumId', selectedAlbumId);
            formData.append('image', file);
            try {
                const res = await fetch(`${ALBUM_API_URL}/upload-photo`, { method: 'POST', body: formData });
                if (res.ok) count++;
            } catch (err) {
                console.error(err);
            }
        }
        setUploading(false);
        setPhotoFiles([]);
        showToast(`${count} photos uploaded to album!`);
        fetchAllData();
    };

    // Handlers for Results
    const handleAddResult = async (e) => {
        e.preventDefault();
        if (!resultTitle || !resultGrade || !resultFile) {
            return showToast("Please fill in title, grade, and select a file", "error");
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('title', resultTitle);
        formData.append('grade', resultGrade);
        formData.append('file', resultFile);

        try {
            const response = await fetch(RESULT_API_URL, { method: 'POST', body: formData });
            if (response.ok) {
                setResultTitle(''); 
                setResultGrade(''); 
                setResultFile(null);
                showToast("Exam Result published!");
                fetchAllData();
            } else {
                showToast("Failed to publish result", "error");
            }
        } catch (error) { 
            showToast("Server error uploading result", "error");
        } finally { 
            setUploading(false); 
        }
    };

    const handleDeleteResult = async (id) => {
        if (!window.confirm("Delete this result record?")) return;
        try {
            await fetch(`${RESULT_API_URL}/${id}`, { method: 'DELETE' });
            showToast("Result record removed");
            fetchAllData();
        } catch (err) {
            showToast("Error deleting result", "error");
        }
    };

    // Handlers for Faculty / Teachers
    const handleAddTeacher = async (e) => {
        e.preventDefault();
        if (!teacherName || !teacherSubject || !teacherEmail) {
            return showToast("Name, Subject, and Email are required", "error");
        }

        try {
            const res = await fetch(TEACHER_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: teacherName, 
                    subject: teacherSubject, 
                    email: teacherEmail, 
                    qualification: teacherQualification 
                }),
            });
            if (res.ok) {
                setTeacherName(''); 
                setTeacherSubject(''); 
                setTeacherEmail(''); 
                setTeacherQualification('');
                showToast("Faculty member added!");
                fetchAllData();
            } else {
                showToast("Failed to add teacher", "error");
            }
        } catch (error) { 
            showToast("Error creating teacher", "error");
        }
    };

    const handleDeleteTeacher = async (id) => {
        if (!window.confirm("Remove this teacher record?")) return;
        try {
            await fetch(`${TEACHER_API_URL}/${id}`, { method: 'DELETE' });
            showToast("Teacher record removed");
            fetchAllData();
        } catch (err) {
            showToast("Error deleting teacher", "error");
        }
    };

    // Handlers for Students
    const handleAddStudent = async (e) => {
        e.preventDefault();
        if (!studentName || !studentGrade || !studentAdmissionId) {
            return showToast("Name, Grade, and Admission ID required", "error");
        }

        try {
            const res = await fetch(STUDENT_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: studentName, 
                    grade: parseInt(studentGrade), 
                    admissionId: studentAdmissionId, 
                    parentEmail: studentParentEmail 
                }),
            });
            if (res.ok) {
                setStudentName(''); 
                setStudentGrade(''); 
                setStudentAdmissionId(''); 
                setStudentParentEmail('');
                showToast("Student enrolled successfully!");
                fetchAllData();
            } else {
                showToast("Admission ID already exists or invalid data", "error");
            }
        } catch (error) { 
            showToast("Error enrolling student", "error");
        }
    };

    const handleDeleteStudent = async (id) => {
        if (!window.confirm("Remove student record?")) return;
        try {
            await fetch(`${STUDENT_API_URL}/${id}`, { method: 'DELETE' });
            showToast("Student record removed");
            fetchAllData();
        } catch (err) {
            showToast("Error deleting student", "error");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        window.location.href = '/login';
    };

    // Main Navigation Tabs
    const mainTabs = [
        { id: 'cms', label: 'Website CMS (Edit Content)', icon: Sliders },
        { id: 'events', label: 'Events Manager', icon: Calendar },
        { id: 'news', label: 'News & Bulletins', icon: Newspaper },
        { id: 'gallery', label: 'Gallery & Albums', icon: ImageIcon },
        { id: 'results', label: 'Results & Reports', icon: FileText },
        { id: 'teachers', label: 'Faculty & Staff', icon: Briefcase },
        { id: 'students', label: 'Student Directory', icon: Users },
    ];

    return (
        <div className="min-h-screen bg-slate-100 font-sans text-slate-800 pb-20 selection:bg-indigo-100 selection:text-indigo-900">
            
            {/* TOP BAR */}
            <div className="bg-slate-950 text-white border-b border-slate-800">
                <div className="container mx-auto px-6 py-4 max-w-7xl flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-xs">
                            A
                        </div>
                        <div>
                            <h1 className="text-lg font-serif font-bold tracking-tight">
                                The Age School Admin Portal
                            </h1>
                            <span className="text-xs text-amber-300 font-medium">
                                Master Content Management & Records System
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <a 
                            href="/home" 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition"
                        >
                            View Live Site ↗
                        </a>
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white transition shadow-xs"
                        >
                            <LogOut size={14} />
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* STATUS TOAST NOTIFICATION */}
            {statusMsg.text && (
                <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl border flex items-center gap-3 text-sm font-semibold animate-in slide-in-from-bottom-4 duration-200 ${
                    statusMsg.type === 'error' ? 'bg-rose-900 text-white border-rose-700' : 'bg-slate-900 text-white border-slate-700'
                }`}>
                    {statusMsg.type === 'error' ? <AlertCircle size={20} className="text-rose-400" /> : <CheckCircle size={20} className="text-emerald-400" />}
                    <span>{statusMsg.text}</span>
                </div>
            )}

            <div className="container mx-auto px-6 max-w-7xl pt-8">
                
                {/* STATS OVERVIEW WIDGET */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    {[
                        { label: 'Students', count: students.length, color: 'text-indigo-600', bg: 'bg-white' },
                        { label: 'Faculty', count: teachers.length, color: 'text-violet-600', bg: 'bg-white' },
                        { label: 'Events', count: events.length, color: 'text-amber-600', bg: 'bg-white' },
                        { label: 'Articles', count: newsItems.length, color: 'text-blue-600', bg: 'bg-white' },
                        { label: 'Albums', count: albums.length, color: 'text-pink-600', bg: 'bg-white' },
                        { label: 'Results', count: results.length, color: 'text-emerald-600', bg: 'bg-white' },
                    ].map((stat, i) => (
                        <div key={i} className={`${stat.bg} p-4 rounded-2xl border border-slate-200/80 shadow-xs`}>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">{stat.label}</span>
                            <span className={`text-2xl font-serif font-bold ${stat.color}`}>{stat.count}</span>
                        </div>
                    ))}
                </div>

                {/* MAIN NAVIGATION BAR */}
                <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs mb-8 flex flex-wrap gap-1">
                    {mainTabs.map(tab => {
                        const Icon = tab.icon;
                        const active = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                    active 
                                        ? 'bg-slate-900 text-white shadow-xs' 
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                            >
                                <Icon size={16} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* =========================================================
                    1. WEBSITE CONTENT CMS (EDIT EVERYTHING ON SITE)
                   ========================================================= */}
                {activeTab === 'cms' && (
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
                        <div className="border-b border-slate-200 pb-5 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-slate-900">
                                    Website Content & Page Settings
                                </h2>
                                <p className="text-xs text-slate-500 mt-1">
                                    Every section, title, quote, and contact detail across the website is live-synced and editable here.
                                </p>
                            </div>

                            <button 
                                onClick={() => handleSaveCms(cmsSection)}
                                disabled={uploading}
                                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                            >
                                {uploading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                                <span>Save {cmsSection.toUpperCase()} Changes</span>
                            </button>
                        </div>

                        {/* CMS Sub-sections */}
                        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-100 pb-4">
                            {[
                                { id: 'general', label: 'School Identity & Contact' },
                                { id: 'home', label: 'Home Page & Bento Grid' },
                                { id: 'about', label: 'About & Leadership Messages' },
                                { id: 'admissions', label: 'Admissions & Tuition Fees' },
                                { id: 'academics', label: 'Academics & Pathways' },
                                { id: 'studentLife', label: 'Campus Life & Activities' },
                            ].map(sub => (
                                <button
                                    key={sub.id}
                                    onClick={() => setCmsSection(sub.id)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                                        cmsSection === sub.id 
                                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                                    }`}
                                >
                                    {sub.label}
                                </button>
                            ))}
                        </div>

                        {/* SECTION: GENERAL & CONTACT */}
                        {cmsSection === 'general' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">School Name</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.general.schoolName || ''} 
                                        onChange={e => handleCmsChange('general', 'schoolName', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Main Tagline</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.general.tagline || ''} 
                                        onChange={e => handleCmsChange('general', 'tagline', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Admissions Open Badge</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.general.admissionsBadge || ''} 
                                        onChange={e => handleCmsChange('general', 'admissionsBadge', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Official Phone Number</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.general.phone || ''} 
                                        onChange={e => handleCmsChange('general', 'phone', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Official Email Address</label>
                                    <input 
                                        type="email" 
                                        value={cmsData.general.email || ''} 
                                        onChange={e => handleCmsChange('general', 'email', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Board Affiliation Text</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.general.affiliation || ''} 
                                        onChange={e => handleCmsChange('general', 'affiliation', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Affiliation Code</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.general.affiliationCode || ''} 
                                        onChange={e => handleCmsChange('general', 'affiliationCode', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Physical Campus Address</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.general.address || ''} 
                                        onChange={e => handleCmsChange('general', 'address', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Facebook Link</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.general.socialFacebook || ''} 
                                        onChange={e => handleCmsChange('general', 'socialFacebook', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Instagram Link</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.general.socialInstagram || ''} 
                                        onChange={e => handleCmsChange('general', 'socialInstagram', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Google Maps Embed URL</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.general.googleMapsIframe || ''} 
                                        onChange={e => handleCmsChange('general', 'googleMapsIframe', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                            </div>
                        )}

                        {/* SECTION: HOME PAGE */}
                        {cmsSection === 'home' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Hero Title Line 1</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.home.heroTitleLine1 || ''} 
                                        onChange={e => handleCmsChange('home', 'heroTitleLine1', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Hero Title Highlight (Gold Gradient)</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.home.heroTitleHighlight || ''} 
                                        onChange={e => handleCmsChange('home', 'heroTitleHighlight', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Hero Subtitle</label>
                                    <textarea 
                                        rows="2"
                                        value={cmsData.home.heroSubtitle || ''} 
                                        onChange={e => handleCmsChange('home', 'heroSubtitle', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Custom Hero Banner Image (Upload)</label>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={e => handleUploadCmsImage(e, 'home', 'heroImageUrl')}
                                        className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    />
                                    {cmsData.home.heroImageUrl && (
                                        <p className="text-[11px] text-emerald-600 mt-1 truncate">Current: {cmsData.home.heroImageUrl}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Stats: Students</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.home.statsStudents || ''} 
                                        onChange={e => handleCmsChange('home', 'statsStudents', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Stats: Pass Rate</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.home.statsPassRate || ''} 
                                        onChange={e => handleCmsChange('home', 'statsPassRate', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Stats: Faculty Count</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.home.statsFaculty || ''} 
                                        onChange={e => handleCmsChange('home', 'statsFaculty', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Bento 1: Innovation Lab Title</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.home.bento1Title || ''} 
                                        onChange={e => handleCmsChange('home', 'bento1Title', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Bento 1: Innovation Lab Description</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.home.bento1Desc || ''} 
                                        onChange={e => handleCmsChange('home', 'bento1Desc', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Bento 2: Holistic Growth Title</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.home.bento2Title || ''} 
                                        onChange={e => handleCmsChange('home', 'bento2Title', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Bento 2: Description</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.home.bento2Desc || ''} 
                                        onChange={e => handleCmsChange('home', 'bento2Desc', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                            </div>
                        )}

                        {/* SECTION: ABOUT & LEADERSHIP */}
                        {cmsSection === 'about' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <h3 className="text-lg font-serif font-bold text-slate-900 border-b pb-2">Hero Information</h3>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">About Hero Title</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.about.heroTitle || ''} 
                                        onChange={e => handleCmsChange('about', 'heroTitle', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Established Year Badge</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.about.heroBadge || ''} 
                                        onChange={e => handleCmsChange('about', 'heroBadge', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Hero Subtitle</label>
                                    <textarea 
                                        rows="2"
                                        value={cmsData.about.heroSubtitle || ''} 
                                        onChange={e => handleCmsChange('about', 'heroSubtitle', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>

                                <div className="md:col-span-2 pt-4">
                                    <h3 className="text-lg font-serif font-bold text-slate-900 border-b pb-2">President's Message</h3>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">President Name</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.about.presidentName || ''} 
                                        onChange={e => handleCmsChange('about', 'presidentName', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">President Title / Role</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.about.presidentRole || ''} 
                                        onChange={e => handleCmsChange('about', 'presidentRole', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">President's Headline Quote</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.about.presidentQuote || ''} 
                                        onChange={e => handleCmsChange('about', 'presidentQuote', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">President Photo (Upload)</label>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={e => handleUploadCmsImage(e, 'about', 'presidentImageUrl')}
                                        className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700" 
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Full President Welcome Message</label>
                                    <textarea 
                                        rows="3"
                                        value={cmsData.about.presidentMessage || ''} 
                                        onChange={e => handleCmsChange('about', 'presidentMessage', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>

                                <div className="md:col-span-2 pt-4">
                                    <h3 className="text-lg font-serif font-bold text-slate-900 border-b pb-2">Vice President's Message</h3>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Vice President Name</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.about.vpName || ''} 
                                        onChange={e => handleCmsChange('about', 'vpName', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Vice President's Headline Quote</label>
                                    <input 
                                        type="text" 
                                        value={cmsData.about.vpQuote || ''} 
                                        onChange={e => handleCmsChange('about', 'vpQuote', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Vice President Photo (Upload)</label>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={e => handleUploadCmsImage(e, 'about', 'vpImageUrl')}
                                        className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700" 
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Full Vice President Welcome Message</label>
                                    <textarea 
                                        rows="3"
                                        value={cmsData.about.vpMessage || ''} 
                                        onChange={e => handleCmsChange('about', 'vpMessage', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                    />
                                </div>
                            </div>
                        )}

                        {/* SECTION: ADMISSIONS & FEES */}
                        {cmsSection === 'admissions' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Hero Title</label>
                                        <input 
                                            type="text" 
                                            value={cmsData.admissions.heroTitle || ''} 
                                            onChange={e => handleCmsChange('admissions', 'heroTitle', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Hero Badge</label>
                                        <input 
                                            type="text" 
                                            value={cmsData.admissions.heroBadge || ''} 
                                            onChange={e => handleCmsChange('admissions', 'heroBadge', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Financial Aid Notice</label>
                                        <textarea 
                                            rows="2"
                                            value={cmsData.admissions.financialAidDesc || ''} 
                                            onChange={e => handleCmsChange('admissions', 'financialAidDesc', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <h3 className="text-lg font-serif font-bold text-slate-900 mb-4">Tuition & Fee Structure (Live Cards)</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {(cmsData.admissions.fees || []).map((fee, idx) => (
                                            <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold text-sm text-slate-900">{fee.grade}</span>
                                                    <span className="text-xs text-indigo-600 font-semibold">{fee.range}</span>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] uppercase font-bold text-slate-400">Annual Tuition (₹)</label>
                                                    <input 
                                                        type="text" 
                                                        value={fee.annual || ''} 
                                                        onChange={e => {
                                                            const newFees = [...(cmsData.admissions.fees || [])];
                                                            newFees[idx].annual = e.target.value;
                                                            setCmsData(prev => ({
                                                                ...prev,
                                                                admissions: { ...prev.admissions, fees: newFees }
                                                            }));
                                                        }}
                                                        className="w-full px-3 py-1.5 border rounded-lg text-sm bg-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] uppercase font-bold text-slate-400">Materials Fee</label>
                                                    <input 
                                                        type="text" 
                                                        value={fee.materials || ''} 
                                                        onChange={e => {
                                                            const newFees = [...(cmsData.admissions.fees || [])];
                                                            newFees[idx].materials = e.target.value;
                                                            setCmsData(prev => ({
                                                                ...prev,
                                                                admissions: { ...prev.admissions, fees: newFees }
                                                            }));
                                                        }}
                                                        className="w-full px-3 py-1.5 border rounded-lg text-sm bg-white"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECTION: ACADEMICS & PATHWAYS */}
                        {cmsSection === 'academics' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Academics Page Title</label>
                                        <input 
                                            type="text" 
                                            value={cmsData.academics.heroTitle || ''} 
                                            onChange={e => handleCmsChange('academics', 'heroTitle', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Badge</label>
                                        <input 
                                            type="text" 
                                            value={cmsData.academics.heroBadge || ''} 
                                            onChange={e => handleCmsChange('academics', 'heroBadge', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <h3 className="text-lg font-serif font-bold text-slate-900 mb-4">Curriculum Pathways</h3>
                                    <div className="space-y-4">
                                        {(cmsData.academics.levels || []).map((lvl, idx) => (
                                            <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                                                <div className="font-bold text-slate-900">{lvl.title}</div>
                                                <textarea 
                                                    rows="2"
                                                    value={lvl.desc || ''} 
                                                    onChange={e => {
                                                        const newLvls = [...(cmsData.academics.levels || [])];
                                                        newLvls[idx].desc = e.target.value;
                                                        setCmsData(prev => ({
                                                            ...prev,
                                                            academics: { ...prev.academics, levels: newLvls }
                                                        }));
                                                    }}
                                                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECTION: STUDENT LIFE & ACTIVITIES */}
                        {cmsSection === 'studentLife' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Campus Life Title</label>
                                        <input 
                                            type="text" 
                                            value={cmsData.studentLife.heroTitle || ''} 
                                            onChange={e => handleCmsChange('studentLife', 'heroTitle', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Subtitle</label>
                                        <input 
                                            type="text" 
                                            value={cmsData.studentLife.heroSubtitle || ''} 
                                            onChange={e => handleCmsChange('studentLife', 'heroSubtitle', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" 
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <h3 className="text-lg font-serif font-bold text-slate-900 mb-4">Extracurricular Pillars</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {(cmsData.studentLife.activities || []).map((act, idx) => (
                                            <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                                                <input 
                                                    type="text"
                                                    value={act.title || ''}
                                                    onChange={e => {
                                                        const newActs = [...(cmsData.studentLife.activities || [])];
                                                        newActs[idx].title = e.target.value;
                                                        setCmsData(prev => ({
                                                            ...prev,
                                                            studentLife: { ...prev.studentLife, activities: newActs }
                                                        }));
                                                    }}
                                                    className="font-bold text-sm text-slate-900 w-full px-2 py-1 border rounded bg-white"
                                                />
                                                <textarea 
                                                    rows="3"
                                                    value={act.desc || ''} 
                                                    onChange={e => {
                                                        const newActs = [...(cmsData.studentLife.activities || [])];
                                                        newActs[idx].desc = e.target.value;
                                                        setCmsData(prev => ({
                                                            ...prev,
                                                            studentLife: { ...prev.studentLife, activities: newActs }
                                                        }));
                                                    }}
                                                    className="w-full px-3 py-2 border rounded-lg text-xs bg-white"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t flex justify-end">
                            <button 
                                onClick={() => handleSaveCms(cmsSection)}
                                disabled={uploading}
                                className="px-8 py-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                            >
                                {uploading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                                <span>Save All Settings</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* =========================================================
                    2. EVENTS MANAGEMENT (SCHEDULE & DELETE)
                   ========================================================= */}
                {activeTab === 'events' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Form */}
                        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm h-fit">
                            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <Calendar size={20} className="text-indigo-600" />
                                <span>Schedule New Event</span>
                            </h3>
                            <p className="text-xs text-slate-500 mb-6">Upcoming events show automatically on the home & news pages.</p>

                            <form onSubmit={handleAddEvent} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Event Title</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Annual Sports Day 2025" 
                                        value={eventTitle} 
                                        onChange={e => setEventTitle(e.target.value)} 
                                        required 
                                        className="w-full px-4 py-2.5 border rounded-xl text-sm" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Location / Venue</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Main Athletic Grounds / Auditorium" 
                                        value={eventLocation} 
                                        onChange={e => setEventLocation(e.target.value)} 
                                        className="w-full px-4 py-2.5 border rounded-xl text-sm" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Event Date</label>
                                    <input 
                                        type="date" 
                                        value={eventDate} 
                                        onChange={e => setEventDate(e.target.value)} 
                                        required 
                                        className="w-full px-4 py-2.5 border rounded-xl text-sm" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Optional Banner Image</label>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={e => setEventFile(e.target.files[0])}
                                        className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700" 
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={uploading}
                                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition disabled:opacity-50 cursor-pointer"
                                >
                                    {uploading ? "Uploading..." : "Schedule Event"}
                                </button>
                            </form>
                        </div>

                        {/* Events List */}
                        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-fit">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="text-xl font-serif font-bold text-slate-900">Scheduled Events ({events.length})</h3>
                                <span className="text-xs text-slate-400">Sorted by event date</span>
                            </div>

                            {isLoading ? (
                                <div className="p-12 text-center text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" />Loading events...</div>
                            ) : events.length === 0 ? (
                                <div className="p-12 text-center text-slate-400 text-sm">No scheduled events found. Add your first event using the form.</div>
                            ) : (
                                <ul className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                                    {events.map(ev => (
                                        <li key={ev._id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl text-center min-w-14">
                                                    <span className="block font-serif font-bold text-lg leading-none">
                                                        {new Date(ev.eventDate).getDate()}
                                                    </span>
                                                    <span className="text-[10px] uppercase font-bold text-indigo-500 block mt-1">
                                                        {new Date(ev.eventDate).toLocaleString('default', { month: 'short' })}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900 text-sm">{ev.title}</h4>
                                                    <p className="text-xs text-slate-500">{ev.location} • {new Date(ev.eventDate).getFullYear()}</p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => handleDeleteEvent(ev._id)}
                                                className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                                                title="Delete event"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}

                {/* =========================================================
                    3. NEWS & BULLETINS MANAGEMENT
                   ========================================================= */}
                {activeTab === 'news' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm h-fit">
                            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <Newspaper size={20} className="text-indigo-600" />
                                <span>Publish News Article</span>
                            </h3>
                            <p className="text-xs text-slate-500 mb-6">Articles appear on the News page and the homepage news feed.</p>

                            <form onSubmit={handleAddNews} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Headline Title</label>
                                    <input 
                                        type="text" 
                                        placeholder="Article Headline" 
                                        value={newsTitle} 
                                        onChange={e => setNewsTitle(e.target.value)} 
                                        required 
                                        className="w-full px-4 py-2.5 border rounded-xl text-sm" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Article Content</label>
                                    <textarea 
                                        rows="5" 
                                        placeholder="Write the full announcement or story..." 
                                        value={newsContent} 
                                        onChange={e => setNewsContent(e.target.value)} 
                                        required 
                                        className="w-full px-4 py-2.5 border rounded-xl text-sm" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Featured Photo</label>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                                setNewsFile(e.target.files[0]);
                                                setNewsPreviewUrl(URL.createObjectURL(e.target.files[0]));
                                            }
                                        }}
                                        className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700" 
                                    />
                                    {newsPreviewUrl && (
                                        <div className="mt-3 h-28 rounded-xl overflow-hidden border">
                                            <img src={newsPreviewUrl} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={uploading}
                                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition disabled:opacity-50 cursor-pointer"
                                >
                                    {uploading ? "Publishing to Cloud..." : "Publish Article"}
                                </button>
                            </form>
                        </div>

                        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-fit">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="text-xl font-serif font-bold text-slate-900">Published News ({newsItems.length})</h3>
                            </div>

                            {isLoading ? (
                                <div className="p-12 text-center text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" />Loading news...</div>
                            ) : newsItems.length === 0 ? (
                                <div className="p-12 text-center text-slate-400 text-sm">No news articles published yet.</div>
                            ) : (
                                <ul className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                                    {newsItems.map(item => (
                                        <li key={item._id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition gap-4">
                                            <div className="flex items-center gap-3.5 min-w-0">
                                                {item.imageUrl && (
                                                    <img src={item.imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                                                )}
                                                <div className="min-w-0">
                                                    <h4 className="font-bold text-slate-900 text-sm truncate">{item.title}</h4>
                                                    <p className="text-xs text-slate-400">{item.date || 'Published'}</p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => handleDeleteNews(item._id)}
                                                className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition shrink-0"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}

                {/* =========================================================
                    4. GALLERY & ALBUMS MANAGEMENT
                   ========================================================= */}
                {activeTab === 'gallery' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-5 space-y-6">
                            {/* Create Album */}
                            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-serif font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <ImageIcon size={18} className="text-indigo-600" />
                                    <span>Create New Album</span>
                                </h3>

                                <form onSubmit={handleCreateAlbum} className="space-y-3.5">
                                    <input 
                                        type="text" 
                                        placeholder="Album Title (e.g. Sports Day 2025)" 
                                        value={albumTitle} 
                                        onChange={e => setAlbumTitle(e.target.value)} 
                                        required 
                                        className="w-full px-4 py-2.5 border rounded-xl text-sm" 
                                    />
                                    <textarea 
                                        rows="2" 
                                        placeholder="Short Description..." 
                                        value={albumDescription} 
                                        onChange={e => setAlbumDescription(e.target.value)} 
                                        required 
                                        className="w-full px-4 py-2.5 border rounded-xl text-sm" 
                                    />
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Cover Image</label>
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={e => setAlbumCoverFile(e.target.files[0])}
                                            className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700" 
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={uploading}
                                        className="w-full py-2.5 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-xl text-xs shadow-xs transition"
                                    >
                                        Create Album
                                    </button>
                                </form>
                            </div>

                            {/* Upload Photos to Existing Album */}
                            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-serif font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <UploadCloud size={18} className="text-indigo-600" />
                                    <span>Upload Photos to Album</span>
                                </h3>

                                <form onSubmit={handleUploadPhotosToAlbum} className="space-y-4">
                                    <select 
                                        value={selectedAlbumId} 
                                        onChange={e => setSelectedAlbumId(e.target.value)}
                                        required 
                                        className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white"
                                    >
                                        <option value="">Select Target Album...</option>
                                        {albums.map(a => (
                                            <option key={a._id} value={a._id}>{a.title} ({a.images?.length || 0} photos)</option>
                                        ))}
                                    </select>

                                    <div className="p-6 border-2 border-dashed border-slate-300 rounded-2xl text-center bg-slate-50">
                                        <UploadCloud size={32} className="mx-auto text-slate-400 mb-2" />
                                        <p className="text-xs text-slate-600 font-semibold mb-1">Select one or multiple photos</p>
                                        <input 
                                            type="file" 
                                            multiple 
                                            accept="image/*"
                                            onChange={e => setPhotoFiles(Array.from(e.target.files))}
                                            required 
                                            className="text-xs text-slate-500"
                                        />
                                        {photoFiles.length > 0 && (
                                            <p className="text-xs text-emerald-600 font-bold mt-2">
                                                ✅ {photoFiles.length} images selected
                                            </p>
                                        )}
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={uploading}
                                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition disabled:opacity-50"
                                    >
                                        {uploading ? "Uploading to Cloudinary..." : "Upload Photos"}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Existing Albums List */}
                        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-fit">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="text-xl font-serif font-bold text-slate-900">Existing Collections ({albums.length})</h3>
                            </div>

                            {isLoading ? (
                                <div className="p-12 text-center text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" />Loading albums...</div>
                            ) : albums.length === 0 ? (
                                <div className="p-12 text-center text-slate-400 text-sm">No albums created yet.</div>
                            ) : (
                                <ul className="divide-y divide-slate-100 max-h-[700px] overflow-y-auto">
                                    {albums.map(item => (
                                        <li key={item._id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition gap-4">
                                            <div className="flex items-center gap-4 min-w-0">
                                                <img 
                                                    src={item.coverImage || "https://placehold.co/100x100"} 
                                                    alt="" 
                                                    className="w-16 h-16 rounded-xl object-cover shrink-0 border" 
                                                />
                                                <div className="min-w-0">
                                                    <h4 className="font-bold text-slate-900 text-sm truncate">{item.title}</h4>
                                                    <p className="text-xs text-slate-500 line-clamp-1 mb-1">{item.description}</p>
                                                    <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                                                        {item.images?.length || 0} Photos
                                                    </span>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => handleDeleteAlbum(item._id)}
                                                className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition shrink-0"
                                                title="Delete album"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}

                {/* =========================================================
                    5. RESULTS & REPORTS MANAGEMENT
                   ========================================================= */}
                {activeTab === 'results' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm h-fit">
                            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <FileText size={20} className="text-indigo-600" />
                                <span>Publish Exam Result / Report</span>
                            </h3>
                            <p className="text-xs text-slate-500 mb-6">Upload official PDFs or image scorecards for students and parents.</p>

                            <form onSubmit={handleAddResult} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Result Title</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Class 10 Board Mock Results 2025" 
                                        value={resultTitle} 
                                        onChange={e => setResultTitle(e.target.value)} 
                                        required 
                                        className="w-full px-4 py-2.5 border rounded-xl text-sm" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Grade / Class</label>
                                    <select 
                                        value={resultGrade} 
                                        onChange={e => setResultGrade(e.target.value)} 
                                        required 
                                        className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white"
                                    >
                                        <option value="">Select Grade Level...</option>
                                        <option value="Class 10">Class 10 (Secondary)</option>
                                        <option value="Class 9">Class 9 (Secondary)</option>
                                        <option value="Middle School">Middle School (Class 6-8)</option>
                                        <option value="Primary School">Primary School (Class 1-5)</option>
                                        <option value="General School">General School Notice</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Document File (PDF or Image)</label>
                                    <input 
                                        type="file" 
                                        accept=".pdf,image/*" 
                                        onChange={e => setResultFile(e.target.files[0])} 
                                        required 
                                        className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700" 
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={uploading}
                                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition disabled:opacity-50"
                                >
                                    {uploading ? "Uploading File..." : "Publish Document"}
                                </button>
                            </form>
                        </div>

                        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-fit">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="text-xl font-serif font-bold text-slate-900">Published Resources ({results.length})</h3>
                            </div>

                            {isLoading ? (
                                <div className="p-12 text-center text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" />Loading results...</div>
                            ) : results.length === 0 ? (
                                <div className="p-12 text-center text-slate-400 text-sm">No exam results published yet.</div>
                            ) : (
                                <ul className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                                    {results.map(res => (
                                        <li key={res._id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition gap-4">
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-slate-900 text-sm truncate">{res.title}</h4>
                                                <div className="flex items-center gap-3 text-xs mt-1">
                                                    <span className="font-semibold text-indigo-600">{res.grade}</span>
                                                    <span className="text-slate-400">•</span>
                                                    <span className="text-slate-400">{res.date}</span>
                                                    <span className="text-slate-400">•</span>
                                                    <a href={res.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                                        Open File ↗
                                                    </a>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => handleDeleteResult(res._id)}
                                                className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition shrink-0"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}

                {/* =========================================================
                    6. FACULTY & TEACHERS MANAGEMENT
                   ========================================================= */}
                {activeTab === 'teachers' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm h-fit">
                            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <Briefcase size={20} className="text-indigo-600" />
                                <span>Add Faculty Member</span>
                            </h3>
                            <p className="text-xs text-slate-500 mb-6">Added teachers appear automatically on the About Us page.</p>

                            <form onSubmit={handleAddTeacher} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Mrs. Anjali Sharma" 
                                        value={teacherName} 
                                        onChange={e => setTeacherName(e.target.value)} 
                                        required 
                                        className="w-full px-4 py-2.5 border rounded-xl text-sm" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Subject / Specialization</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Mathematics & Science" 
                                        value={teacherSubject} 
                                        onChange={e => setTeacherSubject(e.target.value)} 
                                        required 
                                        className="w-full px-4 py-2.5 border rounded-xl text-sm" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        placeholder="teacher@theageschool.edu" 
                                        value={teacherEmail} 
                                        onChange={e => setTeacherEmail(e.target.value)} 
                                        required 
                                        className="w-full px-4 py-2.5 border rounded-xl text-sm" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Qualification (Optional)</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. M.Sc, B.Ed (10+ Yrs Exp)" 
                                        value={teacherQualification} 
                                        onChange={e => setTeacherQualification(e.target.value)} 
                                        className="w-full px-4 py-2.5 border rounded-xl text-sm" 
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
                                >
                                    Add Faculty Member
                                </button>
                            </form>
                        </div>

                        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-fit">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="text-xl font-serif font-bold text-slate-900">Faculty List ({teachers.length})</h3>
                            </div>

                            {isLoading ? (
                                <div className="p-12 text-center text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" />Loading faculty...</div>
                            ) : teachers.length === 0 ? (
                                <div className="p-12 text-center text-slate-400 text-sm">No faculty added yet.</div>
                            ) : (
                                <ul className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                                    {teachers.map(t => (
                                        <li key={t._id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition gap-4">
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-slate-900 text-sm truncate">{t.name}</h4>
                                                <p className="text-xs text-indigo-600 font-semibold">{t.subject} {t.qualification && `• ${t.qualification}`}</p>
                                                <p className="text-xs text-slate-400 truncate">{t.email}</p>
                                            </div>
                                            <button 
                                                onClick={() => handleDeleteTeacher(t._id)}
                                                className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition shrink-0"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}

                {/* =========================================================
                    7. STUDENTS MANAGEMENT
                   ========================================================= */}
                {activeTab === 'students' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm h-fit">
                            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <UserPlus size={20} className="text-indigo-600" />
                                <span>Enroll New Student</span>
                            </h3>
                            <p className="text-xs text-slate-500 mb-6">Manage enrolled students, admission records, and parent contacts.</p>

                            <form onSubmit={handleAddStudent} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Student Full Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Full Name" 
                                        value={studentName} 
                                        onChange={e => setStudentName(e.target.value)} 
                                        required 
                                        className="w-full px-4 py-2.5 border rounded-xl text-sm" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Grade Level (1-10)</label>
                                    <input 
                                        type="number" 
                                        placeholder="e.g. 10" 
                                        min="1" 
                                        max="12"
                                        value={studentGrade} 
                                        onChange={e => setStudentGrade(e.target.value)} 
                                        required 
                                        className="w-full px-4 py-2.5 border rounded-xl text-sm" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Admission ID (Unique)</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. AGE-2025-001" 
                                        value={studentAdmissionId} 
                                        onChange={e => setStudentAdmissionId(e.target.value)} 
                                        required 
                                        className="w-full px-4 py-2.5 border rounded-xl text-sm" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Parent Contact Email (Optional)</label>
                                    <input 
                                        type="email" 
                                        placeholder="parent@example.com" 
                                        value={studentParentEmail} 
                                        onChange={e => setStudentParentEmail(e.target.value)} 
                                        className="w-full px-4 py-2.5 border rounded-xl text-sm" 
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
                                >
                                    Enroll Student Record
                                </button>
                            </form>
                        </div>

                        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-fit">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="text-xl font-serif font-bold text-slate-900">Enrolled Students ({students.length})</h3>
                            </div>

                            {isLoading ? (
                                <div className="p-12 text-center text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" />Loading students...</div>
                            ) : students.length === 0 ? (
                                <div className="p-12 text-center text-slate-400 text-sm">No students registered in database.</div>
                            ) : (
                                <ul className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                                    {students.map(s => (
                                        <li key={s._id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition gap-4">
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-slate-900 text-sm truncate">{s.name}</h4>
                                                <div className="flex items-center gap-3 text-xs mt-1 text-slate-500">
                                                    <span className="font-semibold text-indigo-600">Grade {s.grade}</span>
                                                    <span>•</span>
                                                    <span>ID: <code className="bg-slate-100 px-1 py-0.5 rounded">{s.admissionId}</code></span>
                                                    {s.parentEmail && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="truncate">{s.parentEmail}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => handleDeleteStudent(s._id)}
                                                className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition shrink-0"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default PortalPage;
