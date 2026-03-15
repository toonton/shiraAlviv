const fs = require('fs');
const path = require('path');

const filesToUpdate = ['alviv_v9.html', 'index.html'];

filesToUpdate.forEach(fileName => {
    const filePath = path.join(__dirname, fileName);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // Add the Case Number to the topbar-right area
    const topbarRightSearch = `<div class="topbar-right">`;
    const caseNumberHTML = `<div class="topbar-right">
    <span class="pill" style="background: rgba(14, 158, 110, 0.15); color: var(--green); border-color: rgba(14, 158, 110, 0.3);">מספר תיק: 90411</span>`;
    
    if (content.includes(topbarRightSearch) && !content.includes('90411')) {
        content = content.replace(topbarRightSearch, caseNumberHTML);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully added Case Number 90411 to ${fileName}`);
});
