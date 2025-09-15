import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../../components/layout/Navbar";

// Import the new CSS file
import "./Resources.css";

// Sample data for resources
const allResources = [
    { id: 1, category: 'Article', title: 'Understanding Anxiety and Panic Attacks', description: 'A comprehensive guide to identifying triggers and symptoms.', link: '/resources/anxiety-guide' },
    { id: 2, category: 'Tool', title: 'Guided 5-Minute Meditation', description: 'A short audio session to help you find calm and refocus your mind.', link: '/resources/meditation-5min' },
    { id: 3, category: 'Video', title: 'The Science of Stress Management', description: 'An engaging TED-Ed video explaining how to handle daily stressors effectively.', link: '/resources/stress-video' },
    { id: 4, category: 'Article', title: 'How to Build Healthier Habits', description: 'Practical steps for creating positive routines that stick.', link: '/resources/healthy-habits' },
    { id: 5, category: 'Tool', title: 'Digital Journaling Prompts', description: 'Thought-provoking questions to guide your self-reflection.', link: '/resources/journal-prompts' },
    { id: 6, category: 'Campus', title: 'Upcoming Wellness Workshops', description: 'Check the schedule for free workshops on mindfulness, nutrition, and more.', link: '/events' },
];

export function Resources() {
    const [filter, setFilter] = useState('All');

    const filteredResources = allResources.filter(resource => 
        filter === 'All' ? true : resource.category === filter
    );

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <>
            <Navbar />
            <main className="resources-main">
                <section className="resources-section">
                    <div className="resources-container">
                        <h1 className="section-heading">Explore Your Wellness Toolkit</h1>
                        <p className="section-subheading">
                            Discover articles, tools, and videos to support your mental health journey. Find practical advice and strategies you can use today.
                        </p>

                        {/* Filter Controls */}
                        <div className="filter-container">
                            <button onClick={() => setFilter('All')} className={`filter-btn ${filter === 'All' ? 'active' : ''}`}>All</button>
                            <button onClick={() => setFilter('Article')} className={`filter-btn ${filter === 'Article' ? 'active' : ''}`}>Articles</button>
                            <button onClick={() => setFilter('Tool')} className={`filter-btn ${filter === 'Tool' ? 'active' : ''}`}>Tools</button>
                            <button onClick={() => setFilter('Video')} className={`filter-btn ${filter === 'Video' ? 'active' : ''}`}>Videos</button>
                             <button onClick={() => setFilter('Campus')} className={`filter-btn ${filter === 'Campus' ? 'active' : ''}`}>Campus</button>
                        </div>

                        {/* Resources Grid */}
                        <motion.div 
                            className="resources-grid"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.1 } }
                            }}
                        >
                            {filteredResources.map(resource => (
                                <motion.div 
                                    key={resource.id} 
                                    className="resource-card"
                                    variants={cardVariants}
                                    whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
                                >
                                    <div className="resource-content">
                                        <span className="resource-category">{resource.category}</span>
                                        <h3 className="resource-title">{resource.title}</h3>
                                        <p className="resource-description">{resource.description}</p>
                                        <button className="btn btn-secondary" onClick={() => {/* navigate(resource.link) */}}>
                                            Learn More
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </main>
        </>
    );
}