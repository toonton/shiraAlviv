const fs = require('fs');
const path = require('path');

const filePath = 'alviv_v9.html';
let content = fs.readFileSync(filePath, 'utf8');

// Identify the end of the Product tab content and the misplaced footer block
const misplacedStart = '      <div style="background:#D4F2E7;border-radius:8px;padding:12px;text-align:center;">\n        <div style="font-size:16px;margin-bottom:4px;">🛡️</div>';
const scriptStart = '<script>\n  function switchTab(id, btn) {';

// We'll replace everything from the first misplaced element (the histology summary icons)
// to the script tag, replacing it with just the footer and script.

const newFooterAndScript = `  <div class="footer">
    <span style="font-weight:700;color:var(--navy);letter-spacing:1px;">ALVIV</span>
    <span>© 2026 אלביב פתרונות לייזר בע"מ · סודי — לשימוש פנימי בלבד</span>
    <span>רשות החדשנות · IIA_SupReq_Track07_3.14.42</span>
  </div>
</div>
</div>
<script>
  function switchTab(id, btn) {`;

// The misplaced block starts with the histology icons that the user noted are appearing "in the footer".
const histologySummaryRegex = /<div style="display:grid;grid-template-columns:repeat\(4,1fr\);gap:12px;margin-top:20px;">[\s\S]+?<script>\s+function switchTab\(id, btn\) \{/;

content = content.replace(histologySummaryRegex, newFooterAndScript);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully removed misplaced histology summary from global footer area.');
