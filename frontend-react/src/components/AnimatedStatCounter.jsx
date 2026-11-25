import React, { useState, useEffect } from 'react';
import { Award, Users, GraduationCap, Shield, ChevronRight } from 'lucide-react';

const statsData = [
    {
        id: 'students',
        icon: GraduationCap,
        number: 500,
        suffix: '+',
        label: 'Enrolled Scholars',
        subtext: 'Nursery to Grade XII',
        detail: 'Dynamic co-educational community across 17 distinct classes and 4 houses.'
    },
    {
        id: 'passRate',
        icon: Award,
        number: 100,
        suffix: '%',
        label: 'Board Pass Record',
        subtext: 'KSEAB SSLC & PUC Board',
        detail: 'Unbroken track record of state board distinction with zero year failures.'
    },
    {
        id: 'faculty',
        icon: Users,
        number: 35,
        suffix: '+',
        label: 'Dedicated Faculty',
        subtext: 'Post-Graduate Educators',
        detail: '1:20 teacher ratio with certified specialists in STEM, languages, and humanities.'
    },
    {
        id: 'years',
        icon: Shield,
        number: 12,
        suffix: '+',
        label: 'Years of Excellence',
        subtext: 'Chartered 2012 in Basavakalyan',
        detail: 'Rooted in Karnataka heritage, delivering national standard scholastic benchmarks.'
    }
];

const AnimatedStatCounter = () => {
    const [counts, setCounts] = useState({ students: 0, passRate: 0, faculty: 0, years: 0 });
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        const duration = 1200; // ms
        const steps = 30;
        const intervalTime = duration / steps;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const easeOutProgress = 1 - Math.pow(1 - progress, 3); // cubic ease out

            setCounts({
                students: Math.round(500 * easeOutProgress),
                passRate: Math.round(100 * easeOutProgress),
                faculty: Math.round(35 * easeOutProgress),
                years: Math.round(12 * easeOutProgress)
            });

            if (step >= steps) {
                clearInterval(timer);
                setCounts({ students: 500, passRate: 100, faculty: 35, years: 12 });
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="bg-white py-16 px-4 sm:px-8 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {statsData.map((stat) => {
                        const Icon = stat.icon;
                        const isHovered = hoveredCard === stat.id;
                        const value = counts[stat.id] ?? stat.number;

                        return (
                            <div
                                key={stat.id}
                                onMouseEnter={() => setHoveredCard(stat.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                className={`card-interactive p-6 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                                    isHovered ? 'ring-1 ring-blue-500/40 bg-slate-50/50' : 'bg-white'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                                        isHovered ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
                                    }`}>
                                        <Icon size={20} />
                                    </div>
                                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                                        Metric
                                    </span>
                                </div>

                                <div className="flex items-baseline gap-0.5 mb-1">
                                    <span className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                                        {value}
                                    </span>
                                    <span className="text-2xl font-bold text-blue-600">
                                        {stat.suffix}
                                    </span>
                                </div>

                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                                    {stat.label}
                                </span>
                                
                                <p className="text-[11px] text-slate-400 leading-snug transition-colors">
                                    {isHovered ? stat.detail : stat.subtext}
                                </p>

                                <div className={`mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium transition-opacity duration-200 ${
                                    isHovered ? 'opacity-100 text-blue-600' : 'opacity-0 text-slate-400'
                                }`}>
                                    <span>Learn more</span>
                                    <ChevronRight size={13} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AnimatedStatCounter;
