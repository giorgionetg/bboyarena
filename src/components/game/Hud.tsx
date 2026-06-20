import { useEffect, useMemo, useState } from 'react';
import { useGameStore } from './state/useGameStore';
import { getSiteCopy, type LocaleCode } from '../../lib/i18n';

interface HudProps {
  gameState: string;
  send: (event: any) => void;
  locale?: LocaleCode;
}

const crewOptions = [
  { name: 'Dust Crew', tone: 'text-[#6d6357]', accent: 'bg-[#e5dac7] border-[#6c6053]' },
  { name: 'Brick Crew', tone: 'text-[#9c5030]', accent: 'bg-[#ead0bd] border-[#a55a38]' },
  { name: 'Lime Crew', tone: 'text-[#66793b]', accent: 'bg-[#dde4c7] border-[#88965b]' },
];

export default function Hud({ gameState, send, locale = 'en-US' }: HudProps) {
  const copy = getSiteCopy(locale);
  const {
    selectedCharacter,
    score,
    bpm,
    isMuted,
    setSelectedCharacter,
    incrementScore,
    setBpm,
    toggleMute,
    resetGame,
  } = useGameStore();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (gameState !== 'playing') return undefined;

    const interval = window.setInterval(() => {
      setElapsedSeconds((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'idle') {
      setElapsedSeconds(0);
    }
  }, [gameState]);

  const handleTap = () => {
    if (gameState !== 'playing') return;
    // Reward player with score points on click
    incrementScore(10);
  };

  const handleStart = () => {
    resetGame();
    setElapsedSeconds(0);
    send({ type: 'START' });
  };

  const timerLabel = useMemo(() => {
    const minutes = Math.floor(elapsedSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (elapsedSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [elapsedSeconds]);

  const combo = gameState === 'playing' ? Math.max(1, Math.floor(score / 30) + 1) : Math.max(0, Math.floor(score / 40));
  const stamina = gameState === 'playing' ? Math.max(18, 100 - elapsedSeconds * 3 - Math.floor(score / 8)) : 100;
  const activeMove = ['Toprock', 'Freeze', 'Swipe', 'Footwork'][elapsedSeconds % 4];
  const activeCrew = crewOptions.find((crew) => crew.name === selectedCharacter) ?? crewOptions[0];

  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-between p-3 text-[#2b241d] sm:p-5">
      {/* Top HUD Row */}
      <div className="pointer-events-none grid gap-3 lg:grid-cols-[1.1fr_0.9fr_1.1fr]">
        {/* Status and score */}
        <div className="street-panel pointer-events-auto rounded-[1.5rem] p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.34em] text-[#786a59]">{copy.game.crewStatus}</div>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    gameState === 'playing'
                      ? 'bg-[#a3b95a]'
                      : gameState === 'paused'
                        ? 'bg-[#c56a41]'
                        : 'bg-[#857463]'
                  }`}
                />
                <span className="text-sm font-black uppercase tracking-[0.24em] text-[#2d261f]">
                  {gameState}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-black uppercase tracking-[0.34em] text-[#786a59]">{copy.game.score}</div>
              <div className="mt-1 text-3xl font-black tracking-[0.12em] text-[#2d261f]">
                {String(score).padStart(5, '0')}
              </div>
            </div>
          </div>

          <div className="street-divider my-3" />

          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.34em] text-[#786a59]">{copy.game.selectedCrew}</div>
              <div className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.2em] ${activeCrew.accent} ${activeCrew.tone}`}>
                {activeCrew.name}
              </div>
            </div>
            <div className="w-32">
              <div className="mb-1 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.28em] text-[#786a59]">
                <span>{copy.game.stamina}</span>
                <span>{stamina}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full border border-[#5d5144] bg-[#d9ceb9]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#8a9d4a] to-[#c56a41]"
                  style={{ width: `${stamina}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Timer dial */}
        <div className="street-dark pointer-events-auto flex items-center justify-center rounded-[1.5rem] p-4 text-center shadow-[0_10px_0_rgba(57,48,40,0.8)]">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.34em] text-[#d8cab4]">{copy.game.timer}</div>
            <div className="mt-2 text-5xl font-black tracking-[0.22em] text-[#f6efe3]">
              {timerLabel}
            </div>
            <div className="mt-2 text-[10px] font-black uppercase tracking-[0.32em] text-[#d8cab4]">
              {copy.game.round} / {gameState === 'playing' ? 'active' : gameState}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-left text-[10px] font-black uppercase tracking-[0.28em] text-[#d8cab4]">
            <div className="rounded-[1rem] border border-[#6a5b4d] bg-[rgba(245,237,224,0.08)] px-3 py-2">
              <div className="text-[#f6efe3]">BPM</div>
              <div className="mt-1 text-lg text-[#f6efe3]">{bpm}</div>
            </div>
            <div className="rounded-[1rem] border border-[#6a5b4d] bg-[rgba(245,237,224,0.08)] px-3 py-2">
              <div className="text-[#f6efe3]">Combo</div>
              <div className="mt-1 text-lg text-[#f6efe3]">x{combo}</div>
            </div>
          </div>
        </div>

        {/* Move list / audio */}
        <div className="street-panel pointer-events-auto rounded-[1.5rem] p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.34em] text-[#786a59]">{copy.game.moveList}</div>
              <ul className="mt-2 space-y-1 text-sm font-black uppercase tracking-[0.18em] text-[#2d261f]">
                {['Toprock', 'Swipe', 'Freeze', 'Footwork'].map((move, index) => (
                  <li key={move} className={move === activeMove ? 'text-[#8a9d4a]' : 'text-[#5f5346]'}>
                    {index + 1}. {move}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={toggleMute}
              className={`street-button rounded-full px-3 py-2 text-[10px] font-black uppercase tracking-[0.28em] transition ${
                isMuted ? 'text-[#9c5030]' : 'text-[#66793b]'
              }`}
            >
              {isMuted ? copy.game.soundOff : copy.game.soundOn}
            </button>
          </div>
        </div>
      </div>

      {/* Middle Interactive Zone */}
      <div className="flex flex-1 items-center justify-center pointer-events-none py-4">
        {gameState === 'playing' ? (
          <button
            onClick={handleTap}
            className="street-button pointer-events-auto flex h-32 w-32 select-none flex-col items-center justify-center rounded-full text-center font-black uppercase tracking-[0.24em] text-[#2d261f] transition hover:-translate-y-0.5 active:translate-y-1 sm:h-36 sm:w-36"
          >
            <span className="text-base sm:text-lg">{copy.game.hitBeat}</span>
            <span className="mt-1 text-[10px] text-[#66793b]">{copy.game.tapForScore}</span>
          </button>
        ) : (
          (gameState === 'idle' || gameState === 'ready' || gameState === 'gameOver') && (
            <div className="street-panel pointer-events-auto flex w-full max-w-md flex-col items-center gap-4 rounded-[1.5rem] p-5 text-center">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.34em] text-[#756553]">{copy.game.selectCrew}</h3>
                <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[#8a7d6d]">{copy.game.chooseStreetTone}</p>
              </div>
              <div className="flex w-full gap-2">
                {crewOptions.map((crew) => (
                  <button
                    key={crew.name}
                    onClick={() => {
                      setSelectedCharacter(crew.name);
                      if (gameState === 'idle') send({ type: 'SELECT' });
                    }}
                    className={`flex-1 rounded-[1rem] border px-2 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition ${
                      selectedCharacter === crew.name
                        ? `${crew.accent} shadow-[0_4px_0_rgba(76,64,53,0.8)]`
                        : 'border-[#695b4d] bg-[#efe5d6] text-[#65584a] hover:bg-[#f6efe3]'
                    }`}
                  >
                    {crew.name.split(' ')[0]}
                  </button>
                ))}
              </div>
              {gameState === 'gameOver' && (
                <div className="street-dark w-full rounded-[1.2rem] px-4 py-3">
                  <div className="text-[10px] font-black uppercase tracking-[0.32em] text-[#d8cab4]">{copy.game.battleComplete}</div>
                  <div className="mt-2 text-lg font-black uppercase tracking-[0.2em] text-[#f6efe3]">
                    Score: {score}
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>

      {/* Bottom Action Control Bar */}
      <div className="pointer-events-none flex w-full justify-center gap-3">
        {gameState === 'idle' || gameState === 'ready' ? (
          <button
            onClick={handleStart}
            className="street-button street-button-primary pointer-events-auto rounded-[1.25rem] px-6 py-3 text-xs font-black uppercase tracking-[0.28em] transition hover:-translate-y-0.5"
          >
            {copy.game.startRound}
          </button>
        ) : gameState === 'playing' ? (
          <div className="flex gap-3">
            <button
              onClick={() => send({ type: 'PAUSE' })}
              className="street-button pointer-events-auto rounded-[1.25rem] px-5 py-3 text-xs font-black uppercase tracking-[0.28em] text-[#2d261f] transition hover:-translate-y-0.5"
            >
              {copy.game.pause}
            </button>
            <button
              onClick={() => send({ type: 'GAME_OVER' })}
              className="street-button street-button-warm pointer-events-auto rounded-[1.25rem] px-5 py-3 text-xs font-black uppercase tracking-[0.28em] transition hover:-translate-y-0.5"
            >
              {copy.game.finishRound}
            </button>
          </div>
        ) : gameState === 'paused' ? (
          <div className="flex gap-3">
            <button
              onClick={() => send({ type: 'RESUME' })}
              className="street-button street-button-primary pointer-events-auto rounded-[1.25rem] px-6 py-3 text-xs font-black uppercase tracking-[0.28em] transition hover:-translate-y-0.5"
            >
              {copy.game.resume}
            </button>
            <button
              onClick={() => send({ type: 'RESET' })}
              className="street-button pointer-events-auto rounded-[1.25rem] px-5 py-3 text-xs font-black uppercase tracking-[0.28em] text-[#2d261f] transition hover:-translate-y-0.5"
            >
              {copy.game.reset}
            </button>
          </div>
        ) : (
          gameState === 'gameOver' && (
            <button
              onClick={handleStart}
              className="street-button street-button-primary pointer-events-auto rounded-[1.25rem] px-6 py-3 text-xs font-black uppercase tracking-[0.28em] transition hover:-translate-y-0.5"
            >
              {copy.game.playAgain}
            </button>
          )
        )}
      </div>
    </div>
  );
}
