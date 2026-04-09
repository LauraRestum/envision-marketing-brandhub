import { useState, useMemo, useRef, useEffect } from 'react';
import { Icon } from './Icons';
import { ImageryResultCard } from './ImageryResultCard';
import { resources } from '@/data/resources';
import { templates } from '@/data/templates';
import { requestForms } from '@/data/requestForms';
import { decisionCards } from '@/data/decisionCards';
import { approvedCopy } from '@/data/approvedMessaging';
import { resolveImageryRoute, type ImageryRouteResult } from '@/lib/resolveImageryRoute';
import type { ActionType } from '@/data/types';

interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: string;
  actionType: ActionType;
  href?: string;
  modalKey?: string;
  anchorId?: string;
  keywords: string[];
  icon?: string;
}

const SEARCH_HINTS = ['logo', 'letterhead', 'presentation', 'colors', 'brand guidelines', 'imagery', 'story', 'print'];

/** Common synonyms for forgiving keyword matching */
const SYNONYMS: Record<string, string[]> = {
  photo: ['imagery', 'image', 'picture', 'photography', 'photos'],
  imagery: ['photo', 'image', 'picture', 'photography', 'photos'],
  image: ['photo', 'imagery', 'picture', 'photography'],
  picture: ['photo', 'imagery', 'image', 'photography'],
  ppt: ['presentation', 'powerpoint', 'slides', 'deck'],
  powerpoint: ['presentation', 'ppt', 'slides', 'deck'],
  presentation: ['ppt', 'powerpoint', 'slides', 'deck'],
  slides: ['presentation', 'ppt', 'powerpoint', 'deck'],
  deck: ['presentation', 'ppt', 'powerpoint', 'slides'],
  logo: ['brand identity', 'logomark', 'wordmark', 'brand mark'],
  font: ['typography', 'typeface', 'type'],
  typography: ['font', 'typeface', 'type', 'fonts'],
  color: ['palette', 'colours', 'colors', 'hex', 'rgb'],
  colours: ['color', 'palette', 'colors'],
  colors: ['color', 'palette', 'colours'],
  print: ['reprint', 'printing', 'printer', 'envision print services'],
  reprint: ['print', 'reorder', 'printing'],
  letterhead: ['stationery', 'letter', 'correspondence'],
  stationery: ['letterhead', 'letter'],
  story: ['news', 'achievement', 'milestone', 'spotlight', 'submit'],
  video: ['imagery', 'media', 'footage'],
  brochure: ['flyer', 'handout', 'pamphlet'],
  flyer: ['brochure', 'handout', 'pamphlet'],
  social: ['facebook', 'linkedin', 'instagram', 'tiktok', 'social media'],
  messaging: ['copy', 'tagline', 'talking points', 'language', 'boilerplate'],
  copy: ['messaging', 'tagline', 'talking points', 'language'],
  guidelines: ['brand guidelines', 'colors', 'typography', 'fonts', 'brand identity'],
  brand: ['logo', 'colors', 'typography', 'guidelines', 'identity'],
};

function expandQuery(terms: string[]): string[] {
  const expanded = new Set(terms);
  for (const term of terms) {
    const syns = SYNONYMS[term];
    if (syns) {
      for (const s of syns) expanded.add(s);
    }
    // Handle plural/singular
    if (term.endsWith('s') && term.length > 3) {
      expanded.add(term.slice(0, -1));
    } else if (!term.endsWith('s')) {
      expanded.add(term + 's');
    }
  }
  return Array.from(expanded);
}

function buildIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // Resources
  for (const r of resources) {
    items.push({ ...r, category: 'Brand Resource', anchorId: r.anchorId || 'brand-resources' });
  }

  // Templates
  for (const t of templates) {
    items.push({ ...t, category: 'Template', anchorId: t.anchorId || 'templates' });
  }

  // Request forms
  for (const f of requestForms) {
    items.push({ id: f.id, title: f.title, description: f.description, category: 'Request', actionType: f.actionType, href: f.href, modalKey: f.modalKey, anchorId: f.anchorId, keywords: f.keywords, icon: f.icon });
  }

  // Decision cards (quiz entry points)
  for (const dc of decisionCards) {
    items.push({
      id: dc.id,
      title: dc.title,
      description: dc.description,
      category: 'Quick Action',
      actionType: dc.actionType,
      href: dc.href,
      modalKey: dc.modalKey,
      anchorId: dc.anchorId,
      keywords: dc.keywords,
      icon: dc.icon,
    });
  }

  // Approved messaging / copy blocks
  for (const block of approvedCopy) {
    items.push({
      id: `msg-${block.id}`,
      title: block.title,
      description: block.content.slice(0, 120) + (block.content.length > 120 ? '...' : ''),
      category: 'Messaging',
      actionType: 'anchor',
      anchorId: 'messaging-assistant',
      keywords: [...block.tags, 'messaging', 'copy', 'approved'],
      icon: 'message',
    });
  }

  // Section anchors for direct navigation
  const sections: SearchItem[] = [
    { id: 'nav-brand-identity', title: 'Brand Identity — Logos', description: 'Official Envision logos in horizontal, stacked, and vertical layouts.', category: 'Section', actionType: 'anchor', anchorId: 'brand-identity', keywords: ['logo', 'brand identity', 'logos', 'brand mark', 'wordmark'], icon: 'logo' },
    { id: 'nav-brand-guidelines', title: 'Brand Guidelines', description: 'Colors, typography, and font guidelines.', category: 'Section', actionType: 'anchor', anchorId: 'brand-guidelines', keywords: ['guidelines', 'colors', 'typography', 'fonts', 'brand guidelines', 'color palette'], icon: 'palette' },
    { id: 'nav-templates', title: 'Templates', description: 'Presentation deck, letterhead, and print tools.', category: 'Section', actionType: 'anchor', anchorId: 'templates', keywords: ['template', 'presentation', 'letterhead', 'print'], icon: 'document' },
    { id: 'nav-resources', title: 'Brand Resources — Imagery & Video', description: 'Approved photography and video library.', category: 'Section', actionType: 'anchor', anchorId: 'brand-resources', keywords: ['imagery', 'photo', 'video', 'photography', 'resources'], icon: 'image' },
    { id: 'nav-messaging', title: 'Messaging Assistant', description: 'Compose on-brand content and check brand compliance.', category: 'Section', actionType: 'anchor', anchorId: 'messaging-assistant', keywords: ['messaging', 'assistant', 'compose', 'brand check', 'compliance'], icon: 'sparkle' },
    { id: 'nav-social', title: 'Social Media Quick Links', description: 'Links to official Envision social media profiles.', category: 'Section', actionType: 'anchor', anchorId: 'social-links', keywords: ['social', 'facebook', 'linkedin', 'instagram', 'tiktok', 'social media'], icon: 'social' },
    { id: 'nav-story', title: 'Submit a Story', description: 'Share a story, achievement, or milestone for Envision communications.', category: 'Section', actionType: 'anchor', anchorId: 'story-submission', keywords: ['story', 'submit', 'news', 'achievement', 'milestone'], icon: 'star' },
  ];
  items.push(...sections);

  return items;
}

interface Props {
  onAction: (target: { actionType: ActionType; href?: string; modalKey?: string; anchorId?: string }) => void;
  onLogoDownloader?: () => void;
  onLetterheadDownloader?: () => void;
}

