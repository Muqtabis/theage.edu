import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Microscope, 
    MonitorCheck, 
    BookOpen, 
    Trophy, 
    Bus, 
    Check, 
    ArrowRight,
    MapPin,
    Calendar
} from 'lucide-react';

const facilities = [
    {
        id: 'stem',
        title: 'STEM & Robotics Laboratories',
        short: 'STEM Labs',
        icon: Microscope,
        imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        caption: 'Specialized Composite Physics, Chemistry, Biology & Robotics Center',
        desc: 'Equipped with digital micro-sensors, robotic build kits, compound optical microscopes, and safe chemical fume extraction workstations complying with state laboratory safety norms.',
        specs: [
            'Individual experiment workstations for 40 scholars',
            'Full Arduino & robotics prototyping apparatus',
            'Safe chemical storage & fire-suppression systems',
            'Full-time certified laboratory technicians on duty'
        ],
        highlight: '100% Practical Exam Preparedness'
    },
    {
        id: 'smart-class',
        title: 'Smart Interactive Classrooms',
        short: 'Smart Classes',
        icon: MonitorCheck,
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        caption: 'Next-Generation Audio-Visual Interactive Learning Theatres',
        desc: 'Interactive 75-inch 4K touch-sensitive boards with curated multi-sensory educational modules, synchronized digital textbooks, and high-fidelity acoustics for clear enunciation.',
        specs: [
            '75-inch 4K interactive multi-touch displays',
            'Air-cooled, ergonomically designed student seating',
            'High-speed optical fiber connectivity for live demos',
            'Recorded class lectures for student review'
        ],
        highlight: 'Interactive Visual Pedagogy'
    },
    {
        id: 'library',
        title: 'Central Knowledge Library',
        short: 'Central Library',
        icon: BookOpen,
        imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        caption: 'Over 5,000 Volumes, Reference Encyclopedias & Silent Research Bays',
        desc: 'An inspiring sanctuary of quiet scholarship housing Kannada classical literature, English literary canons, science journals, daily national newspapers, and computer research stations.',
        specs: [
            'Curated repository of 5,000+ fiction and non-fiction books',
            'Dedicated early-childhood picture book corner',
            'Daily subscriptions to 6 regional & national dailies',
            'Digital search catalog and librarian mentorship'
        ],
        highlight: 'Trilingual Reading Culture'
    },
    {
        id: 'sports',
        title: 'Athletic Courts & Physical Fitness',
        short: 'Athletics & Sports',
        icon: Trophy,
        imageUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        caption: 'Expansive Multi-Sport Playing Fields & Yoga Pavilion',
        desc: 'Outdoor turf grounds engineered for cricket, football, volleyball, badminton, kho-kho, morning yoga drills, and annual athletic track meets under trained physical educators.',
        specs: [
            'Dedicated pitch for cricket and multi-purpose track',
            'Morning yoga and physical conditioning routines',
            'Full inter-house tournament schedule across four quarters',
            'First-aid station with pediatric emergency support'
        ],
        highlight: 'Discipline & Sportsmanship'
    },
    {
        id: 'fleet',
        title: 'GPS-Tracked Safe Transport Fleet',
        short: 'Safe Fleet',
        icon: Bus,
        imageUrl: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        caption: 'Door-to-Gate Bus Routes Across Basavakalyan & Neighboring Taluks',
        desc: 'Institutional bus network fitted with satellite GPS tracking, speed regulators, CCTV surveillance cameras, emergency safety kits, and trained female attendants.',
        specs: [
            'Live satellite GPS tracking for route verification',
            'Strict adherence to speed governor regulations (40 km/h)',
            'Female attendant on board for primary student assistance',
            'Well-planned stops to minimize student commute duration'
        ],
        highlight: 'Highest Safety Compliance'
    }
];

const CampusFacilitySwitcher = () => {
    const [activeId, setActiveId] = useState('stem');
    const active = facilities.find(f => f.id === activeId) || facilities[0];

    return (
        <section className="py-20 bg-white border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                
                {/* Header */}
                <div className="max-w-2xl mb-10">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-2">
                        Campus Habitat
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                        Engineered for Safe & Immersive Learning
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                        Explore our purpose-built campus infrastructure supporting rigorous academics, scientific inquiry, physical wellness, and safe daily transit.
                    </p>
                </div>

                {/* Segmented Facility Controller */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                    {facilities.map((fac) => {
                        const Icon = fac.icon;
                        const isCurrent = fac.id === activeId;
                        return (
                            <button
                                key={fac.id}
                                onClick={() => setActiveId(fac.id)}
                                className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all duration-200 cursor-pointer ${
                                    isCurrent
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                }`}
                            >
                                <Icon size={14} className={isCurrent ? 'text-white' : 'text-blue-600'} />
                                <span>{fac.short}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Showcase Card */}
                <div className="card-minimal p-6 sm:p-8 md:p-10 bg-slate-50/50">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        
                        {/* Visual Image */}
                        <div className="lg:col-span-6 relative">
                            <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-md aspect-4/3 bg-slate-200 group">
                                <img 
                                    src={active.imageUrl} 
                                    alt={active.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <span className="text-[10px] uppercase font-semibold text-blue-300 block mb-1">
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
                                <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 inline-block mb-3">
                                    Campus Specification
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                                    {active.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    {active.desc}
                                </p>
                            </div>

                            {/* Specifications */}
                            <div className="space-y-2.5 pt-4 border-t border-slate-200">
                                {active.specs.map((spec, si) => (
                                    <div key={si} className="flex items-start gap-2.5 text-xs text-slate-700">
                                        <span className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check size={11} strokeWidth={2.5} />
                                        </span>
                                        <span>{spec}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 flex flex-wrap gap-3">
                                <Link 
                                    to="/contact" 
                                    className="btn-primary text-xs"
                                >
                                    <Calendar size={13} />
                                    <span>Schedule a Campus Visit</span>
                                </Link>

                                <Link 
                                    to="/student-life" 
                                    className="btn-secondary text-xs"
                                >
                                    <span>Browse Student Life</span>
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
