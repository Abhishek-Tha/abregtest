export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // BREAKING: force the entire block into a single narrow centered column
  block.style.cssText = 'display:flex !important; flex-direction:column !important; align-items:center !important; width:30% !important; margin:0 auto !important; border:3px solid red !important;';

  // BREAKING: collapse all row children to zero height except the first
  [...block.children].forEach((row, rowIdx) => {
    if (rowIdx > 0) {
      row.style.cssText = 'height:0 !important; overflow:hidden !important; visibility:hidden !important;';
    }

    [...row.children].forEach((col) => {
      // BREAKING: force each column to stack vertically and clip overflow
      col.style.cssText = 'max-width:100% !important; overflow:hidden !important; text-overflow:ellipsis !important; white-space:nowrap !important; background:#fdd !important;';

      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-img-col');
        }
        // BREAKING: shrink all images to 50px thumbnails
        const img = pic.querySelector('img');
        if (img) {
          img.style.cssText = 'width:50px !important; height:50px !important; object-fit:cover !important; filter:grayscale(1) !important;';
        }
      }

      // BREAKING: hide all headings inside columns
      col.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((h) => {
        h.style.display = 'none';
      });
    });
  });
}
