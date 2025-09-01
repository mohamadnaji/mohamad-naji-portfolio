import React, { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll('.reveal, .reveal-child')
      .forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    emailjs
      .sendForm(
        'service_tcwey44',     // from EmailJS dashboard
        'template_rteuz9s',    // from EmailJS dashboard
        formRef.current,
        'YTqBXwvpFYSWPJ7ZL'      // from EmailJS dashboard
      )
      .then(
        () => {
          setStatus('✅ Message sent successfully!');
          formRef.current.reset();
        },
        () => setStatus('❌ Failed to send. Please try again later.')
      );
  };

  return (
    <section className="contact-section reveal" id="contact">
      <h2 className="contact-title reveal-child">Let’s Work Together</h2>
      <p className="contact-intro reveal-child">
        Have an idea, a project, or just want to say hello — I’m always happy to connect.
      </p>

      <div className="contact-grid">
        {/* Info */}
        <div className="contact-info contact-panel reveal">
          <div className="info-item reveal-child">
            <i className="fas fa-envelope-open-text"></i>
            <div>
              <h4>Email</h4>
              <a href="mailto:mohamadd.najii@gmail.com">mohamadd.najii@gmail.com</a>
            </div>
          </div>

          <div className="info-item reveal-child">
            <i className="fas fa-mobile-alt"></i>
            <div>
              <h4>Phone</h4>
              <a href="tel:+15146062270">+1 (514) 606‑2270</a>
            </div>
          </div>

          <div className="info-item reveal-child">
            <i className="fab fa-linkedin-in"></i>
            <div>
              <h4>LinkedIn</h4>
              <a
                href="https://linkedin.com/in/mohamad-naji-b84310174"
                target="_blank"
                rel="noreferrer"
              >
                /mohamad‑naji
              </a>
            </div>
          </div>

          <div className="info-item reveal-child">
            <i className="fas fa-map-marker-alt"></i>
            <div>
              <h4>Location</h4>
              <span>Montreal, QC, Canada</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="contact-panel contact-form reveal"
        >
          <input
            className="form-field reveal-child"
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />
          <input
            className="form-field reveal-child"
            type="email"
            name="email"
            placeholder="Your Email"
            required
          />
          <textarea
            className="form-field reveal-child"
            name="message"
            placeholder="Your Message"
            required
          ></textarea>
          <button className="form-field reveal-child" type="submit">
            <i className="fas fa-paper-plane"></i> Send Message
          </button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
