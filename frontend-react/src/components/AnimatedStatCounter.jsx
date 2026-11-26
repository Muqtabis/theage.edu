import React, { useState, useEffect } from 'react';
import { Award, Users, GraduationCap, Shield, ChevronRight, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

const statsData = [
    {
        id: 'students',
        icon: GraduationCap,
        number: 500,
        suffix: '+',
        label: 'Enrolled Scholars',
        badge: '17 Classes',
        subtext: 'Nursery to Grade XII',
        detail: 'Dynamic co-ed community across 4 institutional houses.',
        barFill: '96%',
        cardBg: 'bg-gradient-to-br from-blue-50/90 via-white to-blue-50/40',
        borderColor: 'border-blue-200/90 hover:border-blue-400',
        iconBg: 'bg-blue-600 text-white',
        badgeColor: 'bg-blue-100 text-blue-800',
        textColor: 'text-blue-600',
        progressColor: 'bg-blue-600',
        extraPill: '1:20 Ratio'
    },
    {
        id: 'passRate',
        icon: Award,
        number: 100,
        suffix: '%',
        label: 'Board Pass Record',
        badge: 'Distinction',
        subtext: 'KSEAB SSLC & PUC Board',
        detail: 'Unbroken record of state board distinctions with zero failures.',
        barFill: '100%',
        cardBg: 'bg-gradient-to-br from-emerald-50/90 via-white to-emerald-50/40',
        borderColor: 'border-emerald-200/90 hover:border-emerald-400',
        iconBg: 'bg-emerald-600 text-white',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        textColor: 'text-emerald-600',
        progressColor: 'bg-emerald-600',
        extraPill: 'State Ranks'
    },
    {
        id: 'faculty',
        icon: Users,
        number: 35,
        suffix: '+',
        label: 'Dedicated Faculty',
        badge: 'Post-Grad',
        subtext: 'Post-Graduate Educators',
        detail: '1:20 teacher ratio with certified STEM & language mentors.',
        barFill: '92%',
        cardBg: 'bg-gradient-to-br from-indigo-50/90 via-white to-indigo-50/40',
        borderColor: 'border-indigo-200/90 hover:border-indigo-400',
        iconBg: 'bg-indigo-600 text-white',
        badgeColor: 'bg-indigo-100 text-indigo-800',
        textColor: 'text-indigo-600',
        progressColor: 'bg-indigo-600',
        extraPill: '100% Trained'
    },
    {
        id: 'years',
        icon: Shield,
        number: 12,
        suffix: '+',
        label: 'Years of Heritage',
        badge: 'Estd. 2012',
        subtext: 'Chartered in Basavakalyan',
        detail: 'Rooted in Karnataka heritage delivering national standards.',
        barFill: '100%',
        cardBg: 'bg-gradient-to-br from-amber-50/90 via-white to-amber-50/40',
        borderColor: 'border-amber-200/90 hover:border-amber-400',
        iconBg: 'bg-amber-500 text-white',
        badgeColor: 'bg-amber-100 text-amber-800',
        textColor: 'text-amber-600',
        progressColor: 'bg-amber-500',
        extraPill: '10+ Batches'
    }
];

const AnimatedStatCounter = () => {
    const [counts, setCounts] = useState({ students: 0, passRate: 0, faculty: 0, years: 0 });

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
        <section className="bg-slate-50/70 py-6 sm:py-10 px-3 sm:px-6 lg:px-8 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto">
                {/* Section title strip to anchor the metrics */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                            Key Institutional Metrics & Track Record
                        </span>
                    </div>
                    <span className="text-[11px] font-semibold text-blue-600 hidden sm:inline-flex items-center gap-1">
                        <Sparkles size={13} />
                        <span>KSEAB & DSEL Certified</span>
                    </span>
                </div>

                {/* 2-column on mobile, 4-column on desktop - NO WASTED SPACE */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                    {statsData.map((stat) => {
                        const Icon = stat.icon;
                        const value = counts[stat.id] ?? stat.number;

                        return (
                            <div
                                key={stat.id}
                                className={`rounded-2xl p-3 sm:p-5 border ${stat.borderColor} ${stat.cardBg} shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
                            >
                                {/* Top Header: Icon + Badge */}
                                <div className="flex items-center justify-between mb-2 sm:mb-3">
                                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${stat.iconBg} flex items-center justify-center shrink-0 shadow-xs`}>
                                        <Icon size={18} />
                                    </div>
                                    <span className={`text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full ${stat.badgeColor}`}>
                                        {stat.badge}
                                    </span>
                                </div>

                                {/* Metric Number */}
                                <div>
                                    <div className="flex items-baseline gap-0.5 leading-none mb-1">
                                        <span className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                                            {value}
                                        </span>
                                        <span className={`text-lg sm:text-2xl font-black ${stat.textColor}`}>
                                            {stat.suffix}
                                        </span>
                                    </div>

                                    <h4 className="text-[11px] sm:text-sm font-bold text-slate-900 leading-tight mb-0.5 line-clamp-1">
                                        {stat.label}
                                    </h4>
                                    
                                    <p className="text-[10px] sm:text-xs font-medium text-slate-500 leading-tight mb-2 sm:mb-3 line-clamp-1">
                                        {stat.subtext}
                                    </p>
                                </div>

                                {/* Bottom Metric Bar & Tag - Fills empty space with meaningful visual data */}
                                <div className="pt-2 border-t border-slate-200/60">
                                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-500 font-semibold mb-1">
                                        <span>Capacity / Standard</span>
                                        <span className={stat.textColor}>{stat.extraPill}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full ${stat.progressColor} rounded-full transition-all duration-1000`} 
                                            style={{ width: stat.barFill }}
                                        />
                                    </div>
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
