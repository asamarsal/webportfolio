const fs = require('fs');

const css = fs.readFileSync('app/globals.css', 'utf8');

// Parse rules in css
// Find any width: calc(...) or width: min(...) or width: clamp(...)
const lines = css.split('\n');
lines.forEach((l, i) => {
  if (/(?:width|min-width|max-width|margin|padding|left|right):\s*[^;]*(?:calc|min|clamp|vw|%)/i.test(l)) {
    // print line if it might cause issues
    if (/calc\(100% -|100vw|[0-9]{3,}px|clamp/i.test(l)) {
      console.log(`${i + 1}: ${l.trim()}`);
    }
  }
});

