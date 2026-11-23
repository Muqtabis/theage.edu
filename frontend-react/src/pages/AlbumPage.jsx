import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Image as ImageIcon, Maximize2, Share2 } from 'lucide-react'; 
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
            setError("Invalid collection ID provided.");
            setIsLoading(false);
            return;
        }

        const fetchAlbumDetails = async () => {
            try {
                const response = await fetch(`${ALBUM_API_URL}/${albumId}`);
                if (!response.ok) {
                    throw new Error(`Collection Not Found (${response.status})`);
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
            <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-800">
                <Loader2 className="animate-spin text-blue-600 mb-3" size={32} />
                <p className="text-xs uppercase tracking-wider text-slate-500 font-medium">Loading Photographs...</p>
            </div>
        );
    }

    if (error || !album) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6">
                <div className="bg-white p-8 border border-slate-200 text-center max-w-md rounded-xl shadow-xs">
                    <h2 className="text-lg font-bold text-slate-900 mb-2">Collection Not Found</h2>
                    <p className="text-slate-500 text-xs mb-6">{error || "We could not find the requested catalogued photos."}</p>
                    <Link to="/student-life" className="btn-primary text-xs">
                        <ArrowLeft size={14} />
                        <span>Return to Archives</span>
                    </Link>
                </div>
            </div>
        );
    }

    const images = album.images || [];

    return (
        <div className="font-sans bg-white min-h-screen selection:bg-blue-600 selection:text-white">
            {/* HERO */}
            <section className="bg-slate-50 border-b border-slate-200/80 pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <Link 
                        to="/student-life" 
                        className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors mb-6 text-xs font-semibold"
                    >
                        <ArrowLeft size={13} />
                        <span>Return to Collections Directory</span>
                    </Link>

                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 block mb-2">
                                Campus Archive • {images.length} Photographs
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
                                {album.title}
                            </h1>
                            <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                                {album.description}
                            </p>
                        </div>
                        
                        <button 
                            onClick={handleShare}
                            className="btn-secondary text-xs cursor-pointer"
                        >
                            <Share2 size={13} />
                            <span>{copied ? "Link Copied" : "Share Collection"}</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* PHOTOGRAPH GRID */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
                {images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {images.map((image, index) => (
                            <div 
                                key={image._id || index} 
                                className="group relative aspect-4/3 bg-slate-100 overflow-hidden cursor-pointer rounded-xl border border-slate-200 card-minimal"
                                onClick={() => setSelectedImage(image.src)}
                            >
                                <img 
                                    src={image.src} 
                                    alt={image.alt || 'Photographic Record'} 
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102" 
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                    <span className="text-[10px] uppercase font-semibold text-blue-400 tracking-wider">
                                        Click to Expand
                                    </span>
                                    <p className="text-white text-xs truncate">
                                        {image.alt || `Photograph 0${index + 1}`}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl">
                        No photographic records added to this album yet.
                    </div>
                )}
            </section>

            {selectedImage && (
                <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
            )}
        </div>
    );
};

export default AlbumPage;
