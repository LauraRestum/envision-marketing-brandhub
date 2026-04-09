import type { QuizConfig } from '@/components/QuizOverlay';

export const colorQuiz: QuizConfig = {
  title: 'Color Palette',
  subtitle: 'Answer a question and we\'ll show you the right color values.',
  icon: 'palette',
  steps: [
    {
      id: 'use-case',
      question: 'What are you designing for?',
      options: [
        { id: 'print', label: 'Print', description: 'Brochures, flyers, signage, or other printed materials' },
        { id: 'digital', label: 'Digital', description: 'Web, email, social media, or screen-based content' },
        { id: 'presentation', label: 'Presentation', description: 'PowerPoint, Google Slides, or keynote decks' },
        { id: 'all', label: 'Show me everything', description: 'I need all color values across formats' },
      ],
    },
  ],
};

export const typographyQuiz: QuizConfig = {
  title: 'Typography & Fonts',
  subtitle: 'Tell us what you need and we\'ll deliver the right assets.',
  icon: 'typography',
  steps: [
    {
      id: 'need',
      question: 'What do you need?',
      options: [
        { id: 'files', label: 'Font files', description: 'Download Montserrat for installing on your computer' },
        { id: 'guidelines', label: 'Usage guidelines', description: 'Weights, sizing, and usage rules for brand materials' },
        { id: 'both', label: 'Both', description: 'Font files and usage guidelines' },
      ],
    },
  ],
};

export const imageryQuiz: QuizConfig = {
  title: 'Approved Imagery',
  subtitle: 'Find the right photos for your project.',
  icon: 'image',
  steps: [
    {
      id: 'topic',
      question: 'What topic do you need imagery for?',
      options: [
        { id: 'rehabilitation', label: 'Rehabilitation', description: 'Patient therapy, clinic settings, vision rehab' },
        { id: 'education', label: 'Education', description: 'Classrooms, training, child development' },
        { id: 'research', label: 'Research', description: 'Labs, researchers, Envision Research Institute' },
        { id: 'community', label: 'Community', description: 'Events, galas, community outreach' },
        { id: 'employment', label: 'Employment', description: 'Employees, manufacturing, workplace' },
        { id: 'products', label: 'Products', description: 'Products, manufacturing processes' },
        { id: 'buildings', label: 'Buildings', description: 'Facility exteriors, interiors, campus' },
      ],
    },
  ],
};

export const videoQuiz: QuizConfig = {
  title: 'Video Library',
  subtitle: 'Find the right video content for your needs.',
  icon: 'image',
  steps: [
    {
      id: 'type',
      question: 'What are you looking for?',
      options: [
        { id: 'overview', label: 'Brand overview', description: 'General Envision brand and mission videos' },
        { id: 'testimonials', label: 'Testimonials', description: 'Client and partner testimonial videos' },
        { id: 'events', label: 'Events', description: 'Event coverage and highlight reels' },
        { id: 'broll', label: 'B-roll footage', description: 'Raw footage for editing into your own projects' },
      ],
    },
  ],
};

export const presentationQuiz: QuizConfig = {
  title: 'Presentation Templates',
  subtitle: 'Get the right deck for your audience.',
  icon: 'document',
  steps: [
    {
      id: 'purpose',
      question: 'What\'s the purpose of the presentation?',
      options: [
        { id: 'sales', label: 'Sales / External', description: 'Client-facing or business development presentations' },
        { id: 'internal', label: 'Internal', description: 'Team meetings, all-hands, internal updates' },
        { id: 'conference', label: 'Conference / Speaking', description: 'Conference talks, panel presentations, keynotes' },
        { id: 'general', label: 'General purpose', description: 'Flexible template for any audience' },
      ],
    },
  ],
};
