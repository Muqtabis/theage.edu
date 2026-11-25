import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Sliders, 
    ArrowRight, 
    Check, 
    Clock, 
    Users, 
    BookOpen, 
    GraduationCap, 
    ShieldCheck 
} from 'lucide-react';

const gradeSteps = [
    {
        gradeNum: 1,
        title: 'Class I (Grade 1)',
        wing: 'Primary School Wing',
        age: '6 Years Completed',
        timings: '08:30 AM – 03:45 PM',
        ratio: '1:20',
        annualFee: 15000,
        materialsFee: 3500,
        subjects: ['English Language', 'Kannada (First Lang)', 'Mathematics', 'Environmental Science', 'General Hindi'],
        focus: 'Foundational trilingual literacy, hands-on arithmetic concepts, and guided socialization.',
        badge: 'Primary Foundation'
    },
    {
        gradeNum: 2,
        title: 'Class II (Grade 2)',
        wing: 'Primary School Wing',
        age: '7 Years Completed',
        timings: '08:30 AM – 03:45 PM',
        ratio: '1:20',
        annualFee: 15000,
        materialsFee: 3500,
        subjects: ['English Phonics', 'Kannada', 'Hindi', 'Basic Arithmetic', 'Nature Studies', 'Creative Arts'],
        focus: 'Reading comprehension fluency, mental math calculations, and independent classroom tasks.',
        badge: 'Primary Core'
    },
    {
        gradeNum: 3,
        title: 'Class III (Grade 3)',
        wing: 'Primary School Wing',
        age: '8 Years Completed',
        timings: '08:30 AM – 03:45 PM',
        ratio: '1:20',
        annualFee: 15000,
        materialsFee: 3500,
        subjects: ['English Grammar', 'Kannada', 'Hindi', 'Mathematics', 'General Science', 'Social Studies'],
        focus: 'Introduction to formal science observation, paragraph composition, and computer basics.',
        badge: 'Primary Core'
    },
    {
        gradeNum: 4,
        title: 'Class IV (Grade 4)',
        wing: 'Primary School Wing',
        age: '9 Years Completed',
        timings: '08:30 AM – 03:45 PM',
        ratio: '1:20',
        annualFee: 15000,
        materialsFee: 3500,
        subjects: ['English Literature', 'Regional Kannada', 'Hindi', 'Geometry & Math', 'Science Lab', 'Civics Basics'],
        focus: 'Inquiry-based experimentation, mathematical word problems, and inter-house quiz events.',
        badge: 'Primary Core'
    },
    {
        gradeNum: 5,
        title: 'Class V (Grade 5)',
        wing: 'Primary School Wing',
        age: '10 Years Completed',
        timings: '08:30 AM – 03:45 PM',
        ratio: '1:20',
        annualFee: 15000,
        materialsFee: 3500,
        subjects: ['English', 'Kannada', 'Hindi', 'Mathematics', 'Integrated Sciences', 'Social Studies', 'Robotics Basics'],
        focus: 'Primary capstone graduation, departmental transition readiness, and creative problem solving.',
        badge: 'Primary Capstone'
    },
    {
        gradeNum: 6,
        title: 'Class VI (Grade 6)',
        wing: 'Middle School Wing',
        age: '11 Years Completed',
        timings: '08:30 AM – 03:45 PM',
        ratio: '1:20',
        annualFee: 18000,
        materialsFee: 4000,
        subjects: ['English Lit', 'Kannada', 'Hindi', 'Algebra & Geometry', 'Physics', 'Chemistry', 'Biology', 'History'],
        focus: 'Transition to specialized subject mentors, dedicated laboratory practicals, and debating.',
        badge: 'Middle School'
    },
    {
        gradeNum: 7,
        title: 'Class VII (Grade 7)',
        wing: 'Middle School Wing',
        age: '12 Years Completed',
        timings: '08:30 AM – 03:45 PM',
        ratio: '1:20',
        annualFee: 18000,
        materialsFee: 4000,
        subjects: ['Advanced English', 'Kannada', 'Hindi', 'Higher Math', 'Physics & Chemistry Labs', 'Biology', 'Civics'],
        focus: 'Scientific method mastery, competitive olympiad training, and leadership in student council.',
        badge: 'Middle School'
    },
    {
        gradeNum: 8,
        title: 'Class VIII (Grade 8)',
        wing: 'Middle School Wing',
        age: '13 Years Completed',
        timings: '08:30 AM – 03:45 PM',
        ratio: '1:20',
        annualFee: 18000,
        materialsFee: 4000,
        subjects: ['Core English', 'Kannada', 'Hindi', 'Algebraic Geometry', 'Natural Sciences', 'Social Sciences', 'Robotics'],
        focus: 'Middle school capstone, secondary board foundation readiness, and comprehensive project work.',
        badge: 'Middle Capstone'
    },
    {
        gradeNum: 9,
        title: 'Class IX (Grade 9)',
        wing: 'Secondary School (SSLC)',
        age: '14 Years Completed',
        timings: '08:30 AM – 03:45 PM',
        ratio: '1:20',
        annualFee: 25000,
        materialsFee: 5000,
        subjects: ['English 1st/2nd Lang', 'Kannada', 'Hindi', 'Mathematics', 'Science (Phy/Chem/Bio)', 'Social Science'],
        focus: 'Rigorous state board foundation, pre-board question paper drills, and concept clarification.',
        badge: 'Board Preparation'
    },
    {
        gradeNum: 10,
        title: 'Class X (SSLC Board Exam)',
        wing: 'Secondary School (SSLC)',
        age: '15 Years Completed',
        timings: '08:30 AM – 03:45 PM',
        ratio: '1:20',
        annualFee: 25000,
        materialsFee: 5000,
        subjects: ['Karnataka SSLC Core: Eng, Kan, Hin, Math, Science, Social Studies'],
        focus: '3 Full-scale Pre-Board series, 100% board pass mastery clinics, and previous decade paper solutions.',
        badge: 'SSLC Board Year'
    },
    {
        gradeNum: 11,
        title: 'Class XI (PUC First Year)',
        wing: 'Senior Secondary / PUC',
        age: '16 Years Completed',
        timings: '08:30 AM – 04:00 PM',
        ratio: '1:25',
        annualFee: 28000,
        materialsFee: 5500,
        subjects: ['Science (PCMB / PCMC) or Commerce (Accountancy, Business Studies, Economics, Math/CS)'],
        focus: 'State Pre-University Board syllabus integrated with KCET / NEET / JEE foundation coaching.',
        badge: 'Pre-University 1'
    },
    {
        gradeNum: 12,
        title: 'Class XII (PUC Final Board)',
        wing: 'Senior Secondary / PUC',
        age: '17 Years Completed',
        timings: '08:30 AM – 04:00 PM',
        ratio: '1:25',
        annualFee: 28000,
        materialsFee: 5500,
        subjects: ['Senior Science (PCMB / PCMC) or Senior Commerce Streams'],
        focus: 'Final State PUC Board examination distinction, entrance mock test series, and college counseling.',
        badge: 'PUC Board Year'
    }
];

