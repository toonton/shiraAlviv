const fs = require('fs');
const path = require('path');

const filesToUpdate = ['alviv_v9.html', 'index.html'];

filesToUpdate.forEach(fileName => {
    const filePath = path.join(__dirname, fileName);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Enhanced Responsive CSS
    const responsiveCSS = `
  /* ── ENHANCED RESPONSIVENESS ── */
  :root {
    --container-width: 1120px;
  }

  .page { 
    max-width: var(--container-width); 
    width: 100%;
    padding: 20px; 
  }

  /* Improved Grid System */
  .grid2, .grid3, .tasks-grid, .market-kpi-strip, .pillars-grid, .challenge-grid, .market-grid {
    display: grid;
    gap: 16px;
    width: 100%;
  }

  .grid2 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
  .grid3 { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
  .tasks-grid { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }
  .pillars-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
  .challenge-grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
  .market-grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
  .market-kpi-strip { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }

  /* Ensure images don't overflow */
  img { max-width: 100%; height: auto; object-fit: contain; }

  /* Responsive Tables */
  .vs-table-wrap { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .vs-table { min-width: 600px; }

  /* Tab Bar Mobile Fix */
  .tabs-bar {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    scrollbar-width: none; /* Firefox */
  }
  .tabs-bar::-webkit-scrollbar { display: none; } /* Chrome/Safari */
  .tab-btn { flex-shrink: 0; }

  /* Breakpoints */
  @media (max-width: 1024px) {
    .page { padding: 15px; }
    .hero { padding: 20px; }
    .hero-title { font-size: 18px; }
  }

  @media (max-width: 768px) {
    .topbar { padding: 0 15px; height: auto; padding-top: 10px; padding-bottom: 10px; flex-direction: column; gap: 10px; text-align: center; }
    .topbar-right { justify-content: center; width: 100%; }
    .tabs-bar { top: 0; position: relative; } /* Sticky tabs can be annoying on very small screens */
    .hero { flex-direction: column; text-align: center; }
    .hero-badge { margin-top: 15px; align-self: center; }
    .kpi-strip { grid-template-columns: 1fr 1fr; }
    
    /* Histology Side-by-Side fix */
    .card div[style*="grid-template-columns:1fr 1fr"] {
      grid-template-columns: 1fr !important;
    }
    
    /* Professional Team Grid */
    .card div[style*="grid-template-columns:repeat(3,1fr)"] {
      grid-template-columns: 1fr !important;
    }
  }

  @media (max-width: 480px) {
    .kpi-strip { grid-template-columns: 1fr; }
    .hero-title { font-size: 16px; }
    .kpi-value { font-size: 18px; }
    .card { padding: 15px; }
  }
`;

    // Replace the old simple media query or inject after existing styles
    if (content.includes('/* ── ENHANCED RESPONSIVENESS ── */')) {
        console.log(`${fileName} already has enhanced responsiveness.`);
        return;
    }

    content = content.replace('</style>', responsiveCSS + '\n</style>');

    // Wrap tables in responsive div
    content = content.replace(/<table class="vs-table">/g, '<div class="vs-table-wrap"><table class="vs-table">');
    content = content.replace(/<\/table>/g, '</table></div>');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully enhanced responsiveness for ${fileName}`);
});
