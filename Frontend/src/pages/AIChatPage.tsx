import React, { useState, useEffect, useRef, useCallback } from 'react';
import {  Loader2 } from 'lucide-react'; // Import icons


// Mock Gemini API (Replace with your actual API integration)
const mockGeminiAPI = {
    sendMessage: async (message: string, history: { role: string; parts: string; }[] = []) => {
        // Simulate a delay for a more realistic chat experience
        await new Promise(resolve => setTimeout(resolve, 500));

        // Basic prompt engineering (replace with more sophisticated logic)
        let response = "";
        if (history.length === 0) {
            response = "Hello! How can I help you today?";
        } else {
            const lastUserMessage = history[history.length - 1].parts;
            if (lastUserMessage.toLowerCase().includes("credit score")) {
                response = "To improve your credit score, focus on timely payments, reduce outstanding debt, and diversify your credit history.";
            } else if (lastUserMessage.toLowerCase().includes("repayment probability")) {
                response = "Repayment probability is influenced by factors like income stability, credit history, and loan amount.  A strong financial track record increases your chances.";
            } else {
                response = "I understand.  Please provide more details so I can assist you better.";
            }
        }

        return {
            text: response,
        };
    },
};

interface ChatMessage {
    role: 'user' | 'ai';
    parts: string;
}

const ChatPage = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Function to scroll to the bottom of the chat
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const newUserMessage: ChatMessage = { role: 'user', parts: input };
        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        try {
            // Format history for the API (if needed)
            const apiHistory = updatedMessages.slice(0, -1);  // Exclude the current user message
            const geminiResponse = await mockGeminiAPI.sendMessage(input, apiHistory);
            const aiMessage: ChatMessage = { role: 'ai', parts: geminiResponse.text };
            setMessages([...updatedMessages, aiMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            // Consider showing an error message to the user
            setMessages([
                ...updatedMessages,
                { role: 'ai', parts: "Sorry, there was an error communicating with the AI." },
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
            {/* Chat Header */}
            <div style={{ backgroundColor: '#10b981', color: '#fff', padding: '16px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '24px', height: '24px', marginRight: '8px' }}
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <polyline points="7 18 7 12 15 12"></polyline>
                </svg>
                <h1 style={{ fontSize: '20px', fontWeight: 'semibold' }}>AI Chat</h1>
            </div>

            {/* Message Display Area */}
            <div style={{ flex: '1', overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                        }}
                    >
                        <div
                            style={{
                                borderRadius: '16px',
                                padding: '8px 16px',
                                maxWidth: '70%',
                                backgroundColor: message.role === 'user' ? '#3b82f6' : '#e5e7eb',
                                color: message.role === 'user' ? '#fff' : '#374151',
                                marginLeft: message.role === 'user' ? 'auto' : '0',
                                marginRight: message.role === 'ai' ? 'auto' : '0'
                            }}
                        >
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

            {/* Input Area */}
            <div style={{ padding: '16px', backgroundColor: '#fff', boxShadow: '0 -2px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                        style={{ flex: '1', padding: '8px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSendMessage}
                        style={{
                            backgroundColor: '#f0fdf4',
                            color: '#065f46',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s, color 0.3s',
                            display: 'flex',
                            alignItems: 'center',
                            border: 'none'
                        }}
                        disabled={isLoading}
                        onMouseOver={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#bbf7d0';
                            (e.currentTarget as HTMLButtonElement).style.color = '#047857';
                        }}
                        onMouseOut={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f0fdf4';
                            (e.currentTarget as HTMLButtonElement).style.color = '#065f46';
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ width: '20px', height: '20px',  }}
                        >
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
