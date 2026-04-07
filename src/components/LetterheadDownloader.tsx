import { useState, useCallback, useMemo } from 'react';
import { Icon } from './Icons';
import {
  allLetterheadAssets,
  lhWizardSteps,
  type LetterheadAsset,
  type LetterheadOffice,
  type LetterheadFileType,
} from '@/data/letterheadAssets';

const MJM_PASSWORD = 'MJMonly';

interface Props {
  onClose: () => void;
  onContactClick?: () => void;
}

interface Answers {
  office?: string;
  format?: string;
}

function filterAssets(answers: Answers): LetterheadAsset[] {
  let results = allLetterheadAssets;

  if (answers.office) {
    results = results.filter((a) => a.office === (answers.office as LetterheadOffice));
  }

  if (answers.format && answers.format !== 'all') {
    results = results.filter((a) => a.fileType === (answers.format as LetterheadFileType));
  }

  return results;
}

function getFormatBadgeClass(fileType: string): string {
  switch (fileType) {
    case 'dotx':
      return 'logo-dl__badge--web';
    case 'pdf':
      return 'logo-dl__badge--pdf';
    case 'indd':
      return 'logo-dl__badge--vector';
    case 'jpg':
      return 'logo-dl__badge--web';
    default:
      return '';
  }
}

function getFormatBadgeLabel(fileType: string): string {
  switch (fileType) {
    case 'dotx': return 'DOTX';
    case 'pdf': return 'PDF';
    case 'indd': return 'INDD';
    case 'jpg': return 'JPG';
    default: return fileType.toUpperCase();
  }
}

export function LetterheadDownloader({ onClose, onContactClick }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordUnlocked, setPasswordUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPasswordGate, setShowPasswordGate] = useState(false);

  const currentStep = lhWizardSteps[stepIndex];

  // Determine which formats are available for the selected office
  const availableFormats = useMemo(() => {
    if (!answers.office) return new Set<string>();
    const officeAssets = allLetterheadAssets.filter(
      (a) => a.office === answers.office
    );
    return new Set(officeAssets.map((a) => a.fileType));
  }, [answers.office]);

  const handleSelect = useCallback(
    (optionId: string) => {
      const newAnswers = { ...answers, [currentStep.id]: optionId };
      setAnswers(newAnswers);

      // If they just picked MJM and haven't unlocked, show password gate
      if (currentStep.id === 'office' && optionId === 'desk-of-mjm' && !passwordUnlocked) {
        setShowPasswordGate(true);
        return;
      }

      if (stepIndex + 1 >= lhWizardSteps.length) {
        setShowResults(true);
      } else {
        setStepIndex(stepIndex + 1);
      }
    },
    [answers, currentStep, stepIndex, passwordUnlocked]
  );

  const handlePasswordSubmit = useCallback(() => {
    if (passwordInput === MJM_PASSWORD) {
      setPasswordUnlocked(true);
      setShowPasswordGate(false);
      setPasswordError(false);
      // Advance to format step
      setStepIndex(1);
    } else {
      setPasswordError(true);
    }
  }, [passwordInput]);

  const handleBack = useCallback(() => {
    if (showPasswordGate) {
      setShowPasswordGate(false);
      setPasswordInput('');
      setPasswordError(false);
      // Remove the office answer so they can pick again
      const cleaned = { ...answers };
      delete cleaned.office;
      setAnswers(cleaned);
      return;
    }
    if (showResults) {
      setShowResults(false);
      return;
    }
    if (stepIndex > 0) {
      const prev = stepIndex - 1;
      const key = lhWizardSteps[prev].id as keyof Answers;
      const cleaned = { ...answers };
      delete cleaned[key];
      setAnswers(cleaned);
      setStepIndex(prev);
    }
  }, [showResults, showPasswordGate, stepIndex, answers]);

  const handleStartOver = useCallback(() => {
    setStepIndex(0);
    setAnswers({});
    setShowResults(false);
    setShowPasswordGate(false);
    setPasswordInput('');
    setPasswordError(false);
  }, []);

  const handleDownload = useCallback((asset: LetterheadAsset) => {
    const fileName = asset.path.split('/').pop() || 'letterhead';
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
        window.open(encodedPath, '_blank', 'noopener');
      });
  }, []);

  const results = showResults ? filterAssets(answers) : [];

  // Build breadcrumbs
  const breadcrumbs: string[] = [];
  for (let i = 0; i < stepIndex; i++) {
    const step = lhWizardSteps[i];
    const answerId = answers[step.id as keyof Answers];
    if (answerId) {
      const opt = step.options.find((o) => o.id === answerId);
      if (opt) breadcrumbs.push(opt.label);
    }
  }
  if (showResults) {
    const lastStep = lhWizardSteps[Math.min(stepIndex, lhWizardSteps.length - 1)];
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
              <Icon name="document" />
            </div>
            <div>
              <h2 className="logo-dl__title">Letterhead Downloads</h2>
              <p className="logo-dl__subtitle">
                Tell us your office and what format you need.
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

        {/* Password Gate */}
        {showPasswordGate && (
          <div className="logo-dl__step">
            <div className="logo-dl__step-counter">Password Required</div>
            <h3 className="logo-dl__question">This letterhead is restricted. Enter the password to continue.</h3>
            <div className="logo-dl__password-wrap">
              <input
                type="password"
                className={`logo-dl__password-input${passwordError ? ' logo-dl__password-input--error' : ''}`}
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(false); }}
                onKeyDown={(e) => { if (e.key === 'Enter') handlePasswordSubmit(); }}
                autoFocus
              />
              <button className="logo-dl__download-btn" onClick={handlePasswordSubmit}>
                Unlock
              </button>
            </div>
            {passwordError && (
              <p className="logo-dl__password-error">Incorrect password. Please try again.</p>
            )}
          </div>
        )}

        {/* Wizard Steps */}
        {!showResults && !showPasswordGate && currentStep && (
          <div className="logo-dl__step">
            <div className="logo-dl__step-counter">
              Step {stepIndex + 1} of {lhWizardSteps.length}
            </div>
            <h3 className="logo-dl__question">{currentStep.question}</h3>
            <div className="logo-dl__options">
              {currentStep.options
                .filter((option) => {
                  // On the format step, only show formats that exist for this office
                  if (currentStep.id === 'format') {
                    if (option.id === 'all') return true;
                    return availableFormats.has(option.id);
                  }
                  return true;
                })
                .map((option) => (
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
                  : 'No files available for this combination'}
              </h3>
              {results.length === 0 && (
                <p className="logo-dl__results-empty">
                  This office may not have that format available yet. Try <button className="logo-dl__link-btn" onClick={handleStartOver}>selecting a different format</button> or contact the marketing team.
                </p>
              )}
            </div>

            {results.length > 0 && (
              <div className="logo-dl__file-list">
                {results.map((asset) => (
                  <div key={asset.id} className="logo-dl__file">
                    <div className="logo-dl__file-info">
                      <div className="logo-dl__file-top">
                        <span className={`logo-dl__badge ${getFormatBadgeClass(asset.fileType)}`}>
                          {getFormatBadgeLabel(asset.fileType)}
                        </span>
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
              Not finding what you need? <button className="logo-dl__link-btn" onClick={handleStartOver}>Try different options</button> or <button className="logo-dl__link-btn" onClick={onContactClick}>contact the marketing team</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
