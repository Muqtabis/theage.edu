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
        <div className="font-sans text-slate-800 bg-white min-h-screen w-full selection:bg-blue-600 selection:text-white">
            
            {/* HERO */}
            <section className="bg-slate-50 border-b border-slate-200/80 py-16 sm:py-24 text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 inline-flex items-center gap-2 mb-4 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
                        <Calendar size={14} className="text-blue-600" />
                        <span>Official Gazette & Circulars</span>
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-5 tracking-tight">
                        Dispatches & Calendar
                    </h1>
                    <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                        Authorized communications, administrative circulars, and scheduled campus convocations.
                    </p>
                </div>
            </section>

            <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8">
                {/* UPCOMING CALENDAR STRIP */}
                {events.length > 0 && (
                    <div className="mb-16 card-minimal p-6 sm:p-8">
                        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                                Scheduled Convocations & Events
                            </span>
                            <span className="text-xs text-slate-400 font-mono">{events.length} Entries</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {events.slice(0, 3).map((ev) => (
                                <div key={ev._id} className="p-4 border border-slate-200 bg-slate-50/50 rounded-xl flex items-start gap-3.5 group">
                                    <div className="bg-blue-600 text-white p-2.5 text-center shrink-0 min-w-12 rounded-lg">
                                        <span className="block text-lg font-bold leading-none">
                                            {new Date(ev.eventDate).getDate()}
                                        </span>
                                        <span className="text-[10px] uppercase font-semibold text-blue-100 block mt-0.5">
                                            {new Date(ev.eventDate).toLocaleString('default', { month: 'short' })}
                                        </span>
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-slate-900 text-sm mb-1 truncate group-hover:text-blue-600 transition-colors">{ev.title}</h4>
                                        <p className="text-[11px] text-slate-500 flex items-center gap-1">
                                            <MapPin size={11} className="text-blue-600 shrink-0" />
                                            <span className="truncate">{ev.location || 'School Campus'}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* DISPATCHES / ARTICLES */}
                <div className="mb-8 pb-3 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                        Administrative Dispatches
                    </span>
                    <span className="text-xs text-slate-400">Chronological</span>
                </div>

                {isLoading ? (
                    <div className="text-center py-24 text-slate-400">
                        <Loader2 className="animate-spin mx-auto mb-2 text-blue-600" />
                        Retrieving bulletins...
                    </div>
                ) : error ? (
                    <div className="p-6 border border-rose-200 bg-rose-50 text-rose-700 text-xs text-center rounded-lg">{error}</div>
                ) : newsItems.length === 0 ? (
                    <p className="text-xs text-slate-400 py-16 text-center border border-dashed border-slate-200 rounded-xl">No active bulletins published.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {newsItems.map((item, index) => (
                            <article 
                                key={item._id || index} 
                                className="card-minimal flex flex-col justify-between overflow-hidden group"
                            >
                                <div>
                                    <div className="h-48 bg-slate-100 overflow-hidden border-b border-slate-100 relative">
                                        <img 
                                            src={item.imageUrl || "https://placehold.co/600x400"} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                                        />
                                    </div>

                                    <div className="p-6">
                                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 font-medium">
                                            {item.date || 'Recent Notification'}
                                        </div>

                                        <h3 className="font-bold text-base text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        
                                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 pt-0">
                                    <button 
                                        onClick={() => setSelectedArticle(item)}
                                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors cursor-pointer"
                                    >
                                        <span>Read Dispatch</span>
                                        <ArrowRight size={13} />
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
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs"
                    onClick={() => setSelectedArticle(null)}
                >
                    <div 
                        className="bg-white max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative rounded-xl border border-slate-200 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setSelectedArticle(null)}
                            className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-900 rounded-md transition-colors"
                        >
                            <X size={18} />
                        </button>

                        {selectedArticle.imageUrl && (
                            <img src={selectedArticle.imageUrl} alt="" className="w-full h-64 object-cover mb-6 rounded-lg border border-slate-200" />
                        )}

                        <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2">
                            {selectedArticle.date || 'Official Dispatch'}
                        </span>

                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            {selectedArticle.title}
                        </h2>

                        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {selectedArticle.content}
                        </div>

                        <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                            <button 
                                onClick={() => setSelectedArticle(null)}
                                className="btn-secondary text-xs"
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
