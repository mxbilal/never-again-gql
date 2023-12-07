import React, { useState } from "react";
import mpTracker from '../../lib/mixpanel';

interface PaginatorProps {
  pageName: string;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (newPage: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  pageName,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageRange = 3;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    const endPage = Math.min(totalPages, startPage + pageRange - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (startPage > 1) {
      pageNumbers.unshift("...");
    }

    if (endPage < totalPages) {
      pageNumbers.push("...");
    }

    return pageNumbers;
  };

  const handlePageChange = (newPage: number) => {
    mpTracker.track(pageName + ' - Paginator - Page Change');
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  return (
    <div className="flex items-center justify-center text-center">
      <p className="text-sm md:text-base">{totalItems} items</p>
      {/* Previous button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="ml-1 md:ml-2 px-2 sm:px-4 py-2 bg-neverLime text-neverDark rounded mr-2"
      >
        {"<"}
      </button>

      {/* Dynamic page buttons */}
      <div className="space-x-1 sm:space-x-2">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() =>
              typeof page === "number" ? handlePageChange(page) : null
            }
            className={`px-2 sm:px-4 py-2 ${
              page === currentPage
                ? "bg-neverLime text-neverDark rounded"
                : "bg-gray-200 text-neverDark rounded hover:bg-neverDark hover:text-neverLime"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 sm:px-4 py-2 bg-neverLime text-neverDark rounded ml-2"
      >
        {">"}
      </button>
    </div>
  );
};

export default Paginator;
