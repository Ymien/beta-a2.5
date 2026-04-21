export const GAME_SYMBOLS = ["🚀", "🛸", "👾", "🤖", "🔮", "🌌", "💻", "⚡"];

export interface GameCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function shuffleArray<T>(items: T[], random: () => number = Math.random): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

export function createGameCards(random: () => number = Math.random): GameCard[] {
  return shuffleArray([...GAME_SYMBOLS, ...GAME_SYMBOLS], random).map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false,
  }));
}
