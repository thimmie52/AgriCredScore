import React, { useState, useCallback } from 'react';
import { ArrowRight, Home } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for internal navigation


// ===============================
//  Utility - Simplified version of cn (for combining Tailwind CSS classes)
// ===============================
const cn = (...args: any[]) => {
    return args.filter(Boolean).join(' ');
};

// ===============================
//  Button Component
//  A reusable button component with common styling and props.
// ===============================
interface ButtonProps {
    children: React.ReactNode; // Content inside the button
    onClick?: () => void;     // Optional click handler
    className?: string;       // Optional additional Tailwind CSS classes
    disabled?: boolean;       // Optional disabled state
}

const Button: React.FC<ButtonProps> = (props) => {
    const { children, onClick, className, disabled } = props;
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-6 py-2 rounded-md transition-colors duration-200", // Default button styles
                className // Apply additional classes
            )}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
// ===============================

// ===============================
// Input Component
//  A reusable input field component with label and common styling.
// ===============================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;               // Unique ID for the input and its label
    label?: string;           // Optional label text
    value: string;            // Controlled component value
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
    placeholder?: string;     // Optional placeholder text
    className?: string;       // Optional additional Tailwind CSS classes
    required?: boolean;       // Optional required attribute
}
const Input: React.FC<InputProps> = (props) => {
    const { id, value, onChange, placeholder, className, required, ...rest } = props;
    return (
        <input
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={cn(
                "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-lg bg-white",
                className
            )}
            required={required}
            {...rest} // Spread any other standard input props
        />
    );
};
// ===============================

// ===============================
// Label Component
//  A reusable label component for form fields.
// ===============================
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor: string;          // Associates label with an input by ID
    children: React.ReactNode; // Content of the label
    className?: string;       // Optional additional Tailwind CSS classes
}

const Label: React.FC<LabelProps> = (props) => {
    const { htmlFor, children, className, ...rest } = props;
    return (
        <label
            htmlFor={htmlFor}
            className={cn("block text-sm font-medium text-gray-700 mb-1", className)}
            {...rest} // Spread any other standard label props
        >
            {children}
        </label>
    );
};
// ===============================

// ===============================
// Login Component
//  The main component for the login page.
// ===============================
const Login = () => {
    // useNavigate hook from react-router-dom for programmatic navigation
    const navigate = useNavigate();
    // State variables for username and password inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Memoized handler for input changes to optimize performance
    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            if (name === 'username') {
                setUsername(value);
            } else if (name === 'password') {
                setPassword(value);
            }
        },
        [] // Empty dependency array means this function is created once
    );

    // Function to handle the login submission
    const handleLogin = async () => {
        // Basic client-side validation
        if (!username || !password) {
            alert('Please enter both username and password.'); // Using alert as per previous code
            return;
        }

        // Construct the payload for the API request
        const payload = {
            username: username,
            password: password,
        };

        console.log('Login Payload:', payload);

        try {
            // Make a POST request to the login API endpoint
            // !!! IMPORTANT: Replace "http://127.0.0.1:8000/login" with your actual backend login API URL
            const response = await fetch("https://modelscoringapi.onrender.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // If the response is successful (status 2xx)
                alert("Login successful!");
                // Navigate to the user's profile or dashboard upon successful login
                navigate(`/profile/${username}`);
            } else {
                // If the response indicates an error
                const errorText = await response.text();
                alert(`Login failed: ${errorText || 'Invalid credentials'}`);
            }
        } catch (error) {
            // Catch any network or unexpected errors
            console.error("Login error:", error);
            alert("An error occurred during login. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
            {/* Kuda-inspired App Bar */}
            <header className="bg-green-500 py-4 px-6">
                <div className="flex items-center justify-between">
                    {/* Brand logo/name, using Link for internal navigation */}
                    <Link to="/" className="text-white text-xl font-bold rounded-md px-2 py-1 hover:bg-green-600 transition-colors">
                        Bridge
                    </Link>
                    {/* Home button/link, using Link for internal navigation */}
                    <Link to="/" className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center shadow-md hover:bg-green-800 transition-colors">
                        <Home className="h-6 w-6 text-white" />
                    </Link>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                {/* Login Form Container */}
                <div className="w-full max-w-md shadow-lg rounded-md bg-white p-6 md:p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                        Welcome Back!
                    </h2>
                    <p className="text-gray-600 mb-8 text-center">
                        Sign in to access your account.
                    </p>

                    {/* Login Form */}
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                        <div>
                            <Label htmlFor="username">Username</Label>
                            <Input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={handleInputChange}
                                placeholder="Enter your username"
                                required
                                className="border-gray-300"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password" // Type "password" to mask input
                                id="password"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                required
                                className="border-gray-300"
                            />
                        </div>

                        {/* Login Button */}
                        <Button
                            onClick={handleLogin}
                            className="w-full bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center"
                        >
                            Log In
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-8 text-center text-gray-600">
                        Don't have an account?{' '}
                        <Link
                            to="/signup" // Link to your SignUp page
                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
