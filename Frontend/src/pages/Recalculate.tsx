import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {reverseMappings } from "./Mappings";



const cn = (...args: any[]) => {

    return args.filter(Boolean).join(' ');
};

type UserData = {

    Financial_Access: number
    Irrigation: number
    Input_Usage: number
    Crop_Type: number
    Farm_Size: number
    State: number
    Market_Distance: number
    Labor: number
    Repayment_Status: number
    Previous_Loans: number
    Education: number
    LastName: number
    Crop_Cycles: number
    Livestock_Number: number
    Extension_Services: number
    Marital_Status: number
    Gender: number
    Savings_Behavior: number
    Technology_Use: number
    Age: number
    Region: number
    Loan_Amount: number
    FirstName: number
    Annual_Income: number
    Yield_Per_Season: number
    Livestock_Type: number
};

type ScoreResult = {
  credit_score: number;
  Repayment_status: number;
};

// Input Component (No separate file)
// ===============================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    value: string | number;
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

const RecalculateScore = () => {
  const { username } = useParams<{ username: string }>(); // Get username from URL params if you use routing
  const [formData, setFormData] = useState<UserData>({
    Financial_Access: 0,
    Irrigation: 0,
    Input_Usage: 0,
    Crop_Type: 0,
    Farm_Size: 0,
    State: 0,
    Market_Distance: 0,
    Labor: 0,
    Repayment_Status: 0,
    Previous_Loans: 0,
    Education: 0,
    LastName: 0,
    Crop_Cycles: 0,
    Livestock_Number: 0,
    Extension_Services: 0,
    Marital_Status: 0,
    Gender: 0,
    Savings_Behavior: 0,
    Technology_Use: 0,
    Age: 0,
    Region: 0,
    Loan_Amount: 0,
    FirstName: 0,
    Annual_Income: 0,
    Yield_Per_Season: 0,
    Livestock_Type: 0
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Optionally fetch initial user data to prefill form
  useEffect(() => {
    if (!username) return;
    fetch(`https://modelscoringapi.onrender.com/get-user/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((data) => {
        setFormData({
            Financial_Access: data.data?.Financial_Access || "",
            Irrigation: data.data?.Irrigation || "",
            Input_Usage: data.data?.Input_Usage || "",
            Crop_Type: data.data?.Crop_Type || "",
            Farm_Size: data.data?.Farm_Size || 0,
            State: data.data?.State || "",
            Market_Distance: data.data?.Market_Distance || 0,
            Labor: data.data?.Labor || "",
            Repayment_Status: data.data?.Repayment_Status || "",
            Previous_Loans: data.data?.Previous_Loans || "",
            Education: data.data?.Education || "",
            LastName: data.data?.LastName || "",
            Crop_Cycles: data.data?.Crop_Cycles || 0,
            Livestock_Number: data.data?.Livestock_Number || 0,
            Extension_Services: data.data?.Extension_Services || "",
            Marital_Status: data.data?.Marital_Status || "",
            Gender: data.data?.Gender || "",
            Savings_Behavior: data.data?.Savings_Behavior || "",
            Technology_Use: data.data?.Technology_Use || "",
            Age: data.data?.Age || 0,
            Region: data.data?.Region || "",
            Loan_Amount: data.data?.Loan_Amount || 0,
            FirstName: data.data?.FirstName || "",
            Annual_Income: data.data?.Annual_Income || 0,
            Yield_Per_Season: data.data?.Yield_Per_Season || 0,
            Livestock_Type: data.data?.Livestock_Type || ""
        });
      })
      .catch((err) => setError(err.message));
  }, [username]);

    const numberFields = new Set([
    "Age",
    "Farm_Size",
    "Market_Distance",
    "Crop_Cycles",
    "Livestock_Number",
    "Loan_Amount",
    "Annual_Income",
    "Yield_Per_Season"
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
         ...prev,
         [name]: numberFields.has(name) ? Number(value) : value,
        }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Send updated data to backend API
      // Adjust the URL and payload to fit your backend API contract
      const response = await fetch(
        `https://modelscoringapi.onrender.com/update/${username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to recalculate score");
      }

      const data = await response.json();
      setResult({
        credit_score: data.credit_score,
        Repayment_status: data.Repayment_status,
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-blue-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Recalculate Score</h2>

      {error && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

       <div className="mb-4">
            <Label htmlFor="Education">Education</Label>
            <Select
                id="Education"
                name="Education"
                value={reverseMappings.Education[formData.Education]}
                onChange={handleChange}
                options={["Secondary", "Primary", "Tertiary"]}
                required // Added required
            />
        </div>

        <div className="mb-4">
            <Label htmlFor="Gender">Gender</Label>
            <Select
                id="Gender"
                name="Gender"
                value={reverseMappings.Gender[formData.Gender as number]} 
                onChange={handleChange}
                options={["Male", "Female"]}
                required // Added required
            />
        </div>
        
        
        <div className="mb-4">
            <Label htmlFor="Age">Age</Label>
            <Input
                type="number"
                id="Age"
                name="Age"
                value={formData.Age}
                onChange={handleChange}
                placeholder="Enter your Age"
                required // Added required
            />
        </div>
        

        <div className="mb-4">
            <Label htmlFor="Marital_Status">Marital Status</Label>
            <Select
                id="Marital_Status"
                name="Marital_Status"
                value={reverseMappings.Marital_Status[formData.Marital_Status]}
                onChange={handleChange}
                options={["Single", "Married", "Divorced"]}
                required // Added required
            />
        </div>

        <div className="mb-4">
                            <Label htmlFor="Region">Region</Label>
                            <Select
                                id="Region"
                                name="Region"
                                value={reverseMappings.Region[formData.Region]}
                                onChange={handleChange}
                                options={["North West", "South South", "North Central", "South West", "South East", "North East"]}
                                required // Added required
                            />
                        </div>

         <div className="mb-4">
                            <Label htmlFor="State">State</Label>
                            <Select
                                id="State"
                                name="State"
                                value={reverseMappings.State[formData.State]}
                                onChange={handleChange}
                                options={[
                                    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta",
                                    "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
                                    "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
                                    "Yobe", "Zamfara", "FCT"
                                ]}
                                required // Added required
                            />
                        </div>
        <div className="mb-4">
                            <Label htmlFor="Farm_Size">Farming Experience (Years)</Label>
                            <Input
                                type="number"
                                id="Farm_Size"
                                name="Farm_Size"
                                value={formData.Farm_Size.toString()}
                                onChange={handleChange}
                                placeholder="Enter your farming experience"
                                required // Added required
                            />
                        </div>
                    
                        <div className="mb-4">
                            <Label htmlFor="Crop_Type">What is the major Crop you plant?</Label>
                            <Select
                                id="Crop_Type"
                                name="Crop_Type"
                                value={reverseMappings.Crop_Type[formData.Crop_Type]}
                                onChange={handleChange}
                                options={['Sesame', 'Rice', 'Yam', 'Groundnut', 'Cowpea', 'Oil Palm', 'Cassava', 'Rubber',
                                    'Cotton', 'Vegetables', 'Plantain', 'Beans', 'Cocoa', 'Maize', 'Soybeans',
                                    'Sorghum', 'Millet']}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Livestock_Type">What is the major Livestock you rare?</Label>
                            <Select
                                id="Livestock_Type"
                                name="Livestock_Type"
                                value={reverseMappings.Livestock_Type[formData.Livestock_Type]}
                                onChange={handleChange}
                                options={['Poultry', 'Cattle', 'Goats', 'Pigs', 'Sheep']}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Livestock_Number">Livestock Number</Label>
                            <Input
                                type="number"
                                id="Livestock_Number"
                                name="Livestock_Number"
                                value={formData.Livestock_Number.toString()}
                                onChange={handleChange}
                                placeholder="How many livestocks do you have"
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Irrigation">Do you use Irrigation?</Label>
                            <Select
                                id="Irrigation"
                                name="Irrigation"
                                value={reverseMappings.Irrigation[formData.Irrigation]}
                                onChange={handleChange}
                                options={["Yes", "No"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Crop_Cycles">Number of crop cycles per year </Label>
                            <Input
                                type="number"
                                id="Crop_Cycles"
                                name="Crop_Cycles"
                                value={formData.Crop_Cycles.toString()}
                                onChange={handleChange}
                                placeholder="Enter the number of crop cycles"
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Technology_Use">Do you use Technology in farming?</Label>
                            <Select
                                id="Technology_Use"
                                name="Technology_Use"
                                value={reverseMappings.Technology_Use[formData.Technology_Use]}
                                onChange={handleChange}
                                options={["Yes", "No"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Previous_Loans">Do you have a Previous Loan?</Label>
                            <Select
                                id="Previous_Loans"
                                name="Previous_Loans"
                                value={reverseMappings.Previous_Loans[formData.Previous_Loans]}
                                onChange={handleChange}
                                options={["Yes", "No"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Repayment_Status">Previous Loan Repayment Status</Label>
                            <Select
                                id="Repayment_Status"
                                name="Repayment_Status"
                                value={reverseMappings.Repayment_Status[formData.Repayment_Status]}
                                onChange={handleChange}
                                options={["Paid on Time", "Defaulted", "Late"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Savings_Behavior">Do you save consistently?</Label>
                            <Select
                                id="Savings_Behavior"
                                name="Savings_Behavior"
                                value={reverseMappings.Savings_Behavior[formData.Savings_Behavior]}
                                onChange={handleChange}
                                options={["Yes", "No"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Financial_Access">Do you have access to Financial Institutions?</Label>
                            <Select
                                id="Financial_Access"
                                name="Financial_Access"
                                value={reverseMappings.Financial_Access[formData.Financial_Access]}
                                onChange={handleChange}
                                options={["Yes", "No"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Annual_Income">What is your estimated annual income?</Label>
                            <Input
                                type="number"
                                id="Annual_Income"
                                name="Annual_Income"
                                value={formData.Annual_Income.toString()}
                                onChange={handleChange}
                                placeholder="Enter your estimated annual income"
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Extension_Services">Do you offer extension services?</Label>
                            <Select
                                id="Extension_Services"
                                name="Extension_Services"
                                value={reverseMappings.Extension_Services[formData.Extension_Services]}
                                onChange={handleChange}
                                options={["Yes", "No"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Market_Distance">What is your estimated distance to the nearest market? (Kilometers)</Label>
                            <Input
                                type="text"
                                id="Market_Distance"
                                name="Market_Distance"
                                value={formData.Market_Distance.toString()}
                                onChange={handleChange}
                                placeholder="Enter the estimated distance"
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Yield_Per_Season">What is your estimated yield or revenue last season?</Label>
                            <Input
                                type="text"
                                id="Yield_Per_Season"
                                name="Yield_Per_Season"
                                value={formData.Yield_Per_Season.toString()}
                                onChange={handleChange}
                                placeholder="Enter your estimated yield"
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Input_Usage">Do you use essential inputs like fertilizers, seeds, pesticides?</Label>
                            <Select
                                id="Input_Usage"
                                name="Input_Usage"
                                value={reverseMappings.Input_Usage[formData.Input_Usage]}
                                onChange={handleChange}
                                options={["All", "Some", "None"]}
                                required // Added required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Labor">What is your major source of labour?</Label>
                            <Select
                                id="Labor"
                                name="Labor"
                                value={reverseMappings.Labor[formData.Labor]}
                                onChange={handleChange}
                                options={["Family", "Hired", "Both"]}
                                required // Added required
                            />
                        </div>
                    

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Recalculating..." : "Recalculate"}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-green-500 border border-green-300 rounded">
          <h3 className="text-xl font-semibold mb-2">Your Agric Credit Score has been Updated</h3>
          

        </div>
      )}
    </div>
  );
};

export default RecalculateScore;