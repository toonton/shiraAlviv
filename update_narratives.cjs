const fs = require('fs');
const path = require('path');

const filePath = 'alviv_v9.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update Pillar Titles and Body (Section 1 of Product Tab)
content = content.replace(
  '<div class="pillar-title">חדשנות קלינית</div>',
  '<div class="pillar-title">חדשנות קלינית ורפואה מותאמת אישית</div>'
);

content = content.replace(
  'ALVIV היא הפתרון <em>היחיד</em> המעודד רגנרציה ביולוגית',
  'ALVIV היא הפתרון <em>היחיד</em> המבוסס על <strong>רפואה מותאמת אישית</strong>, המעודד רגנרציה ביולוגית'
);

content = content.replace(
  '<div class="pillar-title">חדשנות הנדסית</div>',
  '<div class="pillar-title">עקרון פעולה והנדסה עילית</div>'
);

content = content.replace(
  '<li>חיישני טמפרטורה מובנים (Thermistor שטוח) לניטור בזמן אמת</li>',
  '<li><strong>עקרון פעולה (Operating Principle):</strong> ניטור טמפרטורה מדויק ורציף המאפשר התאמה אישית של עוצמת הלייזר לפי תגובת הרקמה של המטופל.</li>'
);

// 2. Insert Clinical Sketch (image11.png) and Operating Principle Visual
const pillarsGridEnd = '</div>\n  </div>\n\n  <!-- ── SECTION 2: COMPETITIVE COMPARISON ── -->';
const visualSection = `</div>
  </div>

  <!-- ── SECTION 1.5: OPERATING PRINCIPLE & DEMOGRAPHICS ── -->
  <div style="display:flex; gap:24px; margin-bottom:22px; align-items:stretch;">
    <div class="card" style="flex:1; display:flex; flex-direction:column; justify-content:center;">
      <div class="card-title">עקרון הפעולה — תרשים קליני</div>
      <div style="background:var(--off); border:1px solid var(--border); border-radius:12px; padding:20px; text-align:center;">
        <img src="temp_docx/word/media/image11.png" alt="Clinical Sketch" style="max-width:100%; border-radius:8px; mix-blend-mode: multiply;">
        <div style="margin-top:12px; font-size:11px; color:var(--text2); line-height:1.5; text-align:right;">
          <strong>גירוי תרמי ממוקד:</strong> אורך גל 1470nm נספג באופן אופטימלי במים ובכלי דם ברקמת המטרה (Internal Anal Sphincter), מייצר חימום מבוקר (41-42°C) המעורר תהליכי ריפוי טבעיים ועיבוי דופן השריר ללא נזק סביבתי.
        </div>
      </div>
    </div>
    
    <div class="card" style="flex:0 0 320px;">
      <div class="card-title">התפלגות שכיחות FI</div>
      <div style="text-align:center; padding:10px;">
        <img src="התפלגות עלגבי גילאים.jpg.jpeg" alt="Age Distribution" style="max-width:100%; border-radius:8px;">
        <div style="margin-top:12px; font-size:11px; color:var(--text2); text-align:right;">
          נתונים דמוגרפיים מדגישים את הצורך בפתרון אמבולטורי: השכיחות עולה משמעותית עם הגיל, במיוחד מעל גיל 60, שם הפרופיל הבריאותי מחייב טיפול זעיר-פולשני ללא הרדמה כללית.
        </div>
      </div>
    </div>
  </div>

  <!-- ── SECTION 2: COMPETITIVE COMPARISON ── -->`;

content = content.replace(pillarsGridEnd, visualSection);

// 3. Add Clinical Results Visuals (image12.png, image13.png) before Section 2 Label
const compLabel = '<div class="section-label">ALVIV מול פתרונות קיימים</div>';
const resultsSection = `
  <!-- ── SECTION 1.8: CLINICAL OUTCOMES VISUALS ── -->
  <div class="section-label">תוצאות קליניות וניתוח סטטיסטי</div>
  <div style="display:flex; gap:20px; margin-bottom:22px;">
    <div class="card" style="flex:1;">
      <div class="card-title">שיפור במדד Wexner Score</div>
      <div style="text-align:center; padding:10px; background:var(--white); border-radius:8px;">
        <img src="temp_docx/word/media/image12.png" alt="Wexner Improvement" style="max-width:100%; height:auto;">
        <div style="margin-top:12px; font-size:11px; color:var(--text2); line-height:1.5; text-align:right;">
          <strong>ירידה משמעותית בחומרת התסמינים:</strong> ניתוח סטטיסטי הראה שיפור ממוצע של 4.88 נקודות במדד Wexner לעומת קו הבסיס (Baseline), המהווה הוכחה ליעילות הטיפול בשיפור השליטה בסוגרים.
        </div>
      </div>
    </div>
    <div class="card" style="flex:1;">
      <div class="card-title">השוואת ביצועים קליניים</div>
      <div style="text-align:center; padding:10px; background:var(--white); border-radius:8px;">
        <img src="temp_docx/word/media/image13.png" alt="Performance Comparison" style="max-width:100%; height:auto;">
        <div style="margin-top:12px; font-size:11px; color:var(--text2); line-height:1.5; text-align:right;">
          <strong>עליונות טכנולוגית:</strong> תוצאות הניסוי הקליני מצביעות על עדיפות משמעותית של מערכת ALVIV בשיקום השליטה בסוגרים ואיכות חיי המטופל בהשוואה לטכנולוגיות דור קודם.
        </div>
      </div>
    </div>
  </div>

  <div class="section-label">ALVIV מול פתרונות קיימים</div>`;

content = content.replace(compLabel, resultsSection);

// 4. Update Challenge 1 Title
content = content.replace(
  '<div class="ch-title">בקרת טמפרטורה מדויקת בזמן אמת</div>',
  '<div class="ch-title">עקרון הפעולה ובקרת טמפרטורה</div>'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated narratives and inserted all clinical images (11, 12, 13).');
