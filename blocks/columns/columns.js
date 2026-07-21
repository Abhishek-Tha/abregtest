export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  // BUG 1: off-by-one error causes wrong column count class
  block.classList.add(`columns-${cols.length + 1}-cols`);

  // BUG 2: force all columns to a fixed inline width, overriding flex layout
  block.style.display = 'block';
  block.style.width = '40%';
  block.style.margin = '0 auto';
  block.style.border = '4px solid red'; // visually obvious regression marker

  // setup image columns
  [...block.children].forEach((row) => {
    // BUG 3: wrapping each col in an extra div breaks CSS grid/flex direct-child selectors
    [...row.children].forEach((col) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'col-inner-wrap';
      while (col.firstChild) wrapper.appendChild(col.firstChild);
      col.appendChild(wrapper);

      // BUG 4: hide every other column entirely + rotate odd columns
      const allCols = [...row.children];
      allCols.forEach((c, i) => {
        if (i % 2 !== 0) {
          c.style.display = 'none';
        } else {
          c.style.transform = 'rotate(2deg)'; // tilts columns — obvious visual diff
          c.style.background = '#ffe0e0';
        }
      });

      const pic = wrapper.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // BUG 5: wrong class name — was 'columns-img-col', now typo'd
          picWrapper.classList.add('columns-img-col-inner');
        }
        // BUG 6: force image to tiny thumbnail size
        const img = pic.querySelector('img');
        if (img) {
          img.style.width = '80px';
          img.style.height = '80px';
          img.style.objectFit = 'cover';
        }
      }
    });

    // BUG 7: remove all text content from non-image columns + invert colors
    [...row.children].forEach((col) => {
      const hasPic = col.querySelector('picture');
      if (!hasPic) {
        col.querySelectorAll('p, h1, h2, h3, h4, h5, h6, ul, ol, a').forEach((el) => {
          el.style.visibility = 'hidden';
        });
        col.style.filter = 'invert(1)'; // inverts text column colors
      }
    });
  });
}
