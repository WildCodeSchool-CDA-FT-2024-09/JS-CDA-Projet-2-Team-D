import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "../utils/emailValidation";
import useNotification from "../hooks/useNotification";
import { useRequestPasswordResetMutation } from "../types/graphql-types";
import PageTitle from "../components/PageTitle";
import BtnLink from "../components/BtnLink";
import { Box, Grid } from "@mui/system";
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ILostMyPassword() {
  // User feedback
  const { notifySuccess, notifyError } = useNotification();

  const [requestPasswordResetMutation] = useRequestPasswordResetMutation();

  // Zod
  const {
    register,
    handleSubmit,
    setValue,
    trigger, // Manual validation trigger
    formState: {
      errors, // Contains validation errors
      isValid,
    },
  } = useForm({
    resolver: zodResolver(emailSchema),
    mode: "onChange", // Validate on every change
    defaultValues: {
      email: "",
    },
  });

  // Form submission handler
  const onSubmit = async (formData: { email: string }) => {
    try {
      await requestPasswordResetMutation({
        variables: {
          email: formData.email,
        },
      });

      notifySuccess(
        "Vous allez recevoir un lien pour changer votre mot de passe",
      );
    } catch (error) {
      notifyError("Une erreur est survenue, merci de réessayer");
      console.error(
        "Erreur lors de l'envoi de l'email de changement de mot de passe",
        error,
      );
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          maxWidth: { xs: "100%", md: "40%" },
          margin: "0 auto",
          border: "1px solid #f3f3f3",
          padding: "1em",
          borderRadius: ".5em",
        }}
        noValidate
        autoComplete="off"
      >
        <PageTitle title="J'ai perdu mon mot de passe" />
        <p>
          Nous allons vous envoyer un email avec un lien pour changer votre mot
          de passe.
        </p>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              {...register("email")}
              fullWidth
              required
              id="email"
              label="Email"
              aria-label="Email"
              name="email"
              type="email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              onChange={async (e) => {
                setValue("email", e.target.value, { shouldValidate: true });
                await trigger("email");
              }}
            />
          </Grid>
          <Grid size={4}></Grid>
          <Grid size={4} sx={{ textAlign: "center" }}>
            <Button
              // disabled={Object.keys(errors).length > 0}
              disabled={!isValid}
              type="submit"
              variant="contained"
              startIcon={<SendIcon />}
              aria-label="Mettre à jour"
            >
              Envoyer
            </Button>
          </Grid>
          <Grid size={4}></Grid>
          <Grid size={12} sx={{ textAlign: "center" }}>
            <BtnLink
              aria-label="Retour à la page de connexion"
              to="/"
              sx={{ fontSize: ".8em" }}
            >
              Retour à la page de connexion
            </BtnLink>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ILostMyPassword;
