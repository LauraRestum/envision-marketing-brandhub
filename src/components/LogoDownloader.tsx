import { useState, useCallback } from 'react';
import { Icon } from './Icons';
import {
  allLogoAssets,
  wizardSteps,
  type LogoAsset,
  type LogoCategory,
  type UseCase,
  type ColorVariant,
} from '@/data/logoAssets';

interface Props {
  onClose: () => void;
}

interface Answers {
  'logo-type'?: string;
  'use-case'?: string;
  background?: string;
}

function filterAssets(answers: Answers): LogoAsset[] {
  let results = allLogoAssets;

  // Filter by category (logo type)
  if (answers['logo-type']) {
    results = results.filter((a) => a.category === (answers['logo-type'] as LogoCategory));
  }

  // Filter by use case
  if (answers['use-case']) {
    const uc = answers['use-case'] as UseCase;
    results = results.filter((a) => a.useCases.includes(uc));
  }

  // Filter by background → color variant
  if (answers.background && answers.background !== 'both') {
    const bg = answers.background;
    if (bg === 'light') {
      // Light bg → full-color or black
      results = results.filter((a) => a.colorVariant !== 'white');
    } else if (bg === 'dark') {
      // Dark bg → white or full-color
      results = results.filter((a) => a.colorVariant !== 'black');
    }
  }

  return results;
}

function formatFileSize(format: string): string {
  switch (format) {
    case 'png': return 'PNG';
    case 'jpg': return 'JPG';
    case 'eps': return 'EPS';
    case 'ai': return 'AI';
    case 'pdf': return 'PDF';
    case 'indd': return 'INDD';
    default: return format.toUpperCase();
  }
}

function getFormatBadgeClass(format: string): string {
  switch (format) {
    case 'png':
    case 'jpg':
      return 'logo-dl__badge--web';
    case 'eps':
    case 'ai':
    case 'indd':
      return 'logo-dl__badge--vector';
    case 'pdf':
      return 'logo-dl__badge--pdf';
    default:
      return '';
  }
}

function getColorDot(variant: ColorVariant): string {
  switch (variant) {
    case 'full-color': return '#162B6B';
    case 'black': return '#111213';
    case 'white': return '#e4e7ec';
  }
}

