'use strict';
/*
 * Mojibake signatures, shared by tools/lint.js and tools/realcheck.js. Built from numeric code points on purpose, so that this
 * file itself is plain ASCII and can never contain (or trip over) the very garbage it hunts for.
 *
 * Mojibake = UTF-8 bytes that were decoded as Windows-1252 / Latin-1 and saved again:
 *   an ellipsis becomes "a-circumflex, euro, ..."  (lead U+00E2, then U+20AC ...)
 *   an apostrophe becomes lead U+00E2, U+20AC, U+2122
 *   an emoji becomes U+00F0, U+0178, ...
 *   e-acute becomes U+00C3, U+00A9
 * Also flagged: U+FFFD, the replacement character (a byte that was not valid UTF-8 at all).
 */
const ch = (...cps) => cps.map((c) => String.fromCharCode(c)).join('');
const LEAD = ch(0xC3, 0xC2, 0xE2);
/* tails: every C1/Latin-1 control or symbol (U+0080..U+00BF) plus the Windows-1252 specials that stand in for bytes 0x80..0x9F */
const TAIL = ch(0x80) + '-' + ch(0xBF) +
  ch(0x152, 0x153, 0x160, 0x161, 0x178, 0x17D, 0x17E, 0x192, 0x2C6, 0x2DC, 0x2013, 0x2014, 0x2018, 0x2019, 0x201A, 0x201C, 0x201D, 0x201E,
    0x2020, 0x2021, 0x2022, 0x2026, 0x2030, 0x2039, 0x203A, 0x20AC, 0x2122);
const SOURCE = '[' + LEAD + '][' + TAIL + ']|' + ch(0xF0, 0x178) + '|' + ch(0xFFFD);

module.exports = {
  /** a fresh global RegExp each call (shared lastIndex would be a trap) */
  regex: () => new RegExp(SOURCE, 'g'),
  /** describe a match as "U+00E2 U+20AC" */
  describe: (m) => Array.from(m).map((c) => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')).join(' '),
  test: (s) => new RegExp(SOURCE).test(s),
  first: (s) => new RegExp(SOURCE).exec(s)
};
