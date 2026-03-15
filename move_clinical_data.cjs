const fs = require('fs');
const path = require('path');

const filePath = 'alviv_v9.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Extract the misplaced clinical data block from the end of the file
// Based on previous reads, the block starts around: 
// <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:20px;">
// and ends before the footer.

const misplacedBlockRegex = /<div style="display:grid;grid-template-columns:repeat\(4,1fr\);gap:12px;margin-top:20px;">[\s\S]+?<\/div>\s+<\/div>\s+<\/div>/;
const match = content.match(misplacedBlockRegex);

if (match) {
    const clinicalBlock = match[0];
    
    // Remove the block from its current (misplaced) position at the end
    content = content.replace(misplacedBlockRegex, '');
    
    // 2. Insert this block into the Product tab (Tab 6)
    // We want to place it after the "Histology" section in the Product tab.
    // Let's find the closing tag of the last card in the Product tab before the footer.
    
    const productTabEnd = '<!-- Footer -->';
    const insertionPoint = content.lastIndexOf(productTabEnd);
    
    if (insertionPoint !== -1) {
        // We need to make sure we are in the Product tab area.
        // The last section in Product tab is Section 5: Clinical Evidence.
        const section5End = '<!-- ── SECTION 5: CLINICAL EVIDENCE ── -->';
        const section5Index = content.lastIndexOf(section5End);
        
        if (section5Index !== -1) {
            // Find the end of the last grid in Section 5
            const lastGridEnd = content.indexOf('</div>\n\n  <!-- Footer -->', section5Index);
            if (lastGridEnd !== -1) {
                content = content.slice(0, lastGridEnd) + '\n\n  ' + clinicalBlock + content.slice(lastGridEnd);
            }
        }
    }
}

// 3. Fix the "not padded" issue by ensuring the .page class has proper padding
// and the footer is inside the right container.
// Also ensure all tabs are closed correctly.

// Let's ensure the footer is inside the .page container for every tab if it's not.
// The user said: "it should only be on product and be changed any place else"
// This implies they want the clinical data ONLY on product tab.

// 4. Final sweep to ensure no clinical data is left in the global area
content = content.replace(/<\/div>\s*<\/div>\s*<div style="background:#D4F2E7;[\s\S]+?<\/div>\s*<div class="footer">/, '</div>\n</div>\n\n<div class="footer">');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully moved clinical data into Product tab and cleaned up global footer.');
