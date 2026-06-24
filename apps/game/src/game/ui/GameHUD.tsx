import { useGameStore, type GamePlayMode } from '../state/useGameStore';
import { getGameCopy, type LocaleCode } from '../copy';
import GameButton from './GameButton';
import GamePanel from './GamePanel';

interface GameHudProps {
  locale?: LocaleCode;
}

const mainMenuItems: Array<{ id: GamePlayMode; label: string; note: string; icon: string }> = [
  { id: 'career', label: 'Story Mode', note: 'Progression / chapters', icon: '✦' },
  { id: 'training', label: 'Training', note: 'Practice / controls', icon: '⌁' }
];

const settingsCards = [
  {
    label: 'Audio',
    title: 'Sound mix',
    description: 'Music, crowd, impacts, and UI feedback levels.',
    meta: '4 channels'
  },
  {
    label: 'Display',
    title: 'Visual setup',
    description: 'Brightness, camera shake, contrast, and screen safe area.',
    meta: 'Screen'
  },
  {
    label: 'Controls',
    title: 'Input map',
    description: 'Keyboard, pad, touch, and future remapping profiles.',
    meta: 'Input'
  },
  {
    label: 'Accessibility',
    title: 'Assist options',
    description: 'Readable HUD, reduced motion, timing assists, and captions.',
    meta: 'Access'
  }
];

const creditCards = [
  {
    label: 'Team',
    title: 'Independent solo build',
    description: 'Built and maintained as an indie project with heavy LLM assistance and prompt-aligned visual direction.',
    meta: 'Open dev'
  },
  {
    label: 'Tools',
    title: 'Astro / React / Three.js',
    description: 'The menu remains 2D. Three.js is reserved for play scenes and future gameplay modules.',
    meta: 'Stack'
  },
  {
    label: 'Visual direction',
    title: 'Urban arcade base',
    description: 'A browser-game interface shaped around street culture, bold contrast, and readable controller-first surfaces.',
    meta: 'Style'
  }
];

