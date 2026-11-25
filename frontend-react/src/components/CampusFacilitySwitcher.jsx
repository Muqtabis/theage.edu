import React, { useState } from 'react';
import { 
    Microscope, 
    BookOpen, 
    Activity, 
    MonitorPlay, 
    Check, 
    ArrowRight, 
    Sparkles, 
    Calendar,
    ShieldCheck,
    Bus
} from 'lucide-react';
import { Link } from 'react-router-dom';

const facilities = [
    {
        id: 'stem',
        title: 'Composite STEM & Robotics Laboratory',
        short: 'STEM & Robotics',
        icon: Microscope,
        highlight: 'Empirical Discovery',
        imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        caption: 'Over 30 individual experimentation stations for physics, chemistry, and biology.',
        desc: 'Equipped with digital sensor arrays, stereoscopic microscopes, and introductory robotics kits, students transition from textbook theory to hands-on empirical demonstration starting from Class 3.',
        specs: [
            'Dedicated Physics, Chemistry & Biology apparatus suites',
            'Robotics & Arduino micro-controller prototyping benches',
            'Full compliance with Karnataka State Board laboratory safety protocols',
            'Faculty-guided lab sessions integrated twice weekly'
        ]
    },
    {
        id: 'library',
        title: 'Central Knowledge & Digital Library',
        short: 'Library & Reading Room',
        icon: BookOpen,
        highlight: 'Curated Literature',
        imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        caption: 'Over 5,000 volumes across English literature, Kannada classics, science, and history.',
        desc: 'A silent sanctuary fostering deep reading habits, research literacy, and critical analysis. Supported by digital e-book stations and subscriptions to leading educational journals.',
        specs: [
            '5,000+ indexed titles spanning curriculum and classic humanities',
            'Dedicated Kannada Sahitya and vernacular literature archive',
            'Ergonomic quiet study pods for senior board scholars',
            'Automated cataloging and lending system'
        ]
    },
    {
        id: 'sports',
        title: 'Athletic Fields & Multi-Sport Complex',
        short: 'Sports & Athletics',
        icon: Activity,
        highlight: 'Physical Fortitude',
        imageUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        caption: 'Standard athletic track, football ground, volleyball courts, and indoor table tennis.',
        desc: 'Physical education is a compulsory pillar of student life at The Age School. Regular inter-house sports meets cultivate stamina, humility in victory, and resilience in defeat.',
        specs: [
            '200-meter sprint and middle-distance running track',
            'Full-sized football pitch & volleyball clay courts',
            'Daily morning yoga drills & aerobic conditioning',
            'Certified NIS-trained physical education instructors'
        ]
    },
    {
        id: 'ict',
        title: 'Computer Science & Digital Learning Lab',
        short: 'Computer Science Lab',
        icon: MonitorPlay,
        highlight: 'Digital Literacy',
        imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        caption: 'High-speed broadband network connecting 40+ desktop workstations.',
        desc: 'Scholars master foundational computing, algorithmic thinking, and modern programming languages (Python, HTML/CSS, Scratch) in a firewall-protected network environment.',
        specs: [
            '1:1 student-to-workstation ratio during computer periods',
            'Optical fiber internet connectivity with enterprise firewall filtering',
            'Curriculum covers basic coding, office productivity, and cyber safety',
            'Smart projection board for interactive coding walkthroughs'
        ]
    },
    {
        id: 'transit',
        title: 'Safe GPS-Tracked School Bus Transit',
        short: 'Bus Fleet & Transit',
        icon: Bus,
        highlight: 'Safe Daily Commute',
        imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        caption: 'Comprehensive daily pickup across Basavakalyan and neighboring residential taluks.',
        desc: 'Ensuring safe, punctual, and comfortable daily transit for scholars of all ages. Every bus is monitored in real-time with satellite GPS and accompanied by certified female attendants.',
        specs: [
            'Satellite GPS tracking with automated route alerts',
            'Mandatory speed governors capped at 40 km/h',
            'Trained female attendants onboard every primary bus',
            'Emergency first-aid medical supplies and verified drivers'
        ]
    }
];

const CampusFacilitySwitcher = ({ onOpenModal }) => {
    const [activeId, setActiveId] = useState('stem');
    const active = facilities.find(f => f.id === activeId) || facilities[0];

    return (
        <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                
                {/* Header */}
                <div className="max-w-2xl mb-10">
                    <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 block mb-2 flex items-center gap-1.5">
                        <Sparkles size={14} className="text-blue-600" />
                        Campus Habitat & Infrastructure
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
                        Engineered for Immersive Learning & Scholar Safety
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                        Explore our purpose-built campus infrastructure supporting rigorous academics, scientific inquiry, physical wellness, and safe daily transit.
                    </p>
                </div>

                {/* Segmented Facility Controller */}
                <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                    {facilities.map((fac) => {
                        const Icon = fac.icon;
                        const isCurrent = fac.id === activeId;
                        return (
                            <button
                                key={fac.id}
                                onClick={() => setActiveId(fac.id)}
                                className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all duration-200 cursor-pointer ${
                                    isCurrent
                                        ? 'bg-blue-600 text-white border border-blue-600 shadow-md shadow-blue-500/25 font-bold'
                                        : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-slate-50'
                                }`}
                            >
                                <Icon size={14} className={isCurrent ? 'text-white' : 'text-blue-600'} />
                                <span>{fac.short}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Showcase Card */}
                <div className="academic-card p-6 sm:p-8 md:p-10 bg-white shadow-md">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        
                        {/* Visual Image */}
                        <div className="lg:col-span-6 relative">
                            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-[4/3] bg-slate-100 group img-zoom-box">
                                <img 
                                    src={active.imageUrl} 
                                    alt={active.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block mb-1">
                                        {active.highlight}
                                    </span>
                                    <p className="text-xs sm:text-sm font-medium leading-snug">
                                        {active.caption}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content & Specs */}
                        <div className="lg:col-span-6 space-y-6">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 inline-block mb-3">
                                    Facility Standard
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-3">
                                    {active.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    {active.desc}
                                </p>
                            </div>

                            {/* Specifications */}
                            <div className="space-y-2.5 pt-4 border-t border-slate-100">
                                {active.specs.map((spec, si) => (
                                    <div key={si} className="flex items-start gap-2.5 text-xs text-slate-700">
                                        <span className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check size={11} strokeWidth={2.5} />
                                        </span>
                                        <span>{spec}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 flex flex-wrap gap-3">
                                {onOpenModal ? (
                                    <button 
                                        onClick={onOpenModal} 
                                        className="btn-primary text-xs"
                                    >
                                        <Calendar size={13} />
                                        <span>Schedule a Campus Visit</span>
                                    </button>
                                ) : (
                                    <Link to="/contact" className="btn-primary text-xs">
                                        <Calendar size={13} />
                                        <span>Schedule a Campus Visit</span>
                                    </Link>
                                )}

                                <Link 
                                    to="/student-life" 
                                    className="btn-secondary text-xs"
                                >
                                    <span>Browse Full Campus Gallery</span>
                                    <ArrowRight size={13} />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default CampusFacilitySwitcher;
