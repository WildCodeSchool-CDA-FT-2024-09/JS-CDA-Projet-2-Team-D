import { useState } from "react";
import { useGetUsersQuery } from "../../../types/graphql-types";
import BtnLink from "../../../components/BtnLink";
import PageTitle from "../../../components/PageTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import UserRow from "../../../components/user/UserRow";
import BtnPagination from "../../../components/btnPagination/BtnPagination";

export default function ManageUser() {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const offset = (page - 1) * limit;

  const { loading, error, data } = useGetUsersQuery({
    variables: {
      limit: limit,
      offset: offset,
    },
  });

  // the event parameter is prefixed with _ to avoid the linter flag as event is not used here but is mandatory in the MUI Pagination component
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  if (loading) return <p>🥁 Chargement...</p>;
  if (error) return <p>☠️ Erreur: {error.message}</p>;

  const totalPages = Math.ceil((data?.getUsers?.totalCount || 0) / limit);

  return (
    <>
      <PageTitle title="Gestion des utilisateurs">
        <BtnLink
          to="/administrator/user/add"
          sx={{
            marginLeft: "auto",
            backgroundColor: "primary.main",
            padding: "6px 8px",
            color: "primary.contrastText",
            textTransform: "uppercase",
            borderRadius: "4px",
            textAlign: "center",
            fontSize: ".9em",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Ajouter un utilisateur
        </BtnLink>
      </PageTitle>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Tableau des utilisateurs">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Nom</TableCell>
              <TableCell align="left">Prénom</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.getUsers.users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  offset={offset}
                  limit={limit}
                />
              ))}
          </TableBody>
        </Table>
        <Stack
          spacing={2}
          sx={{
            marginBottom: "1em",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <BtnPagination
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </Stack>
      </TableContainer>
    </>
  );
}
