export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  'https://lotto-lucky888.vercel.app/api';

export const GAME_OPTIONS = {
  lottomax: {
    key: 'lottomax',
    label: 'Lotto Max',
    mainCount: 7,
    maxNumber: 50,
    pickPath: '/lottomax/pick',
    storePath: '/lottomax/recent-winning-store'
  },
  lotto649: {
    key: 'lotto649',
    label: 'Lotto 6/49',
    mainCount: 6,
    maxNumber: 49,
    pickPath: '/lotto649/pick',
    storePath: '/lotto649/recent-winning-store'
  }
};

export function getDefaultGameKey() {
  return 'lottomax';
}

export function buildApiUrl(baseUrl, path) {
  return `${String(baseUrl).replace(/\/+$/, '')}/${String(path).replace(/^\/+/, '')}`;
}

export function buildOfflinePick(game) {
  if (!game?.key || !Number.isInteger(game.mainCount) || !Number.isInteger(game.maxNumber)) {
    return null;
  }

  const numbers = new Set();
  while (numbers.size < game.mainCount) {
    numbers.add(Math.floor(Math.random() * game.maxNumber) + 1);
  }

  return {
    game: game.label,
    gameKey: game.key,
    numbers: [...numbers].sort((a, b) => a - b),
    note: 'Generated offline for fun. Not a prediction.',
    source: 'offline'
  };
}
