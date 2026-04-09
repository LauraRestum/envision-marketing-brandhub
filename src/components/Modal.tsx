import { useEffect, useCallback } from 'react';
import { Icon } from './Icons';
import { requestForms } from '@/data/requestForms';

interface ModalProps {
  modalKey: string | null;
  onClose: () => void;
}

const formRegistry: Record<string, { title: string; embedUrl: string }> = {};
requestForms.forEach((f) => {
  if (f.modalKey && f.embedUrl) {
    formRegistry[f.modalKey] = { title: f.title, embedUrl: f.embedUrl };
  }
});

export function Modal({ modalKey, onClose }: ModalProps) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (modalKey) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [modalKey, handleEsc]);

  // Load (or reload) the ClickUp dynamic-height embed script each time a modal opens.
  // The script must run after the iframe is in the DOM so it can bind to it.
  useEffect(() => {
    if (!modalKey) return;
    const SCRIPT_SRC = 'https://app-cdn.clickup.com/assets/js/forms-embed/v1.js';
    // Remove any existing instance so the script re-initializes for the new iframe
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) existing.remove();
    const s = document.createElement('script');
    s.src = SCRIPT_SRC;
    s.async = true;
    document.body.appendChild(s);
  }, [modalKey]);

  if (!modalKey) return null;

  const form = formRegistry[modalKey];
  if (!form) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <span className="modal__title">{form.title}</span>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            <Icon name="x" />
          </button>
        </div>
        <div className="modal__body">
          <iframe
            className="clickup-embed clickup-dynamic-height modal__iframe"
            src={form.embedUrl}
            title={form.title}
            loading="lazy"
            width="100%"
            height="100%"
            style={{ background: 'transparent', border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}
