import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    BookOpen, 
    Clock, 
    Users, 
    Award, 
    ArrowRight, 
    Sparkles, 
    Check, 
    DollarSign,
    GraduationCap
} from 'lucide-react';

const gradeData = [
    {
        id: 'ecc',
        wing: 'Early Childhood Wing',
        name: 'Pre-Nursery, Nursery & KG',
        grades: ['Pre-Nursery', 'Nursery', 'LKG', 'UKG'],
        age: 'Age 2.5 to 5.5 Years',
        timing: '08:45 AM – 12:30 PM (Mon–Fri)',
        ratio: '1:15 Dedicated Attention',
        annualFee: '₹ 12,000 / year',
        overview: 'Nurturing curiosity, foundational phonetics, tactile sensory motor play, and socio-emotional warmth in a protected play-way environment.',
        subjects: ['Phonics & Pre-Reading', 'Number Sense & Shapes', 'Sensory Play', 'Storytelling & Kannada Oral', 'Art & Gross Motor'],
        milestones: [
            'Letter-sound recognition & emergent reading',
            'Number sequencing 1–50 & tactile counting',
            'Independent self-care, sharing & group empathy'
        ],
        stage: 'Foundational Stage (NEP Aligned)'
    },
    {
        id: 'primary',
        wing: 'Primary School Wing',
        name: 'Classes I through V',
        grades: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
        age: 'Age 6 to 10 Years',
        timing: '08:30 AM – 03:45 PM (Mon–Sat)',
        ratio: '1:20 Certified Subject Teachers',
        annualFee: '₹ 15,000 / year',
        overview: 'Building strong literacy, bilingual fluency, mathematical reasoning, and hands-on scientific observation through structured classroom inquiry.',
        subjects: ['Mathematics', 'Environmental Studies (EVS)', 'English (Reader & Grammar)', 'Kannada (First / Second Language)', 'Hindi (Introductory)', 'Computer Literacy'],
        milestones: [
            'Fluency in bilingual reading & cursive expression',
            'Mental arithmetic, multi-digit operations & geometry',
            'Inquiry-based science exhibits & daily sports drill'
        ],
        stage: 'Preparatory Stage'
    },
    {
        id: 'middle',
        wing: 'Middle School Wing',
        name: 'Classes VI through VIII',
        grades: ['Class 6', 'Class 7', 'Class 8'],
        age: 'Age 11 to 13 Years',
        timing: '08:30 AM – 03:45 PM (Mon–Sat)',
        ratio: '1:20 Post-Graduate Faculty',
        annualFee: '₹ 18,000 / year',
        overview: 'Transitioning to departmentalized academic disciplines, experimental laboratory trials, social sciences, and competitive Olympiad preparation.',
        subjects: ['General Science (Physics, Chemistry, Biology)', 'Mathematics (Algebra & Geometry)', 'Social Sciences (History, Civics, Geography)', 'English Language & Literature', 'Kannada', 'Hindi', 'ICT & Coding'],
        milestones: [
            'Formal laboratory experimentation & scientific reports',
            'Algebraic proofs, geometrical theorems & data analysis',
            'House leadership, debate, athletics & Olympiad entries'
        ],
        stage: 'Middle Academic Stage'
    },
    {
        id: 'secondary',
        wing: 'Secondary Board Wing',
        name: 'Classes IX & X (SSLC Board)',
        grades: ['Class 9', 'Class 10 (SSLC)'],
        age: 'Age 14 to 15 Years',
        timing: '08:30 AM – 04:15 PM (Extended Mentorship)',
        ratio: '1:20 Senior Board Examiners',
        annualFee: '₹ 25,000 / year',
        overview: 'Rigorous preparation for Karnataka State Secondary Education Examination Board (KSEAB) examinations, supported by daily doubt counters and model test series.',
        subjects: ['Core Mathematics', 'Science (Physics, Chem, Bio Practical)', 'Social Science', 'First Language (English / Kannada)', 'Second Language', 'Third Language (Hindi)'],
        milestones: [
            '100% Board Pass Rate target with State Distinctions',
            '5+ Full-length proctored preparatory mock examinations',
            'Special remedial coaching & individualized revision maps'
        ],
        stage: 'Secondary Board Examination Stage'
    },
    {
        id: 'puc',
        wing: 'Senior Secondary / Pre-University Wing',
        name: 'Classes XI & XII (PUC Science & Commerce)',
        grades: ['Class 11 (PUC I)', 'Class 12 (PUC II)'],
        age: 'Age 16 to 17 Years',
        timing: '08:30 AM – 04:30 PM (Integrated Coached)',
        ratio: '1:18 Specialist Lecturers',
        annualFee: '₹ 32,000 / year',
        overview: 'Specialized streams preparing scholars for Department of Pre-University Education (DPUE) board exams alongside competitive engineering and medical entrance coaching.',
        subjects: ['Science: PCMB (Physics, Chem, Math, Bio)', 'Science: PCMC (Computer Science)', 'Commerce: Accountancy, Business Studies, Economics, Basic Math', 'English & Kannada'],
        milestones: [
            'State Pre-University board distinction track record',
            'Integrated KCET, NEET, and JEE foundational problem workshops',
            'Career counseling, campus university admissions support'
        ],
        stage: 'Senior Secondary / Pre-University Stage'
    }
];

