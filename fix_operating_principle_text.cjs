const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'alviv_v9.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Define the detailed text for the Monitoring & Optimization card
const monitoringText = `המערכת מספקת משוב בזמן אמת (Real-time Feedback) המאפשר לרופא המטפל לעקוב אחר טמפרטורת הרקמה בכל רגע נתון. טכנולוגיה זו מבטיחה דיוק מקסימלי: האנרגיה התרמית מועברת באופן מבוקר רק לשכבת ה-IAS, תוך מניעת חימום יתר של הרירית או השריר הרצוני. הניטור הדינמי מאפשר התאמה אישית של עוצמת הטיפול לכל מטופל (Personalized Medicine), דבר המגביר הן את הבטיחות והן את האפקטיביות הקלינית.`;

// 2. Define the detailed text for the Operating Principle (1470nm) card
const tech1470Text = `טכנולוגיית ALVIV מבוססת על אורך גל ייחודי של 1470nm, הנספג בצורה אופטימלית במים ובקולגן שברקמת היעד. בניגוד לטכנולוגיות אחרות, הטיפול אינו פולשני ואינו גורם להרס רקמתי (Non-ablative), אלא מעודד תהליכי התחדשות וחיזוק של סיבי הקולגן בשריר הסוגר הפנימי. הגישה הממוקדת מאפשרת טיפול מרפאתי קצר ללא צורך בהרדמה כללית או תקופת החלמה ממושכת.`;

// Find the monitoring card block and update it
// Searching for the specific placeholder comment or empty flex-div
const monitoringSearch = /<div style="flex:2;font-size:12px;color:var\(--text2\);line-height:1.6;">\s*<!-- TEXT GOES HERE -->\s*<\/div>\s*<img src="temp_docx\/word\/media\/image11\.png"/;
const monitoringReplace = `<div style="flex:2;font-size:12px;color:var(--text2);line-height:1.6;">
        ${monitoringText}
      </div>
      <img src="temp_docx/word/media/image8.png"`; // Swapping image11 with image8 (Monitoring Screen)

if (content.match(monitoringSearch)) {
    content = content.replace(monitoringSearch, monitoringReplace);
}

// Also ensure the Operating Principle card (likely preceding it) has its text
const techSearch = /<div style="font-size:14px;font-weight:600;color:var\(--navy\);margin-bottom:12px;border-bottom:1px solid #eee;padding-bottom:8px;">עקרון הפעולה — טכנולוגיית 1470nm<\/div>\s*<div style="display:flex;gap:12px;flex-direction:row-reverse;align-items:center;">\s*<div style="flex:2;font-size:12px;color:var\(--text2\);line-height:1.6;">\s*<!-- TEXT GOES HERE -->/;
const techReplace = `<div style="font-size:14px;font-weight:600;color:var(--navy);margin-bottom:12px;border-bottom:1px solid #eee;padding-bottom:8px;">עקרון הפעולה — טכנולוגיית 1470nm</div>
    <div style="display:flex;gap:12px;flex-direction:row-reverse;align-items:center;">
      <div style="flex:2;font-size:12px;color:var(--text2);line-height:1.6;">
        ${tech1470Text}`;

if (content.match(techSearch)) {
    content = content.replace(techSearch, techReplace);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully added clinical narratives to Operating Principle and Monitoring cards.');
