import ReactPaginate from "react-paginate";

const Pagination = (parentProps) => {
  const PaginatedItems = (config) => {
    const pageCount = Math.ceil(config.itemsTotalNums / config.itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset =
        (event.selected * config.itemsPerPage) % config.itemsTotalNums;
      parentProps.handleGetItems({ offset: newOffset, page: event.selected });
    };

    return (
      <>
        <ReactPaginate
          breakLabel="..."
          nextLabel="次へ"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          forcePage={parentProps.page}
          pageCount={pageCount}
          previousLabel="前へ"
          containerClassName="inline-flex -space-x-px text-base h-10"
          previousClassName="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          nextClassName="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          pageLinkClassName="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          activeLinkClassName="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          renderOnZeroPageCount={null}
        />
      </>
    );
  };

  return parentProps.totalCount > 0 ? (
    <nav aria-label="Page navigation" className="text-center">
      {
        <PaginatedItems
          itemsTotalNums={parentProps.totalCount}
          itemsPerPage={parentProps.perPage}
        />
      }
    </nav>
  ) : (
    <div>存在しません。</div>
  );
};

export default Pagination;
