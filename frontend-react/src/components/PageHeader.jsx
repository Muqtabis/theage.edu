import React from 'react';

const PageHeader = ({ title, description }) => (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-blue-50/70 via-indigo-50/40 to-white text-slate-900 border-b border-slate-200/80 text-center relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-6 max-w-4xl">
            <span className="w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6 rounded-full block" />
            <h1 className="text-4xl md:text-5xl font-serif font-black text-slate-900 mb-4 tracking-tight">
                {title}
            </h1>
            {description && (
                <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
                    {description}
                </p>
            )}
        </div>
    </section>
);

export default PageHeader;
