import { useCallback } from 'react';
import type { ActionType } from '@/data/types';

interface ActionTarget {
  actionType: ActionType;
  href?: string;
  modalKey?: string;
  anchorId?: string;
}

export function useAction(onOpenModal: (key: string) => void) {
  return useCallback(
    (target: ActionTarget) => {
      switch (target.actionType) {
        case 'email':
        case 'external':
          if (target.href) window.open(target.href, '_blank', 'noopener');
          break;
        case 'internal':
          if (target.href) window.location.href = target.href;
          break;
        case 'modal':
          if (target.modalKey) onOpenModal(target.modalKey);
          break;
        case 'anchor':
          if (target.anchorId) {
            document.getElementById(target.anchorId)?.scrollIntoView({ behavior: 'smooth' });
          }
          break;
      }
    },
    [onOpenModal]
  );
}
