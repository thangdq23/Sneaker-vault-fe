import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps): React.JSX.Element | null => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: number[] = [];
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-1.5"
      aria-label="Phân trang"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || disabled}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant/30 text-on-surface transition hover:bg-surface-container disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
      >
        <span className="material-symbols-outlined text-lg">chevron_left</span>
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          disabled={disabled}
          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition cursor-pointer ${
            page === currentPage
              ? "bg-primary text-white shadow-md shadow-primary/10"
              : "border border-outline-variant/30 text-on-surface hover:bg-surface-container"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || disabled}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant/30 text-on-surface transition hover:bg-surface-container disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
      >
        <span className="material-symbols-outlined text-lg">chevron_right</span>
      </button>
    </nav>
  );
};

export default Pagination;
