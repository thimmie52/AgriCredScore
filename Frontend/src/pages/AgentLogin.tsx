import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Briefcase, Home, ArrowRight } from 'lucide-react';

// Utility for combining Tailwind classes
const cn = (...args: any[]) => args.filter(Boolean).join(' ');

const AgentLoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        if (!username.trim() || !password.trim()) {
            setError("Username and Password are required.");
            return;
        }

        setIsLoading(true);

        try {
            // Replace with your actual agent login API endpoint
            const response = await fetch('https://modelscoringapi.onrender.com/agent-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Login failed. Please check your credentials.');
            }

            // Assuming successful login returns some user data or just a success message
            const userData = await response.json(); // You might get agent ID, name etc. here
            console.log('Agent login successful:', userData);

            // In a real application, you'd store tokens (JWT) or session info here.
            // For now, we'll just navigate to the dashboard with the username.
            localStorage.setItem('agentUsername', username); // Store username for dashboard lookup if needed

            // Navigate to the agent's dashboard using their username
            navigate(`/agent-dashboard/${username}`);

        } catch (err: any) {
            setError(err.message || "An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [username, password, navigate]);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-600 to-green-700 py-4 px-6 shadow-xl z-10">
                <div className="flex items-center justify-between max-w-8xl mx-auto">
                    <a href="/" className="text-white text-2xl font-extrabold tracking-wide no-underline">
                        Bridge
                    </a>
                    <a href="/" className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200 no-underline">
                        <Home className="h-6 w-6 text-white" />
                    </a>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center w-full max-w-md space-y-6 bg-white p-8 rounded-xl shadow-2xl border border-gray-200 relative z-0">
                <h2 className="text-3xl font-extrabold mb-4 text-center text-green-800 drop-shadow-sm flex items-center gap-2">
                    <Briefcase className="w-8 h-8 text-green-600" /> Agent Login
                </h2>
                <p className="text-lg text-gray-700 text-center mb-6">
                    Access your agent dashboard.
                </p>

                <form onSubmit={handleSubmit} className="w-full space-y-5">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline ml-2">{error}</span>
                        </div>
                    )}

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Your username"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white shadow-sm"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Your password"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white shadow-sm"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={cn(
                            "w-full flex items-center justify-center py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg",
                            isLoading
                                ? "bg-green-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                        )}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Logging in...
                            </span>
                        ) : (
                            <>
                                Login <ArrowRight className="ml-2 w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>
            </main>
        </div>
    );
};

export default AgentLoginPage;
