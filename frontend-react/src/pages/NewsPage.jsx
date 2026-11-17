import React, { useState, useEffect } from 'react';
import { 
    Loader2, 
    Calendar, 
    ArrowRight, 
    MapPin, 
    Clock, 
    X 
} from 'lucide-react';

const NEWS_API_URL = '/api/news'; 
const EVENTS_API_URL = '/api/events';

const NewsPage = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [newsRes, eventsRes] = await Promise.all([
                    fetch(NEWS_API_URL),
                    fetch(EVENTS_API_URL)
                ]);

                if (newsRes.ok) {
                    const data = await newsRes.json();
                    const sorted = Array.isArray(data) ? 
                        data.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)) : [];
                    setNewsItems(sorted);
                }

                if (eventsRes.ok) {
                    const eventsData = await eventsRes.json();
                    if (Array.isArray(eventsData)) setEvents(eventsData);
                }
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("Failed to load notifications.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []); 

    return (
        <div className="font-sans text-slate-800 bg-[#fbfbfb] min-h-screen w-full selection:bg-[#c5a880]/30 selection:text-[#0b192c]">
            
            {/* HERO */}
            <section className="bg-[#0b192c] text-white py-24 md:py-32 border-b border-[#c5a880]/20 text-center relative overflow-hidden">
                {/* Ambient glowing mesh orbs */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none animate-float" />

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a880] inline-flex items-center gap-2 mb-3 bg-[#c5a880]/10 px-3.5 py-1 rounded-full border border-[#c5a880]/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-ping" />
                        Official Gazette
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
                        <span className="text-gradient-gold">Dispatches & Calendar</span>
                    </h1>
                    <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
                        Authorized communications, administrative circulars, and scheduled campus convocations.
                    </p>
                </div>
            </section>

            <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
                {/* UPCOMING CALENDAR STRIP */}
                {events.length > 0 && (
                    <div className="mb-16 bg-white p-8 border border-slate-200 rounded-sm shadow-xs">
                        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b192c]">
                                Scheduled Convocations & Events
                            </span>
                            <span className="text-xs text-slate-400 font-mono">{events.length} Entries</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {events.slice(0, 3).map((ev) => (
                                <div key={ev._id} className="p-5 border border-slate-200 bg-[#fdfbf7] flex items-start gap-4 hover-lift rounded-sm relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#c5a880] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="bg-[#0b192c] text-white p-3 text-center shrink-0 min-w-14 rounded-xs shadow-xs">
                                        <span className="block text-xl font-serif font-bold leading-none text-[#c5a880]">
                                            {new Date(ev.eventDate).getDate()}
                                        </span>
                                        <span className="text-[10px] uppercase font-bold text-slate-300 block mt-1">
                                            {new Date(ev.eventDate).toLocaleString('default', { month: 'short' })}
                                        </span>
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-serif font-bold text-slate-900 text-sm mb-1 truncate group-hover:text-blue-900 transition-colors">{ev.title}</h4>
                                        <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                                            <MapPin size={12} className="text-[#c5a880] shrink-0" />
                                            <span className="truncate">{ev.location || 'School Campus'}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* DISPATCHES / ARTICLES */}
                <div className="mb-10 pb-3 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5a880]">
                        Administrative Dispatches
                    </span>
                    <span className="text-xs text-slate-400">Chronological</span>
                </div>

                {isLoading ? (
                    <div className="text-center py-24 text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" />Retrieving bulletins...</div>
                ) : error ? (
                    <div className="p-6 border border-rose-200 bg-rose-50 text-rose-700 text-xs text-center">{error}</div>
                ) : newsItems.length === 0 ? (
                    <p className="text-xs text-slate-400 py-16 text-center border border-dashed border-slate-200">No active bulletins published.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {newsItems.map((item, index) => (
                            <article 
                                key={item._id || index} 
                                className="bg-white border border-slate-200 flex flex-col justify-between hover-lift overflow-hidden rounded-sm group"
                            >
                                <div>
                                    <div className="h-52 bg-slate-100 overflow-hidden border-b border-slate-200 relative">
                                        <img 
                                            src={item.imageUrl || "https://placehold.co/600x400"} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                                        />
                                    </div>

                                    <div className="p-6">
                                        <div className="text-[10px] font-mono text-[#c5a880] uppercase tracking-wider mb-2 font-bold">
                                            {item.date || 'Recent Notification'}
                                        </div>

                                        <h3 className="font-serif font-bold text-lg text-[#0b192c] mb-3 leading-snug group-hover:text-blue-900 transition-colors">
                                            {item.title}
                                        </h3>
                                        
                                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-6">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 pt-0">
                                    <button 
                                        onClick={() => setSelectedArticle(item)}
                                        className="text-xs font-bold uppercase tracking-wider text-[#0b192c] hover:text-[#c5a880] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all cursor-pointer"
                                    >
                                        <span>Read Complete Dispatch</span>
                                        <ArrowRight size={12} />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {/* MODAL */}
            {selectedArticle && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07111e]/80 backdrop-blur-xs"
                    onClick={() => setSelectedArticle(null)}
                >
                    <div 
                        className="bg-white max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 relative border border-slate-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setSelectedArticle(null)}
                            className="absolute top-6 right-6 p-2 text-slate-500 hover:text-slate-900"
                        >
                            <X size={20} />
                        </button>

                        {selectedArticle.imageUrl && (
                            <img src={selectedArticle.imageUrl} alt="" className="w-full h-64 object-cover mb-6 border" />
                        )}

                        <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2">
                            {selectedArticle.date || 'Official Dispatch'}
                        </span>

                        <h2 className="text-2xl font-serif font-bold text-[#0b192c] mb-4">
                            {selectedArticle.title}
                        </h2>

                        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {selectedArticle.content}
                        </div>

                        <div className="mt-8 pt-4 border-t flex justify-end">
                            <button 
                                onClick={() => setSelectedArticle(null)}
                                className="px-5 py-2 bg-[#0b192c] text-white text-xs font-bold uppercase tracking-wider"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default NewsPage;
