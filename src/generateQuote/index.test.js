import { assert, test } from 'vitest';
import generateQuote from './index.js';

test('Returns a quote', () => {
    assert.isArray(generateQuote());
});

test('Returns a quote with a string and an author', () => {
    assert.isString(generateQuote()[0]);
    assert.isString(generateQuote()[1]);
});
