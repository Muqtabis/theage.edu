import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Image as ImageIcon, Maximize2, Share2, Sparkles } from 'lucide-react'; 
import ImageModal from '../components/ImageModal';

const ALBUM_API_URL = '/api/albums'; 

const AlbumPage = () => {
    const { albumId } = useParams(); 
    
    const [album, setAlbum] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); 
    const [copied, setCopied] = useState(false);

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

    const handleShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
                <Loader2 className="animate-spin text-indigo-500 mb-4" size={44} />
                <p className="text-sm font-medium tracking-wider text-slate-400">Loading Photo Collection...</p>
            </div>
        );
    }

    if (error || !album) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6">
                <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md border border-slate-200">
                    <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-rose-500">
                        <ImageIcon size={32} />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Album Not Found</h2>
                    <p className="text-slate-500 text-sm mb-8">{error || "We couldn't locate this photo collection."}</p>
                    
                    <Link to="/student-life" className="inline-flex items-center px-6 py-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-full transition-all text-xs font-bold">
                        <ArrowLeft size={16} className="mr-2" />
                        Return to Campus Life
                    </Link>
                </div>
            </div>
        );
    }

    const images = album.images || [];

    return (
        <div className="font-sans bg-slate-50 min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
            {/* HERO SECTION */}
            <section className="relative bg-slate-950 text-white pt-28 pb-20 overflow-hidden">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="container relative z-10 mx-auto px-6 max-w-7xl">
                    <Link 
                        to="/student-life" 
                        className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-6 group text-xs font-semibold"
                    >
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to All Collections</span>
                    </Link>

                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider">
                                    Photo Collection
                                </span>
                                <span className="text-slate-300 text-xs flex items-center gap-1.5 font-medium">
                                    <ImageIcon size={14} /> {images.length} Photos
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
                                {album.title}
                            </h1>
                            <p className="text-base text-slate-300 leading-relaxed font-normal">
                                {album.description || "Moments captured from campus activities."}
                            </p>
                        </div>
                        
                        <button 
                            onClick={handleShare}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs font-semibold backdrop-blur-md transition-all cursor-pointer"
                        >
                            <Share2 size={15} />
                            <span>{copied ? "Link Copied!" : "Share Album"}</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* PHOTO GRID */}
            <section className="py-16">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200/80 min-h-[400px]">
                        {images.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {images.map((image, index) => (
                                    <div 
                                        key={image._id || index} 
                                        className="group relative aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200"
                                        onClick={() => setSelectedImage(image.src)}
                                    >
                                        <img 
                                            src={image.src} 
                                            alt={image.alt || 'Gallery Photo'} 
                                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
                                            loading="lazy"
                                        />
                                        
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                            <p className="text-white font-medium text-xs truncate">
                                                {image.alt || `Photo ${index + 1}`}
                                            </p>
                                            <div className="flex items-center gap-1.5 text-amber-300 text-[11px] mt-1 font-semibold">
                                                <Maximize2 size={12} />
                                                <span>Click to Expand</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center text-slate-400">
                                <ImageIcon size={44} className="mb-3 opacity-40" />
                                <h3 className="text-lg font-bold text-slate-700">No photos in this album yet</h3>
                                <p className="text-xs text-slate-400 mt-1">Photos will appear here once added in the portal.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Modal */}
            {selectedImage && (
                <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
            )}
        </div>
    );
};

export default AlbumPage;
