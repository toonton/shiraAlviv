const fs = require('fs');
const path = require('path');

const filesToUpdate = ['alviv_v9.html', 'index.html'];

filesToUpdate.forEach(fileName => {
    const filePath = path.join(__dirname, fileName);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Add Source of Truth & Privacy Note at the top of Budget Tab
    const budgetHeroSearch = `<div class="hero-badge-top">₪8,163,649</div>`;
    const complianceNotes = `
  <div style="background:#FFF9E6; border:1px solid #FFE58F; border-radius:8px; padding:12px; margin-bottom:22px; font-size:11px; color:#856404; line-height:1.6;">
    <strong>דגשים להקרנה (רשות החדשנות):</strong>
    <ul style="margin:5px 0 0 18px; padding:0;">
      <li>המעבר על התקציב והבירורים המעמיקים יבוצעו על גבי קובץ ה-Excel המקורי שהוגש.</li>
      <li>ניתן להסתיר נתוני שכר בפועל בעת ההקרנה או לצמצם משתתפים לשימור פרטיות.</li>
      <li>כל סעיפי התקציב מנומקים מבחינת צורך, כמויות ועלות בהתאם לאבני הדרך של התוכנית.</li>
    </ul>
  </div>
`;
    content = content.replace('<div class="section-label">ריכוז סעיפי תקציב</div>', complianceNotes + '\n  <div class="section-label">ריכוז סעיפי תקציב</div>');

    // 2. Add justifications for Subcontractors Abroad
    const abroadJustification = `
      <div style="margin-top:10px; background:#F0F7FF; border:1px solid #BAE7FF; border-radius:8px; padding:10px; font-size:10.5px; color:#0050B3;">
        <strong>הצדקת קב"מ חו"ל:</strong> הצורך ב-MGH Boston נובע מהמומחיות הייחודית של המרכז ב-Gastroenterology וגישה ל-KOLs עולמיים הנדרשים לתיקוף קליני עבור ה-FDA, דבר שאינו ניתן להחלפה מלאה ע"י מרכזים מקומיים בלבד בשלב זה.
      </div>
`;
    content = content.replace('<tr class="total-row">\n            <td colspan="2">סה"כ קבלני משנה חו"ל</td>', abroadJustification + '\n          <tr class="total-row">\n            <td colspan="2">סה"כ קבלני משנה חו"ל');

    // 3. Add Material Calculation Note
    const materialNote = `
      <div style="margin-top:10px; font-size:10px; color:var(--text3); line-height:1.4;">
        * חישוב חומרים מבוסס על אומדן ייצור של 3,500 יחידות Handpiece ו-30 יחידות Control Unit עבור הניסוי הקליני וביצוע V&V, כולל פחת צפוי ורכיבים אלקטרוניים ייעודיים.
      </div>
`;
    content = content.replace('<tr class="total-row">\n            <td colspan="4">סה"כ חומרים</td>', materialNote + '\n          <tr class="total-row">\n            <td colspan="4">סה"כ חומרים');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully applied IIA budget compliance updates to ${fileName}`);
});
