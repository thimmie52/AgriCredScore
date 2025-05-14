import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

interface ChatMessage {
    role: 'user' | 'ai';
    parts: string;
}

interface UserProfile {
    name: string;
    email: string;
    age: number;
    loanAmount: number;
    creditScore: number;
    repaymentProbability: number;
    employmentStatus?: string;
    income?: number;
    maritalStatus?: string;
    education?: string;
    profilePicture?: string;
    gender?: string;
    technologyUse?: string;
}

const UserDetailsPage = () => {
    const { username } = useParams<{ username: string }>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [, setMessages] = useState<ChatMessage[]>([]);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [aiOutput, setAiOutput] = useState<string | null>(null);
    const [loadingAI, setLoadingAI] = useState(false);

    // Fetch user details on load
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`https://modelscoringapi.onrender.com/get-user/${username}`);
                if (!response.ok) throw new Error("Failed to fetch user details");

                const data = await response.json();

                const userData: UserProfile = {
                    name: `${data.data?.FirstName || "Unknown"} ${data.data?.LastName || ""}`,
                    email: `${username}@gmail.com`,
                    age: data.data?.Age ?? 0,
                    gender: data.data?.Gender === 1 ? "Male" : "Female",
                    maritalStatus: data.data?.Marital_Status === 1 ? "Married" : "Single",
                    education: data.data?.Education === 1 ? "Tertiary" : "No Tertiary",
                    loanAmount: data.data?.Loan_Amount ?? 0,
                    income: data.data?.Annual_Income ?? 0,
                    creditScore: data.credit_score ?? 0,
                    repaymentProbability: data.Repayment_status ?? 0,
                    technologyUse: data.data?.Technology_Use === 1 ? "Uses Modern Tech" : "Does Not Use Tech",
                    profilePicture: `https://picsum.photos/seed/${username}/100/100`
                };

                setUserProfile(userData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [username]);

    // Trigger AI message generation when userProfile is ready
    useEffect(() => {
        if (userProfile) {
            handleSendMessage(userProfile);
        }
    }, [userProfile]);

    const handleSendMessage = async (profile: UserProfile) => {
        setLoadingAI(true);

        try {
            const res = await fetch('https://agricredscoreai.onrender.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: "You are to provide insights to the lender on this individual based on his profile, advise him briefly on whether he can be creditworthy. feel free to say he is not",
                    profile,
                }),
            });

            if (!res.ok) throw new Error('Failed to get AI response');

            const data = await res.json();
            setAiOutput(data.response);
            const aiMessage: ChatMessage = { role: 'ai', parts: data.response };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error communicating with AI:', error);
            setAiOutput('Sorry, there was an error communicating with the AI.');
        } finally {
            setLoadingAI(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-gray-950 text-white p-8">Loading...</div>;
    }

    if (error || !userProfile) {
        return (
            <div className="min-h-screen bg-gray-950 text-white p-8">
                <div className="bg-red-900 border border-red-700 p-4 rounded-lg flex gap-2">
                    <AlertCircle className="w-5 h-5 text-white mt-1" />
                    <div>
                        <p className="font-semibold">Error loading user details</p>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <header className="py-4 px-6 bg-gray-900 border-b border-gray-800">
                <h1 className="text-2xl font-bold">User Details</h1>
            </header>
            <main className="container mx-auto py-8 px-4 sm:px-0">
                <div className="max-w-xl mx-auto bg-gray-900 border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <img
                            src={userProfile.profilePicture}
                            alt={userProfile.name}
                            className="w-16 h-16 rounded-full border border-green-500"
                        />
                        <div>
                            <h2 className="text-xl font-semibold">{userProfile.name}</h2>
                            <p className="text-gray-400">{userProfile.email}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p><span className="font-semibold text-gray-300">Age:</span> {userProfile.age}</p>
                        <p><span className="font-semibold text-gray-300">Gender:</span> {userProfile.gender}</p>
                        <p><span className="font-semibold text-gray-300">Marital Status:</span> {userProfile.maritalStatus}</p>
                        <p><span className="font-semibold text-gray-300">Education:</span> {userProfile.education}</p>
                        <p><span className="font-semibold text-gray-300">Loan Amount:</span> ₦{userProfile.loanAmount.toLocaleString()}</p>
                        <p><span className="font-semibold text-gray-300">Annual Income:</span> ₦{userProfile.income?.toLocaleString()}</p>
                        <p><span className="font-semibold text-gray-300">Credit Score:</span> {userProfile.creditScore}</p>
                        <p>
                            <span className="font-semibold text-gray-300">Repayment Probability:</span>{' '}
                            <span className={
                                userProfile.repaymentProbability >= 70
                                    ? "text-green-400"
                                    : userProfile.repaymentProbability >= 60
                                        ? "text-yellow-400"
                                        : "text-red-400"
                            }>
                                {userProfile.repaymentProbability.toFixed(2)}%
                            </span>
                        </p>
                        <p><span className="font-semibold text-gray-300">Technology Use:</span> {userProfile.technologyUse}</p>
                    </div>

                    <div className="max-w-xl mx-auto mt-6 bg-gray-900 border border-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-2 text-white">AI Recommendation</h3>
                        <div className="rounded-md bg-gray-800 p-4 text-sm text-gray-300 border border-dashed border-gray-700 min-h-[120px]">
                            {
                                loadingAI
                                    ? <p className="italic text-gray-500">Analyzing user profile with AI...</p>
                                    : aiOutput
                                        ? <p>{aiOutput}</p>
                                        : <p className="italic text-gray-500">No recommendation yet.</p>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDetailsPage;