const GradeFinder = () => {
    const [selectedId, setSelectedId] = useState('ecc');
    const selected = gradeData.find(g => g.id === selectedId) || gradeData[0];

    return (
        <section className="py-8 sm:py-14 bg-white border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 block mb-1.5 flex items-center gap-1.5">
                            <Sparkles size={14} className="text-blue-600" />
                            Academic Matrix (All 17 Classes)
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-slate-900 tracking-tight">
                            Explore Curriculum by Academic Wing
                        </h2>
                        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
                            Select a stage below to inspect eligible age criteria, daily timings, student-teacher ratio, and core learning outcomes.
                        </p>
                    </div>

                    <Link 
                        to="/academics" 
                        className="btn-secondary text-xs self-start md:self-auto py-2 px-3.5"
                    >
                        <span>All 17 Classes Directory</span>
                        <ArrowRight size={13} />
                    </Link>
                </div>

                {/* Segmented Grade Selector Buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2.5 mb-5 sm:mb-6 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                    {gradeData.map((g) => {
                        const active = g.id === selectedId;
                        return (
                            <button
                                key={g.id}
                                onClick={() => setSelectedId(g.id)}
                                className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                                    active
                                        ? 'bg-blue-600 text-white border border-blue-600 shadow-md shadow-blue-500/25 font-bold'
                                        : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-slate-50'
                                }`}
                            >
                                <span>{g.name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Interactive Dynamic Display Card */}
                <div className="academic-card p-4 sm:p-6 md:p-8 bg-white shadow-xs">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                        
                        {/* Left Details */}
                        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                                    {selected.wing}
                                </span>
                                <span className="text-xs text-slate-500 font-medium">
                                    Stage: {selected.stage}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">
                                    {selected.name}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    Structured academic learning tailored specifically for developmental stage {selected.age}, providing optimal balance between discipline, critical inquiry, and co-curricular enrichment.
                                </p>
                            </div>

                            {/* Subjects Grid */}
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-900 block mb-2.5 flex items-center gap-1.5">
                                    <BookOpen size={13} className="text-blue-600" />
                                    Prescribed Core Modules:
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {selected.subjects.map((s, idx) => (
                                        <span 
                                            key={idx}
                                            className="text-xs font-medium px-3 py-1 bg-blue-50/60 text-blue-900 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Key Learning Milestones */}
                            <div className="pt-4 border-t border-slate-100">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-900 block mb-2.5">
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
                        <div className="lg:col-span-5 bg-slate-50 border border-slate-200/90 rounded-2xl p-6 space-y-5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-200 flex items-center gap-2">
                                <Award size={14} className="text-amber-500" />
                                Enrollment Specifications
                            </h4>

                            <div className="space-y-3.5 text-xs">
                                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                                    <span className="text-slate-500 font-medium">Eligible Age Bracket</span>
                                    <span className="font-semibold text-slate-900">{selected.age}</span>
                                </div>
                                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                                    <span className="text-slate-500 font-medium">Daily School Timing</span>
                                    <span className="font-semibold text-slate-900 flex items-center gap-1">
                                        <Clock size={12} className="text-blue-600" />
                                        {selected.timing}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                                    <span className="text-slate-500 font-medium">Student to Mentor Ratio</span>
                                    <span className="font-semibold text-slate-900 flex items-center gap-1">
                                        <Users size={12} className="text-blue-600" />
                                        {selected.ratio}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-slate-500 font-medium">Annual Base Fee</span>
                                    <span className="font-bold text-blue-700 text-sm">{selected.annualFee}</span>
                                </div>
                            </div>

                            <div className="pt-2 flex flex-col gap-2">
                                <Link 
                                    to="/admissions" 
                                    className="btn-primary w-full text-xs text-center justify-center font-bold"
                                >
                                    <span>Admissions for {selected.name.split(',')[0]}</span>
                                    <ArrowRight size={13} />
                                </Link>
                                <Link 
                                    to="/contact" 
                                    className="btn-secondary w-full text-xs text-center justify-center"
                                >
                                    <span>Consult Admissions Desk</span>
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
