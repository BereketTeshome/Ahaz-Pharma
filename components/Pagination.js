import React from "react";
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@nextui-org/pagination";

const Paginate = ({ total, postPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(total / postPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Pagination
      total={totalPages}
      initialPage={currentPage}
      onPageChange={handlePageChange}
      render={(props) => (
        <>
          {props.items.map((item, index) =>
            item.type === "PAGE" ? (
              <PaginationItem
                key={index}
                onSelect={() => handlePageChange(item.page)}
                active={item.page === currentPage}
              >
                {item.page}
              </PaginationItem>
            ) : (
              <PaginationCursor key={index} {...item} />
            )
          )}
        </>
      )}
    />
  );
};

export default Paginate;
