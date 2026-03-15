const fs = require('fs');
const path = require('path');

const filePath = 'alviv_v9.html';
let content = fs.readFileSync(filePath, 'utf8');

// --- 1. EXPAND LEADING TEAM ---
// We target the LEADING TEAM card (lines 630-681 approximately)
const leadingTeamStart = '<!-- LEADING TEAM -->';
const leadingTeamEnd = '</div><!-- /grid2 -->';

const newLeadingTeamContent = `<!-- LEADING TEAM -->
    <div class="card">
      <div class="card-title">צוות מוביל</div>

      <!-- Shira Doron -->
      <div class="person" style="align-items:flex-start;padding-bottom:16px;border-bottom:1px solid var(--border);margin-bottom:16px;">
        <div class="avatar av1" style="width:48px;height:48px;font-size:14px;flex-shrink:0;">שד</div>
        <div>
          <div class="pname" style="font-size:14px;font-weight:700;">שירה דורון — מנכ"לית ומייסדת</div>
          <div class="prole" style="margin-top:3px;color:var(--cyan2);">20+ שנות ניסיון · מומחית MedTech & שיווק בינלאומי</div>
          <div style="font-size:11.5px;color:var(--text2);line-height:1.6;margin-top:8px;">
            אשת מקצוע ותיקה עם הבנה מעמיקה בשילוב שבין טכנולוגיה לבריאות. בעבר מנהלת השיווק והקליניקה בחברת Alma Laser, שם הובילה פיתוח עסקי גלובלי והכירה לעומק את צורכי האנדוסקופיסטים והגסטרואנטרולוגים. יזמת ה-ALVIV המשלבת חזון קליני עם יכולת ביצוע עסקית מוכחת.
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">
            <span class="tag t-cyan">Alma Laser</span>
            <span class="tag t-blue">שיווק בינלאומי</span>
            <span class="tag t-green">פיתוח עסקי</span>
            <a href="https://www.linkedin.com/in/shira-doron-monblat-42151110/" target="_blank" style="text-decoration:none;font-size:10px;color:var(--text3);margin-right:auto;">LinkedIn ↗</a>
          </div>
        </div>
      </div>

      <!-- Yair Leopold -->
      <div class="person" style="align-items:flex-start;margin-bottom:0;">
        <div class="avatar av2" style="width:48px;height:48px;font-size:14px;flex-shrink:0;">יל</div>
        <div>
          <div class="pname" style="font-size:14px;font-weight:700;">יאיר לאופולד — CTO</div>
          <div class="prole" style="margin-top:3px;color:var(--cyan2);">40+ שנות ניסיון · מומחה לייזרים רפואיים</div>
          <div style="font-size:11.5px;color:var(--text2);line-height:1.6;margin-top:8px;">
            מהנדס ומנהל בכיר עם ניסיון רב-עשורי הכולל תפקידי מנכ"ל ו-CTO בחברות מובילות. מומחיותו מקיפה את כל שרשרת הערך: מארכיטקטורת מערכת ובחירת אורך-גל (1470nm), דרך ניהול קניין רוחני ואסטרטגיה רגולטורית, ועד להקמת רשתות מכירה גלובליות והשקת מוצרים.
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">
            <span class="tag t-cyan">לייזר 1470nm</span>
            <span class="tag t-blue">ארכיטקטורת מערכת</span>
            <span class="tag t-gray">קניין רוחני</span>
            <a href="https://www.linkedin.com/in/yair-leopold-88177/" target="_blank" style="text-decoration:none;font-size:10px;color:var(--text3);margin-right:auto;">LinkedIn ↗</a>
          </div>
        </div>
      </div>
    </div>`;

// Surgical replace for Leading Team
const leadingRegex = new RegExp(`${leadingTeamStart}[\\s\\S]+?${leadingTeamEnd}`);
content = content.replace(leadingRegex, `${newLeadingTeamContent}\n\n  </div><!-- /grid2 -->`);

// --- 2. EXPAND PROFESSIONAL TEAM ---
const professionalTeamStart = '<!-- PROFESSIONAL TEAM — full-width card -->';
const professionalTeamEnd = '<!-- Advisory / Partners row -->';

