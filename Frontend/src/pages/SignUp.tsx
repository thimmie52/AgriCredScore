import React, { useState, useCallback } from 'react';
import { ArrowRight, Lock, User, Home, Briefcase, Banknote, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


// ===============================
//  Utility - Simplified version of cn
// ===============================
const cn = (...args: any[]) => {

    return args.filter(Boolean).join(' ');
};

// ===============================
//  Button Component (No separate file)
// ===============================
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { children, onClick, className, disabled } = props;
    return (
        <button
            onClick={onClick}
            className={className}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
// ===============================

// ===============================
// Input Component (No separate file)
// ===============================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    required?: boolean; // Added required prop
}
const Input: React.FC<InputProps> = (props) => {
    const { id, value, onChange, placeholder, className, required, ...rest } = props; // Destructured required
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
            required={required} // Used the required prop
            {...rest}
        />
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
// Select Component (No separate file)
// ===============================
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    id: string;
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    className?: string;
    required?: boolean; // Added required prop
}

const Select: React.FC<SelectProps> = (props) => {
    const { id, label, value, onChange, options, className, required, ...rest } = props; // Destructured required
    return (
        <>
            {label && <Label htmlFor={id}>{label}</Label>}
            <select
                id={id}
                value={value}
                onChange={onChange}
                className={cn(
                    "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-lg bg-white",
                    className
                )}
                required={required} // Used the required prop
                {...rest}
            >
                <option value="" disabled>Select an option</option> {/* Added this line */}
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </>
    );
};
// ===============================


// Define the 4 phases of the sign-up process
interface Phase {
    title: string;
    description: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

// Define the type for the form data
interface FormData {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    age: string;
    gender: string;
    education: string;
    maritalStatus: string;
    region: string;
    state: string;
    farmingExperience: string;
    employmentStatus: string;
    loanAmount: string;
    username: string;
    cropType: string;
    livestockType: string;
    livestockNumber: string;
    irrigation: string;
    cropCycles: string;
    technology: string;
    previousLoan: string;
    repaymentstatus: string;
    doYouSaveConsistently: string;
    doYouHaveAccessToFinancialInstitutions: string;
    estimatedAnnualIncome: string;
    doYouOfferExtensionServices: string;
    estimatedDistanceToNearestMarket: string;
    estimatedYieldLastSeason: string;
    inputUsage: string;
    labourType: string;
    password: string;

}

const SignUp = () => {
    const navigate = useNavigate();
    const [currentPhase, setCurrentPhase] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        age: '',
        gender: '',
        education: '',
        maritalStatus: '',
        region: '',
        state: '',
        farmingExperience: '',
        employmentStatus: '',
        loanAmount: '',
        repaymentstatus:'',
        username: '',
        cropType: '',
        livestockType: '',
        livestockNumber:'',
        irrigation: '',
        cropCycles: '',
        technology: '',
        previousLoan: '',
        doYouSaveConsistently: '',
        doYouHaveAccessToFinancialInstitutions: '',
        estimatedAnnualIncome: '',
        doYouOfferExtensionServices: '',
        estimatedDistanceToNearestMarket: '',
        estimatedYieldLastSeason: '',
        inputUsage: '',
        labourType: '',
        password: '',
    });



    // Use useCallback to memoize handleInputChange
    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        },
        []
    );

    const checkRequiredFields = useCallback(
        (phase: number) => {
            let incompleteFields = [];
            switch (phase) {
                case 1:
                    if (!formData.email) incompleteFields.push('Email');
                    if (!formData.firstName) incompleteFields.push('First Name');
                    if (!formData.lastName) incompleteFields.push('Last Name');
                    if (!formData.address) incompleteFields.push('Address');
                    if (!formData.age) incompleteFields.push('Age');
                    if (!formData.gender) incompleteFields.push('Gender');
                    if (!formData.education) incompleteFields.push('Education');
                    if (!formData.maritalStatus) incompleteFields.push('Marital Status');
                    if (!formData.region) incompleteFields.push('Region');
                    if (!formData.state) incompleteFields.push('State');
                    break;
                case 2:
                    if (!formData.farmingExperience) incompleteFields.push('Farming Experience');
                    if (!formData.employmentStatus) incompleteFields.push('Employment Status');
                    if (!formData.cropType) incompleteFields.push('Crop Type');
                    if (!formData.livestockType) incompleteFields.push('Livestock Type');
                    if (!formData.livestockNumber) incompleteFields.push('Livestock Number');                    
                    if (!formData.irrigation) incompleteFields.push('Irrigation');
                    if (!formData.cropCycles) incompleteFields.push('Crop Cycles');
                    if (!formData.technology) incompleteFields.push('Technology');
                    if (!formData.previousLoan) incompleteFields.push('Previous Loan');
                    if (!formData.repaymentstatus) incompleteFields.push('Repayment Status');
                    if (!formData.doYouSaveConsistently) incompleteFields.push('Savings Consistency');
                    if (!formData.doYouHaveAccessToFinancialInstitutions) incompleteFields.push('Access to Financial Institutions');
                    if (!formData.estimatedAnnualIncome) incompleteFields.push('Estimated Annual Income');
                    if (!formData.doYouOfferExtensionServices) incompleteFields.push('Extension Services');
                    if (!formData.estimatedDistanceToNearestMarket) incompleteFields.push('Distance to Market');
                    if (!formData.estimatedYieldLastSeason) incompleteFields.push('Estimated Yield');
                    if (!formData.inputUsage) incompleteFields.push('Input Usage');
                    if (!formData.labourType) incompleteFields.push('Labour Type');
                    break;
                case 3:
                    if (!formData.loanAmount) incompleteFields.push('Loan Amount');
                    break;
                case 4:
                    if (!formData.username) incompleteFields.push('Username');
                    break;
                default:
                    break;
            }
            return incompleteFields;
        },
        [formData]
    );

    

    const nextPhase = () => {
        const incompleteFields = checkRequiredFields(currentPhase);
        if (incompleteFields.length > 0) {
            alert(`Please fill in the following fields: ${incompleteFields.join(', ')}`);
            return; // Stop proceeding if fields are incomplete
        }

        if (currentPhase < phases.length) {
            setCurrentPhase(currentPhase + 1);
        }
    };

    const prevPhase = () => {
        if (currentPhase > 1) {
            setCurrentPhase(currentPhase - 1);
        }
    };


    const renderPhaseContent = () => {
        switch (currentPhase) {
            case 1:
                return (
                    <>
                        <div className="mb-4">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Enter your first name"
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Enter your last name"
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Enter your address"
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="age">Age</Label>
                            <Input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                placeholder="Enter your age"
                                required // Added required

                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="gender">Gender</Label>
                            <Select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                options={["Male", "Female"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="education">Education</Label>
                            <Select
                                id="education"
                                name="education"
                                value={formData.education}
                                onChange={handleInputChange}
                                options={["Secondary", "Primary", "Tertiary"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="maritalStatus">Marital Status</Label>
                            <Select
                                id="maritalStatus"
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleInputChange}
                                options={["Single", "Married", "Divorced"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="region">Region</Label>
                            <Select
                                id="region"
                                name="region"
                                value={formData.region}
                                onChange={handleInputChange}
                                options={["North West", "South South", "North Central", "South West", "South East", "North East"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="state">State</Label>
                            <Select
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                options={[
                                    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta",
                                    "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
                                    "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
                                    "Yobe", "Zamfara", "FCT"
                                ]}
                                required // Added required
                            />
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="mb-4">
                            <Label htmlFor="farmingExperience">Farming Experience (Years)</Label>
                            <Input
                                type="number"
                                id="farmingExperience"
                                name="farmingExperience"
                                value={formData.farmingExperience}
                                onChange={handleInputChange}
                                placeholder="Enter your farming experience"
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="employmentStatus">Employment Status</Label>
                            <Input
                                type="text"
                                id="employmentStatus"
                                name="employmentStatus"
                                value={formData.employmentStatus}
                                onChange={handleInputChange}
                                placeholder="Enter your employment status"
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="cropType">What is the major Crop you plant?</Label>
                            <Select
                                id="cropType"
                                name="cropType"
                                value={formData.cropType}
                                onChange={handleInputChange}
                                options={['Sesame', 'Rice', 'Yam', 'Groundnut', 'Cowpea', 'Oil Palm', 'Cassava', 'Rubber',
                                    'Cotton', 'Vegetables', 'Plantain', 'Beans', 'Cocoa', 'Maize', 'Soybeans',
                                    'Sorghum', 'Millet']}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="livestockType">What is the major Livestock you rare?</Label>
                            <Select
                                id="livestockType"
                                name="livestockType"
                                value={formData.livestockType}
                                onChange={handleInputChange}
                                options={['Poultry', 'Cattle', 'Goats', 'Pigs', 'Sheep']}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="livestockNumber">Livestock Number</Label>
                            <Input
                                type="number"
                                id="livestockNumber"
                                name="livestockNumber"
                                value={formData.livestockNumber}
                                onChange={handleInputChange}
                                placeholder="How many livestocks do you have"
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="irrigation">Do you use Irrigation?</Label>
                            <Select
                                id="irrigation"
                                name="irrigation"
                                value={formData.irrigation}
                                onChange={handleInputChange}
                                options={["Yes", "No"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="cropCycles">Number of crop cycles per year </Label>
                            <Input
                                type="number"
                                id="cropCycles"
                                name="cropCycles"
                                value={formData.cropCycles}
                                onChange={handleInputChange}
                                placeholder="Enter the number of crop cycles"
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="technology">Do you use Technology in farming?</Label>
                            <Select
                                id="technology"
                                name="technology"
                                value={formData.technology}
                                onChange={handleInputChange}
                                options={["Yes", "No"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="previousLoan">Do you have a Previous Loan?</Label>
                            <Select
                                id="previousLoan"
                                name="previousLoan"
                                value={formData.previousLoan}
                                onChange={handleInputChange}
                                options={["Yes", "No"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="repaymentstatus">Previous Loan Repayment Status</Label>
                            <Select
                                id="repaymentstatus"
                                name="repaymentstatus"
                                value={formData.repaymentstatus}
                                onChange={handleInputChange}
                                options={["Paid on Time", "Defaulted", "Late"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="doYouSaveConsistently">Do you save consistently?</Label>
                            <Select
                                id="doYouSaveConsistently"
                                name="doYouSaveConsistently"
                                value={formData.doYouSaveConsistently}
                                onChange={handleInputChange}
                                options={["Yes", "No"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="doYouHaveAccessToFinancialInstitutions">Do you have access to Financial Institutions?</Label>
                            <Select
                                id="doYouHaveAccessToFinancialInstitutions"
                                name="doYouHaveAccessToFinancialInstitutions"
                                value={formData.doYouHaveAccessToFinancialInstitutions}
                                onChange={handleInputChange}
                                options={["Yes", "No"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="estimatedAnnualIncome">What is your estimated annual income?</Label>
                            <Input
                                type="number"
                                id="estimatedAnnualIncome"
                                name="estimatedAnnualIncome"
                                value={formData.estimatedAnnualIncome}
                                onChange={handleInputChange}
                                placeholder="Enter your estimated annual income"
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="doYouOfferExtensionServices">Do you offer extension services?</Label>
                            <Select
                                id="doYouOfferExtensionServices"
                                name="doYouOfferExtensionServices"
                                value={formData.doYouOfferExtensionServices}
                                onChange={handleInputChange}
                                options={["Yes", "No"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="estimatedDistanceToNearestMarket">What is your estimated distance to the nearest market? (Kilometers)</Label>
                            <Input
                                type="text"
                                id="estimatedDistanceToNearestMarket"
                                name="estimatedDistanceToNearestMarket"
                                value={formData.estimatedDistanceToNearestMarket}
                                onChange={handleInputChange}
                                placeholder="Enter the estimated distance"
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="estimatedYieldLastSeason">What is your estimated yield or revenue last season?</Label>
                            <Input
                                type="text"
                                id="estimatedYieldLastSeason"
                                name="estimatedYieldLastSeason"
                                value={formData.estimatedYieldLastSeason}
                                onChange={handleInputChange}
                                placeholder="Enter your estimated yield"
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="inputUsage">Do you use essential inputs like fertilizers, seeds, pesticides?</Label>
                            <Select
                                id="inputUsage"
                                name="inputUsage"
                                value={formData.inputUsage}
                                onChange={handleInputChange}
                                options={["All", "Some", "None"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="labourType">What is your major source of labour?</Label>
                            <Select
                                id="labourType"
                                name="labourType"
                                value={formData.labourType}
                                onChange={handleInputChange}
                                options={["Family", "Hired", "Both"]}
                                required // Added required
                            />
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <div className="mb-4">
                            <Label htmlFor="loanAmount">Loan Amount Requested</Label>
                            <Input
                                type="number"
                                id="loanAmount"
                                name="loanAmount"
                                value={formData.loanAmount}
                                onChange={handleInputChange}
                                placeholder="Enter the loan amount"
                                required // Added required
                            />
                        </div>
                    </>
                );
            case 4:
                return (
                    <>
                        <div className="mb-4">
                            <Label htmlFor="username">Unique Username</Label>
                            <Input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Enter your username"
                                required // Added required
                            />
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="text"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Choose a suitable password"
                                required // Added required
                            />
                        </div>
                        <p className="text-gray-500 text-sm">
                            Almost done!  Just create a unique username and a Password
                        </p>
                    </>
                );
            default:
                return null;
        }
    };

    const phases: Phase[] = [
        {
            title: 'Personal Information',
            description: 'Tell us about yourself.',
            icon: <User className="w-6 h-6 text-green-500" />,
            content: renderPhaseContent(),
        },
        {
            title: 'Farming & Employment',
            description: 'Your farming and employment details.',
            icon: <Briefcase className="w-6 h-6 text-green-500" />,
            content: renderPhaseContent(),
        },
        {
            title: 'Loan Information',
            description: 'Details about your loan request.',
            icon: <Banknote className="w-6 h-6 text-green-500" />,
            content: renderPhaseContent(),
        },
        {
            title: 'Create Username',
            description: 'Create a unique username.',
            icon: <Lock className="w-6 h-6 text-green-500" />,
            content: renderPhaseContent(),
        },
    ];

    const currentPhaseData = phases[currentPhase - 1];

    // Function to determine if it's the last phase
    const isLastPhase = currentPhase === phases.length;

    const handleFinalSubmit = async () => {

        const payload = {
          FirstName: formData.firstName,
          LastName: formData.lastName,
          Age: parseInt(formData.age) || 0, // Ensures it's a number, or defaults to 0 if missing
          Gender: formData.gender || "string", // Defaulting to "string" if missing
          Education: formData.education || "string",
          Marital_Status: formData.maritalStatus || "string",
          Region: formData.region || "string",
          State: formData.state || "string",
          Farm_Size: parseFloat(formData.farmingExperience) || 0, // Ensures it's a number
          Crop_Type: formData.cropType || "string",
          Livestock_Type: formData.livestockType || "string",
          Livestock_Number: parseInt(formData.livestockNumber) || 0, // Defaults to 0 if missing
          Irrigation: formData.irrigation || "string",
          Crop_Cycles: parseInt(formData.cropCycles) || 0, // Ensures it's a number
          Technology_Use: formData.technology || "string",
          Previous_Loans: formData.previousLoan || "string",
          Loan_Amount: parseFloat(formData.loanAmount) || 0, // Ensures it's a number
          Repayment_Status: formData.repaymentstatus || "string",
          Savings_Behavior: formData.doYouSaveConsistently || "string",
          Financial_Access: formData.doYouHaveAccessToFinancialInstitutions || "string",
          Annual_Income: parseFloat(formData.estimatedAnnualIncome) || 0, // Ensures it's a number
          Extension_Services: formData.doYouOfferExtensionServices || "string",
          Market_Distance: parseFloat(formData.estimatedDistanceToNearestMarket) || 0, // Ensures it's a number
          Yield_Per_Season: parseFloat(formData.estimatedYieldLastSeason) || 0, // Ensures it's a number
          Input_Usage: formData.inputUsage || "string",
          Labor: formData.labourType || "string",
          Username: formData.username || "string", // Assuming username is a required field
          Password : formData.password || "string",
        };
      
        try {
          const response = await fetch("https://modelscoringapi.onrender.com/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            alert("User successfully saved!");
            navigate(`/profile/${formData.username}`); // React-router way to navigate to the profile page
        } else {
            const errorText = await response.text();
            alert(`Failed to submit: ${errorText}`);
        }
      

        } catch (error) {
          console.error("Submission error:", error);
          alert("Error submitting form.");
        }
      };
      
      
      
      


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Kuda-inspired App Bar */}
            <header className="bg-green-500 py-4 px-6">
                <div className="flex items-center justify-between">
                    <a href="/" className="text-white text-xl font-bold">
                        Bridge
                    </a>
                    {/* Home button/link  */}
                    <a href="/" className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
                        <Home className="h-6 w-6 text-white" />
                    </a>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-md shadow-lg rounded-md bg-white p-6">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                        {currentPhaseData.icon}
                        {currentPhaseData.title}
                    </h2>
                    <p className="text-gray-500 mb-6">{currentPhaseData.description}</p>
                    <div className="space-y-4">
                        {currentPhaseData.content}
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={prevPhase}
                            disabled={currentPhase === 1}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                        >
                            Previous
                        </button>
                        <Button
                            onClick={isLastPhase ? handleFinalSubmit : nextPhase}
                            className="text-white px-6 py-2 rounded bg-green-600 hover:bg-green-700"
                        >
                            {isLastPhase ? (
                                <>
                                    Complete <CheckCircle className="ml-2 w-5 h-5" />
                                </>
                            ) : (
                                <>
                                    Next <ArrowRight className="ml-2 w-5 h-5" />
                                </>
                            )}
                        </Button>

            
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SignUp;

