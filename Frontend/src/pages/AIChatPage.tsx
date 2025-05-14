import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface ChatMessage {
    role: 'user' | 'ai';
    parts: string;
}

interface UserProfile {
    name: string;
    age: number;
    creditScore: number;
    income: number;
    repayment_status: number;
    previous_loans: number;
    crop_type: number;
    livestock_type: number
}

const ChatPage = () => {
    const { username } = useParams<{ username: string }>();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    // 🔗 Fetch user profile from your real backend
    useEffect(() => {
        if (!username) return;

        const fetchUserProfile = async () => {
            try {
                const res = await fetch(`https://modelscoringapi.onrender.com/get-user/${username}`);
                if (!res.ok) throw new Error('User profile not found');
                const data = await res.json();
                setUserProfile(data);
            } catch (err) {
                console.error('Failed to fetch user profile:', err);
                setUserProfile(null);
            }
        };

        fetchUserProfile();
    }, [username]);

    // 🔗 Send message to your Gemini API
    const handleSendMessage = async () => {
        if (!input.trim() || !userProfile) return;

        const newUserMessage: ChatMessage = { role: 'user', parts: input };
        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch('https://agricredscoreai.onrender.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input, // user message
                    profile: userProfile, // the user profile object
                }),
            });

            if (!res.ok) throw new Error('Failed to get AI response');

            const data = await res.json();
            console.log(data)
            const aiMessage: ChatMessage = { role: 'ai', parts: data.response };
            setMessages([...updatedMessages, aiMessage]);
        } catch (error) {
            console.error('Error communicating with AI:', error);
            setMessages([
                ...updatedMessages,
                { role: 'ai', parts: 'Sorry, there was an error communicating with the AI.' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f3f4f6' }}>
            <div style={{ backgroundColor: '#10b981', color: '#fff', padding: '16px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px', marginRight: '8px' }}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <polyline points="7 18 7 12 15 12" />
                </svg>
                <h1 style={{ fontSize: '20px', fontWeight: 'semibold' }}>AI Chat with {username}</h1>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {messages.map((message, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
                        <div style={{
                            borderRadius: '16px',
                            padding: '8px 16px',
                            maxWidth: '70%',
                            backgroundColor: message.role === 'user' ? '#3b82f6' : '#e5e7eb',
                            color: message.role === 'user' ? '#fff' : '#374151'
                        }}>
                            {message.parts}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{ backgroundColor: '#e5e7eb', color: '#374151', borderRadius: '16px', padding: '8px 16px', maxWidth: '70%', display: 'flex', alignItems: 'center' }}>
                            <Loader2 style={{ width: '20px', height: '20px', marginRight: '8px', animation: 'spin 1s linear infinite' }} />
                            Typing...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div style={{ padding: '16px', backgroundColor: '#fff', boxShadow: '0 -2px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                        disabled={isLoading || !userProfile}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isLoading || !userProfile}
                        style={{
                            backgroundColor: '#f0fdf4',
                            color: '#065f46',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s, color 0.3s',
                            display: 'flex',
                            alignItems: 'center',
                            border: 'none',
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;