const newProfessionalTeamContent = `<!-- PROFESSIONAL TEAM — full-width card -->
  <div class="card" style="margin-bottom:22px;">
    <div class="card-title" style="margin-bottom:20px;">צוות מקצועי</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;">

      <!-- Amit Tubishevitz -->
      <div style="background:var(--off);border:1px solid var(--border);border-radius:12px;padding:18px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
          <div class="avatar" style="background:#D0E4F0;color:#0a5278;width:40px;height:48px;font-size:12px;flex-shrink:0;border-radius:10px;">עמ</div>
          <div>
            <div class="pname" style="font-weight:700;">עמית טובישביץ</div>
            <div class="prole" style="font-size:11px;color:var(--cyan2);">מנהל מו"פ (R&D Expert)</div>
          </div>
        </div>
        <div style="font-size:11px;color:var(--text2);line-height:1.65;">
          מהנדס בכיר עם ניסיון נרחב בהובלת מחקר ופיתוח של אמצעים רפואיים. מוביל את תהליכי ה-Design Control, ניהול קבלני המשנה ותיעוד הפיתוח לצרכי רגולציה, תוך התמקדות ב-V&V מערכתי.
        </div>
        <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center;">
          <span class="tag t-blue">V&V</span>
          <a href="https://www.linkedin.com/in/amit-tubishevitz-26690a11/" target="_blank" style="text-decoration:none;font-size:10px;color:var(--text3);">LinkedIn ↗</a>
        </div>
      </div>

      <!-- Boaz Harari -->
      <div style="background:var(--off);border:1px solid var(--border);border-radius:12px;padding:18px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
          <div class="avatar" style="background:#D0E4F0;color:#0a5278;width:40px;height:48px;font-size:12px;flex-shrink:0;border-radius:10px;">בה</div>
          <div>
            <div class="pname" style="font-weight:700;">בועז הררי</div>
            <div class="prole" style="font-size:11px;color:var(--cyan2);">VP R&D · Mech & DFM</div>
          </div>
        </div>
        <div style="font-size:11px;color:var(--text2);line-height:1.65;">
          מהנדס מכונות עם 20+ שנות ניסיון ב-QSR/GMP. מומחה בתכנון ופיתוח חדשנות הנדסית, מוביל את המעבר מאב-טיפוס לייצור סדרתי (Injection Molding) תוך עמידה בתקני איכות מחמירים.
        </div>
        <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center;">
          <span class="tag t-cyan">DFM Expert</span>
          <a href="https://www.linkedin.com/in/boaz-harari-90767419/" target="_blank" style="text-decoration:none;font-size:10px;color:var(--text3);">LinkedIn ↗</a>
        </div>
      </div>

      <!-- Prof. Yehuda Ringel -->
      <div style="background:var(--off);border:1px solid var(--border);border-radius:12px;padding:18px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
          <div class="avatar" style="background:#D1FAE5;color:#065F46;width:40px;height:48px;font-size:12px;flex-shrink:0;border-radius:10px;">פר</div>
          <div>
            <div class="pname" style="font-weight:700;">פרופ׳ יהודה רינגל</div>
            <div class="prole" style="font-size:11px;color:var(--cyan2);">Medical Advisor · GI Lead</div>
          </div>
        </div>
        <div style="font-size:11px;color:var(--text2);line-height:1.65;">
          ראש המחלקה לגסטרואנטרולוגיה במרכז מאיר. 30+ שנות מחקר קליני ומומחיות עולמית ב-IBS ו-FI. הוביל את ניסוי ה-FIH ומלווה את בניית האסטרטגיה הקלינית וה-KOL של החברה.
        </div>
        <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center;">
          <span class="tag t-green">KOL Leadership</span>
          <a href="https://www.linkedin.com/in/yehuda-ringel/" target="_blank" style="text-decoration:none;font-size:10px;color:var(--text3);">LinkedIn ↗</a>
        </div>
      </div>

      <!-- Liat Diamant -->
      <div style="background:var(--off);border:1px solid var(--border);border-radius:12px;padding:18px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
          <div class="avatar" style="background:#FEF3C7;color:#92400E;width:40px;height:48px;font-size:12px;flex-shrink:0;border-radius:10px;">לד</div>
          <div>
            <div class="pname" style="font-weight:700;">ליאת דיאמנט</div>
            <div class="prole" style="font-size:11px;color:var(--cyan2);">Regulatory Strategy (LDP)</div>
          </div>
        </div>
        <div style="font-size:11px;color:var(--text2);line-height:1.65;">
          יועצת רגולציה בכירה, מנכ"לית LDP Consulting. מומחית בבניית Regulatory Roadmaps לשווקי ארה"ב (FDA) ואירופה (CE/MDR), וניהול תהליכי Pre-Submission מורכבים.
        </div>
        <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center;">
          <span class="tag t-amber">FDA / CE MDR</span>
          <a href="https://www.linkedin.com/in/liat-diamant-porat-87544b74/" target="_blank" style="text-decoration:none;font-size:10px;color:var(--text3);">LinkedIn ↗</a>
        </div>
      </div>

      <!-- Yael Fridman -->
      <div style="background:var(--off);border:1px solid var(--border);border-radius:12px;padding:18px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
          <div class="avatar" style="background:#E0F2FE;color:#075985;width:40px;height:48px;font-size:12px;flex-shrink:0;border-radius:10px;">יפ</div>
          <div>
            <div class="pname" style="font-weight:700;">יעל פרידמן</div>
            <div class="prole" style="font-size:11px;color:var(--cyan2);">CRA · Clinical Monitoring</div>
          </div>
        </div>
        <div style="font-size:11px;color:var(--text2);line-height:1.65;">
          מומחית בניהול ניסויים קליניים משלב התכנון ועד לסיכום והגשה. אחראית על ניטור האתרים, עמידה ב-GCP ותיאום מול מרכזי מחקר מובילים בארץ ובחו"ל (MGH Boston).
        </div>
        <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center;">
          <span class="tag t-blue">GCP Expert</span>
          <a href="https://www.linkedin.com/in/yael-fridman-0249114/" target="_blank" style="text-decoration:none;font-size:10px;color:var(--text3);">LinkedIn ↗</a>
        </div>
      </div>

      <!-- placeholder or additional member if needed -->
      <div style="background:var(--off);border:1px dashed var(--border);border-radius:12px;padding:18px;display:flex;flex-direction:column;justify-content:center;align-items:center;opacity:0.6;">
        <div style="font-size:24px;margin-bottom:8px;">👥</div>
        <div style="font-size:12px;font-weight:600;color:var(--text2);">יועצים ומומחים נוספים</div>
        <div style="font-size:10px;color:var(--text3);">IP, IP Survey, Legal FDA</div>
      </div>

    </div>`;

const professionalRegex = new RegExp(`${professionalTeamStart}[\\s\\S]+?${professionalTeamEnd}`);
content = content.replace(professionalRegex, `${newProfessionalTeamContent}\n\n    <!-- Advisory / Partners row -->`);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully expanded Team profiles.');
