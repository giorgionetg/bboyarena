import { useMachine } from '@xstate/react';
import { gameMachine } from './state/gameMachine';
import GameCanvas from './GameCanvas';
import Hud from './Hud';
import type { LocaleCode } from '../../lib/i18n';

interface GameAppProps {
  locale?: LocaleCode;
}

export default function GameApp({ locale = 'en-US' }: GameAppProps) {
  const [state, send] = useMachine(gameMachine);

  // Safeguard conversion of state.value to a string format for children
  const gameStateString = typeof state.value === 'string' ? state.value : Object.keys(state.value)[0];

  return (
    <div className="relative mx-auto h-[560px] w-full max-w-5xl overflow-hidden rounded-[2rem] border-4 border-[#4d4237] bg-[rgba(224,212,194,0.96)] shadow-[0_18px_0_rgba(95,82,69,0.7),0_28px_60px_rgba(35,28,21,0.28)] sm:h-[640px]">
      <div className="absolute left-4 top-3 z-20 street-chip rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.32em] text-[#2d261f]">
        Plaza battle / {gameStateString}
      </div>

      {/* 3D Canvas rendering only client-side */}
      <GameCanvas gameState={gameStateString} />

      {/* HUD Layer */}
      <Hud gameState={gameStateString} send={send} locale={locale} />
    </div>
  );
}
