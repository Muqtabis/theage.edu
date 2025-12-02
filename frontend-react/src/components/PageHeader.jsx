import React from 'react';

const PageHeader = ({ title, description }) => (
    <section className="relative py-20 md:py-28 bg-indigo-50/50 border-b border-indigo-100 overflow-hidden">
        
        {/* ==========================================
            BACKGROUND (Minimal)
        ========================================== */}
        {/* Optional: Very subtle background pattern (dots) for texture without noise */}
        <div className="absolute inset-0 opacity-[0.4]" 
             style={{ backgroundImage: 'radial-gradient(#6366f1 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
        </div>

        {/* ==========================================
            CONTENT
        ========================================== */}
        <div className="container relative z-10 mx-auto px-6 text-center">
            
            {/* Minimal Accent Line */}
            <div className="w-16 h-1 bg-indigo-600 mx-auto mb-6 rounded-full opacity-80"></div>

            {/* Title - Serif Font to match Header/Footer */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 tracking-tight">
                {title}
            </h1>
            
            {/* Description - Sans Serif for readability */}
            {description && (
                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-sans leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    </section>
);

export default PageHeader;