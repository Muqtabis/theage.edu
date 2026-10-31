import React from 'react';

const PageHeader = ({ title, description }) => (
    <section className="relative py-24 md:py-32 bg-[#0b192c] text-white border-b border-[#c5a880]/20 text-center">
        <div className="container relative z-10 mx-auto px-6 max-w-4xl">
            <span className="w-12 h-0.5 bg-[#c5a880] mx-auto mb-6 block" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight">
                {title}
            </h1>
            {description && (
                <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
                    {description}
                </p>
            )}
        </div>
    </section>
);

export default PageHeader;
