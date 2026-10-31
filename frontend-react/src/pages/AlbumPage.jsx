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
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#07111e] text-white">
                <Loader2 className="animate-spin text-[#c5a880] mb-4" size={36} />
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Loading Photographic Records...</p>
            </div>
        );
    }

    if (error || !album) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fbfbfb] px-6">
                <div className="bg-white p-10 border border-slate-200 text-center max-w-md">
                    <h2 className="text-xl font-serif font-bold text-[#0b192c] mb-2">Collection Not Located</h2>
                    <p className="text-slate-500 text-xs mb-6">{error || "We could not find the requested catalogued photos."}</p>
                    <Link to="/student-life" className="inline-flex items-center px-5 py-2.5 bg-[#0b192c] text-white text-xs font-bold uppercase tracking-wider">
                        <ArrowLeft size={14} className="mr-2" />
                        Return to Archives
                    </Link>
                </div>
            </div>
        );
    }

    const images = album.images || [];

    return (
        <div className="font-sans bg-[#fbfbfb] min-h-screen selection:bg-[#c5a880]/30 selection:text-[#0b192c]">
            {/* HERO */}
            <section className="bg-[#0b192c] text-white pt-28 pb-20 border-b border-[#c5a880]/20">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <Link 
                        to="/student-life" 
                        className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-6 text-xs font-semibold"
                    >
                        <ArrowLeft size={14} className="mr-2" />
                        <span>Return to Collections Directory</span>
                    </Link>

                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                        <div className="max-w-3xl">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a880] block mb-2">
                                Campus Archive • {images.length} Photographs
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">
                                {album.title}
                            </h1>
                            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                                {album.description}
                            </p>
                        </div>
                        
                        <button 
                            onClick={handleShare}
                            className="px-4 py-2 border border-slate-700 hover:border-slate-500 text-xs font-semibold text-white transition-colors cursor-pointer"
                        >
                            <span>{copied ? "Link Copied" : "Share Collection Link"}</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* PHOTOGRAPH GRID */}
            <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
                {images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {images.map((image, index) => (
                            <div 
                                key={image._id || index} 
                                className="group relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer border border-slate-200"
                                onClick={() => setSelectedImage(image.src)}
                            >
                                <img 
                                    src={image.src} 
                                    alt={image.alt || 'Photographic Record'} 
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102" 
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-[#07111e]/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                    <span className="text-[10px] uppercase font-bold text-[#c5a880] tracking-wider">
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
                    <div className="py-20 text-center text-slate-400 text-xs border border-dashed border-slate-200">
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
