import Pagination from "@mui/material/Pagination";

type BtnPaginationType = {
  page: number;
  totalPages: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

function BtnPagination({
  page,
  totalPages,
  handlePageChange,
}: BtnPaginationType) {
  if (totalPages === 1 || totalPages === 0) {
    return null;
  }
  return (
    <>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
      />
    </>
  );
}

export default BtnPagination;
