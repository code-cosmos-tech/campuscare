import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/Auth";
import { Navbar } from "../../components/layout/Navbar";

// Import your CSS file
import "./Home.css";

export function Home() {
    const navigate = useNavigate();
    const { URL, isLoggedIn } = useAuth();

    // Animation variants remain the same
    const bottomAnimation = {
        initial: { y: '30%', opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 1, delay: 0.8 },
    };

    const fadeIn = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1.2 },
    };

    return (
        <>
            <Navbar />
            <main className="home-main">
                
                {/* Hero Section */}
                <section className="home-section hero-section">
                    <div className="home-container hero-grid">
                        <motion.div className="hero-text-content" {...bottomAnimation}>
                            <h1 className="hero-heading">
                                Your Journey to <span className="hero-highlight">Mental Wellness</span> Begins Here
                            </h1>
                            <p className="hero-subheading">
                                Find support, resources, and community for your mental health journey.
                            </p>
                            
                            <motion.div className="hero-cta-buttons" {...fadeIn}>
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => navigate('/resources')}
                                >
                                    Explore Resources
                                </button>
                                <button 
                                    className="btn btn-secondary"
                                    onClick={() => navigate('/support')}
                                >
                                    Get Immediate Support
                                </button>
                            </motion.div>
                        </motion.div>
                        
                        <div className="hero-image-container">
                             <motion.img 
                                src="https://static.vecteezy.com/system/resources/previews/002/427/906/large_2x/mental-health-logo-icon-design-vector.jpg" 
                                alt="Mental wellness illustration"
                                className="hero-image"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.2, delay: 0.5 }}
                            /> 
                        </div>
                    </div>
                </section>
                
                {/* Features Section */}
                <section className="home-section features-section">
                    <div className="home-container features-container">
                        <h2 className="section-heading">How We Can Help</h2>
                        <p className="section-subheading">
                            We provide a comprehensive suite of tools and a supportive network to guide you on your path to well-being.
                        </p>
                        <div className="features-grid">
                            <motion.div 
                                className="feature-card"
                                whileHover={{ y: -10, scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="feature-icon">🧠</div>
                                <h3 className="feature-title">Educational Resources</h3>
                                <p>Access articles, guides, and tools to better understand mental health conditions.</p>
                            </motion.div>
                            
                            <motion.div 
                                className="feature-card"
                                whileHover={{ y: -10, scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="feature-icon">👥</div>
                                <h3 className="feature-title">Community Support</h3>
                                <p>Connect with others who understand what you're going through in a safe space.</p>
                            </motion.div>
                            
                            <motion.div 
                                className="feature-card"
                                whileHover={{ y: -10, scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="feature-icon">📅</div>
                                <h3 className="feature-title">Professional Guidance</h3>
                                <p>Find qualified mental health professionals and schedule consultations.</p>
                            </motion.div>
                        </div>
                    </div>
                </section>
                
                {/* Testimonial Section */}
                <section className="home-section testimonial-section">
                    <motion.div 
                        className="home-container testimonial-container"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <h2 className="section-heading">Stories of Hope & Recovery</h2>
                        <div className="testimonial-content">
                            <p className="testimonial-text">
                                "This platform helped me find the resources I needed to understand my anxiety 
                                and connect with a therapist who truly understands me."
                            </p>
                            <p className="testimonial-author">- Maria, 28</p>
                        </div>
                    </motion.div>
                </section>
            </main>
        </>
    );
}