export type LocaleCode = 'en-US' | 'it-IT' | 'es-419' | 'pt-BR' | 'zh-Hans';
export type LocalePath = '' | 'it' | 'es' | 'pt-br' | 'zh';

export interface LocaleConfig {
  code: LocaleCode;
  path: LocalePath;
  hreflang: string;
  label: string;
  nativeLabel: string;
}

export interface AlternateLink {
  hreflang: string;
  href: string;
}

export const LOCALES: Record<LocaleCode, LocaleConfig> = {
  'en-US': { code: 'en-US', path: '', hreflang: 'en-US', label: 'English (US)', nativeLabel: 'English' },
  'it-IT': { code: 'it-IT', path: 'it', hreflang: 'it-IT', label: 'Italian', nativeLabel: 'Italiano' },
  'es-419': { code: 'es-419', path: 'es', hreflang: 'es-419', label: 'Spanish (LatAm)', nativeLabel: 'Español' },
  'pt-BR': { code: 'pt-BR', path: 'pt-br', hreflang: 'pt-BR', label: 'Portuguese (BR)', nativeLabel: 'Português' },
  'zh-Hans': { code: 'zh-Hans', path: 'zh', hreflang: 'zh-Hans', label: 'Chinese (Simplified)', nativeLabel: '简体中文' }
};

const PATH_TO_CODE: Record<Exclude<LocalePath, ''>, LocaleCode> = {
  it: 'it-IT',
  es: 'es-419',
  'pt-br': 'pt-BR',
  zh: 'zh-Hans'
};

export const SUPPORTED_LOCALES = Object.keys(LOCALES) as LocaleCode[];

export const DEFAULT_LOCALE: LocaleCode = 'en-US';

export const getLocaleConfig = (locale: LocaleCode) => LOCALES[locale];

export const getLocaleCodeFromPath = (path: string | undefined | null): LocaleCode => {
  if (!path) return DEFAULT_LOCALE;
  return PATH_TO_CODE[path as Exclude<LocalePath, ''>] ?? DEFAULT_LOCALE;
};

export const getLocalePath = (locale: LocaleCode): LocalePath => LOCALES[locale].path;

export const buildLocalizedPath = (locale: LocaleCode, pathname = '/'): string => {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const base = getLocalePath(locale);

  if (!base) {
    return normalized === '/' ? '/' : normalized.replace(/\/+$/, '');
  }

  return normalized === '/' ? `/${base}` : `/${base}${normalized}`.replace(/\/+$/, '');
};

export const buildLocalizedAlternates = (pathname = '/'): AlternateLink[] =>
  SUPPORTED_LOCALES.map((locale) => ({
    hreflang: LOCALES[locale].hreflang,
    href: buildLocalizedPath(locale, pathname)
  }));

export const stripLocalePrefix = (pathname: string): string => {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  const segments = normalized.split('/').filter(Boolean);
  const first = segments[0] as Exclude<LocalePath, ''> | undefined;

  if (first && PATH_TO_CODE[first]) {
    const remainder = `/${segments.slice(1).join('/')}`.replace(/\/+$/, '');
    return remainder === '/' || remainder === '' ? '/' : remainder;
  }

  return normalized === '' ? '/' : normalized;
};

export interface CategoryCopy {
  label: string;
  title: string;
  description: string;
}

