const fs = require('fs');
const path = require('path');

const filePath = 'alviv_v9.html';
let content = fs.readFileSync(filePath, 'utf8');

// Find the Market Entry Barriers section
const barriersLabel = '<div style="font-size:12px;font-weight:600;color:var(--navy);margin-bottom:8px;">חסמי כניסה לשוק</div>';
const barriersContainerStart = '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:16px;">';

// We'll replace the entire container of barriers
const startIndex = content.indexOf(barriersLabel);
if (startIndex !== -1) {
    const containerStartIndex = content.indexOf(barriersContainerStart, startIndex);
    // Find the end of this grid container (looking for the next closing div that matches the grid)
    // There are 2 cards inside, so 2 closing card divs + 1 closing grid div
    // But it's safer to just replace the whole known block of 2 cards with 4 new ones.
    
    const newBarriersGrid = `<div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:20px; margin-top:12px;">
        <div class="card" style="padding:20px; background:var(--white); border:1px solid var(--border); border-radius:var(--rad); transition:all 0.3s ease;">
          <div style="font-size:24px; margin-bottom:8px;">🛡️</div>
          <div style="font-weight:700; color:var(--navy); font-size:13px; margin-bottom:6px;">הגנה פטנטית</div>
          <div style="font-size:11px; color:var(--text2); line-height:1.6;">רישום פטנטים בינלאומיים המגנים על ליבת הטכנולוגיה ושיטות הטיפול הייחודיות של ALVIV.</div>
        </div>
        <div class="card" style="padding:20px; background:var(--white); border:1px solid var(--border); border-radius:var(--rad); transition:all 0.3s ease;">
          <div style="font-size:24px; margin-bottom:8px;">🧠</div>
          <div style="font-weight:700; color:var(--navy); font-size:13px; margin-bottom:6px;">עקומת למידה וידע נצבר</div>
          <div style="font-size:11px; color:var(--text2); line-height:1.6;">ידע הנדסי וקליני מצטבר (Know-How) ופרוטוקולי טיפול אופטימליים המהווים חסם למתחרים.</div>
        </div>
        <div class="card" style="padding:20px; background:var(--white); border:1px solid var(--border); border-radius:var(--rad); transition:all 0.3s ease;">
          <div style="font-size:24px; margin-bottom:8px;">⚖️</div>
          <div style="font-weight:700; color:var(--navy); font-size:13px; margin-bottom:6px;">רגולציה ותקינה</div>
          <div style="font-size:11px; color:var(--text2); line-height:1.6;">עמידה בתקני ISO 13485 ואישורי FDA/CE מהווים רף כניסה גבוה למתחרים חדשים.</div>
        </div>
        <div class="card" style="padding:20px; background:var(--white); border:1px solid var(--border); border-radius:var(--rad); transition:all 0.3s ease;">
          <div style="font-size:24px; margin-bottom:8px;">🤝</div>
          <div style="font-weight:700; color:var(--navy); font-size:13px; margin-bottom:6px;">קשרים אסטרטגיים</div>
          <div style="font-size:11px; color:var(--text2); line-height:1.6;">שיתופי פעולה הדוקים עם KOLs ומרכזים רפואיים מובילים בארה"ב ואירופה.</div>
        </div>
      </div>`;

    // Regex to capture the original grid container and its 2 cards
    const oldGridRegex = /<div style="display:grid;grid-template-columns:repeat\(auto-fit, minmax\(200px, 1fr\)\);gap:16px;">\s*<div class="card"[^>]+>[\s\S]+?<\/div>\s*<div class="card"[^>]+>[\s\S]+?<\/div>\s*<\/div>/;
    
    content = content.replace(oldGridRegex, newBarriersGrid);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully refactored Market Entry Barriers grid.');
} else {
    console.log('Market Entry Barriers section not found.');
}
