import { PILLARS, type PillarKey } from '@/data/pillars';

interface Props {
  pillar: PillarKey;
}

export function PillarTag({ pillar }: Props) {
  const p = PILLARS[pillar];
  if (!p) return null;

  return (
    <span
      className="pillar-tag"
      style={
        {
          '--ptag-color': p.color,
          '--ptag-bg': p.bg,
          '--ptag-text': p.text,
        } as React.CSSProperties
      }
    >
      {p.shortLabel}
    </span>
  );
}
