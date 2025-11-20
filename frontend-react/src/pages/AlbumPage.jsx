import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Image as ImageIcon, Maximize2, Share2 } from 'lucide-react'; 

const ALBUM_API_URL = '/api/albums'; 

const AlbumPage = () => {
    const { albumId } = useParams(); 
    
    const [album, setAlbum] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!albumId) {
            setError("Invalid album ID provided.");
            setIsLoading(false);
            return;
        }

        const fetchAlbumDetails = async () => {
            try {
                const response = await fetch(`${ALBUM_API_URL}/${albumId}`);
                
                if (!response.ok) {
                    throw new Error(`Album Not Found (${response.status})`);
                }
                
                const data = await response.json();
                setAlbum(data);

            } catch (err) {
                console.error("Error fetching album details:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAlbumDetails();
    }, [albumId]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-950 text-white">
                <Loader2 className="animate-spin text-violet-500 mb-4" size={48} />
                <p className="text-lg font-light tracking-wider animate-pulse">Loading Gallery...</p>
            </div>
        );
    }

    if (error || !album) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
                <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md border border-gray-200">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ImageIcon className="text-red-500" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Album Not Found</h2>
                    <p className="text-slate-500 mb-8">{error || "We couldn't locate the photos you are looking for."}</p>
                    
                    {/* ✅ FIXED LINK: Points to Student Life now */}
                    <Link to="/student-life" className="inline-flex items-center px-6 py-3 bg-indigo-900 text-white rounded-full hover:bg-indigo-800 transition-all font-bold">
                        <ArrowLeft size={18} className="mr-2" />
                        Back to Campus Life
                    </Link>
                </div>
            </div>
        );
    }

    const images = album.images || [];

    return (
        <div className="font-sans bg-slate-50 min-h-screen">
            {/* Animation Styles */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                .delay-100 { animation-delay: 0.1s; }
            `}</style>

            {/* ==========================================
                1. IMMERSIVE HERO SECTION (Deep Purple Theme)
            ========================================== */}
            <section className="relative bg-indigo-950 text-white pt-32 pb-20 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                </div>

                <div className="container relative z-10 mx-auto px-6">
                    {/* ✅ FIXED LINK: Breadcrumb / Back */}
                    <Link 
                        to="/student-life" 
                        className="inline-flex items-center text-indigo-200 hover:text-white hover:-translate-x-1 transition-all duration-300 mb-8 group"
                    >
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 group-hover:bg-violet-500 transition-colors">
                            <ArrowLeft size={16} />
                        </div>
                        <span className="font-medium">Back to Campus Life</span>
                    </Link>

                    <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-violet-500/20 border border-violet-400/30 text-violet-300 text-xs font-bold uppercase tracking-wider">
                                    Gallery Collection
                                </span>
                                <span className="text-indigo-300 text-sm flex items-center gap-1">
                                    <ImageIcon size={14} /> {images.length} Photos
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight animate-fade-in-up">
                                {album.title}
                            </h1>
                            <p className="text-lg text-indigo-100 leading-relaxed font-light animate-fade-in-up delay-100">
                                {album.description || "Explore the moments captured in this collection."}
                            </p>
                        </div>
                        
                        <button className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-sm font-semibold backdrop-blur-md transition-all">
                            <Share2 size={16} /> Share Album
                        </button>
                    </div>
                </div>
            </section>

            {/* ==========================================
                2. PHOTO GRID
            ========================================== */}
            <section className="relative z-20 -mt-10 pb-24">
                <div className="container mx-auto px-6">
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-100 min-h-[400px]">
                        
                        {images.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {images.map((image, index) => (
                                    <div 
                                        key={image._id || index} 
                                        className="group relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                                        style={{ animationDelay: `${index * 50}ms` }} 
                                    >
                                        {/* Image */}
                                        <img 
                                            src={image.src} 
                                            alt={image.alt || 'Gallery Photo'} 
                                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
                                            loading="lazy"
                                        />
                                        
                                        {/* Gradient Overlay on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                <p className="text-white font-medium text-sm truncate">
                                                    {image.alt || `Photo ${index + 1}`}
                                                </p>
                                                <div className="flex items-center gap-2 text-violet-300 text-xs mt-1">
                                                    <Maximize2 size={12} />
                                                    <span>View Fullscreen</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Corner Icon */}
                                        <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:text-indigo-900">
                                            <Maximize2 size={14} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                                    <ImageIcon className="text-gray-400" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-600">It's a bit empty here</h3>
                                <p className="text-gray-500 mt-2 max-w-xs mx-auto">No photos have been added to this album yet. Check back later!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AlbumPage;