import { useState, FormEvent } from 'react';
import { Icon } from './Icons';

interface TeamMember {
  name: string;
  title: string;
  initials: string;
  color: string;
}

const team: TeamMember[] = [
  {
    name: 'Madison Neuhaus',
    title: 'Senior Director of Marketing Communications',
    initials: 'MN',
    color: 'var(--brand-purple)',
  },
  {
    name: 'Laura Restum',
    title: 'Marketing Manager',
    initials: 'LR',
    color: 'var(--brand-cyan)',
  },
  {
    name: 'Arlo Hoover',
    title: 'Content Creator',
    initials: 'AH',
    color: 'var(--brand-green)',
  },
];

const INTAKE_URL = 'https://envision-marketing-dashboard-jnqm.vercel.app/api/intake';

export function ContactPage({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch(INTAKE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name,
          email,
          subject,
          message,
        }),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="contact-page">
      {/* Back navigation */}
      <div className="contact-page__back-bar">
        <button className="contact-page__back-btn" onClick={onBack}>
          <Icon name="arrow-right" /> Back to Hub
        </button>
      </div>

      {/* Hero banner */}
      <section className="contact-page__hero">
        <div className="contact-page__hero-glow" />
        <div className="contact-page__hero-inner">
          <h1 className="contact-page__hero-title">Meet the Marketing Team</h1>
          <p className="contact-page__hero-subtitle">
            We're here to help with all your brand and marketing needs.
          </p>
        </div>
      </section>

      {/* Team cards */}
      <section className="contact-page__team">
        <div className="contact-page__team-grid">
          {team.map((member) => (
            <div key={member.name} className="contact-page__card">
              <div
                className="contact-page__avatar"
                style={{ background: member.color }}
              >
                {member.initials}
              </div>
              <h3 className="contact-page__name">{member.name}</h3>
              <p className="contact-page__title">{member.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section className="contact-page__form-section">
        <div className="contact-page__form-wrapper">
          <h2 className="contact-page__form-heading">
            <Icon name="mail" /> Send Us a Message
          </h2>
          <p className="contact-page__form-desc">
            Fill out the form below to send a message to the marketing team.
          </p>

          {submitted ? (
            <div className="contact-page__success">
              <Icon name="sparkle" />
              <p>Your submission was received. The Envision marketing team will follow up soon.</p>
            </div>
          ) : (
            <form className="contact-page__form" onSubmit={handleSubmit}>
              <div className="contact-page__field-row">
                <label className="contact-page__field">
                  <span className="contact-page__label">Your Name</span>
                  <input
                    type="text"
                    className="contact-page__input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="First and last name"
                  />
                </label>
                <label className="contact-page__field">
                  <span className="contact-page__label">Your Email</span>
                  <input
                    type="email"
                    className="contact-page__input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@envisionus.com"
                  />
                </label>
              </div>

              <label className="contact-page__field">
                <span className="contact-page__label">Subject</span>
                <input
                  type="text"
                  className="contact-page__input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="What is this regarding?"
                />
              </label>

              <label className="contact-page__field">
                <span className="contact-page__label">Message</span>
                <textarea
                  className="contact-page__textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  placeholder="Tell us how we can help..."
                />
              </label>

              {error && <p className="contact-page__error">{error}</p>}
              <button type="submit" className="contact-page__submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Message'}
                <Icon name="mail" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
