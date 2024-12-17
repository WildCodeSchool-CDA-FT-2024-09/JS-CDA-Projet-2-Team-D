import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetUsersQuery,
  useSoftDeleteUserMutation,
  GetUsersDocument,
} from "../../../types/graphql-types";
import useNotification from "../../../hooks/useNotification";
import BtnCrud from "../../../components/BtnCrud";
import BtnLink from "../../../components/BtnLink";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

export default function ManageUser() {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const offset = (page - 1) * limit;

  const navigate = useNavigate();

  // User feedback
  const { notifySuccess, notifyError } = useNotification();

  const { loading, error, data } = useGetUsersQuery({
    variables: {
      limit: limit,
      offset: offset,
    },
  });

  const [softDeleteUserMutation] = useSoftDeleteUserMutation();

  // the event parameter is prefixed with _ to avoid the linter flag as event is not used here but is mandatory in the MUI Pagination component
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleSoftDeleteUser = async (userId: number) => {
    try {
      await softDeleteUserMutation({
        variables: {
          data: { id: userId },
        },
        refetchQueries: [{ query: GetUsersDocument }],
      });

      notifySuccess("Utilisateur désactivé avec succès");
    } catch (error) {
      notifyError("Erreur lors de la désactivation de l'utilisateur");
      console.error("Erreur lors de la désactivation de l'utilisateur", error);
    }
  };

  const handleEditUser = (userId: number) => {
    navigate(`/administrator/user/edit/${userId}`);
  };

  if (loading) return <p>🥁 Chargement...</p>;
  if (error) return <p>☠️ Erreur: {error.message}</p>;

  const totalPages = Math.ceil((data?.getUsers?.totalCount || 0) / limit);

  return (
    <div>
      <h1>Gestion des utilisateurs</h1>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
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
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Tableau des utilisateurs">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Nom</TableCell>
              <TableCell align="left">Prénom</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.getUsers.users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="left">{user.firstname}</TableCell>
                  <TableCell align="left">{user.lastname}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">
                    <Stack spacing={2} direction="row">
                      <BtnCrud
                        disabled={false}
                        handleClick={() => handleEditUser(user.id)}
                        type={"edit"}
                      />
                      {user.deletedAt === null ? (
                        <BtnCrud
                          disabled={false}
                          handleClick={() => handleSoftDeleteUser(user.id)}
                          type={"disable"}
                        />
                      ) : (
                        <BtnCrud
                          disabled={false}
                          handleClick={() => null}
                          type={"enable"}
                        />
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
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
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Stack>
      </TableContainer>
    </div>
  );
}