export interface SiteCopy {
  nav: {
    menu: string;
    manifesto: string;
    news: string;
    battle: string;
    board: string;
    devLab: string;
  };
  footer: {
    ready: string;
    manifesto: string;
    privacy: string;
    cookies: string;
    terms: string;
    openDevelopment: string;
    contact: string;
    openSource: string;
    participate: string;
    discord: string;
    github: string;
  };
  switcher: {
    label: string;
  };
  home: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    intro: string;
    enterBattle: string;
    crewBoard: string;
    battleCircle: string;
    crewSelect: string;
    arcadeHud: string;
    concreteMood: string;
    crewEnergy: string;
    playMode: string;
  };
  play: {
    eyebrow: string;
    title: string;
    intro: string;
    dragCamera: string;
    stamina: string;
    crewBattle: string;
    tip: string;
  };
  leaderboard: {
    eyebrow: string;
    title: string;
    intro: string;
    backToBattle: string;
    score: string;
    run: string;
  };
  news: {
    eyebrow: string;
    title: string;
    intro: string;
    openArchive: string;
    enterArchive: string;
    latestDrops: string;
    devlogArchive: string;
    readMore: string;
    source: string;
    sceneNotes: string;
    backToArchive: string;
    openSource: string;
    story: string;
    metadata: string;
    category: string;
    author: string;
    published: string;
    updated: string;
    tags: string;
    categoryRules: string;
    rules: Record<'devlog' | 'app' | 'scene', string[]>;
    categories: Record<'devlog' | 'app' | 'scene', CategoryCopy>;
  };
  game: {
    crewStatus: string;
    score: string;
    selectedCrew: string;
    stamina: string;
    timer: string;
    round: string;
    moveList: string;
    soundOn: string;
    soundOff: string;
    selectCrew: string;
    chooseStreetTone: string;
    battleComplete: string;
    startRound: string;
    pause: string;
    finishRound: string;
    resume: string;
    reset: string;
    playAgain: string;
    hitBeat: string;
    tapForScore: string;
    beat: string;
  };
}

