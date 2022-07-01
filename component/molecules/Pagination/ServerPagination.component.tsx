import React, { useEffect, useMemo } from "react";
import styles from "./ServerPagination.module.scss";

interface PaginationState {
  pageState: [number, any];
  totalPage: number;
}
const Pagination = (props: PaginationState) => {
  const { pageState, totalPage } = props;
  const [currentPage, setCurrentPage] = pageState;

  const pages = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
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
    return pages;
  }, [currentPage, setCurrentPage, totalPage]);

  if (totalPage === 0) return null;

  return (
    <ul className={styles.pagination}>
      <button>
        <li>&lt;</li>
      </button>
      {pages}
      <button>
        <li>&gt;</li>
      </button>
    </ul>
  );
};

export default Pagination;
