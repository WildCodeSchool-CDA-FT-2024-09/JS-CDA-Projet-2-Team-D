import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import BtnCrud from "../../../components/BtnCrud";

function createData(
  id: number,
  firstname: string,
  lastname: string,
  email: string,
) {
  return { id, firstname, lastname, email };
}

const rows = [
  createData(1, "Toto", "Tata", "toto@tata.org"),
  createData(2, "Jean-Claude", "Octave", "jean@claude.net"),
  createData(3, "Eclair", "Chocolat", "eclair@chocolat.net"),
  createData(4, "Ashitaka", "Ghibli", "ashitaka@ghibli.net"),
  createData(5, "Severus", "Snape", "severus@snape.net"),
];

export default function ManageUser() {
  return (
    <div>
      <h1>Gestion des utilisateurs</h1>

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
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.firstname}</TableCell>
                <TableCell align="left">{row.lastname}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
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
