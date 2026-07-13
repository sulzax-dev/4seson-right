import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directory = __dirname;

const files = fs.readdirSync(directory).filter(file => file.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(directory, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let modified = false;
    
    // Replace desktop header logo styling
    const oldDesktop = 'class="h-20 w-20 object-cover object-left rounded transition-transform group-hover:scale-105"';
    const newDesktop = 'class="h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"';
    if (content.includes(oldDesktop)) {
        content = content.replaceAll(oldDesktop, newDesktop);
        modified = true;
    }
    
    // Replace mobile header logo styling
    const oldMobile = 'class="h-16 w-16 object-cover object-left rounded"';
    const newMobile = 'class="h-10 w-auto object-contain"';
    if (content.includes(oldMobile)) {
        content = content.replaceAll(oldMobile, newMobile);
        modified = true;
    }
    
    // Replace footer logo styling
    const oldFooter = 'class="h-16 w-16 object-cover object-left rounded bg-white/10 p-1"';
    const newFooter = 'class="h-12 w-auto object-contain bg-white/10 p-1 rounded"';
    if (content.includes(oldFooter)) {
        content = content.replaceAll(oldFooter, newFooter);
        modified = true;
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated logo classes in: ${file}`);
    }
});
