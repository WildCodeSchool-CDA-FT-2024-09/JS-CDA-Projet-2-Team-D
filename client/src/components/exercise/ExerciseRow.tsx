import { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateUtils";
import BtnLink from "../BtnLink";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

type Budget = {
  amount: number;
  commissionId: number;
  commissions: {
    id: number;
    name: string;
  };
};

type Exercise = {
  budgets: Array<Budget>;
  end_date: string;
  id: number;
  label: string;
  start_date: string;
};

function ExerciseRow({ exercise }: { exercise: Exercise }) {
  const [open, setOpen] = useState<boolean>(false);
  const [enableManageBtn, setEnableManageBtn] = useState<boolean>(false);

  // If the exercise.end_date is bigger than the current date, we can manage that exercise
  useEffect(() => {
    if (new Date(exercise.end_date) >= new Date()) {
      setEnableManageBtn(true);
    } else {
      setEnableManageBtn(false);
    }
  }, []);

  return (
    <>
      <TableRow
        hover
        key={exercise.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" sx={{ fontWeight: "bold" }}>
          {exercise.label}
        </TableCell>
        <TableCell align="left">{formatDate(exercise.start_date)}</TableCell>
        <TableCell align="left">{formatDate(exercise.end_date)}</TableCell>
        <TableCell align="right">
          {enableManageBtn && (
            <BtnLink
              to={`/administrator/exercise/${exercise.id}/budgets`}
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
              Gérer
            </BtnLink>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Répartiton du budget
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Commission</TableCell>
                    <TableCell align="right">Montant</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exercise.budgets.map((budget) => (
                    <TableRow hover key={budget.commissionId}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        {budget.commissions.name}
                      </TableCell>
                      <TableCell align="right">
                        {budget.amount.toFixed(2)} €
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default ExerciseRow;
