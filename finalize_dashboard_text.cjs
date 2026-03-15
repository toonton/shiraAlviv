const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'alviv_v9.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update Unmet Need with precise DOCX data
const unmetNeedOld = `יותר מ-100 מיליון איש ברחבי העולם סובלים מאי-שליטה בסוגרים, מצב הגורם לפגיעה קשה באיכות החיים, בידוד חברתי ודיכאון. הפתרונות הקיימים כיום מוגבלים: טיפולים שמרניים (תזונה, תרופות) אינם יעילים מספיק, ופרוצדורות כירורגיות הן פולשניות, יקרות וכרוכות בסיכונים משמעותיים.`;
const unmetNeedNew = `אי-שליטה בצואה (Fecal Incontinence – FI) היא הפרעה רפואית כרונית הפוגעת בכ-8–10% מהאוכלוסייה הבוגרת בעולם. בארה״ב לבדה מדובר בכ-18–19 מיליון מטופלים, ועלות הטיפול השנתית נאמדת בכ-11 מיליארד דולר. מרבית החולים סובלים מדרגה קלה-בינונית ונותרים ללא מענה אפקטיבי, שכן רק 25% מפיקים תועלת מטיפול שמרני, בעוד שפרוצדורות כירורגיות פולשניות מדי ואינן מתאימות לרובם.`;

content = content.replace(unmetNeedOld, unmetNeedNew);

// 2. Add Clinical Study Results Summary card (English) inside Product/Clinical tab
const clinicalTabSearch = `<div style="font-size:14px;font-weight:600;color:var(--navy);margin-bottom:12px;border-bottom:1px solid #eee;padding-bottom:8px;">ממצאים היסטופתולוגיים (מודל חיה)</div>`;
const clinicalSummaryCard = `<div class="card">
                    <div style="font-size:14px;font-weight:600;color:var(--navy);margin-bottom:12px;border-bottom:1px solid #eee;padding-bottom:8px;">Clinical Study Summary (Safety & Feasibility)</div>
                    <div style="font-size:12px;color:#444;line-height:1.6;direction:ltr;text-align:left;">
                        <ul style="margin:0;padding-left:20px;">
                            <li><strong>System Function:</strong> The system functioned as intended and delivered treatment precisely to the intended tissue.</li>
                            <li><strong>Focal Effect:</strong> Targeted thermal effect was achieved solely in the internal anal sphincter (IAS).</li>
                            <li><strong>Tissue Integrity:</strong> Epithelium and outer mucosa remained intact with no significant injury.</li>
                            <li><strong>Collateral Safety:</strong> No damage to adjacent structures or external sphincter was observed.</li>
                            <li><strong>Clinical Efficacy:</strong> Preliminary data showed mean improvement of 4.88 points on the Wexner scale.</li>
                        </ul>
                    </div>
                </div>
                ` + clinicalTabSearch;

if (!content.includes('Clinical Study Summary')) {
    content = content.replace(clinicalTabSearch, clinicalSummaryCard);
}

// 3. Add Sales Forecast to Market tab
const marketOppOld = `שוק הטיפול באי-שליטה בסוגרים נאמד במיליארדי דולרים בשנה, עם דרישה גוברת לפתרונות מרפאתיים (Outpatient) שאינם מצריכים חדר ניתוח או הרדמה מלאה.`;
const marketOppNew = `שוק הטיפולים ל-FI בארה״ב, אירופה ויפן נאמד בכ-1.88 מיליארד דולר, עם תחזית צמיחה ל-1.5 מיליארד דולר בארה"ב לבדה עד 2030. ALVIV צופה הכנסות של כ-135 מיליון דולר בשנה עד 2030, המבוססות על שיעור חדירה שמרני לשוק המרפאות והמרכזים האמבולטוריים.`;

content = content.replace(marketOppOld, marketOppNew);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully finalized dashboard text with DOCX data.');
