import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqItems = [
    {
        q: "What is the admission procedure and timeline for the 2026–27 academic session?",
        a: "Admissions for Nursery through Grade XII are officially open. The process involves four transparent steps: 1) Initial inquiry and campus consultation, 2) Submission of previous academic transcripts and birth credentials, 3) An informal diagnostic evaluation to assess foundational literacy and numeracy, and 4) Issuance of enrollment offer and orientation kit. Early applications are advised as seats per section are limited to maintain a 1:20 teacher ratio."
    },
    {
        q: "Does The Age School provide safe bus transport across Basavakalyan and neighboring taluks?",
        a: "Yes. The school operates a fleet of institutional buses covering major routes in Basavakalyan, Humnabad road, and neighboring residential areas. Every bus is fitted with satellite GPS tracking, regulatory speed governors (capped at 40 km/h), emergency first-aid equipment, and a dedicated female attendant for primary scholar assistance."
    },
    {
        q: "What curriculum and board examinations does the school prepare students for?",
        a: "The Age School is recognized by the Department of School Education, Karnataka (Affiliation Code: 29050220001). We prepare scholars for the Karnataka State SSLC (Class X) Board Examinations and Karnataka Pre-University (PUC Classes XI & XII) in Science (PCMB/PCMC) and Commerce streams. Our curriculum adheres strictly to DSEL and NCERT pedagogical standards."
    },
    {
        q: "What are the school timings for kindergarten vs primary and secondary grades?",
        a: "To protect early childhood biological rhythms, Pre-Primary (Nursery, LKG, UKG) operates from 08:45 AM to 12:30 PM (Monday to Friday, with Saturdays as a home holiday). Classes I through XII operate from 08:30 AM to 03:45 PM on weekdays across 8 structured periods, and 08:30 AM to 12:30 PM on mandated half-day Saturdays."
    },
    {
        q: "Are tuition fees payable in installments, and are scholarships available?",
        a: "Yes. Tuition fees can be remitted in quarterly installments across four academic terms. The Board also maintains a dedicated bursary fund for deserving scholars facing economic constraints; fee concessions are granted strictly on merit and demonstrated financial need upon review by the Bursar's Office."
    },
    {
        q: "What co-curricular and sports facilities are integrated into the daily routine?",
        a: "Beyond academics, every student engages in period-based sports, fine arts, and public speaking. We maintain dedicated grounds for cricket, football, volleyball, badminton, and kho-kho, along with morning yoga drills. Students also participate in Robotics, Science Olympiads, and the Four Institutional Houses (Ashoka, Tagore, Raman, and Kalam)."
    }
];

const FaqAccordion = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
            <div className="max-w-4xl mx-auto px-4 sm:px-8">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 block mb-2 flex items-center justify-center gap-1.5">
                        <HelpCircle size={14} className="text-blue-600" />
                        Admissions Guidance
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-lg mx-auto leading-relaxed">
                        Clear institutional answers regarding admissions criteria, safe bus transport, curriculum rigor, and campus daily rhythms.
                    </p>
                </div>

                {/* Accordion List */}
                <div className="space-y-3">
                    {faqItems.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div 
                                key={idx}
                                className={`border transition-all duration-200 rounded-2xl overflow-hidden ${
                                    isOpen 
                                        ? 'border-blue-300 bg-blue-50/20 shadow-xs' 
                                        : 'border-slate-200 bg-white hover:border-blue-200'
                                }`}
                            >
                                <button
                                    onClick={() => toggle(idx)}
                                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                                    aria-expanded={isOpen}
                                >
                                    <span className="font-serif font-bold text-sm sm:text-base text-slate-900 leading-snug">
                                        {item.q}
                                    </span>
                                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                                        isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                        <ChevronDown size={14} />
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Direct Action */}
                <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-blue-50/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
                    <div>
                        <h4 className="font-serif font-bold text-base text-slate-900">Have a specific enrollment inquiry?</h4>
                        <p className="text-xs text-slate-600 mt-1">Our admissions desk is available Monday through Saturday from 08:30 to 16:30 IST.</p>
                    </div>

                    <Link 
                        to="/contact" 
                        className="btn-primary text-xs shrink-0"
                    >
                        <span>Connect with Admissions Desk</span>
                        <ArrowRight size={13} />
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default FaqAccordion;
