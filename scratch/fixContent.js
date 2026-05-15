import fs from 'fs';
import path from 'path';

const filePath = path.join('d:', 'Dr.SwathikaRajendran', 'src', 'hooks', 'useSiteContent.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace em-dashes with spaces
content = content.replace(/ — /g, ' ');
content = content.replace(/—/g, ' ');

// Replace double spaces created by the user with single spaces
content = content.replace(/  /g, ' ');

// Remove Oxford commas
content = content.replace(/, and/g, ' and');

// Replace hyphens in specific words
const hyphensToReplace = [
  'UK-trained', 'patient-centred', 'breast-conserving', 'self-examinations', 
  'self-diagnosis', 'implant-based', 'long-lasting', 'post-operative', 
  'pre-operative', 'skin-sparing', 'nipple-sparing', 'gold-standard', 
  'radio-isotope', 'follow-up', 'donor-site', 'Natural-looking', 'post-surgical'
];

hyphensToReplace.forEach(word => {
  const regex = new RegExp(word, 'gi'); // Case-insensitive
  content = content.replace(regex, match => match.replace(/-/g, ' '));
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done fixing content in useSiteContent.ts');
