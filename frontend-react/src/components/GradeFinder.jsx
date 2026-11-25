import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Clock, 
    Users, 
    BookOpen, 
    Check, 
    ArrowRight, 
    GraduationCap, 
    Sparkles,
    Award
} from 'lucide-react';

const gradeData = [
    {
        id: 'nursery',
        name: 'Nursery & Early Years',
        wing: 'Pre-Primary (ECCE)',
        age: '2.5 – 4 Years',
        timing: '08:45 AM – 12:30 PM',
        ratio: '1:12',
        subjects: ['Sensory Exploration', 'Phonics & Rhymes', 'Motor Coordination', 'Joyful Numbers', 'Story Circle'],
        milestones: ['Social communication & self-expression', 'Fine motor pen grip & coordination', 'Bilingual listening comprehension'],
        annualFee: '₹ 12,000',
        stage: 'Early Years'
    },
    {
        id: 'lkg-ukg',
        name: 'LKG & UKG (Kindergarten)',
        wing: 'Pre-Primary (ECCE)',
        age: '4 – 6 Years',
        timing: '08:45 AM – 12:30 PM',
        ratio: '1:15',
        subjects: ['Early Reading', 'Number Sense (1-100)', 'Environmental Awareness', 'Art & Craft', 'Classical Music'],
        milestones: ['Independent sentence reading', 'Foundational addition & subtraction concepts', 'Confident classroom participation'],
        annualFee: '₹ 14,000',
        stage: 'Kindergarten'
    },
    {
        id: 'primary-1-5',
        name: 'Classes I to V (Primary)',
        wing: 'Primary School Wing',
        age: '6 – 11 Years',
        timing: '08:30 AM – 03:45 PM',
        ratio: '1:20',
        subjects: ['English', 'Kannada', 'Hindi', 'Mathematics', 'General Science', 'Social Studies', 'Computer Basics'],
        milestones: ['Trilingual reading & writing fluency', 'Arithmetic operations & word problem solving', 'Hands-on basic science experimentation'],
        annualFee: '₹ 15,000',
        stage: 'Primary'
    },
    {
        id: 'middle-6-8',
        name: 'Classes VI to VIII (Middle)',
        wing: 'Middle School Wing',
        age: '11 – 14 Years',
        timing: '08:30 AM – 03:45 PM',
        ratio: '1:20',
        subjects: ['English Literature', 'Mathematics (Algebra & Geometry)', 'Physics', 'Chemistry', 'Biology', 'History & Civics', 'Robotics'],
        milestones: ['Specialized laboratory practicals', 'Scientific research methodology', 'Debate and competitive quiz readiness'],
        annualFee: '₹ 18,000',
        stage: 'Middle'
    },
    {
        id: 'secondary-9-10',
        name: 'Classes IX & X (SSLC Board)',
        wing: 'Secondary School Wing',
        age: '14 – 16 Years',
        timing: '08:30 AM – 03:45 PM',
        ratio: '1:20',
        subjects: ['Mathematics', 'Science (Phy/Chem/Bio)', 'Social Science', 'English', 'Kannada', 'Hindi'],
        milestones: ['100% Board preparation & past paper mastery', '3 full-scale pre-board mock examinations', 'Individual remedial doubt clinics'],
        annualFee: '₹ 25,000',
        stage: 'Secondary'
    },
    {
        id: 'puc-11-12',
        name: 'Classes XI & XII (Pre-University)',
        wing: 'Senior Secondary / PUC',
        age: '16 – 18 Years',
        timing: '08:30 AM – 04:00 PM',
        ratio: '1:25',
        subjects: ['Science (PCMB / PCMC)', 'Commerce (Acc/Bus/Eco/Math)', 'State Board + Entrance Prep'],
        milestones: ['State PUC Board examination distinction', 'Integrated CET / NEET / JEE guidance', 'Career & higher education mentorship'],
        annualFee: '₹ 28,000',
        stage: 'Senior'
    }
];

