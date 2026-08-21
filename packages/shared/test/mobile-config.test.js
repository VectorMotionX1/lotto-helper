import test from 'node:test';
import assert from 'node:assert/strict';

import {
  GAME_OPTIONS,
  buildOfflinePick,
  buildApiUrl,
  getDefaultGameKey
} from '../src/mobile-config.js';

test('buildApiUrl joins base URL and game path without duplicate slashes', () => {
  assert.equal(
    buildApiUrl('https://lotto-lucky888.vercel.app/api/', '/lottomax/pick'),
    'https://lotto-lucky888.vercel.app/api/lottomax/pick'
  );
});

test('GAME_OPTIONS exposes both supported lottery games', () => {
  assert.deepEqual(Object.keys(GAME_OPTIONS).sort(), ['lotto649', 'lottomax']);
  assert.equal(GAME_OPTIONS.lottomax.mainCount, 7);
  assert.equal(GAME_OPTIONS.lotto649.maxNumber, 49);
});

test('getDefaultGameKey returns Lotto Max as the mobile default', () => {
  assert.equal(getDefaultGameKey(), 'lottomax');
});

test('buildOfflinePick creates a valid mobile quick pick', () => {
  const pick = buildOfflinePick(GAME_OPTIONS.lotto649);

  assert.equal(pick.source, 'offline');
  assert.equal(pick.numbers.length, 6);
  assert.equal(new Set(pick.numbers).size, 6);
  assert.ok(pick.numbers.every((number) => number >= 1 && number <= 49));
});
