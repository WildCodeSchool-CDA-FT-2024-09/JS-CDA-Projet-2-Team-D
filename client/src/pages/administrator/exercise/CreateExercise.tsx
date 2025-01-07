import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { validateExerciseSchema } from "../../../utils/exerciseValidation";
import { useCreateNewExerciseMutation } from "../../../types/graphql-types";
import useNotification from "../../../hooks/useNotification";
import PageTitle from "../../../components/PageTitle";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { fr } from "date-fns/locale";
import BtnLink from "../../../components/BtnLink";
import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";

const today = new Date();
const nextYear = new Date(
  today.getFullYear() + 1,
  today.getMonth(),
  today.getDate(),
);

type FormValues = {
  label: string;
  start_date: Date;
  end_date: Date;
};

export default function CreateExercise() {
  const navigate = useNavigate();

  const [createNewExercise] = useCreateNewExerciseMutation();

  const handleStartDateChange = async (date: Date | null) => {
    if (date) {
      setValue("start_date", date, {
        shouldValidate: true,
      });
      await trigger("start_date");
    }
  };

  const handleEndDateChange = async (date: Date | null) => {
    if (date) {
      setValue("end_date", date, {
        shouldValidate: true,
      });
      await trigger("end_date");
    }
  };

  // User feedback
  const { notifySuccess, notifyError } = useNotification();

  // Zod
  const {
    register,
    handleSubmit,
    setValue,
    trigger, // Manual validation trigger
    watch,
    formState: {
      errors, // Contains validation errors
    },
  } = useForm<FormValues>({
    resolver: zodResolver(validateExerciseSchema),
    mode: "onChange", // Validate on every change
    defaultValues: {
      label: "",
      start_date: today,
      end_date: nextYear,
    },
  });

  // Form submission handler
  const onSubmit = async (formData: FormValues) => {
    try {
      await createNewExercise({
        variables: {
          data: {
            label: formData.label,
            start_date: formData.start_date.toISOString(),
            end_date: formData.end_date.toISOString(),
          },
        },
      });

      notifySuccess("Exercice ajouté avec succès");

      navigate("/administrator/exercise");
    } catch (error) {
      notifyError(
        "Erreur lors de l'ajout de l'exercice. Le libellé existe-t-il déjà ?",
      );
      console.error("Erreur lors de l'ajout de l'exercice", error);
    }
  };

  return (
    <>
      <PageTitle title="Ajouter un exercice">
        <BtnLink
          to="/administrator/exercise"
          sx={{
            marginLeft: "auto",
            backgroundColor: "secondary.main",
            padding: "6px 8px",
            color: "secondary.contrastText",
            textTransform: "uppercase",
            borderRadius: "4px",
            textAlign: "center",
            fontSize: ".9em",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Liste des exercices
        </BtnLink>
      </PageTitle>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          border: "1px solid #f3f3f3",
          padding: "1em",
          borderRadius: ".5em",
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            {errors.end_date && (
              <Typography color="error" sx={{ marginBottom: "1em" }}>
                Attention : {errors.end_date?.message}
              </Typography>
            )}
            <TextField
              {...register("label")}
              fullWidth
              required
              id="label"
              label="Libellé"
              aria-label="Libellé"
              name="label"
              variant="outlined"
              error={!!errors.label}
              helperText={errors.label?.message}
              onChange={async (e) => {
                setValue("label", e.target.value, { shouldValidate: true });
                await trigger("label");
              }}
            />
          </Grid>
          <Grid size={6}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={fr}
            >
              <DatePicker
                sx={{ width: "100%" }}
                {...register("start_date")}
                value={watch("start_date")}
                label="Date de début"
                aria-label="Date de début"
                name="start_date"
                onChange={handleStartDateChange}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={6}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={fr}
            >
              <DatePicker
                sx={{ width: "100%" }}
                {...register("end_date")}
                value={watch("end_date")}
                label="Date de fin"
                aria-label="Date de fin"
                name="end_date"
                onChange={handleEndDateChange}
              />
            </LocalizationProvider>
          </Grid>

          <Grid size={4}></Grid>
          <Grid size={4} sx={{ textAlign: "center" }}>
            <Button
              disabled={Object.keys(errors).length > 0}
              type="submit"
              variant="contained"
              startIcon={<AddIcon />}
            >
              Ajouter
            </Button>
          </Grid>
          <Grid size={4}></Grid>
        </Grid>
      </Box>
    </>
  );
}