const GradeFinder = () => {
    const [selectedId, setSelectedId] = useState('primary-1-5');
    const selected = gradeData.find(g => g.id === selectedId) || gradeData[2];

    return (
        <section className="py-20 bg-[#faf8f5] border-b border-[#e8e4dc]">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#8c7355] block mb-2 flex items-center gap-1.5">
                            <Sparkles size={14} className="text-[#c5a880]" />
                            Interactive Academic Matrix
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#0b192c] tracking-tight">
                            Explore Curriculum by Academic Wing
                        </h2>
                        <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
                            Select a stage below to inspect eligible age criteria, daily timings, student-teacher ratio, and core learning outcomes.
                        </p>
                    </div>

                    <Link 
                        to="/academics" 
                        className="btn-secondary text-xs self-start md:self-auto"
                    >
                        <span>All 17 Classes Directory</span>
                        <ArrowRight size={13} />
                    </Link>
                </div>

                {/* Segmented Grade Selector Buttons */}
                <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                    {gradeData.map((g) => {
                        const active = g.id === selectedId;
                        return (
                            <button
                                key={g.id}
                                onClick={() => setSelectedId(g.id)}
                                className={`px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                                    active
                                        ? 'bg-[#0b192c] text-[#c5a880] border border-[#c5a880]/60 shadow-md font-bold'
                                        : 'bg-white text-slate-700 border border-[#e8e4dc] hover:border-[#c5a880] hover:text-[#0b192c]'
                                }`}
                            >
                                <span>{g.name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Interactive Dynamic Display Card */}
                <div className="academic-card p-6 sm:p-8 md:p-10 bg-white">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Left Details */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#0b192c] text-[#c5a880]">
                                    {selected.wing}
                                </span>
                                <span className="text-xs text-slate-500 font-medium">
                                    Stage: {selected.stage}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b192c] mb-2">
                                    {selected.name}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    Structured academic learning tailored specifically for developmental stage {selected.age}, providing optimal balance between discipline, critical inquiry, and co-curricular enrichment.
                                </p>
                            </div>

                            {/* Subjects Grid */}
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#0b192c] block mb-2.5 flex items-center gap-1.5">
                                    <BookOpen size={13} className="text-[#8c7355]" />
                                    Prescribed Core Modules:
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {selected.subjects.map((s, idx) => (
                                        <span 
                                            key={idx}
                                            className="text-xs font-medium px-3 py-1 bg-[#faf8f5] text-slate-800 rounded-md border border-[#e8e4dc] hover:border-[#c5a880] transition-colors"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Key Learning Milestones */}
                            <div className="pt-4 border-t border-[#e8e4dc]">
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#0b192c] block mb-2.5">
                                    Core Learning Milestones:
                                </span>
                                <ul className="space-y-2 text-xs text-slate-600">
                                    {selected.milestones.map((m, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <Check size={14} className="text-emerald-600 mt-0.5 shrink-0" strokeWidth={2.5} />
                                            <span>{m}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right Summary Box */}
                        <div className="lg:col-span-5 bg-[#faf8f5] border border-[#e8e4dc] rounded-xl p-6 space-y-5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0b192c] pb-3 border-b border-[#e8e4dc] flex items-center gap-2">
                                <Award size={14} className="text-[#c5a880]" />
                                Enrollment Specifications
                            </h4>

                            <div className="space-y-3.5 text-xs">
                                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                                    <span className="text-slate-500 font-medium">Eligible Age Bracket</span>
                                    <span className="font-semibold text-[#0b192c]">{selected.age}</span>
                                </div>
                                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                                    <span className="text-slate-500 font-medium">Daily School Timing</span>
                                    <span className="font-semibold text-[#0b192c] flex items-center gap-1">
                                        <Clock size={12} className="text-[#8c7355]" />
                                        {selected.timing}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                                    <span className="text-slate-500 font-medium">Student to Mentor Ratio</span>
                                    <span className="font-semibold text-[#0b192c] flex items-center gap-1">
                                        <Users size={12} className="text-[#8c7355]" />
                                        {selected.ratio}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-slate-500 font-medium">Annual Academic Tuition</span>
                                    <span className="font-bold text-[#0b192c] text-sm">{selected.annualFee}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[#e8e4dc] space-y-2.5">
                                <Link 
                                    to="/admissions" 
                                    className="btn-gold w-full text-xs text-center justify-center py-2.5"
                                >
                                    <span>Apply for {selected.name.split('(')[0].trim()}</span>
                                    <ArrowRight size={13} />
                                </Link>

                                <Link 
                                    to="/academics" 
                                    className="btn-secondary w-full text-xs text-center justify-center py-2.5"
                                >
                                    <span>View Complete Class Matrix</span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default GradeFinder;
