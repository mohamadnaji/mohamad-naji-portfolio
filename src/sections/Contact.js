import { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import Icon from '../components/Icon';
import SectionHeading, { annotation } from '../components/SectionHeading';
import { CONTACTS } from '../data/portfolio';

const RULES = {
  name: (v) => (!v ? 'Name is required' : v.length < 2 ? 'Name must be at least 2 characters' : ''),
  email: (v) => (!v ? 'Email is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Please enter a valid email address' : ''),
  subject: (v) => (!v ? 'Subject is required' : v.length < 3 ? 'Subject must be at least 3 characters' : ''),
  message: (v) => (!v ? 'Message is required' : v.length < 10 ? 'Message must be at least 10 characters' : ''),
};

const FIELDS = [
  { name: 'name', label: 'Your name', placeholder: 'Jane Doe', autoComplete: 'name' },
  { name: 'email', label: 'Your email', placeholder: 'jane@company.com', autoComplete: 'email', type: 'email' },
  { name: 'subject', label: 'Subject', placeholder: 'Backend role at Acme', full: true },
  { name: 'message', label: 'Message', placeholder: 'Tell me about your project...', full: true, textarea: true },
];

function CopyButton({ value, label }) {
  const [state, setState] = useState('Copy');
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = () => {
    const done = (text) => {
      setState(text);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setState('Copy'), 1600);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(value).then(() => done('Copied'), () => done('Copy failed'));
    else done('Copy failed');
  };
  return (
    <button className={`copy${state === 'Copied' ? ' done' : ''}`} type="button" onClick={copy} aria-label={`Copy ${label.toLowerCase()}`}>
      <Icon name={state === 'Copied' ? 'check' : 'copy'} /><span>{state}</span>
    </button>
  );
}

export default function Contact() {
  const formRef = useRef(null);
  const statusTimer = useRef(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => () => clearTimeout(statusTimer.current), []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    const form = formRef.current;
    const found = {};
    Object.keys(RULES).forEach((k) => {
      const msg = RULES[k](form.elements[k].value.trim());
      if (msg) found[k] = msg;
    });
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus({ type: 'bad', message: 'Please fill in all fields correctly.' });
      return;
    }
    setSending(true);
    setStatus({ type: '', message: 'Sending your message...' });
    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setStatus({ type: 'good', message: "Message sent successfully! I'll get back to you soon." });
      form.reset();
    } catch (err) {
      setStatus({ type: 'bad', message: 'Failed to send message. Please try again or email me directly.' });
    } finally {
      setSending(false);
      clearTimeout(statusTimer.current);
      statusTimer.current = setTimeout(() => setStatus({ type: '', message: '' }), 6000);
    }
  };

  const clearError = (name) => {
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <section className="band" id="contact">
      <div className="wrap">
        <SectionHeading eyebrow={annotation('PostMapping', '/contact')} title="Let's work together.">
          <p className="rv">Ready to bring your ideas to life? Let&apos;s start the conversation.</p>
        </SectionHeading>
        <div className="contact-grid">
          <div className="cards">
            {CONTACTS.map((c, i) => (
              <div className="spot cc rv" key={c.label} style={{ '--d': `${i * 0.07}s` }}>
                <span className="ico"><Icon name={c.icon} /></span>
                <div className="txt">
                  <div className="lbl">{c.label}</div>
                  <div className="val">
                    {c.href
                      ? <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{c.value}</a>
                      : c.value}
                  </div>
                </div>
                {c.copy && <CopyButton value={c.value} label={c.label} />}
              </div>
            ))}
          </div>

          <form className="spot rv" ref={formRef} onSubmit={onSubmit} noValidate style={{ '--d': '.1s' }}>
            <h3>Send a Message</h3>
            <p className="sub">Have a project in mind? Let&apos;s discuss how we can work together.</p>
            <div className="fields">
              {FIELDS.map((f) => {
                const id = `f-${f.name}`;
                const props = {
                  id, name: f.name, placeholder: f.placeholder, autoComplete: f.autoComplete, disabled: sending,
                  onChange: () => clearError(f.name),
                  'aria-invalid': errors[f.name] ? 'true' : undefined,
                  'aria-describedby': errors[f.name] ? `${id}-err` : undefined,
                };
                return (
                  <div className={`f${f.full ? ' full' : ''}${errors[f.name] ? ' err' : ''}`} key={f.name}>
                    <label htmlFor={id}>{f.label}</label>
                    {f.textarea ? <textarea {...props} /> : <input type={f.type || 'text'} {...props} />}
                    {errors[f.name] && <span className="msg" id={`${id}-err`}>{errors[f.name]}</span>}
                  </div>
                );
              })}
            </div>
            <div className="form-foot">
              <button className="btn primary mag" type="submit" disabled={sending}>
                {sending ? <span className="spinner" aria-hidden="true" /> : <Icon name="send" />}
                {sending ? 'Sending...' : 'Send Message'}
              </button>
              <span className={`fstatus ${status.type}`} role="status" aria-live="polite">{status.message}</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
