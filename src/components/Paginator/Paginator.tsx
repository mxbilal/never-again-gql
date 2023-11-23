import React, { useState } from "react";

interface PaginatorProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (newPage: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageRange = 5;

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
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  return (
    <div className="flex items-center justify-center mt-4">
      {/* Previous button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
      >
        {"<"}
      </button>

      {/* Dynamic page buttons */}
      <div className="space-x-2">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() =>
              typeof page === "number" ? handlePageChange(page) : null
            }
            className={`px-4 py-2 ${
              page === currentPage
                ? "bg-blue-500 text-white rounded"
                : "bg-gray-200 text-gray-800 rounded hover:bg-blue-200 hover:text-white"
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
        className="px-4 py-2 bg-blue-500 text-white rounded ml-2"
      >
        {">"}
      </button>
    </div>
  );
};

export default Paginator;
