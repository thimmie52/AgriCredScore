import { Link } from 'react-router-dom';
import { User, Briefcase, ArrowRight, Home } from 'lucide-react';

const LoginSelection = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white text-gray-800">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-600 to-green-700 py-4 px-6 shadow-xl z-10">
                <div className="flex items-center justify-between max-w-8xl mx-auto">
                    <Link to="/" className="text-white text-2xl font-extrabold tracking-wide">
                        Bridge
                    </Link>
                    {/* Home button/link */}
                    <Link to="/" className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200">
                        <Home className="h-6 w-6 text-white" />
                    </Link>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center w-full max-w-lg space-y-8 bg-white p-8 rounded-xl shadow-2xl border border-gray-200 relative z-0">
                <h2 className="text-4xl font-extrabold mb-6 text-center text-green-800 drop-shadow-md">
                    Welcome Back!
                </h2>
                <p className="text-lg text-gray-700 text-center mb-8">
                    How would you like to log in?
                </p>

                {/* Individual Login Card */}
                <Link
                    to="/login-individual"
                    /* Corrected route to match App.tsx */
                    className="w-full flex items-center justify-between p-7 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 group cursor-pointer border border-green-400 transform hover:scale-105"
                    style={{ textDecoration: 'none' }}
                >
                    <div className="flex items-center gap-5">
                        <div className="p-3 bg-white bg-opacity-30 rounded-full shadow-md group-hover:bg-opacity-40 transition-colors duration-200">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-2xl font-bold tracking-wide">Login as an Individual</span>
                    </div>
                    <ArrowRight className="w-8 h-8 text-white opacity-80 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-2" />
                </Link>

                {/* Agent Login Card */}
                <Link
                    to="/login-agent"
                    className="w-full flex items-center justify-between p-7 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 group cursor-pointer border border-green-400 transform hover:scale-105"
                    style={{ textDecoration: 'none' }}
                >
                    <div className="flex items-center gap-5">
                        <div className="p-3 bg-white bg-opacity-30 rounded-full shadow-md group-hover:bg-opacity-40 transition-colors duration-200">
                            <Briefcase className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-2xl font-bold tracking-wide">Login as an Agent</span>
                    </div>
                    <ArrowRight className="w-8 h-8 text-white opacity-80 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-2" />
                </Link>
            </main>
        </div>
    );
};

export default LoginSelection;
