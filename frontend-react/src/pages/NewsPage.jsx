import React, { useState, useEffect } from 'react';
import { Loader2, Calendar, ArrowRight, Newspaper, Clock, Bell } from 'lucide-react';

const NEWS_API_URL = '/api/news'; 

const NewsPage = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Logic remains exactly the same
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(NEWS_API_URL);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                
                setNewsItems(data);
            } catch (err) {
                console.error("Error fetching news from API:", err);
                setError("Failed to load news articles. Check backend server.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, []); 

    return (
        <div className="font-sans text-slate-800 bg-gray-50 min-h-screen">
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
                .delay-200 { animation-delay: 0.2s; }
            `}</style>

            {/* ==========================================
                1. HERO SECTION
            ========================================== */}
            <section className="relative py-24 md:py-32 bg-indigo-950 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full z-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-600 rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                </div>

                <div className="container relative z-10 mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
                        <Bell size={14} className="text-teal-300 fill-teal-300" />
                        <span className="text-white text-sm font-bold tracking-wide uppercase">Campus Updates</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight animate-fade-in-up">
                        News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">Events</span>
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-100">
                        Stay connected with the latest announcements, achievements, and stories from The Age School community.
                    </p>
                </div>
            </section>

            {/* ==========================================
                2. NEWS GRID SECTION
            ========================================== */}
            <section className="container mx-auto px-6 py-20 -mt-10 relative z-20">
                
                {/* Loading State */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl shadow-xl border border-gray-100">
                        <Loader2 className="animate-spin text-purple-600 mb-4" size={48} />
                        <p className="text-gray-500 font-medium">Loading latest headlines...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-16 bg-red-50 rounded-3xl border border-red-100">
                         <p className="text-red-600 font-bold text-lg">{error}</p>
                    </div>
                ) : newsItems.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl shadow-lg border-dashed border-2 border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Newspaper className="text-gray-400" size={32} />
                        </div>
                        <p className="text-gray-500 text-lg">No news articles found at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newsItems.map((item, index) => (
                            <article 
                                key={item._id || index} 
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full border border-gray-100 group"
                            >
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden">
                                    <img 
                                        src={item.imageUrl || "https://placehold.co/600x400/e0f1fe/08539c?text=Campus+News"} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                                    
                                    {/* Date Badge */}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm flex items-center gap-2 text-xs font-bold text-indigo-900">
                                        <Calendar size={12} className="text-teal-500" />
                                        {item.date ? item.date : 'Recent'}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                        <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">School News</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-purple-700 transition-colors">
                                        {item.title}
                                    </h3>
                                    
                                    <p className="text-slate-500 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                                        {item.content}
                                    </p>
                                    
                                    <div className="pt-4 border-t border-gray-100 mt-auto">
                                        <a href="#" className="inline-flex items-center text-sm font-bold text-teal-600 hover:text-teal-800 transition-colors group/link">
                                            Read Full Story 
                                            <ArrowRight size={16} className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default NewsPage;