import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Briefcase, CheckCircle, ArrowRight, Home } from 'lucide-react';

// ===============================
//  Utility - Simplified version of cn
// ===============================
const cn = (...args: any[]) => {
    return args.filter(Boolean).join(' ');
};

// ===============================
//  Input Component (No separate file)
// ===============================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    required?: boolean;
}
const Input: React.FC<InputProps> = (props) => {
    const { id, label, value, onChange, placeholder, className, required, ...rest } = props;
    return (
        <div>
            {label && <Label htmlFor={id}>{label}</Label>}
            <input
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={cn(
                    "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white",
                    className
                )}
                required={required}
                {...rest}
            />
        </div>
    );
};

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  className?: string;
  required?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  className,
  required,
  ...rest
}) => {
  return (
    <div>
      {label && <label htmlFor={id} className="block mb-1 font-medium text-gray-700">{label}</label>}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white ${className}`}
        required={required}
        {...rest}
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
// ===============================

// ===============================
// Label Component (No separate file)
// ===============================
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor: string;
    children: React.ReactNode;
    className?: string;
}

const Label: React.FC<LabelProps> = (props) => {
    const { htmlFor, children, className, ...rest } = props;
    return (
        <label
            htmlFor={htmlFor}
            className={cn("block text-sm font-medium text-gray-700 mb-1", className)}
            {...rest}
        >
            {children}
        </label>
    );
};
// ===============================

// ===============================
// Checkbox Component (No separate file)
// ===============================
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
    const { id, label, checked, onChange, className, ...rest } = props;
    return (
        <div className={cn("flex items-center", className)}>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                {...rest}
            />
            <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
                {label}
            </label>
        </div>
    );
};
// ===============================


interface PhaseData {
    title: string;
    description: string;
    icon: React.ReactNode;
    content: (formData: FullAgentFormData, handleInputChange: (e: any) => void, formErrors: any, termsAccepted: boolean, setTermsAccepted: (b: boolean) => void) => React.ReactNode;
    validate?: (formData: FullAgentFormData, formErrors: any, setFormErrors: (errors: any) => void) => boolean;
}

interface FullAgentFormData {
    username: string;
    password: string;
    confirmPassword: string;
    // Data retrieved from localStorage (not directly in form state but used for display)
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    dateOfBirth: string; // YYYY-MM-DD

    // Location / Region Assignment
    state: string; // e.g. "Oyo", "Kaduna"
    lga: string;   // Local Government Area
    assignedCommunities?: string; // optional: specific communities they serve

    // Professional Info
    organization: string; // e.g. Ministry of Agriculture, NGO, etc.
    yearsOfExperience: number;
    areaOfExpertise: string; // e.g. Crops, Livestock, Finance
    languagesSpoken: string; // e.g. ["English", "Yoruba"]

    // Availability
    isFullTime: boolean;
}

const FullAgentRegistrationPage = () => {
    const navigate = useNavigate();
    const [currentPhase, setCurrentPhase] = useState(1);
    const [formData, setFormData] = useState<FullAgentFormData>({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: localStorage.getItem('agentFirstName') || '',
        lastName: localStorage.getItem('agentLastName') || '',
        email: localStorage.getItem('agentEmail') || '',
        phoneNumber: '',
        gender: '',
        dateOfBirth: '',
        state: '',
        lga: '',
        assignedCommunities: '',
        organization: '',
        yearsOfExperience: 0,
        areaOfExpertise: '',
        languagesSpoken: "",
        isFullTime: false

    });
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<any>({});
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
            // Clear error for the field being edited
            setFormErrors((prevErrors: any) => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        },
        []
    );

    const validatePhase = useCallback( (phase: number) => {
        let errors: Record<string, string> = {};
        let isValid = true;

        if (phase === 1) {
            // Username
            if (!formData.username.trim()) {
                errors.username = 'Username is required.';
                isValid = false;
            } else if (formData.username.length < 5) {
                errors.username = 'Username must be at least 5 characters.';
                isValid = false;
            }

            // Password
            if (!formData.password.trim()) {
                errors.password = 'Password is required.';
                isValid = false;
            } else if (formData.password.length < 8) {
                errors.password = 'Password must be at least 8 characters.';
                isValid = false;
            }

            // Confirm password
            if (formData.password !== formData.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match.';
                isValid = false;
            }

            // Personal Info
            if (!formData.firstName.trim()) {
                errors.firstName = 'First name is required.';
                isValid = false;
            }

            if (!formData.lastName.trim()) {
                errors.lastName = 'Last name is required.';
                isValid = false;
            }

            if (!formData.email.trim()) {
                errors.email = 'Email is required.';
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                errors.email = 'Email is invalid.';
                isValid = false;
            }

            if (!formData.phoneNumber.trim()) {
                errors.phoneNumber = 'Phone number is required.';
                isValid = false;
            }

            if (!formData.gender) {
                errors.gender = 'Gender is required.';
                isValid = false;
            }

            if (!formData.dateOfBirth) {
                errors.dateOfBirth = 'Date of birth is required.';
                isValid = false;
            }

            // Location Info
            if (!formData.state.trim()) {
                errors.state = 'State is required.';
                isValid = false;
            }

            if (!formData.lga.trim()) {
                errors.lga = 'LGA is required.';
                isValid = false;
            }

            // Professional Info
            if (!formData.organization.trim()) {
                errors.organization = 'Organization is required.';
                isValid = false;
            }

            const years = Number(formData.yearsOfExperience);
            if (isNaN(years) || years < 0) {
            errors.yearsOfExperience = 'Years of experience must be 0 or more.';
            isValid = false;
            }

            if (!formData.areaOfExpertise.trim()) {
                errors.areaOfExpertise = 'Area of expertise is required.';
                isValid = false;
            }

            if (!formData.languagesSpoken.trim()) {
                errors.languagesSpoken = 'At least one language must be selected.';
                isValid = false;
            }

            if (typeof formData.isFullTime !== 'boolean') {
                errors.isFullTime = 'Employment status (full-time or not) must be selected.';
                isValid = false;
            }

            // Optional: Assigned Communities
            if (!formData.assignedCommunities?.trim()) {
                errors.assignedCommunities = 'Assigned communities is required.';
                isValid = false;
            }
        } else if (phase === 2) {
            // Terms acceptance
            if (!termsAccepted) {
                errors.termsAccepted = 'You must accept the terms and conditions.';
                isValid = false;
            }
        }

        setFormErrors(errors);
        return isValid;
    },
    [formData, termsAccepted, setFormErrors]
    );


    const handleNextPhase = useCallback(async () => {
        if (!validatePhase(currentPhase)) {
            return;
        }

        if (currentPhase === phases.length) {
            setIsLoading(true);
            try {
                // Combine all data for final submission
                const finalAgentData = {
                    ...formData,
                    // Potentially include other agent details from previous signup stage if you didn't store them all in localStorage
                    // For now, we'll just use what's in formData
                };

                // API call to register the full agent account
                // Replace 'YOUR_FULL_AGENT_REGISTRATION_API_ENDPOINT' with your actual endpoint
                const response = await fetch('https://modelscoringapi.onrender.com/register_agent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(finalAgentData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Full registration failed.');
                }

                alert('Agent account created successfully!');
                // Clear sensitive data from localStorage after successful registration
                localStorage.removeItem('agentFirstName');
                localStorage.removeItem('agentLastName');
                localStorage.removeItem('agentEmail');
                navigate('/agent-dashboard'); // Navigate to agent dashboard or login page
            } catch (err: any) {
                setFormErrors({ apiError: err.message || 'An error occurred during registration.' });
            } finally {
                setIsLoading(false);
            }
        } else {
            setCurrentPhase(prev => prev + 1);
        }
    }, [currentPhase, formData, navigate, validatePhase, termsAccepted]);

    const handlePrevPhase = useCallback(() => {
        setCurrentPhase(prev => Math.max(prev - 1, 1));
    }, []);

    const phases: PhaseData[] = [
        {
            title: 'Set Account Credentials',
            description: 'Create your unique username and secure password.',
            icon: <Lock className="w-6 h-6 text-green-500" />,
            content: (formData, handleInputChange, formErrors) => (
                <>
                    <Input
                        id="username"
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Choose a username"
                        required
                    />
                    {formErrors.username && <p className="text-red-600 text-sm mt-1">{formErrors.username}</p>}

                    <Input
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a password"
                        required
                    />
                    {formErrors.password && <p className="text-red-600 text-sm mt-1">{formErrors.password}</p>}

                    <Input
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Re-enter your password"
                        required
                    />
                    {formErrors.confirmPassword && <p className="text-red-600 text-sm mt-1">{formErrors.confirmPassword}</p>}

                    <Input
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Phone"
                        required
                    />
                    {formErrors.phoneNumber && <p className="text-red-600 text-sm mt-1">{formErrors.phoneNumber}</p>}


                    <SelectInput
                        id="gender"
                        label="Gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        options={[
                            { value: 'Male', label: 'Male' },
                            { value: 'Female', label: 'Female' },
                        ]}
                        required
                    />
                    {formErrors.gender && <p className="text-red-600 text-sm mt-1">{formErrors.gender}</p>}

                    <Input
                        id="dateOfBirth"
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                        />
                        {formErrors.dateOfBirth && <p className="text-red-600 text-sm mt-1">{formErrors.dateOfBirth}</p>}

                        <Input
                        id="state"
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="e.g. Oyo"
                        required
                        />
                        {formErrors.state && <p className="text-red-600 text-sm mt-1">{formErrors.state}</p>}

                        <Input
                        id="lga"
                        label="LGA"
                        name="lga"
                        value={formData.lga}
                        onChange={handleInputChange}
                        placeholder="e.g. Ibadan North"
                        required
                        />
                        {formErrors.lga && <p className="text-red-600 text-sm mt-1">{formErrors.lga}</p>}

                        <Input
                        id="assignedCommunities"
                        label="Assigned Communities"
                        name="assignedCommunities"
                        value={formData.assignedCommunities || ''}
                        onChange={handleInputChange}
                        placeholder="Comma-separated e.g. Apete, Eleyele"
                        required
                        />
                        {formErrors.assignedCommunities && <p className="text-red-600 text-sm mt-1">{formErrors.assignedCommunities}</p>}

                        <Input
                        id="organization"
                        label="Organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        placeholder="e.g. Agric Development Office"
                        required
                        />
                        {formErrors.organization && <p className="text-red-600 text-sm mt-1">{formErrors.organization}</p>}

                        <Input
                        id="yearsOfExperience"
                        label="Years of Experience"
                        name="yearsOfExperience"
                        type="number"
                        value={(formData.yearsOfExperience ?? '').toString()}
                        onChange={handleInputChange}
                        placeholder="e.g. 5"
                        required
                        />
                        {formErrors.yearsOfExperience && <p className="text-red-600 text-sm mt-1">{formErrors.yearsOfExperience}</p>}

                        <Input
                        id="areaOfExpertise"
                        label="Area of Expertise"
                        name="areaOfExpertise"
                        value={formData.areaOfExpertise}
                        onChange={handleInputChange}
                        placeholder="e.g. Crop Production"
                        required
                        />
                        {formErrors.areaOfExpertise && <p className="text-red-600 text-sm mt-1">{formErrors.areaOfExpertise}</p>}

                        <Input
                        id="languagesSpoken"
                        label="Languages Spoken"
                        name="languagesSpoken"
                        value={formData.languagesSpoken}
                        onChange={handleInputChange}
                        placeholder="e.g. English, Yoruba"
                        required
                        />
                        {formErrors.languagesSpoken && <p className="text-red-600 text-sm mt-1">{formErrors.languagesSpoken}</p>}

                        <SelectInput
                        id="isFullTime"
                        label="Is Full Time?"
                        name="isFullTime"
                        value={formData.isFullTime.toString()}
                        onChange={(e) =>
                            setFormData({ ...formData, isFullTime: e.target.value === 'true'})
                        }
                        options={[
                            { value: 'true', label: 'Yes' },
                            { value: 'false', label: 'No' },
                        ]}
                        required
                        />
                        {formErrors.isFullTime && <p className="text-red-600 text-sm mt-1">{formErrors.isFullTime}</p>}
                </>
            ),
        },
        {
            title: 'Review & Confirm',
            description: 'Please review your details and accept our terms.',
            icon: <CheckCircle className="w-6 h-6 text-green-500" />,
            content: (formData, _handleInputChange, formErrors, termsAccepted, setTermsAccepted) => (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">Your Details:</h3>
                    <p className="text-gray-700"><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                    <p className="text-gray-700"><strong>Email:</strong> {formData.email}</p>
                    <p className="text-gray-700"><strong>Username:</strong> {formData.username}</p>
                    <p className="text-gray-700"><strong>Phone Number:</strong> {formData.phoneNumber}</p>
                    {/* Add other details from localStorage if needed, e.g., organization name, etc. */}
                    
                    <div className="mt-6">
                        <Checkbox
                            id="terms"
                            label="I agree to the Terms and Conditions and Privacy Policy."
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            required
                        />
                        {formErrors.termsAccepted && <p className="text-red-600 text-sm mt-1">{formErrors.termsAccepted}</p>}
                    </div>
                </div>
            ),
        },
    ];

    const currentPhaseData = phases[currentPhase - 1];
    const isLastPhase = currentPhase === phases.length;

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

            <main className="flex flex-col items-center justify-center w-full max-w-md space-y-6 bg-white p-8 rounded-xl shadow-2xl border border-gray-200 relative z-0 my-10">
                <h2 className="text-3xl font-extrabold mb-4 text-center text-green-800 drop-shadow-sm flex items-center gap-2">
                    <Briefcase className="w-8 h-8 text-green-600" /> Agent Full Registration
                </h2>
                <p className="text-lg text-gray-700 text-center mb-6">
                    {currentPhaseData.description}
                </p>

                <form onSubmit={(e) => { e.preventDefault(); handleNextPhase(); }} className="w-full space-y-5">
                    {formErrors.apiError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline ml-2">{formErrors.apiError}</span>
                        </div>
                    )}

                    {currentPhaseData.content(formData, handleInputChange, formErrors, termsAccepted, setTermsAccepted)}

                    <div className="flex justify-between mt-6">
                        <button
                            type="button" // Important to prevent form submission
                            onClick={handlePrevPhase}
                            disabled={currentPhase === 1 || isLoading}
                            className={cn(
                                "bg-gray-200 text-gray-800 px-4 py-2 rounded transition-colors",
                                currentPhase === 1 || isLoading ? "cursor-not-allowed opacity-50" : "hover:bg-gray-300"
                            )}
                        >
                            Previous
                        </button>
                        <button
                            type="submit"
                            className={cn(
                                "flex items-center justify-center py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg",
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
                                    {isLastPhase ? "Registering..." : "Processing..."}
                                </span>
                            ) : (
                                <>
                                    {isLastPhase ? "Complete Registration" : "Next"}
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default FullAgentRegistrationPage;
