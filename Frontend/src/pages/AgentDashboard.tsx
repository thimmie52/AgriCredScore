import  { useState, useEffect } from 'react';
import { Home, Mail, MapPin } from 'lucide-react'; // Removed Users, DollarSign, Calendar, Target, CheckCircle, XCircle
import { useNavigate, useParams } from 'react-router-dom';

// Utility for combining Tailwind classes

// Dummy data interfaces
interface AgentInfo {
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
    yearsOfExperience: number;
    areaOfExpertise: string;
    state: string;
    lga: string;
    assignedCommunities: string[] | string | null; // This will be joined for display
    isFullTime: boolean;
    profilePicture?: string;
}

// Removed FarmerMetric and PerformanceMetric interfaces as they are not used for now.

const AgentDashboardPage = () => {
    const navigate = useNavigate();
    const { username } = useParams(); // Get username from URL parameters
    const [agentInfo, setAgentInfo] = useState<AgentInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch agent data
    useEffect(() => {
        const fetchData = async () => {
            if (!username) {
                setError("Agent username not provided in URL.");
                setLoading(false);
                return;
            }

            try {
                // --- Fetch Agent Info from API ---
                const agentResponse = await fetch(`https://modelscoringapi.onrender.com/get-agent/${username}`);
                if (!agentResponse.ok) {
                    const errorData = await agentResponse.json();
                    throw new Error(errorData.detail || `Failed to fetch agent profile for ${username}.`);
                }
                const fetchedAgentData: AgentInfo = await agentResponse.json();

                setAgentInfo({
                    ...fetchedAgentData,
                    // Ensure assignedCommunities is an array, even if API returns string or null
                    assignedCommunities: Array.isArray(fetchedAgentData.assignedCommunities)
                        ? fetchedAgentData.assignedCommunities
                        : (typeof fetchedAgentData.assignedCommunities === 'string'
                            ? fetchedAgentData.assignedCommunities.split(',').map(s => s.trim())
                            : []),
                    profilePicture: fetchedAgentData.profilePicture || `https://placehold.co/100x100/10b981/ffffff?text=${fetchedAgentData.firstName[0]}${fetchedAgentData.lastName[0]}`
                });

            } catch (err: any) {
                setError(err.message || 'Failed to load agent dashboard data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [username]); // Rerun effect if username changes

    // Removed performanceMetrics as it was dependent on farmers data.

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex flex-col items-center p-4">
                <header className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-600 to-green-700 py-4 px-6 shadow-xl z-10 w-full">
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        <div className="h-6 w-32 bg-green-800 rounded animate-pulse"></div>
                        <div className="h-10 w-10 bg-green-800 rounded-full animate-pulse"></div>
                    </div>
                </header>
                <main className="container mx-auto mt-20 p-8 bg-white rounded-xl shadow-2xl animate-pulse w-full max-w-4xl">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b pb-6 mb-6">
                        <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse flex-shrink-0"></div>
                        <div className="text-center md:text-left w-full">
                            <div className="h-8 w-3/4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-6 w-1/2 bg-gray-200 rounded mb-4"></div>
                            <div className="h-4 w-2/3 bg-gray-200 rounded mb-1"></div>
                            <div className="h-4 w-1/2 bg-gray-200 rounded mb-1"></div>
                            <div className="h-4 w-3/4 bg-gray-200 rounded mb-1"></div>
                            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                    <div className="h-20 bg-gray-200 rounded mb-6"></div> {/* Placeholder for performance metrics if they were here */}
                    <div className="h-16 bg-gray-200 rounded"></div> {/* Placeholder for table if it were here */}
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex flex-col items-center p-4">
                <header className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-600 to-green-700 py-4 px-6 shadow-xl z-10 w-full">
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        <a href="/" className="text-white text-2xl font-extrabold tracking-wide no-underline">Bridge</a>
                        <a href="/" className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200 no-underline">
                            <Home className="h-6 w-6 text-white" />
                        </a>
                    </div>
                </header>
                <main className="container mx-auto mt-20 p-8 bg-white rounded-xl shadow-2xl w-full max-w-md">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline ml-2">{error}</span>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 w-full py-3 px-6 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                    >
                        Go to Home
                    </button>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-4">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-600 to-green-700 py-4 px-6 shadow-xl z-10 w-full">
                <div className="flex items-center justify-between max-w-8xl mx-auto">
                    <a href="/" className="text-white text-2xl font-extrabold tracking-wide no-underline">
                        Bridge
                    </a>
                    <a href="/" className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200 no-underline">
                        <Home className="h-6 w-6 text-white" />
                    </a>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto mt-20 p-8 bg-white rounded-xl shadow-2xl w-full max-w-4xl">
                {agentInfo && (
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b pb-6 mb-6">
                        <img
                            src={agentInfo.profilePicture}
                            alt={`${agentInfo.firstName} ${agentInfo.lastName}`}
                            className="w-24 h-24 rounded-full border-4 border-green-500 shadow-md flex-shrink-0"
                            onError={(e) => {
                                e.currentTarget.src = `https://placehold.co/100x100/10b981/ffffff?text=${agentInfo.firstName[0]}${agentInfo.lastName[0]}`;
                            }}
                        />
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-800">{agentInfo.firstName} {agentInfo.lastName}</h1>
                            <p className="text-green-600 text-lg">{agentInfo.organization}</p>
                            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-1 text-sm mt-1">
                                <Mail className="w-4 h-4 text-gray-500" /> {agentInfo.email}
                            </p>
                            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-1 text-sm">
                                <MapPin className="w-4 h-4 text-gray-500" /> {agentInfo.lga}, {agentInfo.state}
                            </p>
                            <p className="text-gray-600 text-sm mt-2">
                                <span className="font-semibold">Expertise:</span> {agentInfo.areaOfExpertise} ({agentInfo.yearsOfExperience} yrs)
                            </p>
                            <p className="text-gray-600 text-sm">
                                <span className="font-semibold">Communities:</span>{' '}
                                {Array.isArray(agentInfo.assignedCommunities)
                                    ? agentInfo.assignedCommunities.join(', ')
                                    : agentInfo.assignedCommunities
                                    ? agentInfo.assignedCommunities
                                    : 'N/A'}
                            </p>
                            <p className="text-gray-600 text-sm">
                                <span className="font-semibold">Status:</span> {agentInfo.isFullTime ? 'Full-time Agent' : 'Part-time Agent'}
                            </p>
                        </div>
                    </div>
                )}

                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Agent Overview</h2>
                {/* Placeholder for other agent-specific performance metrics if needed */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 text-center text-gray-700">
                    <p className="text-lg">This section can be expanded with more agent-specific data like number of applications processed, success rates, etc.</p>
                </div>

                {/* Removed the "Managed Farmers" table section */}
            </main>
        </div>
    );
};

export default AgentDashboardPage;
