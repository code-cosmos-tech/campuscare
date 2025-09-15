import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/layout/Navbar";

// Import the new CSS file
import "./Support.css";

export function Support() {
    const navigate = useNavigate();

    // Reusable animation variants
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
            <main className="support-main">

                {/* Hero Section */}
                <section className="support-section support-hero">
                    <motion.div className="support-container support-hero-content" {...fadeIn}>
                        <h1 className="support-heading">
                            Find the <span className="support-highlight">Support</span> You Need
                        </h1>
                        <p className="support-subheading">
                            Your well-being is our priority. Explore a range of confidential resources available on and off campus, designed to help you navigate challenges and thrive.
                        </p>
                    </motion.div>
                </section>

                {/* Immediate Support Section */}
                <section className="support-section">
                    <div className="support-container">
                        <h2 className="section-heading">Immediate Support & Crisis Lines</h2>
                        <p className="section-subheading">
                            If you or someone you know is in crisis, please reach out to these 24/7 resources immediately. You are not alone.
                        </p>
                        <div className="support-grid">
                            <motion.div className="support-card helpline-card" whileHover={cardHover}>
                                <h3 className="support-card-title">Campus Safety (24/7)</h3>
                                <p className="helpline-number"><a href="tel:123-456-7890">123-456-7890</a></p>
                                <p className="support-card-description">For any on-campus emergencies or urgent safety concerns.</p>
                            </motion.div>
                            <motion.div className="support-card helpline-card" whileHover={cardHover}>
                                <h3 className="support-card-title">National Suicide Prevention Lifeline</h3>
                                <p className="helpline-number"><a href="tel:988">Call or Text 988</a></p>
                                <p className="support-card-description">Free and confidential support for people in distress, 24/7.</p>
                            </motion.div>
                        </div>
                    </div>
                </section>
                
                {/* On-Campus Services Section */}
                <section className="support-section" style={{backgroundColor: "white"}}>
                     <div className="support-container">
                        <h2 className="section-heading">On-Campus Well-being Services</h2>
                        <p className="section-subheading">
                            Connect with university professionals dedicated to supporting your mental and emotional health.
                        </p>
                        <div className="support-grid campus-services">
                            <motion.div className="support-card" whileHover={cardHover}>
                                <h3 className="support-card-title">University Counseling Center</h3>
                                <p className="support-card-description">Offers individual counseling, group therapy, and workshops. All services are confidential and free for students.</p>
                                <button className="btn btn-primary" onClick={() => navigate('/counseling-appointment')}>Book an Appointment</button>
                            </motion.div>
                             <motion.div className="support-card" whileHover={cardHover}>
                                <h3 className="support-card-title">Student Health Services</h3>
                                <p className="support-card-description">Provides medical consultations, wellness check-ups, and referrals for physical health needs that impact well-being.</p>
                                <button className="btn btn-primary" onClick={() => navigate('/health-services')}>Visit Health Portal</button>
                            </motion.div>
                             <motion.div className="support-card" whileHover={cardHover}>
                                <h3 className="support-card-title">Academic Advising & Support</h3>
                                <p className="support-card-description">Get help with academic stress, time management, and study strategies to reduce pressure and improve performance.</p>
                                <button className="btn btn-primary" onClick={() => navigate('/advising')}>Find Your Advisor</button>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="support-section faq-section">
                    <div className="support-container">
                         <h2 className="section-heading">Frequently Asked Questions</h2>
                         <div className="faq-container">
                            <div className="faq-item">
                                <h3 className="faq-question">Are the counseling services confidential?</h3>
                                <p className="faq-answer">Yes. All interactions with the University Counseling Center are strictly confidential, in accordance with legal and ethical guidelines. Your information will not be shared without your explicit consent.</p>
                            </div>
                             <div className="faq-item">
                                <h3 className="faq-question">What if I'm worried about a friend?</h3>
                                <p className="faq-answer">If you are concerned about a friend, you can contact the Dean of Students office or the Counseling Center for a consultation. If it's an emergency, please call Campus Safety immediately.</p>
                            </div>
                             <div className="faq-item">
                                <h3 className="faq-question">How much do these services cost?</h3>
                                <p className="faq-answer">Most on-campus services, including counseling and academic support, are included in your student fees and are available at no additional cost.</p>
                            </div>
                         </div>
                    </div>
                </section>
            </main>
        </>
    );
}