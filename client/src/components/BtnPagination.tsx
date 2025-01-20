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
