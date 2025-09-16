import { useState, useEffect, useRef } from 'react';
import { useAuth } from "../../store/Auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ChatBot.css'; // The stylesheet will be updated
import { useNavigate } from 'react-router';

export function ChatBot() {
    const {URL, userData, isLoggedIn} = useAuth();
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm Zen, your personal wellness assistant. How can I help you get started on a path to well-being today?",
            sender: 'bot'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const [pendingHelpMessage, setPendingHelpMessage] = useState('');
    const chatContentRef = useRef(null);
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(!isLoggedIn){
            return navigate("/login");
        }
    })

    useEffect(() => {
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [messages]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const HIGH_RISK_KEYWORDS = [
        "suicide",
        "kill myself",
        "want to die",
        "end my life",
        "can't go on",
        "no reason to live",
        "give up",
        "feel hopeless",
        "self harm",
        "hurt myself",
        "die",
        "dying",
        "death",
        "emergency",
        "help me",
        "alone",
        "worthless",
        "useless",
        "despair",
        "pain unbearable",
        "lost all hope",
        "can't cope",
        "feeling trapped",
        "want to disappear",
        "final solution",
        "nothing matters",
        "worthless life"
    ];

    const checkHighRisk = (text) => {
        const lowerText = text.toLowerCase();
        return HIGH_RISK_KEYWORDS.some(keyword => lowerText.includes(keyword));
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        // Add user's message
        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);

        if (checkHighRisk(input)) {
            setPendingHelpMessage(input);
            toast.error(
                <div>
                    ⚠️ We detected high-risk language. Do you want us to notify support to help you?
                    <div style={{ marginTop: '10px' }}>
                        <button onClick={handleConsentYes} style={{ marginRight: '10px' }}>Yes</button>
                        <button onClick={handleConsentNo}>No</button>
                    </div>
                </div>, {
                    autoClose: false,
                    closeOnClick: false
                }
            );
        } else {
            sendToBackend(input);
        }

        setInput('');
    };

    const sendToBackend = async () => {
        const requestBody = {
            "user-input": input
        };
        setIsloading(true)
        try {
            const res = await fetch(`https://codeandcosmos.app.n8n.cloud/webhook/13c2e677-4967-45fe-adcb-c2cb9b16c5ee`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (res.ok) {
                const data = await res.text();
                const botResponse = {
                    id: Date.now() + 1,
                    text: data,
                    sender: 'bot'
                };
                setMessages(prev => [...prev, botResponse]);
            } else {
                console.error("Error sending message.");
            }
            setIsloading(false)
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    const sendHelpEmail = async (message) => {
        try {
            await fetch(`${URL}/api/chat`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    useremail: userData.email,
                    phone: userData.phone,
                    text: input
                })
            });
            const confirmation = {
                id: Date.now(),
                text: "Support has been notified. Help is on the way.",
                sender: 'bot'
            };
            setMessages(prev => [...prev, confirmation]);
        } catch (error) {
            console.error("Failed to send email:", error);
            const errorMsg = {
                id: Date.now(),
                text: "Failed to notify support. Please try again later.",
                sender: 'bot'
            };
            setMessages(prev => [...prev, errorMsg]);
        }
    };

    const handleConsentYes = () => {
        toast.dismiss();
        sendHelpEmail(pendingHelpMessage);
    };

    const handleConsentNo = () => {
        toast.dismiss();
        const botReply = {
            id: Date.now(),
            text: "Okay. If you need help later, just let me know.",
            sender: 'bot'
        };
        setMessages(prev => [...prev, botReply]);
    };

    return (
        <main className="chatbot-page">
            <div className="chat-content" ref={chatContentRef}>
                <div className="messages-list">
                    {messages.map((message) => (
                        <div key={message.id} className={`message-wrapper ${message.sender}`}>
                            <div className="avatar">
                                <i className={`fa-solid ${message.sender === 'bot' ? 'fa-robot' : 'fa-user'}`}></i>
                            </div>
                            <div className="message-text">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <form className="chat-input-form" onSubmit={handleSendMessage}>{
                isLoading ? 
                    <img className='loader' src="https://cdn.dribbble.com/users/2973561/screenshots/5757826/media/221d6bfc1960ab98a7585fcc2a4d0181.gif" />
                    : <></>
                }
                <div className="input-container">
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask MindBot anything..."
                        autoComplete="off"
                    />
                    <button type="submit" aria-label="Send message">
                        <i className="fa-solid fa-arrow-up"></i>
                    </button>
                </div>
            </form>
            
        </main>
    );
}
