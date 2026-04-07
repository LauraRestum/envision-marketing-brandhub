import { useState, FormEvent } from 'react';
import { Icon } from './Icons';
import { featuredContent } from '@/data/featuredContent';

const STORY_PROMPTS = [
  {
    icon: 'trophy',
    label: 'Milestones & Achievements',
    text: 'A team or individual reached a significant goal, certification, or accomplishment.',
  },
  {
    icon: 'heart',
    label: 'Patient & Community Impact',
    text: 'A moment where Envision made a meaningful difference for a patient, family, or community.',
  },
  {
    icon: 'users',
    label: 'Team Spotlights',
    text: 'Recognize a colleague or team doing exceptional work behind the scenes.',
  },
  {
    icon: 'megaphone',
    label: 'News & Announcements',
    text: 'New partnerships, program launches, facility openings, or organizational updates.',
  },
];

const INTAKE_URL = 'https://envision-marketing-dashboard-jnqm.vercel.app/api/intake';

export function StorySubmission() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [story, setStory] = useState('');
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
          type: 'story_submission',
          name,
          email,
          story,
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
    <section className="story-section">
      <div className="story__inner">
        <div className="story__content">
          <div className="story__eyebrow">Share Your Story</div>
          <h2 className="story__title">{featuredContent.title}</h2>
          <p className="story__desc">{featuredContent.description}</p>

          {submitted ? (
            <div className="story__success">
              <Icon name="sparkle" />
              <p>Your submission was received. The Envision marketing team will follow up soon.</p>
            </div>
          ) : showForm ? (
            <form className="story__form" onSubmit={handleSubmit}>
              <label className="story__field">
                <span className="story__label">Your Name</span>
                <input
                  type="text"
                  className="story__input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="First and last name"
                />
              </label>
              <label className="story__field">
                <span className="story__label">Your Email</span>
                <input
                  type="email"
                  className="story__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@envisionus.com"
                />
              </label>
              <label className="story__field">
                <span className="story__label">Your Story</span>
                <textarea
                  className="story__textarea"
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  required
                  rows={5}
                  placeholder="Tell us about a milestone, patient impact moment, team achievement, or news worth sharing..."
                />
              </label>
              {error && <p className="story__error">{error}</p>}
              <div className="story__form-actions">
                <button type="submit" className="story__cta" disabled={submitting}>
                  <Icon name="mail" />
                  {submitting ? 'Submitting...' : 'Submit Your Story'}
                </button>
                <button type="button" className="story__cancel" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <button className="story__cta" onClick={() => setShowForm(true)}>
                <Icon name="mail" />
                {featuredContent.cta}
              </button>
            </>
          )}
        </div>
        <div className="story__prompts">
          {STORY_PROMPTS.map((prompt) => (
            <div key={prompt.label} className="story__prompt">
              <div className="story__prompt-icon">
                <Icon name={prompt.icon} />
              </div>
              <div className="story__prompt-text">
                <span className="story__prompt-label">{prompt.label}</span>
                {prompt.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