export function UniversalSearch({ onAction, onLogoDownloader, onLetterheadDownloader }: Props) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [imageryResult, setImageryResult] = useState<ImageryRouteResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const index = useMemo(buildIndex, []);

  // Standard resource/template/form results with synonym expansion
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const terms = q.split(/\s+/);
    const expandedTerms = expandQuery(terms);

    return index
      .map((item) => {
        const haystack = `${item.title} ${item.description} ${item.keywords.join(' ')}`.toLowerCase();
        let score = 0;

        // Exact terms score higher
        for (const t of terms) {
          if (haystack.includes(t)) score += 2;
        }
        // Expanded (synonym) terms score lower
        for (const t of expandedTerms) {
          if (!terms.includes(t) && haystack.includes(t)) score += 1;
        }
        // Partial match bonus
        for (const t of terms) {
          for (const kw of item.keywords) {
            if (kw.toLowerCase().startsWith(t) || t.startsWith(kw.toLowerCase())) {
              score += 1;
            }
          }
        }
        // Title exact match bonus
        if (item.title.toLowerCase().includes(q)) score += 4;
        return { item, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((r) => r.item);
  }, [query, index]);

  // Imagery taxonomy match
  const currentImageryMatch = useMemo(() => {
    if (!query.trim()) return null;
    return resolveImageryRoute(query);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showResults = focused && query.trim().length > 0;

  function handleSelectResult(item: SearchItem) {
    if (item.id === 'logos-primary' && onLogoDownloader) {
      onLogoDownloader();
      setQuery('');
      setFocused(false);
      setImageryResult(null);
      return;
    }
    if (item.id === 'template-letterhead' && onLetterheadDownloader) {
      onLetterheadDownloader();
      setQuery('');
      setFocused(false);
      setImageryResult(null);
      return;
    }
    onAction(item);
    setQuery('');
    setFocused(false);
    setImageryResult(null);
  }

  function handleImageryConfirm() {
    if (currentImageryMatch) {
      setImageryResult(currentImageryMatch);
      setFocused(false);
    }
  }

  return (
    <div className="search" ref={wrapRef}>
      <div className="search__input-wrap">
        <span className="search__icon"><Icon name="search" /></span>
        <input
          ref={inputRef}
          className="search__input"
          type="text"
          placeholder="Search for logos, templates, forms, photos, or anything you need..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setImageryResult(null); }}
          onFocus={() => setFocused(true)}
        />
        {query && (
          <button className="search__clear" onClick={() => { setQuery(''); setImageryResult(null); inputRef.current?.focus(); }}>
            <Icon name="x" />
          </button>
        )}
      </div>

      {showResults && (
        <div className="search__results">
          {/* Imagery match — shown as a promoted result at top */}
          {currentImageryMatch && (
            <>
              <div className="search__results-header">Imagery Library</div>
              <div
                className="search__result-item search__result-item--imagery"
                onClick={handleImageryConfirm}
              >
                <div className="search__result-icon search__result-icon--imagery">
                  <Icon name="image" />
                </div>
                <div className="search__result-text">
                  <div className="search__result-title">{currentImageryMatch.subcategory}</div>
                  <div className="search__result-desc">
                    {currentImageryMatch.destinationTitle}
                  </div>
                </div>
                <span className="search__result-badge search__result-badge--imagery">Photo</span>
              </div>
            </>
          )}

          {/* Standard results */}
          {results.length > 0 && (
            <>
              <div className="search__results-header">
                {results.length} result{results.length !== 1 ? 's' : ''}
              </div>
              {results.map((item) => (
                <div
                  key={item.id}
                  className="search__result-item"
                  onClick={() => handleSelectResult(item)}
                >
                  <div className="search__result-icon">
                    <Icon name={item.icon || 'document'} />
                  </div>
                  <div className="search__result-text">
                    <div className="search__result-title">{item.title}</div>
                    <div className="search__result-desc">{item.description}</div>
                  </div>
                  <span className="search__result-badge">{item.category}</span>
                </div>
              ))}
            </>
          )}

          {!currentImageryMatch && results.length === 0 && (
            <div className="search__empty">
              No results for "{query}". Try a different term or <button
                style={{ color: 'var(--brand-cyan)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}
                onClick={() => {
                  onAction({ actionType: 'anchor', anchorId: 'story-submission' });
                  setQuery('');
                  setFocused(false);
                }}
              >submit a story</button>.
            </div>
          )}
        </div>
      )}

      {/* Imagery result card — persists outside the dropdown */}
      {imageryResult && (
        <ImageryResultCard
          result={imageryResult}
          onDismiss={() => setImageryResult(null)}
        />
      )}

      <div className="search__hints">
        {SEARCH_HINTS.map((hint) => (
          <button key={hint} className="search__hint" onClick={() => { setQuery(hint); setImageryResult(null); setFocused(true); inputRef.current?.focus(); }}>
            {hint}
          </button>
        ))}
      </div>
    </div>
  );
}
