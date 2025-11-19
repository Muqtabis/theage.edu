import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { Lock, Loader2 } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save token to browser storage
                localStorage.setItem('adminToken', data.token);
                // Redirect to portal
                navigate('/portal');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Server error. Ensure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <PageHeader title="Admin Login" description="Restricted Access Area" />
            
            <div className="container mx-auto px-6 py-24 flex justify-center">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border-t-4 border-school-magenta-700">
                    <div className="text-center mb-8">
                        <div className="bg-school-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="text-school-blue-900" size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Portal Access</h2>
                        <p className="text-gray-500 text-sm">Please enter your credentials</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-magenta-700 focus:border-transparent outline-none"
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-magenta-700 focus:border-transparent outline-none"
                                required 
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-school-magenta-700 text-white font-bold py-3 rounded-md hover:bg-school-magenta-900 transition duration-300 flex justify-center items-center"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;