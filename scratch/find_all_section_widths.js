const fs = require('fs');

const css = fs.readFileSync('app/globals.css', 'utf8');

// Find all classes that set width or min-width or margin
const blocks = css.split(/[{}]/);
for (let i = 0; i < blocks.length - 1; i += 2) {
  const selector = blocks[i].trim();
  const body = blocks[i + 1].trim();
  
  // Look for any fixed pixel width or min-width > 100px
  const widthMatches = body.match(/(?:min-width|width|max-width):\s*([0-9]+)px/g);
  if (widthMatches) {
    widthMatches.forEach(m => {
      const val = parseInt(m.match(/[0-9]+/)[0]);
      if (val > 150) {
        console.log(`[${val}px] ${selector} => ${m}`);
      }
    });
  }
}

