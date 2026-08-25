const fs = require('fs');
const path = require('path');

const directory = __dirname;
const files = fs.readdirSync(directory).filter(file => file.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(directory, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace href="something.html" with href="something"
    // except for index.html which should probably go to "/"
    content = content.replace(/href="([^"]+)\.html"/g, (match, p1) => {
        if (p1 === 'index') return 'href="/"';
        return href="";
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated URLs in: ' + file);
});
