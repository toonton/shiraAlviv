const fs = require('fs');
const path = require('path');

const filePath = 'alviv_v9.html';
let content = fs.readFileSync(filePath, 'utf8');

// The issue: In Tab 1 (Team), after the Professional Team section, 
// there's a block of code (grid3, grid2, footer) that shouldn't be there 
// because those sections (R&D Tasks, Clinical Achievements, Revenue) 
// are already present in other tabs.

const startMarker = '<!-- Advisory / Partners row -->';
const endOfTab1Marker = '<!-- ── TAB 2 ── -->'; // Assuming a marker like this exists or finding the tab closure

// Based on the read_file output, the misplaced content starts around line 821 and ends at line 904.
// Let's target the specific grids that were accidentally appended in refactor_team.cjs.

const misplacedSectionStart = '  </div>\n\n  <div class="grid3">';
const misplacedSectionEnd = '  <div class="footer">\n    <span style="font-weight:700;color:var(--navy);letter-spacing:1px;">ALVIV</span>\n    <span>© 2026 אלביב פתרונות לייזר בע"מ · סודי — לשימוש פנימי בלבד</span>\n    <span>רשות החדשנות · IIA_SupReq_Track07_3.14.42</span>\n  </div>\n </div>\n </div>';

// We need to be careful with the exact string.
// Let's use a regex to find the grid3/grid2/footer block specifically inside the first tab.

const misplacedRegex = /<!-- Advisory \/ Partners row -->[\s\S]+?<div class="grid3">[\s\S]+?<\/div>[\s\S]+?<div class="grid2">[\s\S]+?<\/div>[\s\S]+?<div class="footer">[\s\S]+?<\/div>\s+<\/div>\s+<\/div>/;

// Actually, let's look at the structure more simply.
// In refactor_team.cjs, I appended:
// `\n\n    <!-- Advisory / Partners row -->`
// But the original file already had content after that marker.

// Let's find the first occurrence of the footer in the first tab and see what's before it.
// The first tab should end with the Advisory row and then close its containers.

const fixedTab1Closure = `    <!-- Advisory / Partners row -->
    <div style="margin-top:14px;padding:12px 14px;background:var(--off);border:1px solid var(--border);border-radius:8px;">
      <div style="font-size:10px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">יועצים ושותפים מקצועיים</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        <span class="chip">יונתן הררי · IP</span>
        <span class="chip">גרא קשטן · סקר פטנטים</span>
        <span class="chip">Hogan Lovells · ייעוץ משפטי FDA</span>
        <span class="chip">NeoLaser · ספק לייזר</span>
        <span class="chip">Adler Medical · הפצה ישראל</span>
        <span class="chip">Coloplast DK · שותף אסטרטגי</span>
        <span class="chip">Erbe USA · שותף ארה"ב</span>
        <span class="chip">MGH Boston · מרכז מחקר</span>
        <span class="chip">LSI Clean Room · ייצור</span>
        <span class="chip">Meron Capital · מימון</span>
        <span class="chip">GCA Israel · השקעות</span>
        <span class="chip">NIT Israel · טכנולוגיה</span>
      </div>
    </div>
  </div>

  <div class="footer">
    <span style="font-weight:700;color:var(--navy);letter-spacing:1px;">ALVIV</span>
    <span>© 2026 אלביב פתרונות לייזר בע"מ · סודי — לשימוש פנימי בלבד</span>
    <span>רשות החדשנות · IIA_SupReq_Track07_3.14.42</span>
  </div>
</div>
</div>`;

// Regex to catch the duplicated/misplaced content block
const cleanupRegex = /<!-- Advisory \/ Partners row -->[\s\S]+?<!-- ══════════════════════════════════════════════\s+TAB 2/;

const newTab1Section = fixedTab1Closure + '\n\n<!-- ══════════════════════════════════════════════\n     TAB 2';

content = content.replace(cleanupRegex, newTab1Section);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully cleaned up misplaced footer content in Tab 1.');
