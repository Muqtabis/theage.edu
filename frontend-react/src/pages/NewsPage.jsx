import React, { useState, useEffect } from 'react';
import { Loader2, Calendar, ArrowRight, Newspaper, Tag } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const NEWS_API_URL = '/api/news'; 

const NewsPage = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(NEWS_API_URL);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                const sortedData = Array.isArray(data) ? 
                    data.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)) : [];
                setNewsItems(sortedData);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("Failed to load news articles.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();
    }, []); 

    return (
        <div className="font-sans text-slate-800 bg-slate-50 min-h-screen w-full">
            
            {/* Header */}
            <PageHeader 
                title="News & Events" 
                description="Latest updates and stories from our campus."
            />

            <section className="w-full py-16 px-6">
                <div className="max-w-6xl mx-auto">
                
                    {/* Loading & Error States */}
                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="animate-spin text-indigo-400" size={40} />
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 text-rose-500 bg-rose-50 rounded-lg max-w-lg mx-auto border border-rose-100">
                            {error}
                        </div>
                    ) : newsItems.length === 0 ? (
                        <div className="text-center py-20 text-slate-400">
                            <Newspaper size={48} className="mx-auto mb-4 opacity-50" />
                            <p>No news available yet.</p>
                        </div>
                    ) : (
                        // NEWS GRID
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {newsItems.map((item, index) => (
                                <article 
                                    key={item._id || index} 
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col h-full group"
                                >
                                    {/* Card Image */}
                                    <div className="relative h-52 overflow-hidden bg-slate-100">
                                        <img 
                                            src={item.imageUrl || "https://placehold.co/600x400/f1f5f9/64748b?text=News"} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                            loading="lazy"
                                        />
                                        {/* Pastel Category Tag */}
                                        <div className="absolute top-4 left-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold tracking-wide shadow-sm">
                                                <Tag size={10} className="mr-1.5" /> UPDATE
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        {/* Date */}
                                        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-3">
                                            <Calendar size={14} />
                                            {item.date ? item.date : (item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent')}
                                        </div>

                                        {/* Title - Serif Font */}
                                        <h3 className="text-xl font-serif font-bold text-slate-800 mb-3 leading-snug group-hover:text-indigo-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        
                                        {/* Excerpt */}
                                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                                            {item.content || item.description || 'Click to read more details about this update.'}
                                        </p>
                                        
                                        {/* Footer / Button */}
                                        <div className="pt-4 border-t border-slate-50 mt-auto">
                                            <a href="#" className="w-full inline-flex justify-between items-center text-sm font-semibold text-slate-600 group-hover:text-indigo-600 transition-colors">
                                                Read Article
                                                <span className="bg-slate-50 group-hover:bg-indigo-50 p-1.5 rounded-full transition-colors">
                                                    <ArrowRight size={16} />
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default NewsPage;