const TuitionRangeSlider = () => {
    const [sliderIndex, setSliderIndex] = useState(4); // Default to Class 5
    const selected = gradeSteps[sliderIndex];

    const monthlyInstallment = Math.round(selected.annualFee / 10);
    const quarterlyInstallment = Math.round(selected.annualFee / 4);

    return (
        <section className="py-20 bg-white border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-2 flex items-center gap-1.5">
                            <Sliders size={14} />
                            Interactive Grade & Fee Calculator
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                            Explore Any Class with the Interactive Slider
                        </h2>
                        <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
                            Drag the slider below from Class 1 to Class 12 to see real-time curriculum specifications, daily timings, and transparent fee estimates.
                        </p>
                    </div>

                    <Link 
                        to="/admissions" 
                        className="btn-secondary text-xs self-start md:self-auto"
                    >
                        <span>View Official Fee Schedule</span>
                        <ArrowRight size={13} />
                    </Link>
                </div>

                {/* THE SLIDER CONTROL CARD */}
                <div className="card-interactive p-6 sm:p-8 md:p-10 bg-slate-50/50 mb-8">
                    
                    {/* Top Slider Value Display */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200/80 gap-3">
                        <div>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 inline-block mb-1">
                                {selected.wing} • {selected.badge}
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                                {selected.title}
                            </h3>
                        </div>

                        <div className="text-left sm:text-right">
                            <span className="text-xs text-slate-500 font-medium block">Annual Academic Tuition</span>
                            <span className="text-2xl sm:text-3xl font-bold text-slate-900">
                                ₹ {selected.annualFee.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[11px] text-slate-400 block font-mono">
                                (~₹ {quarterlyInstallment.toLocaleString('en-IN')} / quarter)
                            </span>
                        </div>
                    </div>

                    {/* RANGE SLIDER INPUT */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                            <span>Class I</span>
                            <span className="text-blue-600 font-bold bg-white px-3 py-1 rounded-full border border-blue-200 shadow-2xs">
                                Drag to Change: Class {selected.gradeNum}
                            </span>
                            <span>Class XII (PUC)</span>
                        </div>

                        <div className="relative py-2">
                            <input 
                                type="range" 
                                min="0" 
                                max="11" 
                                step="1" 
                                value={sliderIndex}
                                onChange={(e) => setSliderIndex(parseInt(e.target.value))}
                                className="slider-custom"
                                aria-label="Select Grade Level"
                            />
                        </div>

                        {/* Discrete Step Indicators */}
                        <div className="grid grid-cols-12 gap-1 text-center text-[10px] font-mono text-slate-400">
                            {gradeSteps.map((g, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSliderIndex(idx)}
                                    className={`py-1 rounded transition-colors cursor-pointer ${
                                        idx === sliderIndex 
                                            ? 'font-bold text-blue-600 bg-blue-50 border border-blue-200' 
                                            : 'hover:text-slate-800'
                                    }`}
                                >
                                    C{g.gradeNum}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* DYNAMIC SPECIFICATIONS GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-slate-200 items-start">
                        
                        {/* Focus & Subjects */}
                        <div className="lg:col-span-7 space-y-5">
                            <div>
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Pedagogical Focus:
                                </h4>
                                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                    {selected.focus}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                                    <BookOpen size={13} className="text-blue-600" />
                                    Prescribed Subjects & Practical Modules:
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {selected.subjects.map((subj, idx) => (
                                        <span 
                                            key={idx}
                                            className="text-xs font-medium px-2.5 py-1 bg-white text-slate-800 rounded-md border border-slate-200 hover:border-blue-400 transition-colors shadow-2xs"
                                        >
                                            {subj}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Metrics & Action Box */}
                        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 space-y-3.5 text-xs shadow-2xs">
                            <div className="flex justify-between items-center py-1 border-b border-slate-100">
                                <span className="text-slate-500">Eligibility Age</span>
                                <span className="font-semibold text-slate-900">{selected.age}</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-slate-100">
                                <span className="text-slate-500">Class Hours</span>
                                <span className="font-semibold text-slate-900 flex items-center gap-1">
                                    <Clock size={12} className="text-blue-600" />
                                    {selected.timings}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-slate-100">
                                <span className="text-slate-500">Teacher Ratio</span>
                                <span className="font-semibold text-slate-900 flex items-center gap-1">
                                    <Users size={12} className="text-blue-600" />
                                    {selected.ratio}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-1">
                                <span className="text-slate-500">Annual Materials & Labs</span>
                                <span className="font-bold text-slate-900">₹ {selected.materialsFee.toLocaleString('en-IN')}</span>
                            </div>

                            <div className="pt-3 border-t border-slate-100">
                                <Link 
                                    to="/admissions" 
                                    className="btn-primary w-full text-xs text-center justify-center py-2.5"
                                >
                                    <span>Apply for {selected.title.split('(')[0].trim()}</span>
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

export default TuitionRangeSlider;