const SITE_COPY: Record<LocaleCode, SiteCopy> = {
  'en-US': {
    nav: {
      menu: 'Menu',
      manifesto: 'Manifesto',
      news: 'News',
      battle: 'Battle',
      board: 'Board',
      devLab: 'Dev Lab'
    },
    footer: {
      ready: 'PWA ready',
      manifesto: 'Manifesto',
      privacy: 'Privacy',
      cookies: 'Cookies',
      terms: 'Terms',
      openDevelopment: 'Open Development',
      contact: 'Contact',
      openSource: 'Open Source',
      participate: 'Participate',
      discord: 'Discord',
      github: 'GitHub'
    },
    switcher: { label: 'Language' },
    home: {
      eyebrow: 'Street Battle Menu',
      title: 'Battle on the',
      titleAccent: 'Concrete Floor',
      intro: 'An early-2000s game menu with an urban plaza, dirty walls, crews, a boombox, and a battle circle ready for the showdown.',
      enterBattle: 'Enter Battle',
      crewBoard: 'Crew Board',
      battleCircle: 'Battle circle',
      crewSelect: 'Crew select',
      arcadeHud: 'Arcade HUD',
      concreteMood: 'Dust & Asphalt',
      crewEnergy: 'Names on the wall',
      playMode: 'Menu to battle'
    },
    play: {
      eyebrow: 'Battle Screen',
      title: 'Urban Plaza Clash',
      intro: 'Move the camera, choose the crew, and bring the rhythm to the concrete. The interface stays readable, gritty, and arcade-like.',
      dragCamera: 'Drag camera',
      stamina: 'Stamina / combo',
      crewBattle: 'Crew battle',
      tip: 'Use the battle buttons, keep the crew moving, and hit the beat while the plaza stays rough and grounded.'
    },
    leaderboard: {
      eyebrow: 'Crew Board',
      title: 'Street Rankings',
      intro: 'A rough scoreboard, like it was painted on the wall near the court. Just crews, results, and street marks.',
      backToBattle: 'Back to Battle',
      score: 'Score',
      run: 'Run'
    },
    news: {
      eyebrow: 'News hub',
      title: 'Update feed',
      intro: 'Here we separate the story of the project into three streams: the team devlog, app updates, and real scene news.',
      openArchive: 'Open',
      enterArchive: 'Enter archive',
      latestDrops: 'Latest drops',
      devlogArchive: 'Devlog archive',
      readMore: 'Read more',
      source: 'Source',
      sceneNotes: 'Scene notes',
      backToArchive: 'Back to archive',
      openSource: 'Open source',
      story: 'Story',
      metadata: 'Metadata',
      category: 'Category',
      author: 'Author',
      published: 'Published',
      updated: 'Updated',
      tags: 'Tags',
      categoryRules: 'Category rules',
      rules: {
        devlog: [
          'We talk about the process: build, art direction, gameplay, technical choices, and internal experiments.',
          'The tone can be a little more behind the scenes and less promotional.'
        ],
        app: [
          'This is where features, fixes, interface polish, and product workflow changes go.',
          'It is the right place for clear, release-oriented updates.'
        ],
        scene: [
          'This area gathers real news from an external source and brings it into the project.',
          'When the feed is active, each item can open a local noindex page or the original source.'
        ]
      },
      categories: {
        devlog: {
          label: 'Devlog',
          title: 'Devlog',
          description: 'Behind the scenes of the project: build, art direction, gameplay, and technical choices.'
        },
        app: {
          label: 'App News',
          title: 'App News',
          description: 'Updates, features, bug fixes, and workflow changes in the app.'
        },
        scene: {
          label: 'Scene News',
          title: 'Scene News',
          description: 'Real news pulled from an external source and surfaced inside the project.'
        }
      }
    },
    game: {
      crewStatus: 'Crew / Status',
      score: 'Score',
      selectedCrew: 'Selected crew',
      stamina: 'Stamina',
      timer: 'Timer',
      round: 'Round',
      moveList: 'Move list',
      soundOn: 'Sound on',
      soundOff: 'Sound off',
      selectCrew: 'Select crew',
      chooseStreetTone: 'Choose your street tone',
      battleComplete: 'Battle complete',
      startRound: 'Start round',
      pause: 'Pause',
      finishRound: 'Finish round',
      resume: 'Resume',
      reset: 'Reset',
      playAgain: 'Play again',
      hitBeat: 'Hit beat',
      tapForScore: 'Tap for score',
      beat: 'Beat'
    }
  },
  'it-IT': {
    nav: {
      menu: 'Menu',
      manifesto: 'Manifesto',
      news: 'News',
      battle: 'Battaglia',
      board: 'Classifica',
      devLab: 'Dev Lab'
    },
    footer: {
      ready: 'PWA pronta',
      manifesto: 'Manifesto',
      privacy: 'Privacy',
      cookies: 'Cookie',
      terms: 'Termini',
      openDevelopment: 'Sviluppo aperto',
      contact: 'Contatto',
      openSource: 'Open Source',
      participate: 'Partecipa',
      discord: 'Discord',
      github: 'GitHub'
    },
    switcher: { label: 'Lingua' },
    home: {
      eyebrow: 'Menu Battle Street',
      title: 'Battaglia sul',
      titleAccent: 'cemento',
      intro: 'Un menu da gioco early 2000s con piazza urbana, muri sporchi, crew, boombox e un cerchio battle pronto per la sfida.',
      enterBattle: 'Entra in battle',
      crewBoard: 'Classifica crew',
      battleCircle: 'Cerchio battle',
      crewSelect: 'Selezione crew',
      arcadeHud: 'HUD arcade',
      concreteMood: 'Polvere e asfalto',
      crewEnergy: 'Nomi sul muro',
      playMode: 'Menu verso la battle'
    },
    play: {
      eyebrow: 'Schermata battle',
      title: 'Scontro in piazza urbana',
      intro: 'Muovi la camera, scegli la crew e porta il ritmo sul cemento. L’interfaccia resta leggibile, sporca e arcade.',
      dragCamera: 'Trascina camera',
      stamina: 'Stamina / combo',
      crewBattle: 'Battle crew',
      tip: 'Usa i pulsanti di battle, mantieni la crew in movimento e segui il beat mentre la piazza resta ruvida e concreta.'
    },
    leaderboard: {
      eyebrow: 'Classifica crew',
      title: 'Ranking di strada',
      intro: 'Una bacheca ruvida, come dipinta sul muro vicino al campo. Solo crew, risultati e segni di strada.',
      backToBattle: 'Torna alla battle',
      score: 'Punteggio',
      run: 'Run'
    },
    news: {
      eyebrow: 'Hub news',
      title: 'Feed aggiornamenti',
      intro: 'Qui separiamo il racconto del progetto in tre flussi: il devlog del team, gli aggiornamenti della app e le news reali della scena.',
      openArchive: 'Apri',
      enterArchive: 'Entra nell’archivio',
      latestDrops: 'Ultimi drop',
      devlogArchive: 'Archivio devlog',
      readMore: 'Leggi di più',
      source: 'Fonte',
      sceneNotes: 'Note scena',
      backToArchive: 'Torna all’archivio',
      openSource: 'Apri fonte',
      story: 'Storia',
      metadata: 'Metadati',
      category: 'Categoria',
      author: 'Autore',
      published: 'Pubblicato',
      updated: 'Aggiornato',
      tags: 'Tag',
      categoryRules: 'Regole categoria',
      rules: {
        devlog: [
          'Qui parliamo del processo: build, art direction, gameplay, scelte tecniche e prove interne.',
          'Il tono può essere un po’ più dietro le quinte e meno promozionale.'
        ],
        app: [
          'Qui entrano feature, fix, rifiniture dell’interfaccia e cambi di workflow della app.',
          'È il posto giusto per aggiornamenti chiari e orientati al rilascio.'
        ],
        scene: [
          'Qui confluiscono notizie reali da una fonte esterna e portate dentro il progetto.',
          'Quando il feed è attivo, ogni item può aprire una pagina locale noindex oppure la fonte originale.'
        ]
      },
      categories: {
        devlog: {
          label: 'Devlog',
          title: 'Devlog',
          description: 'Dietro le quinte del progetto: build, art direction, gameplay e scelte tecniche.'
        },
        app: {
          label: 'News app',
          title: 'News app',
          description: 'Aggiornamenti, feature, bugfix e cambi di workflow della app.'
        },
        scene: {
          label: 'News scena',
          title: 'News scena',
          description: 'Notizie reali pescate da una fonte esterna e portate dentro il progetto.'
        }
      }
    },
    game: {
      crewStatus: 'Crew / Stato',
      score: 'Punteggio',
      selectedCrew: 'Crew selezionata',
      stamina: 'Stamina',
      timer: 'Timer',
      round: 'Round',
      moveList: 'Lista mosse',
      soundOn: 'Audio on',
      soundOff: 'Audio off',
      selectCrew: 'Scegli crew',
      chooseStreetTone: 'Scegli il tono street',
      battleComplete: 'Battle completata',
      startRound: 'Inizia round',
      pause: 'Pausa',
      finishRound: 'Finisci round',
      resume: 'Riprendi',
      reset: 'Reset',
      playAgain: 'Gioca ancora',
      hitBeat: 'Hit beat',
      tapForScore: 'Tap per punti',
      beat: 'Beat'
    }
  },
  'es-419': {
    nav: { menu: 'Menú', manifesto: 'Manifiesto', news: 'Noticias', battle: 'Batalla', board: 'Tabla', devLab: 'Dev Lab' },
    footer: {
      ready: 'PWA lista',
      manifesto: 'Manifiesto',
      privacy: 'Privacidad',
      cookies: 'Cookies',
      terms: 'Términos',
      openDevelopment: 'Desarrollo abierto',
      contact: 'Contacto',
      openSource: 'Open source',
      participate: 'Participar',
      discord: 'Discord',
      github: 'GitHub'
    },
    switcher: { label: 'Idioma' },
    home: {
      eyebrow: 'Menú de batalla callejera',
      title: 'Batalla sobre',
      titleAccent: 'cemento',
      intro: 'Un menú de juego estilo principios de 2000 con plaza urbana, muros gastados, crews, boombox y un círculo de batalla listo para el duelo.',
      enterBattle: 'Entrar a la batalla',
      crewBoard: 'Tabla de crews',
      battleCircle: 'Círculo de batalla',
      crewSelect: 'Selección de crew',
      arcadeHud: 'HUD arcade',
      concreteMood: 'Polvo y asfalto',
      crewEnergy: 'Nombres en la pared',
      playMode: 'Menú a batalla'
    },
    play: {
      eyebrow: 'Pantalla de batalla',
      title: 'Choque en la plaza urbana',
      intro: 'Mueve la cámara, elige la crew y lleva el ritmo al cemento. La interfaz se mantiene clara, cruda y arcade.',
      dragCamera: 'Arrastra cámara',
      stamina: 'Stamina / combo',
      crewBattle: 'Batalla de crews',
      tip: 'Usa los botones de batalla, mantén la crew en movimiento y sigue el beat mientras la plaza sigue áspera y real.'
    },
    leaderboard: {
      eyebrow: 'Tabla de crews',
      title: 'Ranking callejero',
      intro: 'Un tablero rudo, como pintado en la pared junto a la cancha. Solo crews, resultados y marcas de calle.',
      backToBattle: 'Volver a batalla',
      score: 'Puntuación',
      run: 'Run'
    },
    news: {
      eyebrow: 'Centro de noticias',
      title: 'Feed de actualizaciones',
      intro: 'Aquí separamos la historia del proyecto en tres flujos: devlog del equipo, novedades de la app y noticias reales de la escena.',
      openArchive: 'Abrir',
      enterArchive: 'Entrar al archivo',
      latestDrops: 'Últimos drops',
      devlogArchive: 'Archivo devlog',
      readMore: 'Leer más',
      source: 'Fuente',
      sceneNotes: 'Notas de escena',
      backToArchive: 'Volver al archivo',
      openSource: 'Abrir fuente',
      story: 'Historia',
      metadata: 'Metadatos',
      category: 'Categoría',
      author: 'Autor',
      published: 'Publicado',
      updated: 'Actualizado',
      tags: 'Etiquetas',
      categoryRules: 'Reglas de categoría',
      rules: {
        devlog: ['Aquí hablamos del proceso: build, dirección de arte, gameplay, decisiones técnicas y pruebas internas.', 'El tono puede ser más detrás de cámaras y menos promocional.'],
        app: ['Aquí van features, fixes, pulido de interfaz y cambios de workflow de la app.', 'Es el lugar ideal para actualizaciones claras y orientadas al release.'],
        scene: ['Aquí entran noticias reales de una fuente externa dentro del proyecto.', 'Cuando el feed está activo, cada item puede abrir una página local noindex o la fuente original.']
      },
      categories: {
        devlog: { label: 'Devlog', title: 'Devlog', description: 'Detrás de cámaras del proyecto: build, dirección de arte, gameplay y decisiones técnicas.' },
        app: { label: 'Noticias app', title: 'Noticias app', description: 'Actualizaciones, features, bugs y cambios de workflow de la app.' },
        scene: { label: 'Noticias escena', title: 'Noticias escena', description: 'Noticias reales tomadas de una fuente externa y llevadas al proyecto.' }
      }
    },
    game: {
      crewStatus: 'Crew / Estado',
      score: 'Puntos',
      selectedCrew: 'Crew elegida',
      stamina: 'Stamina',
      timer: 'Temporizador',
      round: 'Ronda',
      moveList: 'Lista de movimientos',
      soundOn: 'Sonido on',
      soundOff: 'Sonido off',
      selectCrew: 'Elegir crew',
      chooseStreetTone: 'Elige tu tono callejero',
      battleComplete: 'Batalla completa',
      startRound: 'Empezar ronda',
      pause: 'Pausa',
      finishRound: 'Terminar ronda',
      resume: 'Reanudar',
      reset: 'Reiniciar',
      playAgain: 'Jugar otra vez',
      hitBeat: 'Hit beat',
      tapForScore: 'Tap para puntuar',
      beat: 'Beat'
    }
  },
  'pt-BR': {
    nav: { menu: 'Menu', manifesto: 'Manifesto', news: 'Notícias', battle: 'Batalha', board: 'Ranking', devLab: 'Dev Lab' },
    footer: {
      ready: 'PWA pronta',
      manifesto: 'Manifesto',
      privacy: 'Privacidade',
      cookies: 'Cookies',
      terms: 'Termos',
      openDevelopment: 'Desenvolvimento aberto',
      contact: 'Contato',
      openSource: 'Open Source',
      participate: 'Participar',
      discord: 'Discord',
      github: 'GitHub'
    },
    switcher: { label: 'Idioma' },
    home: {
      eyebrow: 'Menu de batalha de rua',
      title: 'Batalha no',
      titleAccent: 'cimento',
      intro: 'Um menu de jogo estilo anos 2000 com praça urbana, muros gastos, crews, boombox e um círculo de batalha pronto para o duelo.',
      enterBattle: 'Entrar na batalha',
      crewBoard: 'Ranking das crews',
      battleCircle: 'Círculo de batalha',
      crewSelect: 'Seleção de crew',
      arcadeHud: 'HUD arcade',
      concreteMood: 'Poeira e asfalto',
      crewEnergy: 'Nomes no muro',
      playMode: 'Menu para batalha'
    },
    play: {
      eyebrow: 'Tela de batalha',
      title: 'Confronto na praça urbana',
      intro: 'Mova a câmera, escolha a crew e leve o ritmo para o cimento. A interface continua clara, crua e arcade.',
      dragCamera: 'Arraste a câmera',
      stamina: 'Stamina / combo',
      crewBattle: 'Batalha de crews',
      tip: 'Use os botões de batalha, mantenha a crew em movimento e siga o beat enquanto a praça continua áspera e real.'
    },
    leaderboard: {
      eyebrow: 'Ranking das crews',
      title: 'Ranking de rua',
      intro: 'Um placar bruto, como pintado na parede perto da quadra. Só crews, resultados e marcas de rua.',
      backToBattle: 'Voltar para a batalha',
      score: 'Pontuação',
      run: 'Run'
    },
    news: {
      eyebrow: 'Central de notícias',
      title: 'Feed de atualizações',
      intro: 'Aqui separamos a história do projeto em três fluxos: devlog da equipe, novidades do app e notícias reais da cena.',
      openArchive: 'Abrir',
      enterArchive: 'Entrar no arquivo',
      latestDrops: 'Últimos drops',
      devlogArchive: 'Arquivo devlog',
      readMore: 'Ler mais',
      source: 'Fonte',
      sceneNotes: 'Notas da cena',
      backToArchive: 'Voltar ao arquivo',
      openSource: 'Abrir fonte',
      story: 'História',
      metadata: 'Metadados',
      category: 'Categoria',
      author: 'Autor',
      published: 'Publicado',
      updated: 'Atualizado',
      tags: 'Tags',
      categoryRules: 'Regras da categoria',
      rules: {
        devlog: ['Aqui falamos do processo: build, direção de arte, gameplay, decisões técnicas e testes internos.', 'O tom pode ser mais bastidores e menos promocional.'],
        app: ['Aqui entram features, correções, polimento da interface e mudanças de workflow do app.', 'É o lugar certo para atualizações claras e orientadas a release.'],
        scene: ['Aqui entram notícias reais vindas de uma fonte externa para dentro do projeto.', 'Quando o feed está ativo, cada item pode abrir uma página local noindex ou a fonte original.']
      },
      categories: {
        devlog: { label: 'Devlog', title: 'Devlog', description: 'Bastidores do projeto: build, direção de arte, gameplay e decisões técnicas.' },
        app: { label: 'Novidades do app', title: 'Novidades do app', description: 'Atualizações, recursos, correções e mudanças de workflow do app.' },
        scene: { label: 'Notícias da cena', title: 'Notícias da cena', description: 'Notícias reais puxadas de uma fonte externa e trazidas para o projeto.' }
      }
    },
    game: {
      crewStatus: 'Crew / Status',
      score: 'Pontuação',
      selectedCrew: 'Crew selecionada',
      stamina: 'Stamina',
      timer: 'Cronômetro',
      round: 'Round',
      moveList: 'Lista de movimentos',
      soundOn: 'Som on',
      soundOff: 'Som off',
      selectCrew: 'Selecionar crew',
      chooseStreetTone: 'Escolha seu tom de rua',
      battleComplete: 'Batalha concluída',
      startRound: 'Iniciar round',
      pause: 'Pausar',
      finishRound: 'Finalizar round',
      resume: 'Retomar',
      reset: 'Resetar',
      playAgain: 'Jogar de novo',
      hitBeat: 'Hit beat',
      tapForScore: 'Toque para pontuar',
      beat: 'Beat'
    }
  },
  'zh-Hans': {
    nav: { menu: '菜单', manifesto: '宣言', news: '新闻', battle: '对战', board: '榜单', devLab: '开发实验室' },
    footer: {
      ready: 'PWA 就绪',
      manifesto: '宣言',
      privacy: '隐私',
      cookies: 'Cookie',
      terms: '条款',
      openDevelopment: '开放开发',
      contact: '联系',
      openSource: '开源',
      participate: '参与',
      discord: 'Discord',
      github: 'GitHub'
    },
    switcher: { label: '语言' },
    home: {
      eyebrow: '街头对战菜单',
      title: '在',
      titleAccent: '水泥地上开战',
      intro: '这是一个带有城市广场、斑驳墙面、crew、boombox 和 battle 圈的 2000 年代风格游戏菜单。',
      enterBattle: '进入对战',
      crewBoard: 'Crew 排名',
      battleCircle: '对战圈',
      crewSelect: '选择 Crew',
      arcadeHud: '街机 HUD',
      concreteMood: '灰尘与沥青',
      crewEnergy: '墙上的名字',
      playMode: '菜单到对战'
    },
    play: {
      eyebrow: '对战界面',
      title: '城市广场对决',
      intro: '移动镜头，选择 crew，把节奏带到水泥地上。界面保持清晰、粗粝、街机感。',
      dragCamera: '拖动镜头',
      stamina: '体力 / 连击',
      crewBattle: 'Crew 对战',
      tip: '使用对战按钮，保持 crew 运动，在广场保持粗粝真实的同时踩准节拍。'
    },
    leaderboard: {
      eyebrow: 'Crew 榜单',
      title: '街头排名',
      intro: '像画在球场边墙上的粗粝榜单。这里只有 crew、成绩和街头标记。',
      backToBattle: '返回对战',
      score: '得分',
      run: '回合'
    },
    news: {
      eyebrow: '新闻中心',
      title: '更新流',
      intro: '这里把项目故事分成三条线：团队开发日志、应用更新，以及真实的圈内新闻。',
      openArchive: '打开',
      enterArchive: '进入档案',
      latestDrops: '最新更新',
      devlogArchive: '开发日志档案',
      readMore: '阅读更多',
      source: '来源',
      sceneNotes: '圈内备注',
      backToArchive: '返回档案',
      openSource: '打开来源',
      story: '故事',
      metadata: '元数据',
      category: '分类',
      author: '作者',
      published: '发布时间',
      updated: '更新时间',
      tags: '标签',
      categoryRules: '分类规则',
      rules: {
        devlog: ['这里讲的是过程：构建、视觉方向、玩法、技术选择和内部测试。', '语气可以更偏幕后一些。'],
        app: ['这里放功能、修复、界面打磨和应用工作流变化。', '适合清晰、面向发布的更新。'],
        scene: ['这里收集外部来源的真实新闻并放进项目里。', '当 feed 可用时，每个条目可以打开本地 noindex 页面或原始来源。']
      },
      categories: {
        devlog: { label: '开发日志', title: '开发日志', description: '项目幕后：构建、视觉方向、玩法和技术选择。' },
        app: { label: '应用新闻', title: '应用新闻', description: '应用内的更新、功能、修复和工作流变化。' },
        scene: { label: '圈内新闻', title: '圈内新闻', description: '从外部来源抓取的真实新闻并展示到项目中。' }
      }
    },
    game: {
      crewStatus: 'Crew / 状态',
      score: '分数',
      selectedCrew: '已选 Crew',
      stamina: '体力',
      timer: '计时器',
      round: '回合',
      moveList: '动作列表',
      soundOn: '声音开',
      soundOff: '声音关',
      selectCrew: '选择 Crew',
      chooseStreetTone: '选择你的街头风格',
      battleComplete: '对战完成',
      startRound: '开始回合',
      pause: '暂停',
      finishRound: '结束回合',
      resume: '继续',
      reset: '重置',
      playAgain: '再玩一次',
      hitBeat: '击拍',
      tapForScore: '点击得分',
      beat: '节拍'
    }
  }
};

export const getSiteCopy = (locale: LocaleCode): SiteCopy => SITE_COPY[locale];

export const getLocaleSwitcherLinks = (currentPath: string) =>
  SUPPORTED_LOCALES.map((locale) => ({
    locale,
    label: LOCALES[locale].nativeLabel,
    path: buildLocalizedPath(locale, currentPath)
  }));
