import { useState, FormEvent } from 'react';
import { Icon } from './Icons';

const IDEA_PROMPTS = [
  { label: 'A patient impact moment', icon: 'heart' },
  { label: 'A team achievement', icon: 'trophy' },
  { label: 'A milestone or anniversary', icon: 'star' },
  { label: 'Community recognition', icon: 'users' },
  { label: 'An innovation or breakthrough', icon: 'sparkle' },
];

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

export function StorySubmission() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function handlePromptClick(prompt: string) {
    if (!title) {
      setTitle(prompt);
    } else if (!description) {
      setDescription(prompt + ' — ');
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      const accessKey = import.meta.env.VITE_WEB3FORMS_SUBMIT_STORY_KEY || 'df0b6cfb-7e47-4d73-b27f-a3b8b925561e';
      formData.append('access_key', accessKey);
      formData.append('subject', 'New Story Submission — Brand Hub');
      formData.append('from_name', 'Envision Brand Hub');
      formData.append('name', name);
      formData.append('email', email);
      formData.append('story_title', title);
      formData.append('story_description', description);
      // Honeypot for spam protection
      formData.append('botcheck', '');

      if (attachment) {
        formData.append('attachment', attachment);
      }

      const res = await fetch(WEB3FORMS_URL, {
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

  return (
    <section id="story-submission" className="story-section">
      <div className="story__inner">
        <div className="story__content">
          <div className="story__eyebrow">Share Your Story</div>
          <h2 className="story__title">Have a story worth sharing?</h2>
          <p className="story__desc">
            Patient impact moments, team achievements, milestones, and community recognition — we feature the best across Envision newsletters, social channels, and internal communications.
          </p>

          {/* Idea prompt chips */}
          <div className="story__prompts-row">
            {IDEA_PROMPTS.map((prompt) => (
              <button
                key={prompt.label}
                className="story__prompt-chip"
                onClick={() => handlePromptClick(prompt.label)}
                type="button"
              >
                <Icon name={prompt.icon} />
                <span>{prompt.label}</span>
              </button>
            ))}
          </div>

          {submitted ? (
            <div className="story__success">
              <Icon name="sparkle" />
              <div>
                <p className="story__success-title">Story submitted!</p>
                <p>The Envision marketing team will review your submission and follow up soon.</p>
              </div>
            </div>
          ) : (
            <form className="story__form" onSubmit={handleSubmit}>
              {/* Honeypot field — hidden from users */}
              <input type="checkbox" name="botcheck" className="story__honeypot" tabIndex={-1} autoComplete="off" />

              <div className="story__form-row">
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
              </div>

              <label className="story__field">
                <span className="story__label">Story Title <span className="story__required">*</span></span>
                <input
                  type="text"
                  className="story__input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Give your story a short title"
                />
              </label>

              <label className="story__field">
                <span className="story__label">Story Description <span className="story__required">*</span></span>
                <textarea
                  className="story__textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={5}
                  placeholder="Tell us about the moment, achievement, or milestone..."
                />
              </label>

              <label className="story__field">
                <span className="story__label">Attachment <span className="story__optional">(optional)</span></span>
                <input
                  type="file"
                  className="story__file-input"
                  onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                />
              </label>

              {error && <p className="story__error"><Icon name="alert" /> {error}</p>}

              <button type="submit" className="story__cta" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Your Story'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
