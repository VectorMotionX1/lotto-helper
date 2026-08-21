import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildOfflinePick,
  appendPickHistory,
  buildFavoriteMix,
  buildCopyText,
  buildStoreSummary
} from '../src/app-utils.js';

test('buildOfflinePick creates a valid local quick pick', () => {
  const pick = buildOfflinePick({
    key: 'lotto649',
    label: 'Lotto 6/49',
    mainCount: 6,
    maxNumber: 49
  });

  assert.equal(pick.source, 'offline');
  assert.equal(pick.numbers.length, 6);
  assert.equal(new Set(pick.numbers).size, 6);
  assert.ok(pick.numbers.every((number) => number >= 1 && number <= 49));
});

test('appendPickHistory keeps the five newest picks', () => {
  const history = appendPickHistory(
    Array.from({ length: 5 }, (_, index) => ({ id: String(index) })),
    { gameKey: 'lottomax', game: 'Lotto Max', numbers: [1, 2, 3], note: 'Offline' },
    100
  );

  assert.equal(history.length, 5);
  assert.equal(history[0].id, 'lottomax-100');
});

test('buildFavoriteMix keeps favorites, removes duplicates, and returns a sorted pick', () => {
  const result = buildFavoriteMix({
    baseNumbers: [10, 12, 12, 15, 18, 19],
    favorites: [7, 7, 12, 4],
    mainCount: 6,
    maxNumber: 49,
    randomNumbers: [22, 9, 4, 21]
  });

  assert.deepEqual(result, [4, 7, 10, 12, 15, 18]);
});

test('buildCopyText creates a shareable quick-pick line', () => {
  const text = buildCopyText({
    game: 'Lotto Max',
    numbers: [3, 8, 11, 17, 22, 31, 45],
    note: 'Random quick pick for fun. Not a prediction.'
  });

  assert.match(text, /^Lotto Max: 3, 8, 11, 17, 22, 31, 45/);
  assert.match(text, /Random quick pick for fun/);
});

test('buildStoreSummary returns a friendly fallback when data is missing', () => {
  const summary = buildStoreSummary({
    storeName: null,
    location: null,
    drawDate: null,
    prizeValue: null
  });

  assert.equal(
    summary.title,
    'Winning retailer unavailable • Location unavailable'
  );
  assert.equal(summary.meta, 'Draw: N/A · Prize: N/A');
});
