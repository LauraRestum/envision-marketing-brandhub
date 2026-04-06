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

export function StorySubmission() {
  return (
    <section className="story-section">
      <div className="story__inner">
        <div className="story__content">
          <div className="story__eyebrow">Share Your Story</div>
          <h2 className="story__title">{featuredContent.title}</h2>
          <p className="story__desc">{featuredContent.description}</p>
          <a href={featuredContent.href} className="story__cta" target="_blank" rel="noopener noreferrer">
            <Icon name="mail" />
            {featuredContent.cta}
          </a>
          <p className="story__email-note">
            <Icon name="mail" size={14} />
            Opens an email to marketing@envisionus.com
          </p>
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
