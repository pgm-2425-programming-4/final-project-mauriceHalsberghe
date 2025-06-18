export function Pagination({ currentPage, pageCount, onPageChanged, pageSize, onPageSizeChanged }) {

  const PageButton = (i) => {
    return (
      <li key={i} className="pagination__item">
      <button 
        className={`button ${currentPage === i ? 'is-current' : ''}`} 
        aria-label={`Go to page ${i}`}
        onClick={() => {onPageChanged(i)}} 
      >
        {i}
      </button>
    </li>
    )
  }

  const generatePageButtons = () => {
    let pages = []
    
    if(pageCount <= 6) {
      for (let i = 1; i < pageCount+1; i++) {
        pages.push(PageButton(i))
      }
    } else {
      if(currentPage < 4){
        for (let i = 1; i < 4+1; i++) {
          pages.push(PageButton(i))
        }
        pages.push(PageButton(pageCount))
      } 
      else if(currentPage > pageCount-3){
        pages.push(PageButton(1))
        for (let i = pageCount-3; i < pageCount+1; i++) {
          pages.push(PageButton(i))
        }
      } else {
        pages.push(PageButton(1))
        for (let i = currentPage-1; i < currentPage+2; i++) {
          pages.push(PageButton(i))
        }
        pages.push(PageButton(pageCount))
      }
    }
    return pages
    }

  return (
    <>
      <nav className="pagination" role="navigation" aria-label="pagination">
        <select
          className="button pagination__select"
          value={pageSize}
          onChange={(event) => {
            const selectedValue = event.target.value;
            const numericValue = Number(selectedValue);
            onPageSizeChanged(numericValue);
          }}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={15}>15 items per page</option>
          <option value={20}>20 items per page</option>
        </select>

        <ul className="pagination__list">{generatePageButtons()}</ul>

        <button
          onClick={() => onPageChanged(currentPage - 1)}
          className="button button--prev"
          disabled={currentPage === 1}
        >
          Previous page
        </button>

        <button
          onClick={() => onPageChanged(currentPage + 1)}
          className="button button--next"
          disabled={currentPage === pageCount}
        >
          Next page
        </button>
      </nav>
    </>
  );
}