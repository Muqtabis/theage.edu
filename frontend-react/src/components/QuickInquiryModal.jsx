import React, { useState } from 'react';
import { X, CheckCircle2, Send, Calendar, Phone, Mail, User, GraduationCap } from 'lucide-react';

const QuickInquiryModal = ({ isOpen, onClose }) => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        parentName: '',
        phone: '',
        email: '',
        grade: 'Class I to V (Primary)',
        visitDate: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
    };

    const handleReset = () => {
        setFormSubmitted(false);
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div 
                className="bg-white max-w-lg w-full rounded-2xl border border-slate-200 shadow-2xl overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 block mb-0.5">
                            Admissions 2026–27
                        </span>
                        <h3 className="font-bold text-lg text-slate-900">Quick Campus Consultation</h3>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                        aria-label="Close modal"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8">
                    {formSubmitted ? (
                        <div className="text-center py-6">
                            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-200">
                                <CheckCircle2 size={28} />
                            </div>
                            <h4 className="font-bold text-lg text-slate-900 mb-2">Consultation Request Recorded</h4>
                            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto mb-6">
                                Thank you, <strong className="text-slate-900">{formData.parentName}</strong>. Our admissions counselor will contact you at <strong className="text-slate-900">{formData.phone}</strong> to confirm your appointment.
                            </p>
                            <button
                                onClick={handleReset}
                                className="btn-primary text-xs"
                            >
                                Done
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                                    Parent / Guardian Name
                                </label>
                                <div className="relative">
                                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.parentName}
                                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                                        placeholder="Full Name"
                                        className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-lg focus:border-blue-600 focus:outline-hidden transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                                        Contact Phone
                                    </label>
                                    <div className="relative">
                                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input 
                                            type="tel" 
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="(+91) 00000 00000"
                                            className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-lg focus:border-blue-600 focus:outline-hidden transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input 
                                            type="email" 
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="name@example.com"
                                            className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-lg focus:border-blue-600 focus:outline-hidden transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                                        Target Grade
                                    </label>
                                    <select
                                        value={formData.grade}
                                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-lg focus:border-blue-600 focus:outline-hidden transition-colors"
                                    >
                                        <option value="Pre-Primary (Nursery, LKG, UKG)">Pre-Primary (Nursery, LKG, UKG)</option>
                                        <option value="Class I to V (Primary)">Class I to V (Primary)</option>
                                        <option value="Class VI to VIII (Middle)">Class VI to VIII (Middle)</option>
                                        <option value="Class IX & X (Secondary SSLC)">Class IX & X (Secondary SSLC)</option>
                                        <option value="Class XI & XII (PUC Science)">Class XI & XII (PUC Science)</option>
                                        <option value="Class XI & XII (PUC Commerce)">Class XI & XII (PUC Commerce)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                                        Preferred Visit Date
                                    </label>
                                    <div className="relative">
                                        <input 
                                            type="date" 
                                            value={formData.visitDate}
                                            onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                                            className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-lg focus:border-blue-600 focus:outline-hidden transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="btn-primary w-full text-xs font-semibold py-3 justify-center"
                                >
                                    <Send size={13} />
                                    <span>Schedule Campus Consultation</span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuickInquiryModal;
