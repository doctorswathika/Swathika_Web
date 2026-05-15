import fs from 'fs';

const content = fs.readFileSync('./src/hooks/useSiteContent.ts', 'utf8');

const regex = /content:\s*'(\[.*?\])',/g;
let match;
let errors = 0;

while ((match = regex.exec(content)) !== null) {
  let str = match[1];
  try {
    JSON.parse(str);
  } catch(e) {
    console.error("Failed to parse:", str);
    console.error(e.message);
    errors++;
  }
}

if (errors === 0) console.log("All JSON strings parse correctly.");
