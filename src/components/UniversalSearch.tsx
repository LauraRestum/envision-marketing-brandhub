import { useState, useMemo, useRef, useEffect } from 'react';
import { Icon } from './Icons';
import { resources } from '@/data/resources';
import { templates } from '@/data/templates';
import { requestForms } from '@/data/requestForms';
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

const SEARCH_HINTS = ['logo', 'presentation', 'reprint', 'brand guidelines', 'business card'];

function buildIndex(): SearchItem[] {
  const items: SearchItem[] = [];
  for (const r of resources) {
    items.push({ ...r, category: 'Brand Resource', anchorId: 'brand-resources' });
  }
  for (const t of templates) {
    items.push({ ...t, category: 'Template', anchorId: 'templates' });
  }
  for (const f of requestForms) {
    items.push({ id: f.id, title: f.title, description: f.description, category: 'Request', actionType: f.actionType, href: f.href, modalKey: f.modalKey, keywords: f.keywords, icon: f.icon });
  }
  return items;
}

interface Props {
  onAction: (target: { actionType: ActionType; href?: string; modalKey?: string; anchorId?: string }) => void;
}

export function UniversalSearch({ onAction }: Props) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const terms = q.split(/\s+/);
    return index
      .map((item) => {
        const haystack = `${item.title} ${item.description} ${item.keywords.join(' ')}`.toLowerCase();
        let score = 0;
        for (const t of terms) {
          if (haystack.includes(t)) score++;
        }
        if (item.title.toLowerCase().includes(q)) score += 3;
        return { item, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.item);
  }, [query, index]);

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

  return (
    <div className="search" ref={wrapRef}>
      <div className="search__input-wrap">
        <span className="search__icon"><Icon name="search" /></span>
        <input
          ref={inputRef}
          className="search__input"
          type="text"
          placeholder="Search for logos, templates, forms, or anything you need..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
        />
        {query && (
          <button className="search__clear" onClick={() => { setQuery(''); inputRef.current?.focus(); }}>
            <Icon name="x" />
          </button>
        )}
      </div>

      {showResults && (
        <div className="search__results">
          {results.length > 0 ? (
            <>
              <div className="search__results-header">{results.length} result{results.length !== 1 ? 's' : ''}</div>
              {results.map((item) => (
                <div
                  key={item.id}
                  className="search__result-item"
                  onClick={() => {
                    onAction(item);
                    setQuery('');
                    setFocused(false);
                  }}
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
          ) : (
            <div className="search__empty">
              No results for "{query}". Try a different term or <button
                style={{ color: 'var(--teal-500)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}
                onClick={() => {
                  onAction({ actionType: 'anchor', anchorId: 'request-center' });
                  setQuery('');
                  setFocused(false);
                }}
              >submit a request</button>.
            </div>
          )}
        </div>
      )}

      <div className="search__hints">
        {SEARCH_HINTS.map((hint) => (
          <button key={hint} className="search__hint" onClick={() => { setQuery(hint); setFocused(true); inputRef.current?.focus(); }}>
            {hint}
          </button>
        ))}
      </div>
    </div>
  );
}
