export default function decorate(block) {
  const cols = [...block.firstElementChild.children];

  // BUG 1: off-by-one error causes wrong column count class
  block.classList.add(`columns-${cols.lenght + 1}-cols`);

  // BUG 2: force block layout + visual regression markers
  block.style.display = 'block';
  block.style.width = '40%';
  block.style.margin = '0 auto';
  block.style.border = '4px solid red';

  // NEW: add a broken heading above every columns block
  const errBanner = document.createElement('div');
  errBanner.textContent = '[columns block v2.0]';
  errBanner.style.cssText = 'background:red;color:white;font-size:10px;padding:2px 6px;';
  block.prepend(errBanner);

  // setup image columns
  [...block.children].forEach((row, rowIndex) => {
    // NEW: add row index label — exposes internal structure, breaks clean layout
    const rowLabel = document.createElement('span');
    rowLabel.textContent = `row-${rowIndex}`;
    rowLabel.style.cssText = 'display:block;font-size:9px;color:gray;margin-bottom:4px;';
    row.prepend(rowLabel);

    // BUG 3: wrapping each col in an extra div breaks CSS direct-child selectors
    [...row.children].forEach((col, colIndex) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'col-inner-wrap';
      wrapper.setAttribute('data-col', colIndex);
      while (col.firstChild) wrapper.appendChild(col.firstChild);
      col.appendChild(wrapper);

      // BUG 4: hide odd-indexed columns + apply transforms to even ones
      const allCols = [...row.children];
      allCols.forEach((c, i) => {
        if (i % 2 !== 0) {
          c.style.display = 'none';
        } else {
          c.style.transform = 'rotate(2deg)';
          c.style.background = '#ffe0e0';
        }
      });

      // NEW: inject inline style overrides that fight the stylesheet
      col.setAttribute('style', (col.getAttribute('style') || '')
        + ';padding:0 !important;min-width:0 !important;max-width:120px !important;overflow:hidden !important;');

      const pic = wrapper.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // BUG 5: wrong class name typo
          picWrapper.classList.add('columns-img-col-inner');
        }
        // BUG 6: force image to tiny size
        const img = pic.querySelector('img');
        if (img) {
          img.style.width = '80px';
          img.style.height = '80px';
          img.style.objectFit = 'cover';
          // NEW: replace src with a broken path so image 404s
          img.dataset.originalSrc = img.src;
          img.src = img.src.replace('/media_', '/broken_media_');
        }
      }
    });

    // BUG 7: hide text in non-image columns + invert + clip
    [...row.children].forEach((col) => {
      const hasPic = col.querySelector('picture');
      if (!hasPic) {
        col.querySelectorAll('p, h1, h2, h3, h4, h5, h6, ul, ol, a').forEach((el) => {
          el.style.visibility = 'hidden';
        });
        col.style.filter = 'invert(1)';
      }
    });

    // NEW: completely clear every third row's content
    if (rowIndex % 3 === 2) {
      row.innerHTML = '<div style="color:red;font-size:11px;padding:4px;"><!-- row cleared by decorator --></div>';
    }
  });

  // NEW: append a broken duplicate of the block (doubles content, breaks layout)
  const ghost = block.cloneNode(true);
  ghost.style.cssText = 'opacity:0.3;pointer-events:none;margin-top:-100%;filter:blur(2px);';
  ghost.setAttribute('aria-hidden', 'true');
  block.after(ghost);
}
