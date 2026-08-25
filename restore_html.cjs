const fs = require('fs');
const path = require('path');

const directory = __dirname;
const files = fs.readdirSync(directory).filter(file => file.endsWith('.html') && !file.startsWith('scratch'));

const basenames = files.map(file => file.replace('.html', '')).filter(name => name !== 'index');

files.forEach(file => {
    const filePath = path.join(directory, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace href="/" with href="index.html"
    content = content.replace(/href="\/"/g, 'href="index.html"');
    
    // Replace href="basename" with href="basename.html"
    basenames.forEach(basename => {
        const regex = new RegExp(`href="${basename}"`, 'g');
        content = content.replace(regex, `href="${basename}.html"`);
    });

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Restored .html to links.');
