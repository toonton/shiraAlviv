const fs = require('fs');
const path = require('path');

const filesToUpdate = ['alviv_v9.html', 'index.html'];

filesToUpdate.forEach(fileName => {
    const filePath = path.join(__dirname, fileName);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Add Modal CSS
    const modalCSS = `
  /* ── IMAGE MODAL ── */
  .modal {
    display: none;
    position: fixed;
    z-index: 2000;
    padding-top: 60px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(11, 35, 64, 0.95);
    backdrop-filter: blur(5px);
    cursor: zoom-out;
  }
  .modal-content {
    margin: auto;
    display: block;
    max-width: 90%;
    max-height: 80vh;
    border-radius: 12px;
    box-shadow: 0 0 30px rgba(0,0,0,0.5);
    border: 2px solid rgba(255,255,255,0.1);
    animation: zoom 0.3s ease-out;
  }
  @keyframes zoom {
    from {transform:scale(0.8); opacity: 0;}
    to {transform:scale(1); opacity: 1;}
  }
  .close-modal {
    position: absolute;
    top: 20px;
    right: 35px;
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
    z-index: 2001;
  }
  .close-modal:hover { color: var(--cyan); }
  #caption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: #fff;
    padding: 20px 0;
    font-size: 16px;
    font-weight: 500;
  }
  .card img { cursor: zoom-in; transition: transform 0.2s; }
  .card img:hover { transform: scale(1.02); }
`;
    content = content.replace('</style>', modalCSS + '\n</style>');

    // 2. Add Modal HTML before </body>
    const modalHTML = `
<!-- IMAGE MODAL STRUCTURE -->
<div id="imageModal" class="modal" onclick="this.style.display='none'">
  <span class="close-modal">&times;</span>
  <img class="modal-content" id="imgTarget">
  <div id="caption"></div>
</div>
`;
    content = content.replace('</body>', modalHTML + '\n</body>');

    // 3. Add Modal JavaScript logic
    const modalJS = `
  function initModals() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgTarget");
    const captionText = document.getElementById("caption");

    document.querySelectorAll('.card img').forEach(img => {
      img.onclick = function(e) {
        e.stopPropagation();
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt || this.getAttribute('data-caption') || "";
      }
    });
  }
  
  // Call initialization after small delay to ensure DOM and images are ready
  setTimeout(initModals, 100);
`;
    content = content.replace('</script>', modalJS + '\n</script>');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully added Image Modal to ${fileName}`);
});
