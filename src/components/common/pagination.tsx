import React, { useMemo } from 'react';

interface Props {
  currentPage: number;
  lastPage: number;
  onChangePage: (page: number) => void;
}

const pageSize = 10;

export default function Pagination({ currentPage, lastPage, onChangePage }: Props) {
  const visiblePages = useMemo(() => {
    const startPage = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
    const endPage = Math.min(startPage + pageSize - 1, lastPage);
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }, [currentPage, lastPage]);

  const startPage = visiblePages[0];
  const endPage = visiblePages[visiblePages.length - 1];

  const changePage = (page: number) => {
    if (page < 1 || page > lastPage) return;
    onChangePage(page);
  };

  const canGoPrevGroup = startPage > 1;
  const canGoNextGroup = endPage < lastPage;

  return (
    <div className="pagination">
      <span
        className={`icon first${currentPage === 1 ? ' disabled' : ''}`}
        onClick={() => currentPage !== 1 && changePage(1)}
      >
        &#xf100;
      </span>

      <span
        className={`icon pre${!canGoPrevGroup ? ' disabled' : ''}`}
        onClick={() => canGoPrevGroup && changePage(startPage - pageSize)}
      >
        &#xf104;
      </span>

      {visiblePages.map((page) => (
        <span
          key={page}
          onClick={() => changePage(page)}
          className={`page${page === currentPage ? ' active' : ''}`}
        >
          {page}
        </span>
      ))}

      <span
        className={`icon next${!canGoNextGroup ? ' disabled' : ''}`}
        onClick={() => canGoNextGroup && changePage(endPage + 1)}
      >
        &#xf105;
      </span>

      <span
        className={`icon last${currentPage === lastPage ? ' disabled' : ''}`}
        onClick={() => currentPage !== lastPage && changePage(lastPage)}
      >
        &#xf101;
      </span>
    </div>
  );
}
