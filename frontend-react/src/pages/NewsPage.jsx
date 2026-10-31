import React, { useState, useEffect } from 'react';
import { 
    Loader2, 
    Calendar, 
    ArrowRight, 
    Newspaper, 
    Tag, 
    MapPin, 
    Clock, 
    X,
    Sparkles 
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
                console.error("Error fetching news & events:", err);
                setError("Failed to load news articles.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []); 

    return (
        <div className="font-sans text-slate-800 bg-slate-50 min-h-screen w-full selection:bg-indigo-100 selection:text-indigo-900">
            
            {/* Header */}
            <section className="relative py-24 md:py-32 bg-slate-950 text-white text-center overflow-hidden">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="container relative z-10 mx-auto px-6 max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
                        <Sparkles size={13} className="text-amber-400" />
                        <span>Official Bulletin</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 tracking-tight">
                        News & Campus Events
                    </h1>
                    <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
                        Stay connected with recent announcements, student achievements, and upcoming campus dates.
                    </p>
                </div>
            </section>

            <section className="w-full py-16 px-6 max-w-7xl mx-auto">
                {/* Events Strip if events exist */}
                {events.length > 0 && (
                    <div className="mb-16 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                                <Calendar size={20} className="text-indigo-600" />
                                <span>Upcoming Campus Dates</span>
                            </h3>
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{events.length} Events Scheduled</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.slice(0, 3).map((ev) => (
                                <div key={ev._id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                                    <div className="p-3 bg-indigo-600 text-white rounded-xl text-center shrink-0 min-w-14">
                                        <span className="block text-xl font-serif font-bold leading-none">
                                            {new Date(ev.eventDate).getDate()}
                                        </span>
                                        <span className="text-[10px] uppercase font-bold text-amber-300 block mt-1">
                                            {new Date(ev.eventDate).toLocaleString('default', { month: 'short' })}
                                        </span>
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-slate-900 text-base mb-1 truncate">{ev.title}</h4>
                                        <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-1">
                                            <MapPin size={13} className="text-slate-400 shrink-0" />
                                            <span className="truncate">{ev.location || 'School Campus'}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* News Section */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">Articles & Announcements</h2>
                        <p className="text-slate-500 text-xs mt-1">Updated regularly by administration</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
                        <Loader2 className="animate-spin text-indigo-600 mb-3" size={36} />
                        <p className="text-slate-500 text-sm">Fetching campus updates...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-12 text-rose-600 bg-rose-50 rounded-2xl max-w-lg mx-auto border border-rose-200">
                        {error}
                    </div>
                ) : newsItems.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400">
                        <Newspaper size={44} className="mx-auto mb-3 opacity-50" />
                        <h4 className="font-bold text-slate-700">No News Articles Yet</h4>
                        <p className="text-xs text-slate-400 mt-1">Check back shortly for new bulletins.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newsItems.map((item, index) => (
                            <article 
                                key={item._id || index} 
                                className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col h-full group"
                            >
                                <div className="relative h-56 overflow-hidden bg-slate-100">
                                    <img 
                                        src={item.imageUrl || "https://placehold.co/600x400/f1f5f9/64748b?text=News"} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                        loading="lazy"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-indigo-700 text-[11px] font-bold tracking-wide shadow-xs">
                                            <Tag size={10} className="mr-1.5" /> BULLETIN
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-3">
                                            <Clock size={13} />
                                            <span>{item.date ? item.date : (item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent')}</span>
                                        </div>

                                        <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        
                                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6">
                                            {item.content || item.description || 'Click below to read the complete article.'}
                                        </p>
                                    </div>
                                    
                                    <div className="pt-4 border-t border-slate-100 mt-auto">
                                        <button 
                                            onClick={() => setSelectedArticle(item)}
                                            className="w-full inline-flex justify-between items-center text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                                        >
                                            <span>Read Full Article</span>
                                            <span className="bg-indigo-50 p-2 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                <ArrowRight size={14} />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {/* Read Article Modal */}
            {selectedArticle && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setSelectedArticle(null)}
                >
                    <div 
                        className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setSelectedArticle(null)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {selectedArticle.imageUrl && (
                            <div className="h-64 rounded-2xl overflow-hidden mb-6 -mx-2">
                                <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                            <Calendar size={14} />
                            <span>{selectedArticle.date || 'Campus News'}</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-4">
                            {selectedArticle.title}
                        </h2>

                        <div className="prose text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">
                            {selectedArticle.content}
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                            <button 
                                onClick={() => setSelectedArticle(null)}
                                className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-full hover:bg-indigo-600 transition-colors"
                            >
                                Close Article
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default NewsPage;
