import { useState, useEffect, useRef } from 'react';
import './ChatBot.css'; // The stylesheet will be updated
import { data } from 'react-router';
import { Navbar } from '../../components/layout/Navbar';

export function ChatBot() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm MindBot, your personal wellness assistant. How can I help you get started on a path to well-being today?",
            sender: 'bot'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const chatContentRef = useRef(null);

    // useEffect to scroll down whenever messages change
    useEffect(() => {
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [messages]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        // Add user's message
        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);

        const requestBody = {
            "user-input": input
        }
            console.log(requestBody);
            console.log(input);
        setInput('');

        setIsloading(true)
        const res = await fetch(`https://codeandcosmos.app.n8n.cloud/webhook/13c2e677-4967-45fe-adcb-c2cb9b16c5ee`, {
            method : "POST",
            headers : {
                "Content-Type" : "Application/json"
            },
            body : JSON.stringify(requestBody)
        })

        if(res.ok){
            const data = await res.text();
            
            const botResponse = {
                id: Date.now() + 1,
                text: data,
                sender: 'bot'
            };
            console.log(requestBody);
            console.log(input);
            console.log(data);
            console.log(botResponse);
            
            setMessages(prev => [...prev, botResponse]);
        }
        setIsloading(false)
    };

    return (
        <main className="chatbot-page">
            <Navbar/>
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

            <form className="chat-input-form" onSubmit={handleSendMessage}>
                {
                isLoading ? 
                    <img className='loader' src="https://cdn.dribbble.com/users/2973561/screenshots/5757826/media/221d6bfc1960ab98a7585fcc2a4d0181.gif" alt="" srcset="" />
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