const fs = require('fs');

const css = fs.readFileSync('app/globals.css', 'utf8');
const lines = css.split('\n');

console.log('--- NEGATIVE MARGINS OR OFFSETS ---');
lines.forEach((line, index) => {
  if (/(?:margin|left|right|top|bottom)\s*:\s*-[0-9]+px/.test(line)) {
    console.log(`${index + 1}: ${line.trim()}`);
  }
  if (/width\s*:\s*[0-9]+%/.test(line)) {
    const m = line.match(/width\s*:\s*([0-9]+)%/);
    if (m && parseInt(m[1]) > 100) {
      console.log(`[>100% width] ${index + 1}: ${line.trim()}`);
    }
  }
});

