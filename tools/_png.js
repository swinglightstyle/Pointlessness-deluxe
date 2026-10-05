'use strict';
/* Tiny PNG helper (node zlib only): read size, crop to the top-left W x H. Handles 8-bit non-interlaced PNGs,
 * which is what headless Chrome/Edge screenshots are. Used by tools/shot.js for narrow viewports. */
const fs = require('fs');
const zlib = require('zlib');

const SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const CRC_TABLE = (function () {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}

function info(file) {
  const b = fs.readFileSync(file);
  if (b.length < 33 || !b.subarray(0, 8).equals(SIG)) return null;
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20), bitDepth: b[24], colorType: b[25], interlace: b[28], bytes: b.length };
}

function paeth(a, b, c) {
  const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
}

/** crop file in place to the top-left w x h (clamped). returns {width,height} */
function cropTopLeft(file, w, h) {
  const b = fs.readFileSync(file);
  if (!b.subarray(0, 8).equals(SIG)) throw new Error('not a PNG');
  let pos = 8, ihdr = null; const idat = [];
  while (pos < b.length) {
    const len = b.readUInt32BE(pos), type = b.toString('ascii', pos + 4, pos + 8);
    const data = b.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') ihdr = data;
    else if (type === 'IDAT') idat.push(data);
    pos += 12 + len;
  }
  const W = ihdr.readUInt32BE(0), H = ihdr.readUInt32BE(4), depth = ihdr[8], ctype = ihdr[9], interlace = ihdr[12];
  if (depth !== 8 || interlace !== 0 || (ctype !== 2 && ctype !== 6 && ctype !== 0)) throw new Error('unsupported PNG format (depth ' + depth + ', type ' + ctype + ')');
  const bpp = ctype === 6 ? 4 : ctype === 2 ? 3 : 1;
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = W * bpp;
  const out = Buffer.alloc(stride * H);
  for (let y = 0; y < H; y++) {
    const f = raw[y * (stride + 1)];
    const src = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? out[y * stride + x - bpp] : 0;
      const up = y > 0 ? out[(y - 1) * stride + x] : 0;
      const c = y > 0 && x >= bpp ? out[(y - 1) * stride + x - bpp] : 0;
      let v = src[x];
      if (f === 1) v += a; else if (f === 2) v += up; else if (f === 3) v += (a + up) >> 1; else if (f === 4) v += paeth(a, up, c);
      out[y * stride + x] = v & 0xff;
    }
  }
  const nw = Math.min(w, W), nh = Math.min(h, H);
  const rows = Buffer.alloc((nw * bpp + 1) * nh);
  for (let y = 0; y < nh; y++) {
    rows[y * (nw * bpp + 1)] = 0;
    out.copy(rows, y * (nw * bpp + 1) + 1, y * stride, y * stride + nw * bpp);
  }
  const nih = Buffer.from(ihdr); nih.writeUInt32BE(nw, 0); nih.writeUInt32BE(nh, 4);
  const png = Buffer.concat([SIG, chunk('IHDR', nih), chunk('IDAT', zlib.deflateSync(rows)), chunk('IEND', Buffer.alloc(0))]);
  fs.writeFileSync(file, png);
  return { width: nw, height: nh };
}

module.exports = { info, cropTopLeft };
