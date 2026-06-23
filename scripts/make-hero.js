const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const width = 1600;
const height = 900;
const data = Buffer.alloc(width * height * 4);

function clamp(v, min = 0, max = 255) {
  return Math.max(min, Math.min(max, Math.round(v)));
}

function setPixel(x, y, r, g, b, a = 255) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const i = (y * width + x) * 4;
  data[i] = clamp(r);
  data[i + 1] = clamp(g);
  data[i + 2] = clamp(b);
  data[i + 3] = clamp(a);
}

function blendPixel(x, y, r, g, b, a = 255) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const i = (y * width + x) * 4;
  const alpha = a / 255;
  data[i] = clamp(data[i] * (1 - alpha) + r * alpha);
  data[i + 1] = clamp(data[i + 1] * (1 - alpha) + g * alpha);
  data[i + 2] = clamp(data[i + 2] * (1 - alpha) + b * alpha);
}

function noise(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function rect(x, y, w, h, color, alpha = 255) {
  for (let yy = y; yy < y + h; yy++) {
    for (let xx = x; xx < x + w; xx++) blendPixel(xx, yy, ...color, alpha);
  }
}

function circle(cx, cy, radius, color, alpha = 255) {
  const r2 = radius * radius;
  for (let y = Math.floor(cy - radius); y <= cy + radius; y++) {
    for (let x = Math.floor(cx - radius); x <= cx + radius; x++) {
      const d2 = (x - cx) ** 2 + (y - cy) ** 2;
      if (d2 <= r2) {
        const edge = 1 - Math.sqrt(d2) / radius;
        blendPixel(x, y, ...color, alpha * Math.min(1, edge * 2.5));
      }
    }
  }
}

function line(x0, y0, x1, y1, color, alpha = 255, thickness = 1) {
  const dx = Math.abs(x1 - x0);
  const dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  let x = x0;
  let y = y0;
  while (true) {
    for (let oy = -thickness; oy <= thickness; oy++) {
      for (let ox = -thickness; ox <= thickness; ox++) blendPixel(x + ox, y + oy, ...color, alpha);
    }
    if (x === x1 && y === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y += sy;
    }
  }
}

function crc32(buffer) {
  let crc = -1;
  for (const byte of buffer) {
    crc ^= byte;
    for (let k = 0; k < 8; k++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ -1) >>> 0;
}

function chunk(type, payload) {
  const typeBuffer = Buffer.from(type);
  const out = Buffer.alloc(12 + payload.length);
  out.writeUInt32BE(payload.length, 0);
  typeBuffer.copy(out, 4);
  payload.copy(out, 8);
  out.writeUInt32BE(crc32(Buffer.concat([typeBuffer, payload])), 8 + payload.length);
  return out;
}

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const nx = x / width;
    const ny = y / height;
    const glow = Math.max(0, 1 - Math.hypot(nx - 0.78, ny - 0.18) * 1.4);
    const grain = (noise(x, y) - 0.5) * 9;
    const r = 238 - ny * 44 + glow * 38 + grain;
    const g = 246 - ny * 34 + glow * 12 + grain;
    const b = 239 - ny * 24 - glow * 18 + grain;
    setPixel(x, y, r, g, b);
  }
}

for (let x = 0; x < width; x++) {
  const ridge1 = 560 + Math.sin(x / 80) * 26 + Math.sin(x / 31) * 13;
  const ridge2 = 640 + Math.sin(x / 58) * 24 + Math.sin(x / 143) * 30;
  for (let y = Math.floor(ridge1); y < height; y++) blendPixel(x, y, 73, 119, 105, 70);
  for (let y = Math.floor(ridge2); y < height; y++) blendPixel(x, y, 32, 84, 93, 95);
}

for (let y = 705; y < height; y++) {
  const t = (y - 705) / 195;
  for (let x = 0; x < width; x++) blendPixel(x, y, 22 + t * 5, 70 + t * 12, 89 + t * 18, 140);
}

for (let i = 0; i < 21; i++) {
  const x = 620 + i * 36;
  const h = 130 + (i % 5) * 26;
  rect(x, 575 - h, 22, h, [35, 68, 82], 165);
  if (i % 3 === 0) rect(x + 5, 585 - h, 5, h - 20, [250, 182, 92], 115);
}

line(118, 720, 1430, 535, [255, 255, 255], 150, 5);
line(118, 740, 1430, 555, [16, 73, 86], 120, 7);
line(165, 728, 1390, 548, [255, 177, 91], 110, 1);

rect(1060, 380, 292, 96, [250, 254, 250], 188);
rect(1086, 404, 236, 34, [33, 116, 126], 130);
line(1098, 452, 1320, 452, [24, 78, 88], 130, 2);
circle(1125, 480, 20, [35, 68, 82], 210);
circle(1295, 480, 20, [35, 68, 82], 210);

for (let i = 0; i < 42; i++) {
  const x = 210 + noise(i, 3) * 1160;
  const y = 80 + noise(i, 9) * 640;
  const color = i % 3 === 0 ? [232, 93, 85] : i % 3 === 1 ? [39, 135, 139] : [246, 178, 84];
  circle(x, y, 3 + noise(i, 4) * 4, color, 160);
}

const routes = [
  [255, 600, 430, 500, 610, 535, 790, 450],
  [360, 290, 570, 340, 720, 270, 930, 315],
  [930, 560, 1030, 450, 1160, 470, 1280, 365],
];
for (const r of routes) {
  for (let i = 0; i < r.length - 2; i += 2) line(r[i], r[i + 1], r[i + 2], r[i + 3], [255, 255, 255], 90, 3);
}

for (let i = 0; i < 34; i++) {
  const x = 70 + noise(i, 18) * 1460;
  const y = 120 + noise(i, 28) * 620;
  const s = 28 + noise(i, 31) * 54;
  rect(x, y, s, Math.max(4, s * 0.08), [255, 255, 255], 40);
}

const rawRows = [];
for (let y = 0; y < height; y++) {
  const row = Buffer.alloc(1 + width * 4);
  row[0] = 0;
  data.copy(row, 1, y * width * 4, (y + 1) * width * 4);
  rawRows.push(row);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(width, 0);
ihdr.writeUInt32BE(height, 4);
ihdr[8] = 8;
ihdr[9] = 6;

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", zlib.deflateSync(Buffer.concat(rawRows), { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]);

const outDir = path.join(__dirname, "..", "assets");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "weekend-map.png"), png);
