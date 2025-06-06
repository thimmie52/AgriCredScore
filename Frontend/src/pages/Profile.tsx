import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importing directly from react-router-dom
import { MessageSquare, LayoutDashboard, Landmark, Calculator, Settings } from "lucide-react"; // Importing icons

// The Profile Component - fetches and displays user data
const Profile = () => {
    type UserData = {
    username: string;
    password: string;
    Repayment_status: number;
    credit_score: number;
    data: Record<string, any>; // or a specific type if you know the structure
};
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useParams will now dynamically read the username from the URL (e.g., /profile/fj90167)
    const { username } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Actual API call using the 'username' from useParams
                const response = await fetch(`https://modelscoringapi.onrender.com/get-user/${username}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error(`User "${username}" not found.`);
                    }
                    throw new Error(`Failed to fetch user data: ${response.statusText}`);
                }
                const data = await response.json();
                setUserData(data);
                setLoading(false);
            } 
            catch (err) {
                console.error("Error fetching user data:", err);
                setError((err as Error).message || 'An unexpected error occurred.');
                setLoading(false);
            }
        };
        fetchUserData();
    }, [username]); // Effect dependency ensures refetch if username in URL changes

    const handleChatClick = () => {
        // Navigates to the AI chat page for the current user
        navigate(`/aichat/${username}`);
    };

    // Loading State UI
    if (loading) {
        return (
            <div className="flex items-center justify-center w-full min-h-screen p-4 font-sans">
                <div className="w-full max-w-xl shadow-lg rounded-lg bg-white p-6 animate-pulse">
                    <div className="border border-gray-200 rounded-lg mb-4 p-4">
                        <div className="h-6 w-1/2 bg-gray-200 rounded-md mb-2"></div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="h-8 w-full bg-gray-200 rounded-md mb-2"></div>
                        <div className="h-8 w-full bg-gray-200 rounded-md mb-2"></div>
                        <div className="h-8 w-full bg-gray-200 rounded-md"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Error State UI
    if (error) {
        return (
            <div className="flex items-center justify-center w-full min-h-screen p-4 font-sans">
                <div className="w-full max-w-xl p-6 border border-red-600 rounded-lg bg-red-50 text-red-700 shadow-md">
                    <div className="flex items-center mb-2">
                        <h2 className="text-xl font-bold">Error</h2>
                    </div>
                    <p className="text-base">{error}</p>
                </div>
            </div>
        );
    }

    // No Data State UI (e.g., if API returns 200 but no data)
    if (!userData) {
        return (
            <div className="flex items-center justify-center w-full min-h-screen p-4 font-sans">
                <div className="w-full max-w-xl p-6 border border-yellow-600 rounded-lg bg-yellow-50 text-yellow-700 shadow-md">
                    <div className="flex items-center mb-2">
                        <h2 className="text-xl font-bold">No User Data</h2>
                    </div>
                    <p className="text-base">No user data available. This might happen if the API returned an empty response.</p>
                </div>
            </div>
        );
    }

    // Main Profile Display UI
    return (
        <div className="flex items-center justify-center w-full min-h-screen p-4 font-sans">
            <div className="w-full max-w-xl shadow-2xl rounded-xl bg-white p-8 border border-blue-200 transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <div className="flex justify-between items-center mb-6 border-b pb-4 border-blue-100">
                    <h2 className="text-3xl font-extrabold text-gray-800">
                        User Profile: <span className="text-green-600">{userData.username}</span>
                    </h2>
                    <button
                        onClick={handleChatClick}
                        className="bg-emerald-100 text-emerald-700 px-5 py-2.5 rounded-full border border-emerald-300 cursor-pointer transition-all duration-300 ease-in-out flex items-center shadow-md hover:bg-emerald-200 hover:text-emerald-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                    >
                        <MessageSquare className="mr-2 w-4 h-4" />
                        Chat with AI
                    </button>
                </div>

                <div className="mb-4">
                    <span className="font-semibold text-gray-600 text-lg">First Name:</span>
                    <p className="text-gray-800 text-xl mt-1">{userData.data?.FirstName || 'N/A'}</p>
                </div>
                <div className="mb-4">
                    <span className="font-semibold text-gray-600 text-lg">Last Name:</span>
                    <p className="text-gray-800 text-xl mt-1">{userData.data?.LastName || 'N/A'}</p>
                </div>
                <div className="mb-4">
                    <span className="font-semibold text-gray-600 text-lg">Age:</span>
                    <p className="text-gray-800 text-xl mt-1">{userData.data?.Age || 'N/A'}</p>
                </div>
                <div className="mb-4">
                    <span className="font-semibold text-gray-600 text-lg">Credit Score:</span>
                    <div className={`inline-block px-4 py-1.5 rounded-full text-white text-lg font-medium shadow-sm mt-1
                        ${(userData.credit_score || 0) > 700 ? 'bg-green-600' : (userData.credit_score || 0) > 600 ? 'bg-amber-500' : 'bg-red-600'}`}>
                        {userData.credit_score || 'N/A'}
                    </div>
                </div>
                <div>
                    <span className="font-semibold text-gray-600 text-lg">Repayment Status:</span>
                    <div className={`inline-block px-4 py-1.5 rounded-full text-white text-lg font-medium shadow-sm mt-1
                        ${userData.Repayment_status >= 70 ? 'bg-green-600' : userData.Repayment_status >= 50 ?'bg-red-600':'bg-yellow-600' }`}>
                        {userData.Repayment_status.toFixed(2) || 'N/A'}
                    </div>
                </div>
            </div>
        </div>
    );
};

// The main App Component - sets up the sidebar and routes content
const App = () => {
    const [activeButton, setActiveButton] = useState('overview'); // State to manage active button

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
            {/* Sidebar */}
            <aside className="w-full md:w-80 bg-white shadow-xl p-6 md:p-8 flex flex-col items-center md:items-start border-b md:border-r border-blue-100">
                <h1 className="text-3xl font-extrabold text-green-700 mb-8 mt-4 md:mt-0">Dashboard</h1>
                <nav className="w-full">
                    <ul className="space-y-4">
                        <li>
                            <button
                                className={`flex items-center w-full px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200
                                    ${activeButton === 'overview' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-green-100 hover:text-blue-700'}`}
                                onClick={() => setActiveButton('overview')}
                            >
                                <LayoutDashboard className="mr-3 w-5 h-5" />
                                Overview
                            </button>
                        </li>
                        <li>
                            <button
                                className={`flex items-center w-full px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200
                                    ${activeButton === 'loans' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-green-100 hover:text-blue-700'}`}
                                onClick={() => setActiveButton('loans')}
                            >
                                <Landmark className="mr-3 w-5 h-5" />
                                Loans
                            </button>
                        </li>
                        <li>
                            <button
                                className={`flex items-center w-full px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200
                                    ${activeButton === 'recalculate' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-green-100 hover:text-blue-700'}`}
                                onClick={() => setActiveButton('recalculate')}
                            >
                                <Calculator className="mr-3 w-5 h-5" />
                                Recalculate Score
                            </button>
                        </li>
                        <li>
                            <button
                                className={`flex items-center w-full px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200
                                    ${activeButton === 'settings' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-green-100 hover:text-blue-700'}`}
                                onClick={() => setActiveButton('settings')}
                            >
                                <Settings className="mr-3 w-5 h-5" />
                                Settings
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main content area */}
            <main className="flex-1 overflow-auto flex items-center justify-center">
                {/* Conditionally render content based on active button */}
                {activeButton === 'overview' && <Profile />}
                {activeButton === 'loans' && (
                    <div className="flex items-center justify-center p-4 w-full">
                        <div className="bg-white p-8 rounded-xl shadow-2xl border border-blue-200 text-gray-800 text-2xl font-bold">Loans Page Content</div>
                    </div>
                )}
                {activeButton === 'recalculate' && (
                    <div className="flex items-center justify-center p-4 w-full">
                        <div className="bg-white p-8 rounded-xl shadow-2xl border border-blue-200 text-gray-800 text-2xl font-bold">Recalculate Score Content</div>
                    </div>
                )}
                {activeButton === 'settings' && (
                    <div className="flex items-center justify-center p-4 w-full">
                        <div className="bg-white p-8 rounded-xl shadow-2xl border border-blue-200 text-gray-800 text-2xl font-bold">Settings Content</div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;