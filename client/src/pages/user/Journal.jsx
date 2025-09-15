import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import './Journal.css';

export function JournalPage() {
    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);

    // Fetch entries from localStorage on component mount
    useEffect(() => {
        const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        // Sort by date, newest first
        storedEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
        setEntries(storedEntries);
    }, []);

    const handleDelete = (id) => {
        const updatedEntries = entries.filter(entry => entry.id !== id);
        setEntries(updatedEntries);
        localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    };
    
    // Function to format date nicely
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <Navbar />
            <main className="journal-main">
                <div className="journal-container">
                    <div className="journal-header">
                        <h1 className="section-heading">My Journal</h1>
                        <button className="btn btn-primary" onClick={() => navigate('/journal/new')}>
                            + New Entry
                        </button>
                    </div>

                    <AnimatePresence>
                        {entries.length > 0 ? (
                            <motion.div className="entry-list">
                                {entries.map(entry => (
                                    <motion.div
                                        key={entry.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                                        className="entry-card"
                                    >
                                        <div className="entry-card-header">
                                            <div>
                                                <h2 className="entry-title">{entry.title}</h2>
                                                <p className="entry-date">{formatDate(entry.date)}</p>
                                            </div>
                                            <div className="entry-actions">
                                                <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/journal/edit/${entry.id}`)}>Edit</button>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(entry.id)}>Delete</button>
                                            </div>
                                        </div>
                                        <p className="entry-content">{entry.content}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="no-entries">
                                <h2 className="section-heading">No Entries Yet</h2>
                                <p>Your journal is a safe space for your thoughts. Click "New Entry" to begin.</p>
                                <button className="btn btn-primary" onClick={() => navigate('/journal/new')}>Create Your First Entry</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </>
    );
}