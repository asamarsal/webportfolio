const fs = require('fs');

const css = fs.readFileSync('app/globals.css', 'utf8');

// Find all occurrences of clamp(...)
const clamps = css.match(/clamp\([^)]+\)/g) || [];
console.log('--- ALL CLAMPS ---');
clamps.forEach(c => {
  // Check if minimum is in px or rem or vw
  console.log(c);
});

