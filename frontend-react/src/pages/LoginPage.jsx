import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, Loader2, Eye, EyeOff, Shield } from 'lucide-react';
import logo from '../assets/theagelogo.jpg';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Authentication failed. Please verify credentials.');
            }

            localStorage.setItem('adminToken', data.token);
            navigate('/portal');
        } catch (err) {
            setErrorMsg(err.message || 'An error occurred during authentication.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 font-sans selection:bg-blue-100 selection:text-blue-900">
            <div className="w-full max-w-md relative z-10">
                
                {/* Back button */}
                <Link 
                    to="/home" 
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors mb-8"
                >
                    <ArrowLeft size={14} />
                    <span>Return to Public Site</span>
                </Link>

                <div className="bg-white p-8 md:p-10 border border-slate-200 rounded-2xl shadow-xl">
                    <div className="text-center mb-8">
                        <img 
                            src={logo} 
                            alt="The Age School Crest" 
                            className="w-12 h-12 object-contain mx-auto mb-4 border border-blue-100 rounded-xl bg-white p-0.5 shadow-2xs"
                        />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 block mb-1">
                            Staff Authorization
                        </span>
                        <h1 className="text-2xl font-serif font-bold text-slate-900">
                            Administrative Gateway
                        </h1>
                        <p className="text-xs text-slate-500 mt-1">Authorized personnel only</p>
                    </div>

                    {errorMsg && (
                        <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Institutional Email
                            </label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@theage.edu"
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900"
                                    required 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Security Password
                            </label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900"
                                    required 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn-primary w-full py-3 text-xs uppercase tracking-[0.16em] font-bold disabled:opacity-50 cursor-pointer shadow-md"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin mx-auto" size={16} />
                            ) : (
                                <span>Sign In to Master Portal</span>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-4 border-t border-slate-100 text-center text-[10px] text-slate-400 font-mono">
                        Standard login: admin@theage.edu
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs">
                    <Shield size={13} className="text-blue-600" />
                    <span>Protected by End-to-End Session Encryption</span>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
