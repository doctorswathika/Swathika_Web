import fs from 'fs';
import ts from 'typescript';

const fileContent = fs.readFileSync('./src/hooks/useSiteContent.ts', 'utf8');

// Compile to JS to extract the object
const jsContent = ts.transpileModule(fileContent, {
  compilerOptions: { module: ts.ModuleKind.CommonJS }
}).outputText;

// We just want to extract SITE_CONTENT
const match = jsContent.match(/const SITE_CONTENT = (\{[\s\S]*?\});/);
if (match) {
  // Use Function to evaluate the object literal
  const obj = new Function('return ' + match[1])();
  let errors = 0;
  for (const key in obj) {
    const val = obj[key].content;
    if (val.startsWith('[')) {
      try {
        JSON.parse(val);
      } catch (e) {
        console.error("Failed on:", key, e.message);
        errors++;
      }
    }
  }
  if (errors === 0) console.log("All JSON strings in the actual JS object parse correctly!");
} else {
  console.log("Could not extract SITE_CONTENT");
}
