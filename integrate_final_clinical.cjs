const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'alviv_v9.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Refactor Histology Section into a side-by-side comparison
const histologyOld = `<div class="card">
                    <div style="font-size:12px;font-weight:600;color:var(--navy);margin-bottom:12px;">ממצאים היסטופתולוגיים (חיות)</div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;">
                        <img src="temp_docx/word/media/image9.png" style="width:100%;border-radius:4px;border:1px solid #eee;">
                        <img src="temp_docx/word/media/image10.png" style="width:100%;border-radius:4px;border:1px solid #eee;">
                    </div>
                </div>`;

const histologyNew = `<div class="card">
                    <div style="font-size:14px;font-weight:600;color:var(--navy);margin-bottom:12px;border-bottom:1px solid #eee;padding-bottom:8px;">ממצאים היסטופתולוגיים (מודל חיה)</div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
                        <div style="text-align:center;">
                            <img src="temp_docx/word/media/image9.png" style="width:100%;border-radius:4px;border:1px solid #eee;margin-bottom:8px;">
                            <div style="font-size:11px;color:#666;line-height:1.4;text-align:right;direction:ltr;">
                                <strong>Day 1 (Acute Effect):</strong><br>
                                Expected lesions in internal anal muscle with focal necrosis; adjacent structures and external sphincter remained intact.
                            </div>
                        </div>
                        <div style="text-align:center;">
                            <img src="temp_docx/word/media/image10.png" style="width:100%;border-radius:4px;border:1px solid #eee;margin-bottom:8px;">
                            <div style="font-size:11px;color:#666;line-height:1.4;text-align:right;direction:ltr;">
                                <strong>Day 6 (Recovery):</strong><br>
                                Mild inflammatory infiltration and edema in internal muscle. External sphincter and epithelium remained intact.
                            </div>
                        </div>
                    </div>
                </div>`;

content = content.replace(histologyOld, histologyNew);

// 2. Enhance Operating Principle Caption
const principleSearch = `עקרון הפעולה — תרשים קליני`;
const principleReplace = `עקרון הפעולה — תרשים קליני (גירוי תרמי מבוקר ב-1470nm)`;
content = content.replace(principleSearch, principleReplace);

// 3. Standardize Wexner Score and Performance captions
content = content.replace('שיפור במדד Wexner Score', 'ירידה של 4.88 נקודות במדד Wexner (שיפור משמעותי)');
content = content.replace('השוואת ביצועים קליניים', 'עליונות קלינית: ALVIV לעומת טכנולוגיות מתחרות');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully integrated final clinical text and histology comparison.');
