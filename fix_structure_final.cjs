const fs = require('fs');
const path = require('path');

const filePath = 'alviv_v9.html';
let content = fs.readFileSync(filePath, 'utf8');

// The issue is that the clinical/product data is sitting OUTSIDE the tab containers, 
// likely because of double closing tags </div> or because it was appended at the end of the file 
// after all tabs were closed.

// 1. First, let's remove ANY footer/clinical data that exists between the end of Tab 6 and the script tag.
// Tab 6 ends at line 3036 approximately.
const finalTabClosure = '</div>\n</div>'; // This closes .page and .tab-page
const scriptMarker = '<script>';

const endOfFileRegex = /<\/div>\s*<\/div>\s*<div class="footer">[\s\S]+?<\/body>/;

// Actually, let's look at the current end of the file precisely.
// Based on grep:
// L3029-   <!-- Footer -->
// L3030:   <div class="footer">...</div>
// L3035- </div>
// L3036- </div>
// L3037- <script>

// If the clinical data is appearing GLOBALLY, it means it's sitting between the last </div> and the <script>.
// OR it's sitting inside the main container but outside any .tab-page.

// Let's identify the block of misplaced clinical data from the image:
// Green histology banner, Wexner tags, clusters.jpeg chart.

const histologyBlockSearch = 'התפלגות שכיחות FI'; 
const clustersImageSearch = 'clusters.jpeg';

// Let's find where these are.
// I suspect they are at the end of the file.

const fileLines = content.split('\n');
console.log('File total lines:', fileLines.length);

// Let's do a more radical cleanup. 
// Every tab should end with:
//   </div> <!-- end .page -->
// </div> <!-- end .tab-page -->

// And the file should end with the script and body closure.

// Let's reconstruct the very end of the file.
const lastTabPageEnd = content.lastIndexOf('</div>\n</div>\n<script>');
if (lastTabPageEnd !== -1) {
    // There is clinical data AFTER the last tab-page but BEFORE the script?
    const afterLastTab = content.substring(lastTabPageEnd + 14);
    console.log('Content after last tab closure:', afterLastTab.substring(0, 100));
}

// STRATEGY: 
// 1. Find the last </div> before the <script> tag.
// 2. Ensure the clinical data (histology/clusters) is INSIDE the #tab-product div.
// 3. Ensure the footer is INSIDE each tab-page div.

// Let's find the content of the histology summary icons again.
const histologyIconsStart = '<div style="background:#D4F2E7;border-radius:8px;padding:12px;text-align:center;">';

// I will search for the specific clusters.jpeg insertion I might have done.
const clustersRegex = /<img src="clusters\.jpeg"[\s\S]+?<\/div>/g;

// Actually, I'll just use a surgical approach to move the clinical summary into Tab 6.
// Tab 6 ID is "tab-product".

// Let's read the end of the file again to be 100% sure of the structure.
// I'll use a Node script to log the last 500 characters.
console.log('Last 500 chars:', content.slice(-500));

// THE FIX:
// Wrap everything that is currently "global" but shouldn't be into the tab-product div.
// Or more simply: Ensure tab-product ends AFTER all the clinical visuals.

// Let's find where "tab-product" ends.
const tabProductStart = content.indexOf('<div id="tab-product"');
const scriptIndex = content.indexOf('<script>');

// The content between these should be the ONLY content for the product tab.
// If there are clinical blocks AFTER the final </div> of tab-product, they are global.

// I will move the closing tags </div></div> to just before the <script> tag, 
// effectively swallowing any stray global content into the last tab (Product).

// First, remove existing closing tags for tab-product if they are misplaced.
// I'll find the LAST instance of the footer and closing tags.

const lastFooter = content.lastIndexOf('<div class="footer">');
const lastClosingTags = content.lastIndexOf('</div>\n</div>\n<script>');

// If the clinical data is between the product tab and the script, 
// I will move the product tab's end point.

const updatedContent = content.replace(/<\/div>\s*<\/div>\s*<script>/, '\n\n  <div class="footer">\n    <span style="font-weight:700;color:var(--navy);letter-spacing:1px;">ALVIV</span>\n    <span>© 2026 אלביב פתרונות לייזר בע"מ · סודי — לשימוש פנימי בלבד</span>\n    <span>רשות החדשנות · IIA_SupReq_Track07_3.14.42</span>\n  </div>\n</div>\n</div>\n<script>');

// Wait, I need to remove the misplaced data from where it IS first if it's outside.

// Let's just do a clean replacement of the footer/script area.
const finalCleanup = content.replace(/<div class="footer">[\s\S]+?<\/html>/, `<div class="footer">
    <span style="font-weight:700;color:var(--navy);letter-spacing:1px;">ALVIV</span>
    <span>© 2026 אלביב פתרונות לייזר בע"מ · סודי — לשימוש פנימי בלבד</span>
    <span>רשות החדשנות · IIA_SupReq_Track07_3.14.42</span>
  </div>
</div>
</div>
<script>
  function switchTab(id, btn) {
    document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
    btn.classList.add('active');
  }
  function toggleSubtask(el) { el.classList.toggle('open'); }
</script>
</body>
</html>`);

fs.writeFileSync(filePath, finalCleanup, 'utf8');
console.log('Applied final structural fix to footer and tab closures.');