export function LogoDownloader({ onClose }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);

  const currentStep = wizardSteps[stepIndex];

  const handleSelect = useCallback(
    (optionId: string) => {
      const newAnswers = { ...answers, [currentStep.id]: optionId };
      setAnswers(newAnswers);

      // Social profiles skip background question (they're pre-made)
      // Legacy logos also skip background
      const skipBackground =
        currentStep.id === 'use-case' &&
        (newAnswers['logo-type'] === 'social-profile' || newAnswers['logo-type'] === 'legacy');

      if (stepIndex + 1 >= wizardSteps.length || skipBackground) {
        setShowResults(true);
      } else {
        setStepIndex(stepIndex + 1);
      }
    },
    [answers, currentStep, stepIndex]
  );

  const handleBack = useCallback(() => {
    if (showResults) {
      // If we skipped a step, go to the right place
      const skipped =
        answers['logo-type'] === 'social-profile' || answers['logo-type'] === 'legacy';
      if (skipped && stepIndex < wizardSteps.length - 1) {
        setShowResults(false);
        return;
      }
      setShowResults(false);
      return;
    }
    if (stepIndex > 0) {
      const prev = stepIndex - 1;
      const key = wizardSteps[prev].id as keyof Answers;
      const cleaned = { ...answers };
      delete cleaned[key];
      setAnswers(cleaned);
      setStepIndex(prev);
    }
  }, [showResults, stepIndex, answers]);

  const handleStartOver = useCallback(() => {
    setStepIndex(0);
    setAnswers({});
    setShowResults(false);
  }, []);

  const handleDownload = useCallback((asset: LogoAsset) => {
    const fileName = asset.path.split('/').pop() || 'logo';
    const encodedPath = asset.path
      .split('/')
      .map((seg) => encodeURIComponent(seg))
      .join('/');

    fetch(encodedPath)
      .then((res) => {
        if (!res.ok) throw new Error(`Download failed: ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch(() => {
        // Fallback: open in new tab if fetch fails
        window.open(encodedPath, '_blank', 'noopener');
      });
  }, []);

  const results = showResults ? filterAssets(answers) : [];

  // Build breadcrumb from answers
  const breadcrumbs: string[] = [];
  for (let i = 0; i < stepIndex; i++) {
    const step = wizardSteps[i];
    const answerId = answers[step.id as keyof Answers];
    if (answerId) {
      const opt = step.options.find((o) => o.id === answerId);
      if (opt) breadcrumbs.push(opt.label);
    }
  }
  if (showResults) {
    const lastStep = wizardSteps[Math.min(stepIndex, wizardSteps.length - 1)];
    const lastAnswer = answers[lastStep.id as keyof Answers];
    if (lastAnswer) {
      const opt = lastStep.options.find((o) => o.id === lastAnswer);
      if (opt) breadcrumbs.push(opt.label);
    }
  }

  return (
    <div className="logo-dl__overlay" onClick={onClose}>
      <div className="logo-dl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="logo-dl__header">
          <div className="logo-dl__header-left">
            <div className="logo-dl__icon-wrap">
              <Icon name="download" />
            </div>
            <div>
              <h2 className="logo-dl__title">Logo Downloads</h2>
              <p className="logo-dl__subtitle">
                Answer a few questions and we'll get you the right file.
              </p>
            </div>
          </div>
          <button className="logo-dl__close" onClick={onClose} aria-label="Close">
            <Icon name="x" />
          </button>
        </div>

        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <div className="logo-dl__breadcrumb">
            <button className="logo-dl__back-btn" onClick={showResults ? handleStartOver : handleBack}>
              <Icon name="arrow-right" /> {showResults ? 'Start over' : 'Back'}
            </button>
            <div className="logo-dl__trail">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="logo-dl__crumb">
                  {i > 0 && <span className="logo-dl__crumb-sep">/</span>}
                  {crumb}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Wizard Steps */}
        {!showResults && currentStep && (
          <div className="logo-dl__step">
            <div className="logo-dl__step-counter">
              Step {stepIndex + 1} of {wizardSteps.length}
            </div>
            <h3 className="logo-dl__question">{currentStep.question}</h3>
            <div className="logo-dl__options">
              {currentStep.options.map((option) => (
                <button
                  key={option.id}
                  className="logo-dl__option"
                  onClick={() => handleSelect(option.id)}
                >
                  <div className="logo-dl__option-content">
                    <span className="logo-dl__option-label">{option.label}</span>
                    <span className="logo-dl__option-desc">{option.description}</span>
                  </div>
                  <span className="logo-dl__option-arrow">
                    <Icon name="arrow-right" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div className="logo-dl__results">
            <div className="logo-dl__results-header">
              <h3 className="logo-dl__results-title">
                {results.length > 0
                  ? `Here are your ${results.length} matching file${results.length !== 1 ? 's' : ''}`
                  : 'No exact matches found'}
              </h3>
              {results.length === 0 && (
                <p className="logo-dl__results-empty">
                  Try adjusting your selections, or <button className="logo-dl__link-btn" onClick={handleStartOver}>start over</button> with different choices.
                </p>
              )}
            </div>

            {results.length > 0 && (
              <div className="logo-dl__file-list">
                {results.map((asset) => (
                  <div key={asset.id} className="logo-dl__file">
                    <div className="logo-dl__file-info">
                      <div className="logo-dl__file-top">
                        <span className={`logo-dl__badge ${getFormatBadgeClass(asset.format)}`}>
                          {formatFileSize(asset.format)}
                        </span>
                        <span
                          className="logo-dl__color-dot"
                          style={{ background: getColorDot(asset.colorVariant) }}
                          title={asset.colorVariant}
                        />
                        <span className="logo-dl__file-format">{asset.formatLabel}</span>
                      </div>
                      <div className="logo-dl__file-name">{asset.name}</div>
                      {asset.note && (
                        <div className="logo-dl__file-note">{asset.note}</div>
                      )}
                    </div>
                    <button
                      className="logo-dl__download-btn"
                      onClick={() => handleDownload(asset)}
                      title={`Download ${asset.name}`}
                    >
                      <Icon name="download" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="logo-dl__footer-note">
              Not finding what you need? <button className="logo-dl__link-btn" onClick={handleStartOver}>Try different options</button> or contact <a href="mailto:marketing@envisionus.com" className="logo-dl__email-link">marketing@envisionus.com</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
