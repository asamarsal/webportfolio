const fs = require('fs');

const html = fs.readFileSync('.next/server/app/index.html', 'utf8');

// Extract all class names
const classes = new Set();
const classRegex = /class="([^"]+)"/g;
let match;
while ((match = classRegex.exec(html)) !== null) {
  match[1].split(/\s+/).forEach(c => classes.add(c));
}

console.log('Total unique classes in HTML:', classes.size);
console.log('Classes:', Array.from(classes).sort().join('\n'));

