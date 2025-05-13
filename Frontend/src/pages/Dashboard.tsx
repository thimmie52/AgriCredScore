import { useState, useEffect } from 'react';
import { AlertCircle, Users, ChevronRight } from "lucide-react";

interface User {
    id: number;
    name: string;
    email: string;
    repaymentProbability: number;
    loanAmount: number;
    creditScore: number;
    age: number;
    profilePicture?: string;
}

const DashboardPage = () => {
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://modelscoringapi.onrender.com/get-all-users?order=desc');
                if (!response.ok) {
                    throw new Error(`Failed to fetch users: ${response.status}`);
                }

                const data: any[] = await response.json();

                const usersWithDetails: User[] = data.map((user, index) => ({
                    id: index,
                    name: `${user.data?.FirstName || "Unknown"} ${user.data?.LastName || ""}`,
                    email: user.data?.email || `${user.username}@gmail.com`,
                    repaymentProbability: user.Repayment_status,
                    loanAmount: user.data?.Loan_Amount ?? 0,
                    creditScore: user.credit_score ?? 0,
                    age: user.data?.Age ?? 0,
                    profilePicture: `https://picsum.photos/id/${index}/100/100`,
                }));

                setUsers(usersWithDetails);
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching users.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading || !users) {
        return (
            <div className="min-h-screen bg-gray-950 text-white">
                <header className="py-4 px-6 bg-gray-900 border-b border-gray-800">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                </header>
                <div className="container mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-4 animate-pulse">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-gray-800 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-800 rounded w-3/4" />
                                    <div className="h-3 bg-gray-700 rounded w-1/2" />
                                </div>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="h-3 bg-gray-700 rounded w-1/2" />
                                <div className="h-3 bg-gray-700 rounded w-1/3" />
                                <div className="h-3 bg-gray-700 rounded w-1/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-950 text-white">
                <header className="py-4 px-6 bg-gray-900 border-b border-gray-800">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                </header>
                <div className="container mx-auto py-8">
                    <div className="bg-red-900 border border-red-700 p-4 rounded-lg flex gap-2">
                        <AlertCircle className="w-5 h-5 text-white mt-1" />
                        <div>
                            <p className="font-semibold">Error loading users</p>
                            <p>{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <header className="py-4 px-6 bg-gray-900 border-b border-gray-800">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-400">Users: {users.length}</span>
                    </div>
                </div>
            </header>

            <main className="container mx-auto py-8">
                <h2 className="text-3xl font-semibold text-center mb-6">Top Users by Repayment Probability</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-gray-900 border border-gray-800 rounded-lg hover:shadow-lg transition-all p-4"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={user.profilePicture}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full border border-green-500"
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/id/${user.id}/100/100`;
                                    }}
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{user.name}</h3>
                                    <p className="text-sm text-gray-400">{user.email}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-300">
                                    <span className="font-semibold">Repayment Probability:</span>{' '}
                                    <span className={
                                        user.repaymentProbability >= 70
                                            ? "text-green-400"
                                            : user.repaymentProbability >= 60
                                                ? "text-yellow-400"
                                                : "text-red-400"
                                    }>
                                        {user.repaymentProbability.toFixed(2)}%
                                    </span>
                                </p>
                                <p className="text-gray-300">
                                    <span className="font-semibold">Loan Amount:</span> ₦{user.loanAmount.toLocaleString()}
                                </p>
                                <p className="text-gray-300">
                                    <span className="font-semibold">Credit Score:</span> {user.creditScore}
                                </p>
                                <p className="text-gray-300">
                                    <span className="font-semibold">Age:</span> {user.age}
                                </p>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button className="text-sm text-gray-300 hover:text-white flex items-center gap-1">
                                    View Details <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
