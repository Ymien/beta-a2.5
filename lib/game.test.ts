import test from "node:test";
import assert from "node:assert/strict";

import { createGameCards, GAME_SYMBOLS, shuffleArray } from "./game.ts";

test("shuffleArray keeps all items while changing order deterministically", () => {
  const values = [1, 2, 3, 4];
  const randomValues = [0.2, 0.8, 0.1];
  let index = 0;
  const shuffled = shuffleArray(values, () => randomValues[index++] ?? 0);

  assert.deepEqual(values, [1, 2, 3, 4]);
  assert.deepEqual([...shuffled].sort((a, b) => a - b), [1, 2, 3, 4]);
  assert.notDeepEqual(shuffled, values);
});

test("createGameCards builds paired cards with stable defaults", () => {
  const cards = createGameCards(() => 0.5);

  assert.equal(cards.length, GAME_SYMBOLS.length * 2);
  assert.deepEqual(
    cards.map((card) => card.id),
    cards.map((_, index) => index)
  );
  assert.ok(cards.every((card) => !card.isFlipped && !card.isMatched));

  const counts = new Map<string, number>();
  for (const card of cards) {
    counts.set(card.emoji, (counts.get(card.emoji) ?? 0) + 1);
  }

  assert.equal(counts.size, GAME_SYMBOLS.length);
  assert.ok([...counts.values()].every((count) => count === 2));
});
