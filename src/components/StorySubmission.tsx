import { useState, FormEvent } from 'react';
import { Icon } from './Icons';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_SUBMIT_STORY_KEY || 'df0b6cfb-7e47-4d73-b27f-a3b8b925561e';

export function StorySubmission() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [storyTitle, setStoryTitle] = useState('');
  const [storyDesc, setStoryDesc] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('access_key', WEB3FORMS_KEY);
      formData.append('subject', 'New Story Submission — Brand Hub');
      formData.append('from_name', 'Envision Brand Hub');
      formData.append('name', name);
      formData.append('email', email);
      formData.append('story_title', storyTitle);
      formData.append('story_description', storyDesc);
      // Honeypot for spam protection
      formData.append('botcheck', '');
      if (attachment) {
        formData.append('attachment', attachment);
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleRetry() {
    setError('');
  }

  return (
    <section id="story-submission" className="section story-section">
      <div className="container">
        <div className="section__header">
          <div className="section__eyebrow">Share Your Story</div>
          <h2 className="section__title">Submit a Story</h2>
          <p className="section__subtitle">
            Have a success story, patient impact moment, or team achievement worth sharing?
            We feature the best across Envision newsletters, social channels, and internal communications.
          </p>
        </div>

        {submitted ? (
          <div className="story__success">
            <Icon name="sparkle" />
            <p>Thank you! Your story has been submitted. The Envision marketing team will follow up soon.</p>
          </div>
        ) : (
          <form className="story__form" onSubmit={handleSubmit}>
            {/* Honeypot — hidden from users, catches bots */}
            <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            <label className="story__field">
              <span className="story__label">Your Name <span className="story__required">*</span></span>
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
              <span className="story__label">Your Email <span className="story__required">*</span></span>
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
              <span className="story__label">Story Title <span className="story__required">*</span></span>
              <input
                type="text"
                className="story__input"
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
                required
                placeholder="Give your story a title"
              />
            </label>

            <label className="story__field">
              <span className="story__label">Story Description <span className="story__required">*</span></span>
              <textarea
                className="story__textarea"
                value={storyDesc}
                onChange={(e) => setStoryDesc(e.target.value)}
                required
                rows={5}
                placeholder="Tell us about a milestone, patient impact moment, team achievement, or news worth sharing..."
              />
            </label>

            <label className="story__field">
              <span className="story__label">Attachment (optional)</span>
              <input
                type="file"
                className="story__file-input"
                onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                accept="image/*,.pdf,.doc,.docx"
              />
            </label>

            {error && (
              <div className="story__error">
                <p>{error}</p>
                <button type="button" className="story__retry" onClick={handleRetry}>
                  Try Again
                </button>
              </div>
            )}

            <div className="story__form-actions">
              <button type="submit" className="story__cta" disabled={submitting}>
                <Icon name="mail" />
                {submitting ? 'Submitting...' : 'Submit Your Story'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
