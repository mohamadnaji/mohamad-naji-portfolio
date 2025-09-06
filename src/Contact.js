import React, { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { 
  FaEnvelope, 
  FaPhone, 
  FaLinkedinIn, 
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaGithub,
  FaHeart
} from 'react-icons/fa';
import SectionTitle from './components/SectionTitle';
import './Contact.css';

const CONTACT_INFO = [
  {
    icon: <FaEnvelope />,
    title: 'Email',
    value: 'mohamadd.najii@gmail.com',
    href: 'mailto:mohamadd.najii@gmail.com',
    type: 'email'
  },
  {
    icon: <FaPhone />,
    title: 'Phone',
    value: '+1 (514) 606-2270',
    href: 'tel:+15146062270',
    type: 'phone'
  },
  {
    icon: <FaLinkedinIn />,
    title: 'LinkedIn',
    value: '/mohamad-naji',
    href: 'https://linkedin.com/in/mohamad-naji-b84310174',
    type: 'linkedin'
  },
  {
    icon: <FaMapMarkerAlt />,
    title: 'Location',
    value: 'Montreal, QC',
    href: null,
    type: 'location'
  }
];

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setFormStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      await emailjs.sendForm(
        'service_tcwey44',
        'template_rteuz9s',
        formRef.current,
        'YTqBXwvpFYSWPJ7ZL'
      );
      
      setFormStatus({ 
        type: 'success', 
        message: 'Message sent successfully! I\'ll get back to you soon.' 
      });
      formRef.current.reset();
    } catch (error) {
      setFormStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again or contact me directly.' 
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus({ type: '', message: '' }), 5000);
    }
  };

  return (
    <section 
      className={`contact-section ${isVisible ? 'animate-in' : ''}`} 
      id="contact"
      ref={sectionRef}
      role="region"
      aria-label="Contact information and form"
    >
      <div className="contact-bg-decoration" aria-hidden="true">
        <div className="contact-particle"></div>
        <div className="contact-particle"></div>
        <div className="contact-particle"></div>
      </div>

      <div className="contact-content">
        <SectionTitle subtitle="Ready to bring your ideas to life? Let's start the conversation">
          Let's Work Together
        </SectionTitle>

        <div className="contact-container">
          {/* Quick Contact Cards */}
          <div className="contact-quick">
            {CONTACT_INFO.map((item, index) => (
              <div key={item.type} className="contact-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="contact-card-icon">
                  {item.icon}
                </div>
                <div className="contact-card-content">
                  <h4>{item.title}</h4>
                  {item.href ? (
                    <a 
                      href={item.href}
                      target={item.type === 'linkedin' ? '_blank' : undefined}
                      rel={item.type === 'linkedin' ? 'noopener noreferrer' : undefined}
                      aria-label={`${item.title}: ${item.value}`}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <div className="form-header">
              <h3>Send a Message</h3>
              <p>Have a project in mind? Let's discuss how we can work together.</p>
            </div>

            <form 
              ref={formRef} 
              onSubmit={handleSubmit} 
              className="contact-form"
              noValidate
            >
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    aria-label="Your name"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    aria-label="Your email address"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  aria-label="Message subject"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  rows="5"
                  required
                  aria-label="Your message"
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
                aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </button>

              {formStatus.message && (
                <div 
                  className={`form-status ${formStatus.type}`}
                  role="alert"
                  aria-live="polite"
                >
                  {formStatus.type === 'success' && <FaCheckCircle />}
                  {formStatus.type === 'error' && <FaExclamationCircle />}
                  <span>{formStatus.message}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Footer Signature */}
      <footer className="contact-footer" aria-label="Website footer">
        <div className="footer-content">
          <div className="footer-signature">
            <p>
              Crafted with <FaHeart className="heart-icon" aria-label="love" /> by 
              <span className="signature-name"> Mohamad Naji</span>
            </p>
            <p className="footer-tagline">
              Building digital experiences that make a difference
            </p>
          </div>
          
          <div className="footer-links">
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
              className="footer-link"
            >
              <FaGithub />
            </a>
            <a 
              href="https://linkedin.com/in/mohamad-naji-b84310174" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Connect on LinkedIn"
              className="footer-link"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Mohamad Naji. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
};

export default Contact;