import React from 'react';

const PageHeader = ({ title, description }) => (
    <section className="relative py-24 md:py-32 bg-indigo-950 overflow-hidden">
        {/* ==========================================
            BACKGROUND EFFECTS (Updated to Violet/Purple)
        ========================================== */}
        <div className="absolute inset-0 z-0">
            {/* Violet Glow (Top Left) - Replaces Teal */}
            <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-violet-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
            
            {/* Purple Glow (Bottom Right) */}
            <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
            
            {/* Texture Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </div>

        {/* ==========================================
            CONTENT
        ========================================== */}
        <div className="container relative z-10 mx-auto px-6 text-center">
            {/* Decorative Accent Line - Updated Gradient */}
            <div className="w-20 h-1.5 bg-gradient-to-r from-violet-400 to-purple-500 mx-auto mb-8 rounded-full animate-fade-in-up"></div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-sm animate-fade-in-up delay-100">
                {title}
            </h1>
            
            {description && (
                <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
                    {description}
                </p>
            )}
        </div>
    </section>
);

export default PageHeader;