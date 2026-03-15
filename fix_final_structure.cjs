const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'alviv_v9.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add "Contribution to the Israeli Economy" card to the Market tab
const economyContribution = `
    <div class="card" style="margin-top:22px; border-top: 3px solid var(--green);">
      <div class="card-title">התרומה למשק בישראל</div>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
        <div style="font-size:12px; color:var(--text2); line-height:1.6;">
          <strong style="color:var(--navy);">יצירת מקומות עבודה:</strong> הרחבת צוות הליבה בישראל ב-4.7 שנות אדם בשלב ה-Seed, עם צפי לגידול משמעותי בתחומי ההנדסה, הקליניקה והייצור ב-2028.
          <br><br>
          <strong style="color:var(--navy);">חיזוק שרשרת האספקה המקומית:</strong> העברת הייצור ל-LSI (קיסריה) ושימוש בספקים ישראליים (NeoLaser, NIT) מחזקים את התשתית הטכנולוגית והתעשייתית בארץ.
        </div>
        <div style="font-size:12px; color:var(--text2); line-height:1.6;">
          <strong style="color:var(--navy);">מובילות טכנולוגית:</strong> ביסוס ישראל כמרכז עולמי לחדשנות בתחום ה-Gastro-Laser, תוך רישום פטנטים בינלאומיים בבעלות חברה ישראלית.
          <br><br>
          <strong style="color:var(--navy);">הכנסות מיצוא:</strong> מודל עסקי המבוסס על מכירות גלובליות (ארה"ב ואירופה) שיזרימו הון זר למשק הישראלי ויגדילו את הכנסות המדינה ממסים.
        </div>
      </div>
    </div>
`;

// Inject into the Market tab, before the final footer
const marketFooterSearch = `<!-- Footer -->\n  <div class="footer">\n    <span style="font-weight:700;color:var(--navy);letter-spacing:1px;">ALVIV</span>`;
// We want to inject it inside the tab-market container
const marketTabEnd = `</div>\n</div>\n\n<!-- ══════════════════════════════════════════════\n     TAB 6`;
content = content.replace(marketTabEnd, economyContribution + `\n` + marketTabEnd);

// 2. Enhance Risk Management section in Innovation Tab
const riskManagement = `
    <div class="section-label">ניהול סיכונים עיקריים</div>
    <div class="card" style="margin-bottom:22px; background:#FEF9F9;">
      <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:12px;">
        <div style="padding:10px; border:1px solid #FADADA; border-radius:8px;">
          <div style="font-size:11px; font-weight:600; color:#9b2020; margin-bottom:5px;">סיכון רגולטורי</div>
          <div style="font-size:10.5px; color:#666;">עיכוב באישורי FDA/CE עקב חוסר ב-Predicate Device. <strong>מניעה:</strong> הידברות מוקדמת (Pre-Sub), ליווי ע"י Hogan Lovells.</div>
        </div>
        <div style="padding:10px; border:1px solid #FADADA; border-radius:8px;">
          <div style="font-size:11px; font-weight:600; color:#9b2020; margin-bottom:5px;">סיכון קליני</div>
          <div style="font-size:10.5px; color:#666;">קושי בגיוס מטופלים או חוסר מובהקות סטטיסטית. <strong>מניעה:</strong> עבודה עם 3 מרכזים מובילים (MGH, מאיר), KOLs מעורבים.</div>
        </div>
        <div style="padding:10px; border:1px solid #FADADA; border-radius:8px;">
          <div style="font-size:11px; font-weight:600; color:#9b2020; margin-bottom:5px;">סיכון פיננסי</div>
          <div style="font-size:10.5px; color:#666;">חוסר במימון משלים לסבב. <strong>מניעה:</strong> עמידה באבני דרך להעלאת ערך החברה ופנייה למשקיעים קיימים (SAFE).</div>
        </div>
      </div>
    </div>
`;

const trlSearch = `<!-- ── SECTION 4: TECH CHALLENGES ── -->\n  <div class="section-label">אתגרים טכנולוגיים מרכזיים</div>`;
content = content.replace(trlSearch, riskManagement + `\n` + trlSearch);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully added Contribution to Israel and Risk Management sections.');