export default function GameHUD({ locale = 'en-US' }: GameHudProps) {
  const copy = getGameCopy(locale);
  const scene = useGameStore((state) => state.scene);
  const selectedMode = useGameStore((state) => state.selectedMode);
  const openMainMenu = useGameStore((state) => state.openMainMenu);
  const openSettings = useGameStore((state) => state.openSettings);
  const openCredits = useGameStore((state) => state.openCredits);
  const openSplash = useGameStore((state) => state.openSplash);
  const startMode = useGameStore((state) => state.startMode);

  if (scene === 'splashscreen') {
    return (
      <div className="game-hud game-hud--splash">
        <div className="game-splash-layout">
          <div className="game-splash-logo-block">
            <img src="/logo-bboyarena.svg" alt="BboyArena" className="game-splash-logo-image" />
            <div className="game-splash-kicker">2D front-end / 3D only in play scenes</div>
          </div>

          <GamePanel variant="dark" className="game-splash-card">
            <p className="game-panel__label">Welcome</p>
            <div className="game-panel__title">Enter the lobby</div>
            <p className="game-panel__description">
              The menu uses the illustrated splash background. Three.js stays idle until you pick a play mode.
            </p>
            <div className="game-splash-actions">
              <GameButton variant="primary" fullWidth onClick={openMainMenu}>
                Continue
              </GameButton>
            </div>
          </GamePanel>
        </div>
      </div>
    );
  }

  if (scene === 'mainMenu') {
    return (
      <div className="game-hud game-hud--menu">
        <div className="game-mainmenu">
          <div className="game-mainmenu__left">
            <div className="game-mainmenu__brand">
              <img src="/logo-bboyarena.svg" alt="BboyArena" className="game-mainmenu__logo-image" />
              <div className="game-mainmenu__subtitle">Street battle / illustrated lobby</div>
            </div>

            <nav className="game-mainmenu__nav" aria-label="Game modes">
              {mainMenuItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`game-mode-button ${selectedMode === item.id ? 'is-primary' : ''}`}
                  onClick={() => startMode(item.id)}
                >
                  <span className="game-mode-button__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="game-mode-button__body">
                    <span className="game-mode-button__title">{item.label}</span>
                    <span className="game-mode-button__note">{item.note}</span>
                  </span>
                  <span className="game-mode-button__arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              ))}

              <button type="button" className="game-mode-button game-mode-button--utility" onClick={openSettings}>
                <span className="game-mode-button__icon" aria-hidden="true">
                  ⚙
                </span>
                <span className="game-mode-button__body">
                  <span className="game-mode-button__title">Options</span>
                  <span className="game-mode-button__note">Audio / display</span>
                </span>
                <span className="game-mode-button__arrow" aria-hidden="true">
                  →
                </span>
              </button>

              <button type="button" className="game-mode-button game-mode-button--utility game-mode-button--credits" onClick={openCredits}>
                <span className="game-mode-button__icon" aria-hidden="true">
                  ★
                </span>
                <span className="game-mode-button__body">
                  <span className="game-mode-button__title">Extras / Credits / Info</span>
                  <span className="game-mode-button__note">How to use this base</span>
                </span>
                <span className="game-mode-button__arrow" aria-hidden="true">
                  →
                </span>
              </button>
            </nav>
          </div>

          <div className="game-mainmenu__topbar">
            <GamePanel variant="soft" className="game-profile-card">
              <div className="game-profile-card__avatar" aria-hidden="true" />
              <div className="game-profile-card__body">
                <div className="game-profile-card__name">BBOY_ROOKIE</div>
                <div className="game-profile-card__meta">Level 04 · 1250 / 2500 XP</div>
              </div>
            </GamePanel>

            <GamePanel variant="soft" className="game-currency-card">
              <div className="game-currency-card__coin" aria-hidden="true" />
              <div className="game-currency-card__value">865</div>
              <button type="button" className="game-currency-card__plus" aria-label="Add currency">
                +
              </button>
            </GamePanel>
          </div>

        </div>
      </div>
    );
  }

  if (scene === 'settings') {
    return (
      <div className="game-hud game-hud--section">
        <GamePanel variant="dark" className="game-section-shell">
          <div className="game-section-shell__header">
            <div>
              <p className="game-panel__label">Settings</p>
              <div className="game-panel__title">Display and input</div>
              <p className="game-panel__description">
                Tuning panel for audio, visual, accessibility and controls. This screen stays 2D and free from three.js.
              </p>
            </div>
            <span className="game-section-shell__tag">Prototype panel</span>
          </div>

          <div className="game-settings-grid">
            {settingsCards.map((item) => (
              <GamePanel key={item.label} variant="light" className="game-settings-card">
                <div className="game-settings-card__top">
                  <p className="game-panel__label">{item.label}</p>
                  <span>{item.meta}</span>
                </div>
                <div className="game-panel__title">{item.title}</div>
                <p className="game-panel__description">{item.description}</p>
                <div className="game-meter" aria-hidden="true">
                  <span style={{ width: item.label === 'Accessibility' ? '62%' : item.label === 'Display' ? '76%' : '48%' }} />
                </div>
              </GamePanel>
            ))}
          </div>

          <div className="game-section-shell__footer">
            <GameButton variant="secondary" onClick={openMainMenu}>
              Back to menu
            </GameButton>
            <p>Changes shown here are UI placeholders until the gameplay systems are wired.</p>
          </div>
        </GamePanel>
      </div>
    );
  }

  if (scene === 'credits') {
    return (
      <div className="game-hud game-hud--section">
        <GamePanel variant="dark" className="game-section-shell">
          <div className="game-section-shell__header">
            <div>
              <p className="game-panel__label">Credits</p>
              <div className="game-panel__title">Project notes</div>
              <p className="game-panel__description">
                A 2D information screen for attribution, tools, and release notes.
              </p>
            </div>
            <span className="game-section-shell__tag">Open source</span>
          </div>

          <div className="game-credits-grid">
            {creditCards.map((item) => (
              <GamePanel key={item.label} variant="light" className="game-credits-card">
                <div className="game-settings-card__top">
                  <p className="game-panel__label">{item.label}</p>
                  <span>{item.meta}</span>
                </div>
                <div className="game-panel__title">{item.title}</div>
                <p className="game-panel__description">{item.description}</p>
              </GamePanel>
            ))}
          </div>

          <div className="game-section-shell__footer">
            <GameButton variant="secondary" onClick={openMainMenu}>
              Back to menu
            </GameButton>
            <p>Credits content will grow together with the project contributors and release notes.</p>
          </div>
        </GamePanel>
      </div>
    );
  }

  return (
    <div className="game-hud game-hud--splash">
      <div className="game-splash-layout">
        <div className="game-splash-logo-block">
          <img src="/logo-bboyarena.svg" alt="BboyArena" className="game-splash-logo-image" />
          <div className="game-splash-kicker">Illustrated lobby / no 3D until play</div>
        </div>
        <GameButton variant="secondary" onClick={openSplash}>
          Reset splash
        </GameButton>
        <p className="game-splash-helper">{copy.selectCrew}</p>
      </div>
    </div>
  );
}
