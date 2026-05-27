import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import Magnetic from '../../components/Magnetic/Magnetic';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = (field) => {
    if (!formData[field]) {
      setFocusedField(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, submit logic goes here
    alert(`Thank you, ${formData.name}! Your message was successfully drafted in this demo.`);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setFocusedField(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    },
  };

  return (
    <section id="contact" className="contact-section">
      {/* Animated Glowing Grid Background */}
      <div className="contact-grid-bg" aria-hidden="true" />
      <div className="neon-glow-circle circle-contact" style={{ top: '20%', left: '30%', width: '500px', height: '500px', background: 'var(--primary-color)', opacity: 0.08 }} />

      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">// secure link handshake</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <motion.div
          className="contact-layout"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Information & Socials Panel */}
          <motion.div className="contact-info-panel glass-panel" variants={itemVariants}>
            <h3 className="info-panel-title font-title">Let's build something epic</h3>
            <p className="info-panel-desc">
              I am always eager to collaborate on innovative products, high-fidelity WebGL graphics,
              robust full-stack schemas, or complex modular integrations. Have an idea? Fill out the portal
              handshake or connect through any secure frequency below.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <span className="detail-label font-title">FREQUENCY:</span>
                <a href="mailto:abhinav@example.com" className="detail-value">abhinav.pandey@example.com</a>
              </div>
              <div className="contact-detail-item">
                <span className="detail-label font-title">HQ LOCATION:</span>
                <span className="detail-value">New Delhi, India</span>
              </div>
            </div>

            {/* Social Connects */}
            <div className="contact-socials-wrapper">
              <h4 className="socials-title font-title">CONNECT VIA SECURE PORTS:</h4>
              <div className="contact-social-icons">
                <Magnetic strength={0.35}>
                  <a href="#" className="social-icon-btn github" aria-label="GitHub Port" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                </Magnetic>
                <Magnetic strength={0.35}>
                  <a href="#" className="social-icon-btn linkedin" aria-label="LinkedIn Port" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                </Magnetic>
                <Magnetic strength={0.35}>
                  <a href="mailto:abhinav@example.com" className="social-icon-btn email" aria-label="Email Port">
                    <FaEnvelope />
                  </a>
                </Magnetic>
                <Magnetic strength={0.35}>
                  <a href="#" className="social-icon-btn resume" aria-label="Download Resume" target="_blank" rel="noopener noreferrer">
                    <FaFileDownload />
                  </a>
                </Magnetic>
              </div>
            </div>
          </motion.div>

          {/* Form Panel */}
          <motion.div className="contact-form-panel glass-panel" variants={itemVariants}>
            <form onSubmit={handleSubmit} className="contact-form">
              {/* Name field */}
              <div className={`input-group ${focusedField === 'name' || formData.name ? 'focused' : ''}`}>
                <label htmlFor="name" className="input-label font-title">01. Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  required
                  className="form-input"
                />
                <div className="input-glow-line" />
              </div>

              {/* Email field */}
              <div className={`input-group ${focusedField === 'email' || formData.email ? 'focused' : ''}`}>
                <label htmlFor="email" className="input-label font-title">02. Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  required
                  className="form-input"
                />
                <div className="input-glow-line" />
              </div>

              {/* Subject field */}
              <div className={`input-group ${focusedField === 'subject' || formData.subject ? 'focused' : ''}`}>
                <label htmlFor="subject" className="input-label font-title">03. Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus('subject')}
                  onBlur={() => handleBlur('subject')}
                  required
                  className="form-input"
                />
                <div className="input-glow-line" />
              </div>

              {/* Message field */}
              <div className={`input-group textarea-group ${focusedField === 'message' || formData.message ? 'focused' : ''}`}>
                <label htmlFor="message" className="input-label font-title">04. Message Details</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  required
                  className="form-input form-textarea"
                  rows="4"
                />
                <div className="input-glow-line" />
              </div>

              {/* Submit Button with Liquid Shift effect */}
              <div className="form-submit-container">
                <Magnetic strength={0.25}>
                  <button type="submit" className="btn-primary liquid-btn">
                    <span className="btn-text">INJECT HANDSHAKE</span>
                    <div className="liquid-glow-overlay" />
                  </button>
                </Magnetic>
              </div>
            </form>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <div className="footer-credits">
          <p>© 2026 Abhinav Pandey. Crafted with high performance.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
