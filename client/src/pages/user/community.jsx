import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/layout/Navbar";

// Import the new CSS file
import "./Community.css";

export function Community() {
    const navigate = useNavigate();

    // Animation variants
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
    };
    
    const cardHover = { 
        y: -8, 
        scale: 1.03,
        transition: { duration: 0.3 }
    };

    return (
        <>
            <Navbar />
            <main className="community-main">

                {/* Hero Section */}
                <section className="community-section community-hero">
                    <motion.div className="community-container" {...fadeIn}>
                        <h1 className="community-heading">
                            Connect with Your <span className="community-highlight">Peers</span>
                        </h1>
                        <p className="section-subheading">
                            Join discussions, share experiences, and find support in a safe and welcoming environment. You're part of a community that cares.
                        </p>
                        <button className="btn btn-primary" onClick={() => navigate('/chatBot')}>
                            Start a Discussion
                        </button>
                    </motion.div>
                </section>

                {/* Discussion Forums Section */}
                <section className="community-section">
                    <div className="community-container">
                        <h2 className="section-heading">Discussion Forums</h2>
                        <p className="section-subheading">
                            Find a space that fits your needs. Talk about academics, social life, health, or just unwind in our general chat.
                        </p>
                        <div className="forum-grid">
                            <motion.div className="forum-card" whileHover={cardHover}>
                                <div className="forum-card-icon">📚</div>
                                <h3 className="forum-card-title">Academic Stress</h3>
                                <p className="forum-card-description">Share tips on managing workload, exam anxiety, and finding a study-life balance.</p>
                                <button className="btn btn-primary" onClick={() => navigate('/community/academics')}>View Forum</button>
                            </motion.div>
                             <motion.div className="forum-card" whileHover={cardHover}>
                                <div className="forum-card-icon">🤝</div>
                                <h3 className="forum-card-title">Social Life & Friendships</h3>
                                <p className="forum-card-description">Discuss making friends, navigating relationships, and dealing with loneliness.</p>
                                <button className="btn btn-primary" onClick={() => navigate('/community/social')}>View Forum</button>
                            </motion.div>
                             <motion.div className="forum-card" whileHover={cardHover}>
                                <div className="forum-card-icon">🧘</div>
                                <h3 className="forum-card-title">Health & Fitness</h3>
                                <p className="forum-card-description">Chat about exercise routines, healthy eating on campus, and mindfulness practices.</p>
                                <button className="btn btn-primary" onClick={() => navigate('/community/health')}>View Forum</button>
                            </motion.div>
                        </div>
                    </div>
                </section>
                
                {/* Upcoming Events Section */}
                <section className="community-section events-section">
                     <div className="community-container">
                        <h2 className="section-heading">Upcoming Community Events</h2>
                        <p className="section-subheading">
                            Get involved in campus life with these well-being focused events.
                        </p>
                        <div className="events-grid">
                            <motion.div className="event-card" whileHover={{x: 5}}>
                                <p className="event-date">SEPTEMBER 20, 2025 • 3:00 PM</p>
                                <h3 className="event-title">Mindfulness & Meditation Workshop</h3>
                                <p>Learn techniques to reduce stress and improve focus. Held at the Student Wellness Center.</p>
                            </motion.div>
                            <motion.div className="event-card" whileHover={{x: 5}}>
                                <p className="event-date">SEPTEMBER 25, 2025 • 6:00 PM</p>
                                <h3 className="event-title">Group Therapy Info Session</h3>
                                <p>An open session to learn about the benefits of group therapy and meet the facilitators.</p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Community Guidelines Section */}
                <section className="community-section">
                    <div className="community-container">
                         <h2 className="section-heading">Our Guidelines</h2>
                         <div className="guidelines-box">
                            <ul>
                                <li><strong>Be Respectful:</strong> Treat everyone with kindness. Harassment, bullying, and hate speech are not tolerated.</li>
                                <li><strong>Share with Care:</strong> Be mindful of sharing personal information. This is a public forum.</li>
                                <li><strong>Stay Supportive:</strong> Offer constructive and supportive feedback. Avoid giving unsolicited medical advice.</li>
                                <li><strong>Report Concerns:</strong> If you see something that violates our guidelines, please report it to the moderators.</li>
                            </ul>
                         </div>
                    </div>
                </section>

            </main>
        </>
    );
}