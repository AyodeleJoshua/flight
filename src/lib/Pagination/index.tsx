import { useState } from 'react';
import styles from './pagination.module.css';

interface PaginationProps {
  defaultSelectedPageSize?: number;
  pageSizeOptions?: number[];
  currentPage: number;
  onPaginationChange: (pageSize: number, newPage: number) => void;
}

function Pagination({
  defaultSelectedPageSize,
  pageSizeOptions = [10, 20, 50],
  currentPage,
  onPaginationChange,
}: PaginationProps) {
  const [page, setPage] = useState(currentPage);
  const [pageSize, setPageSize] = useState(defaultSelectedPageSize || 10);

  const handlePaginationChange = (actionType: 'increment' | 'decrement') => {
    let newPageNumber = page;

    if (actionType === 'increment') {
      newPageNumber += 1;
    } else {
      newPageNumber -= 1;
    }

    setPage(newPageNumber);
    onPaginationChange(pageSize, newPageNumber);
  };

  return (
    <div className={styles.paginationContainer}>
      {page >= 1 && (
        <button
          className={`${styles.actionButton} ${styles.prevButton}`}
          onClick={() => handlePaginationChange('decrement')}
          aria-disabled={page < 1}
          disabled={page < 1}
          data-testid="previous-button"
          type="button"
        >
          Previous
        </button>
      )}

      <select
        name="pagesize"
        className={styles.pageSizeDropdown}
        onChange={(e) => {
          setPageSize(Number(e.currentTarget.value));
          onPaginationChange(Number(e.currentTarget.value), page);
        }}
      >
        {pageSizeOptions.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button
        onClick={() => handlePaginationChange('increment')}
        data-testid="next-button"
        className={`${styles.actionButton} ${styles.incrementButton}`}
        type="button"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
