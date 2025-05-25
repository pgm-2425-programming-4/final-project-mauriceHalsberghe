export function Pagination({ currentPage, pageCount, onPageChanged, pageSize, onPageSizeChanged }) {
  // https://bulma.io/documentation/components/pagination/

  const CreatePageButton = (i) => {
    return (
      <li key={i}>
      <button 
        className={`pagination-link ${currentPage === i ? 'is-current' : ''}`} 
        aria-label={`Go to page ${i}`}
        onClick={() => {onPageChanged(i)}} 
      >
        {i}
      </button>
    </li>
    )
  }

  const generate = () => {
    let pages = []
    
    if(pageCount <= 6) {
      for (let i = 1; i < pageCount+1; i++) {
        pages.push(CreatePageButton(i))
      }
    } else {
      if(currentPage < 4){
        for (let i = 1; i < 4+1; i++) {
          pages.push(CreatePageButton(i))
        }
        pages.push(<li key="dots-start"><span className="pagination-ellipsis">&hellip;</span></li>)
        pages.push(CreatePageButton(pageCount))
      } 
      else if(currentPage > pageCount-3){
        pages.push(CreatePageButton(1))
        pages.push(<li key="dots-end"><span className="pagination-ellipsis">&hellip;</span></li>)
        for (let i = pageCount-3; i < pageCount+1; i++) {
          pages.push(CreatePageButton(i))
        }
      } else {
        pages.push(CreatePageButton(1))
        pages.push(<li key="dots-start"><span className="pagination-ellipsis">&hellip;</span></li>)
        for (let i = currentPage-1; i < currentPage+2; i++) {
          pages.push(CreatePageButton(i))
        }
        pages.push(<li key="dots-end"><span className="pagination-ellipsis">&hellip;</span></li>)
        pages.push(CreatePageButton(pageCount))
      }
    }
    return pages
    }

  return (
    <>
      <nav className="pagination" role="navigation" aria-label="pagination">
        <div className="select">
          <select
            value={pageSize}
            onChange={(event) => {
              const selectedValue = event.target.value;
              const numericValue = Number(selectedValue);
              onPageSizeChanged(numericValue);
            }}
          >
            <option value={3}>3 items per page</option>
            <option value={5}>5 items per page</option>
            <option value={10}>10 items per page</option>
            <option value={15}>15 items per page</option>
          </select>

        </div>

        <button
          onClick={() => onPageChanged(currentPage - 1)}
          className="pagination-previous"
          disabled={currentPage === 1}
        >
          Previous page
        </button>

        <button
          onClick={() => onPageChanged(currentPage + 1)}
          className="pagination-next"
          disabled={currentPage === pageCount}
        >
          Next page
        </button>
        <ul className="pagination-list">{generate()}</ul>
      </nav>
    </>
  );
}