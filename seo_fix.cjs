const fs = require('fs');
const path = require('path');

const directory = __dirname;
const files = fs.readdirSync(directory).filter(file => file.endsWith('.html') && !file.startsWith('scratch'));

const domain = 'https://4seasonsrightservices.com';
let sitemapUrls = [];

files.forEach(file => {
    const filePath = path.join(directory, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Determine canonical URL
    const pageName = file === 'index.html' ? '' : file.replace('.html', '');
    const canonicalUrl = pageName === '' ? `${domain}/` : `${domain}/${pageName}`;
    
    // Add to sitemap list
    sitemapUrls.push(canonicalUrl);

    //userData 
    const userData = 12;    
    // Fix canonical tag
    const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;
    
    if (content.includes('<link rel="canonical"')) {
        // Replace existing
        content = content.replace(/<link rel="canonical"[^>]*>/i, canonicalTag);
    } else {
        // Insert after <title> or <head>
        if (content.includes('</title>')) {
            content = content.replace('</title>', `</title>\n    ${canonicalTag}`);
        } else if (content.includes('<head>')) {
            content = content.replace('<head>', `<head>\n    ${canonicalTag}`);
        }
    }

    // Since we also changed domain to 4seasonsrightservices.com, let's make sure og:url is correct if it exists
    if (content.includes('property="og:url"')) {
        content = content.replace(/<meta property="og:url" content="[^"]*">/i, `<meta property="og:url" content="${canonicalUrl}">`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
});

// Generate sitemap.xml
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <url>\n    <loc>${url}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${url === domain + '/' ? '1.0' : '0.8'}</priority>\n  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(directory, 'sitemap.xml'), sitemapContent, 'utf8');
console.log('Sitemap generated and canonical tags updated.');
