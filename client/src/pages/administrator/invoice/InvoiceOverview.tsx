import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Pagination,
  Stack,
  useMediaQuery,
  useTheme,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  useGetExercisesQuery,
  useGetInvoicesByExerciseQuery,
} from "../../../types/graphql-types";
import { formatDate } from "../../../utils/dateUtils";

const InvoiceOverview = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const offset = (page - 1) * limit;

  const {
    data: exercisesData,
    loading: exercisesLoading,
    error: exercisesError,
  } = useGetExercisesQuery();

  const {
    data: invoiceData,
    loading: invoiceLoading,
    error: invoiceError,
  } = useGetInvoicesByExerciseQuery({
    variables: {
      exerciseId: selectedExercise || 0,
      limit,
      offset,
    },
    skip: !selectedExercise,
  });

  useEffect(() => {
    if (
      exercisesData?.getExercises &&
      exercisesData.getExercises.length > 0 &&
      !selectedExercise
    ) {
      setSelectedExercise(exercisesData.getExercises[0].id);
    }
  }, [exercisesData, selectedExercise]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleExerciseChange = (event: SelectChangeEvent<number>) => {
    setSelectedExercise(event.target.value as number);
    setPage(1);
  };

  if (exercisesLoading) return <CircularProgress />;
  if (exercisesError)
    return (
      <Typography color="error">
        Erreur lors du chargement des exercices: {exercisesError.message}
      </Typography>
    );

  const exercises = exercisesData?.getExercises || [];
  const invoices = invoiceData?.getInvoicesByExercise.invoices || [];
  const totalCount = invoiceData?.getInvoicesByExercise.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  const getChipStyles = (status: string) => {
    let backgroundColor;
    switch (status) {
      case "Validé":
        backgroundColor = theme.palette.success.main;
        break;
      case "En attente":
        backgroundColor = theme.palette.warning.main;
        break;
      case "Refusé":
        backgroundColor = theme.palette.error.main;
        break;
      default:
        backgroundColor = theme.palette.primary.main;
    }
    return {
      backgroundColor,
      color: theme.palette.getContrastText(backgroundColor),
      fontWeight: "bold",
      fontSize: "14px",
    };
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Stack spacing={3}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontSize: isMobile ? "18px" : "24px", fontWeight: "bold" }}
        >
          Liste des Factures
        </Typography>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="exercise-select-label">Exercice</InputLabel>
          <Select
            labelId="exercise-select-label"
            id="exercise-select"
            value={selectedExercise || ""}
            label="Exercice"
            onChange={handleExerciseChange}
          >
            {exercises.map((exercise) => (
              <MenuItem key={exercise.id} value={exercise.id}>
                {exercise.label} ({formatDate(exercise.start_date)} -{" "}
                {formatDate(exercise.end_date)})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {invoiceLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : invoiceError ? (
          <Typography color="error">
            Erreur lors du chargement des factures: {invoiceError.message}
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ tableLayout: "auto" }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {isMobile ? "N° fact." : "Numéro de facture"}
                  </TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Libellé</TableCell>
                  {!isMobile && <TableCell>Commission</TableCell>}
                  {!isMobile && <TableCell>Sous-catégorie</TableCell>}
                  <TableCell>Montant TTC</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={isMobile ? 5 : 7} align="center">
                      Aucune facture disponible
                    </TableCell>
                  </TableRow>
                ) : (
                  invoices.map((row) => {
                    const montantTTC =
                      row.creditDebit?.label?.toLowerCase() === "débit"
                        ? -row.amount_with_vat
                        : row.amount_with_vat;

                    return (
                      <TableRow key={row.id}>
                        <TableCell>{row.invoiceNumber}</TableCell>
                        <TableCell>{formatDate(row.date)}</TableCell>
                        <TableCell>{row.label}</TableCell>
                        {!isMobile && (
                          <TableCell>{row.commission?.name}</TableCell>
                        )}
                        {!isMobile && (
                          <TableCell>{row.subcategory?.label}</TableCell>
                        )}
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          {montantTTC.toFixed(2)} €
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={
                              isMobile
                                ? row.status?.label[0]
                                : row.status?.label
                            }
                            sx={getChipStyles(row.status?.label)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
            {invoices.length > 0 && (
              <Stack
                spacing={2}
                sx={{
                  marginBottom: "1em",
                  marginTop: "1em",
                  display: "flex",
                  alignItems: "center",
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
            )}
          </TableContainer>
        )}
      </Stack>
    </Box>
  );
};

export default InvoiceOverview;
