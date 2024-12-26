// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   useGetUsersQuery,
//   useSoftDeleteUserMutation,
//   GetUsersDocument,
//   useRestoreUserMutation,
// } from "../../../types/graphql-types";
// import useNotification from "../../../hooks/useNotification";
// import BtnCrud from "../../../components/BtnCrud";
import BtnLink from "../../../components/BtnLink";
import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export default function ManageExercise() {
  // const navigate = useNavigate();

  // User feedback
  // const { notifySuccess, notifyError } = useNotification();

  // const { loading, error, data } = useGetUsersQuery({
  //   variables: {
  //     limit: limit,
  //     offset: offset,
  //   },
  // });

  // if (loading) return <p>🥁 Chargement...</p>;
  // if (error) return <p>☠️ Erreur: {error.message}</p>;

  return (
    <div>
      <h1>Gestion des exercices</h1>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <BtnLink
          to="/administrator/exercise/add"
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
          Ajouter un exercise
        </BtnLink>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Tableau des exercices">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Libellé</TableCell>
              <TableCell align="left">Début</TableCell>
              <TableCell align="left">Fin</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
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
                          handleClick={() => handleRestoreUser(user.id)}
                          type={"enable"}
                        />
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody> */}
        </Table>
      </TableContainer>
    </div>
  );
}
