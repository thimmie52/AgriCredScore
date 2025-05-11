import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageSquare } from "lucide-react"

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { username } = useParams<{ username: string }>();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://modelscoringapi.onrender.com/get-user/${username}`);
                if (!response.ok) {
                    throw new Error('User not found');
                }
                const data = await response.json();
                setUserData(data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchUserData();
    }, [username]);

    const handleChatClick = () => {
        navigate('/chat');
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <div style={{ width: '100%', maxWidth: '600px', padding: '16px' }}>
                    <div style={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px', marginBottom: '16px' }}>
                        <div style={{ height: '24px', width: '50%', backgroundColor: '#f0f0f0', borderRadius: '4px', marginBottom: '8px' }}></div>
                    </div>
                    <div style={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px', marginBottom: '16px' }}>
                        <div style={{ height: '32px', width: '100%', backgroundColor: '#f0f0f0', borderRadius: '4px', marginBottom: '8px' }}></div>
                        <div style={{ height: '32px', width: '100%', backgroundColor: '#f0f0f0', borderRadius: '4px', marginBottom: '8px' }}></div>
                        <div style={{ height: '32px', width: '100%', backgroundColor: '#f0f0f0', borderRadius: '4px' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <div style={{ width: '100%', maxWidth: '600px', padding: '16px', border: '1px solid #dc2626', borderRadius: '8px', backgroundColor: '#fee2e2', color: '#dc2626' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Error</h2>
                    </div>
                    <p style={{ fontSize: '16px' }}>{error}</p>
                </div>
            </div>
        );
    }

    if (!userData) {
        return null;
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '16px' }}>
            <div style={{ width: '100%', maxWidth: '600px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', borderRadius: '8px', backgroundColor: '#fff', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                        User Profile: <span style={{ color: '#2563eb' }}>{userData.username}</span>
                    </h2>
                    <button
                        onClick={handleChatClick}
                        style={{
                            backgroundColor: '#e0f2fe',
                            color: '#065f46',
                            padding: '8px 16px',
                            borderRadius: '20px',  // Make it round
                            border: '1px solid #86efac',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s, color 0.3s',
                            display: 'flex',       // Use flexbox for icon alignment
                            alignItems: 'center',  // Vertically center icon and text
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow
                        }}
                        onMouseOver={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#bbf7d0';
                            (e.currentTarget as HTMLButtonElement).style.color = '#047857';
                        }}
                        onMouseOut={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#e0f2fe';
                            (e.currentTarget as HTMLButtonElement).style.color = '#065f46';
                        }}
                    >
                        <MessageSquare style={{ marginRight: '8px', width: '16px', height: '16px' }} />
                        Chat with AI
                    </button>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontWeight: '500', color: '#4b5563' }}>First Name:</span>
                    <p style={{ fontSize: '18px', color: '#374151' }}>{userData.data.FirstName}</p>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontWeight: '500', color: '#4b5563' }}>Last Name:</span>
                    <p style={{ fontSize: '18px', color: '#374151' }}>{userData.data.LastName}</p>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontWeight: '500', color: '#4b5563' }}>Age:</span>
                    <p style={{ fontSize: '18px', color: '#374151' }}>{userData.data.Age}</p>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontWeight: '500', color: '#4b5563' }}>Credit Score:</span>
                    <div style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '16px', backgroundColor: userData.credit_score > 700 ? '#16a34a' : userData.credit_score > 600 ? '#f59e0b' : '#dc2626', color: '#fff', fontSize: '18px' }}>
                        {userData.credit_score}
                    </div>
                </div>
                <div>
                    <span style={{ fontWeight: '500', color: '#4b5563' }}>Repayment Status:</span>
                    <div style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '16px', backgroundColor: userData.Repayment_status === "Good" ? '#16a34a' : '#dc2626', color: '#fff', fontSize: '18px' }}>
                        {userData.Repayment_status}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
