import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, User, ArrowRight, Home, Briefcase, XCircle } from 'lucide-react'; // Added CheckCircle, XCircle

// Basic utility for combining Tailwind classes
const cn = (...args: any[]) => args.filter(Boolean).join(' ');

// ===============================
// Verification Modal Component (Defined directly in this file)
// ===============================
interface VerificationModalProps {
    email: string;
    message: string | null;
    onClose: () => void;
    onVerify: (code: string) => void;
    isLoading: boolean;
    error: string | null;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ email, message, onClose, onVerify, isLoading, error }) => {
    const [code, setCode] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onVerify(code);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md space-y-6 relative border border-gray-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                    disabled={isLoading}
                >
                    <XCircle className="w-6 h-6" />
                </button>
                <h3 className="text-2xl font-bold text-center text-green-800">Verify Your Email</h3>
                <p className="text-gray-700 text-center text-base">
                    {message || `A verification code has been sent to ${email}. Please check your inbox and spam folder.`}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                        <input
                            type="text"
                            id="verificationCode"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter 6-digit code"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                            maxLength={6}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline ml-2">{error}</span>
                        </div>
                    )}

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
                                Verifying...
                            </span>
                        ) : (
                            <>
                                Verify Code <ArrowRight className="ml-2 w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

// ===============================
// Main SignUpAgent Component
// ===============================
const SignUpAgent = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null); // Error for initial form
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [verificationModalMessage, setVerificationModalMessage] = useState<string | null>(null);
    const [verificationModalError, setVerificationModalError] = useState<string | null>(null);
    const [isVerifyingCode, setIsVerifyingCode] = useState(false);


    // Basic utility for combining Tailwind classes (moved inside component for this context)
    const cn = (...args: any[]) => args.filter(Boolean).join(' ');

    const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null); // Clear previous form errors

        if (!fullName.trim() || !email.trim()) {
            setFormError("Full Name and Email are required.");
            return;
        }

        const nameParts = fullName.trim().split(' ');
        const firstName = nameParts.length > 0 ? nameParts[0] : '';
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

        // Store in localStorage
        localStorage.setItem('agentFirstName', firstName);
        localStorage.setItem('agentLastName', lastName);
        localStorage.setItem('agentEmail', email);

        setIsLoading(true);

        try {
            // API call to send verification email
            // Replace 'YOUR_SEND_VERIFICATION_API_ENDPOINT' with your actual endpoint
            const response = await fetch('https://modelscoringapi.onrender.com/send-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send verification email.');
            }

            // If successful, show the verification modal
            setVerificationModalMessage(`A verification code has been sent to ${email}.`);
            setShowVerificationModal(true);

        } catch (err: any) {
            setFormError(err.message || "An error occurred while setting up verification. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [fullName, email]);

    const handleVerifyCode = useCallback(async (code: string) => {
        setVerificationModalError(null); // Clear previous modal errors
        setIsVerifyingCode(true);

        try {
            // API call to verify the code
            // Replace 'YOUR_VERIFY_CODE_API_ENDPOINT' with your actual endpoint
            const response = await fetch('https://modelscoringapi.onrender.com/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, code: code }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Verification failed. Please try again.');
            }

            // If verification is successful, you can now navigate to the next part of agent signup
            // For example, navigate to the full agent signup form (which we had before)
            alert('Email verified successfully! You can now proceed with full registration.');
            navigate('/signup-agent-full'); // Replace with your next agent signup route
            setShowVerificationModal(false); // Close modal on success

        } catch (err: any) {
            setVerificationModalError(err.message || "Invalid code or an error occurred. Please try again.");
        } finally {
            setIsVerifyingCode(false);
        }
    }, [email, navigate]);


    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            {/* Header (Kuda-inspired App Bar - Green) */}
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
                    <Briefcase className="w-8 h-8 text-green-600" /> Sign Up as Agent
                </h2>
                <p className="text-lg text-gray-700 text-center mb-6">
                    Enter your details to get started with your agent account.
                </p>

                <form onSubmit={handleFormSubmit} className="w-full space-y-5">
                    {formError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline ml-2">{formError}</span>
                        </div>
                    )}

                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white shadow-sm"
                                required
                                disabled={isLoading || showVerificationModal} // Disable when modal is open
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white shadow-sm"
                                required
                                disabled={isLoading || showVerificationModal} // Disable when modal is open
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={cn(
                            "w-full flex items-center justify-center py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg",
                            isLoading || showVerificationModal // Disable when loading or modal is open
                                ? "bg-green-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                        )}
                        disabled={isLoading || showVerificationModal} // Disable when loading or modal is open
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </span>
                        ) : (
                            <>
                                Continue <ArrowRight className="ml-2 w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>
            </main>

            {showVerificationModal && (
                <VerificationModal
                    email={email}
                    message={verificationModalMessage}
                    onClose={() => setShowVerificationModal(false)}
                    onVerify={handleVerifyCode}
                    isLoading={isVerifyingCode}
                    error={verificationModalError}
                />
            )}
        </div>
    );
};

export default SignUpAgent;
