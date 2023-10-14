import React, { useEffect, useState } from "react";
import {
  BiChevronRight,
  BiChevronLeft,
  BiChevronsRight,
  BiChevronsLeft,
} from "react-icons/bi";

function Pagination({ pages = 10, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage === pages) return;
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  };

  const handleLastPage = () => {
    if (currentPage === pages) return;
    setCurrentPage(pages);
  };

  const handleFirstPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(1);
  };

  const numbers = Array.from({ length: pages }, (_, index) => index + 1);
  return (
    <div className="flex flex-row items-center">
      <span
        className="hover:text-red-300 cursor-pointer"
        onClick={handleFirstPage}
      >
        <BiChevronsLeft />
      </span>
      <span
        className="hover:text-red-300 cursor-pointer"
        onClick={handlePreviousPage}
      >
        <BiChevronLeft />
      </span>
      <section className="flex flex-row cursor-pointer">
        {numbers.map((number) => (
          <div
            className={`p-2 hover:text-red-300 ${
              number === currentPage ? "text-red-300" : ""
            }`}
            onClick={() => handlePageChange(number)}
            key={number}
          >
            {number}
          </div>
        ))}
      </section>
      <span
        className="hover:text-red-300 cursor-pointer"
        onClick={handleNextPage}
      >
        <BiChevronRight />
      </span>
      <span
        className="hover:text-red-300 cursor-pointer"
        onClick={handleLastPage}
      >
        <BiChevronsRight />
      </span>
    </div>
  );
}

export default Pagination;
