import React, { useEffect, useMemo } from "react";
import styles from "./ServerPagination.module.scss";

interface PaginationState {
  limit: number;
  pageState: [number, any];
  totalPage: number;
}
const Pagination = (props: PaginationState) => {
  const { limit, pageState, totalPage } = props;
  const [currentPage, setCurrentPage] = pageState;

  const pages = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      let start = 1;
      let end = limit;
      if (currentPage > limit) {
        start = currentPage - limit;
        end = currentPage;
      }
      if (i >= start && i <= end) {
        pages.push(
          <button
            key={i}
            className={currentPage === i ? styles["is-active"] : ""}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(i);
            }}
          >
            <li>{i}</li>
          </button>,
        );
      }
    }
    return pages;
  }, [currentPage, limit, setCurrentPage, totalPage]);

  if (totalPage === 0) return null;

  return (
    <ul className={styles.pagination}>
      {currentPage > 1 && (
        <button
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
        >
          <li>&lt;</li>
        </button>
      )}
      {pages}
      {currentPage !== totalPage && (
        <button
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          <li>&gt;</li>
        </button>
      )}
    </ul>
  );
};

export default Pagination;
