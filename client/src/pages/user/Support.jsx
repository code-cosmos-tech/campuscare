import { motion } from "framer-motion";
import { Navbar } from "../../components/layout/Navbar";
import { FiPhoneCall, FiAlertTriangle } from 'react-icons/fi'; // Using react-icons for better visuals

// Import the new CSS file
import "./Support.css";

export function Support() {
    return (
        <>
            <Navbar />
            <main className="home-main">
                {/* Hero Section */}
                <section className="home-section support-hero">
                    <motion.div
                        className="home-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="section-heading">Immediate Support is Available</h1>
                        <p className="section-subheading">
                            You are not alone. If you are in crisis or need someone to talk to, please reach out to the resources below.
                        </p>
                    </motion.div>
                </section>

                {/* Main Support Grid */}
                <section className="home-section">
                    <div className="home-container">
                        <div className="support-grid">
                            {/* Card 1: Immediate Emergency */}
                            <motion.div 
                                className="support-card emergency-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="support-card-header">
                                    <FiAlertTriangle className="support-icon" />
                                    <h2>In an Emergency</h2>
                                </div>
                                <p>If you are in immediate danger or need urgent medical attention, contact these services right away.</p>
                                <ul>
                                    <li><span>Police:</span> <a href="tel:112" className="support-contact">112</a> or <a href="tel:100" className="support-contact">100</a></li>
                                    <li><span>Ambulance (Gujarat):</span> <a href="tel:108" className="support-contact">108 (GVK EMRI)</a></li>
                                    <li><span>National Emergency Number:</span> <a href="tel:112" className="support-contact">112</a></li>
                                </ul>
                            </motion.div>

                            {/* Card 2: Mental Health Helplines */}
                            <motion.div 
                                className="support-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <div className="support-card-header">
                                    <FiPhoneCall className="support-icon" />
                                    <h2>National Mental Health Helplines</h2>
                                </div>
                                <p>Confidential support from trained professionals is available 24/7.</p>
                                <ul>
                                    <li><span>KIRAN Mental Health Helpline:</span> <a href="tel:18005990019" className="support-contact">1800-599-0019</a></li>
                                    <li><span>Vandrevala Foundation:</span> <a href="tel:9999666555" className="support-contact">9999 666 555</a> (24/7)</li>
                                    <li><span>iCALL Psychosocial Helpline:</span> <a href="tel:9152987821" className="support-contact">9152987821</a> (Mon-Sat, 10 AM-8 PM)</li>
                                </ul>
                            </motion.div>
                            
                            {/* Card 3: Gujarat Specific Helplines */}
                             <motion.div 
                                className="support-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className="support-card-header">
                                    <FiPhoneCall className="support-icon" />
                                    <h2>Gujarat State Helplines</h2>
                                </div>
                                <p>Resources specifically for residents of Gujarat.</p>
                                <ul>
                                    <li><span>181 Abhayam (Women Helpline):</span> <a href="tel:181" className="support-contact">181</a></li>
                                    <li><span>State Health Helpline:</span> <a href="tel:104" className="support-contact">104</a></li>
                                </ul>
                            </motion.div>
                            
                            {/* Card 4: Campus Resources */}
                             <motion.div 
                                className="support-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <div className="support-card-header">
                                    <FiPhoneCall className="support-icon" />
                                    <h2>Your Campus Support</h2>
                                </div>
                                <p>Your well-being is a priority on campus. (Please replace with your institution's details).</p>
                                <ul>
                                    <li><span>Campus Counseling Center:</span> <span className="support-contact">[Enter Phone Number]</span></li>
                                    <li><span>University Security:</span> <span className="support-contact">[Enter Phone Number]</span></li>
                                    <li><span>Hostel Warden / RA On-Duty:</span> <span className="support-contact">[Enter Phone Number]</span></li>
                                </ul>
                            </motion.div>
                        </div>

                        <div className="support-disclaimer">
                            <p>
                                This platform provides resources but is not a substitute for professional medical advice or emergency services. If you believe you are in a life-threatening situation, please call 112 or 108 immediately.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}