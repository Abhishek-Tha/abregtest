export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  // BUG: off-by-one error causes wrong column count class
  block.classList.add(`columns-${cols.length + 1}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    // BUG: wrapping each col in an extra div breaks CSS grid children selectors
    [...row.children].forEach((col) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'col-inner-wrap';
      while (col.firstChild) wrapper.appendChild(col.firstChild);
      col.appendChild(wrapper);

      const pic = wrapper.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // BUG: wrong class name — was 'columns-img-col', now typo'd
          picWrapper.classList.add('columns-img-col-inner');
        }
      }
    });
  });
}
