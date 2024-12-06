import { useGetUsersQuery } from "../../../types/graphql-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import BtnCrud from "../../../components/BtnCrud";
import { Box } from "@mui/material";
import BtnLink from "../../../components/BtnLink";

export default function ManageUser() {
  const { loading, error, data } = useGetUsersQuery();

  if (loading) return <p>🥁 Chargement...</p>;
  if (error) return <p>☠️ Erreur: {error.message}</p>;

  return (
    <div>
      <h1>Gestion des utilisateurs</h1>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>Left Element</div>
        <BtnLink
          to="/administrator/user/add"
          sx={{
            display: "inline-block",
            marginLeft: "auto",
            backgroundColor: "primary.main",
            padding: "8px 16px",
            color: "primary.contrastText",
            textTransform: "uppercase",
            borderRadius: "4px",
            textDecoration: "none",
            textAlign: "center",
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
              data.getUsers.map((user) => (
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
                        handleClick={() => null}
                        type={"edit"}
                      />
                      <BtnCrud
                        disabled={false}
                        handleClick={() => null}
                        type={"delete"}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
