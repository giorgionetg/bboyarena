import { useEffect, useRef } from 'react';
import { useGameStore, type GameMenuScene } from './state/useGameStore';
import GameFullscreenToggle from './ui/GameFullscreenToggle';
import GameFullscreenReticle from './ui/GameFullscreenReticle';
import GameHUD from './ui/GameHUD';
import GamePlayScene from './GamePlayScene';
import type { LocaleCode } from './copy';
import './game.css';

interface GameAppProps {
  locale?: LocaleCode;
}

export default function GameApp({ locale = 'en-US' }: GameAppProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scene = useGameStore((state) => state.scene);
  const selectedMode = useGameStore((state) => state.selectedMode);
  const setScene = useGameStore((state) => state.setScene);

  const cycleScene = () => {
    const menuScenes: GameMenuScene[] = ['splashscreen', 'mainMenu', 'settings', 'credits'];
    const currentIndex = menuScenes.indexOf(scene as GameMenuScene);
    const nextScene = menuScenes[(currentIndex + 1) % menuScenes.length];
    setScene(nextScene);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const syncViewportHeight = () => {
      root.style.setProperty('--game-viewport-height', `${window.innerHeight}px`);
    };

    syncViewportHeight();
    window.addEventListener('resize', syncViewportHeight);

    return () => window.removeEventListener('resize', syncViewportHeight);
  }, []);

  return (
    <div id="bboyarena-game-root" className="bboy-game-root" ref={rootRef}>
      <div className="game-shell">
        <div className="game-stage" data-scene={scene}>
          {scene === 'career' || scene === 'training' ? (
            <GamePlayScene mode={selectedMode} locale={locale} rootRef={rootRef} />
          ) : (
            <>
              <button
                type="button"
                className="game-status-pill game-status-pill--interactive"
                onClick={cycleScene}
                aria-label="Cycle game scene"
              >
                Scene selector / {scene}
              </button>
              <GameHUD locale={locale} />
              <GameFullscreenToggle targetRef={rootRef} />
            </>
          )}
          <GameFullscreenReticle targetRef={rootRef} />
        </div>
      </div>
    </div>
  );
}
