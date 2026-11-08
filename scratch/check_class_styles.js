const fs = require('fs');

const css = fs.readFileSync('app/globals.css', 'utf8');

// Find all CSS rules in globals.css
// Look for any fixed pixel widths, min-widths, or margins
const lines = css.split('\n');

console.log('--- RULES WITH FIXED WIDTH / MIN-WIDTH >= 200px ---');
lines.forEach((line, idx) => {
  if (/(?:width|min-width):\s*([0-9]{3,})px/.test(line)) {
    const m = line.match(/(?:width|min-width):\s*([0-9]+)px/);
    if (m && parseInt(m[1]) >= 200) {
      // Find preceding selector
      let selector = '';
      for (let j = idx - 1; j >= Math.max(0, idx - 10); j--) {
        if (lines[j].includes('{')) {
          selector = lines[j].trim();
          break;
        }
      }
      console.log(`Line ${idx + 1} [${selector}]: ${line.trim()}`);
    }
  }
});

