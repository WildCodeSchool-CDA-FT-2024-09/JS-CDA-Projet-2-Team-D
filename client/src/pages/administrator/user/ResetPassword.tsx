import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../../../utils/resetPasswordValidation";
import { useResetPasswordMutation } from "../../../types/graphql-types";
import { generatePassword } from "../../../utils/generatePassword";
import useNotification from "../../../hooks/useNotification";
import PageTitle from "../../../components/PageTitle";
import PasswordField from "../../../components/user/PasswordField";
import GeneratePassword from "../../../components/user/GeneratePassword";
import { Box, Grid } from "@mui/system";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [resetPasswordMutation] = useResetPasswordMutation();

  const handleGeneratePassword = () => {
    const pwd = generatePassword(12);
    setValue("password", pwd, { shouldValidate: true });
    setValue("passwordConfirm", pwd, { shouldValidate: true });

    trigger(["password", "passwordConfirm"]);
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
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange", // Validate on every change
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  // Watch form values for dynamic validation
  const watchPassword = watch("password");
  const watchPasswordConfirm = watch("passwordConfirm");

  // Trigger validation for password confirmation when password changes
  useEffect(() => {
    if (watchPassword || watchPasswordConfirm) {
      trigger("passwordConfirm");
    }
  }, [watchPassword, watchPasswordConfirm, trigger]);

  // Form submission handler
  const onSubmit = async (formData: { password: string }) => {
    try {
      await resetPasswordMutation({
        variables: {
          token: token || "",
          newPassword: formData.password,
        },
      });

      notifySuccess("Votre mot de passe a été mis à jour avec succès");
    } catch (error) {
      notifyError("Le lien a expiré ou le jeton n'est plus valide");
      console.error("Erreur lors de la mise à jour du mot de passe", error);
    }
  };

  return (
    <>
      <PageTitle title="Nouveau mot de passe" />

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
          <Grid size={6}>
            <PasswordField
              label="Mot de passe"
              error={
                errors.password?.message
                  ? { message: errors.password.message }
                  : undefined
              }
              {...register("password")}
              value={watch("password")} // Explicitly set value using watch
              onChange={async (e) => {
                setValue("password", e.target.value, {
                  shouldValidate: true,
                });
                await trigger(["password", "passwordConfirm"]);
              }}
            />
          </Grid>
          <Grid size={6}>
            <PasswordField
              label="Confirmer le mot de passe"
              error={
                errors.passwordConfirm?.message
                  ? { message: errors.passwordConfirm.message }
                  : undefined
              }
              {...register("passwordConfirm")}
              value={watch("passwordConfirm")} // Explicitly set value using watch
              onChange={async (e) => {
                setValue("passwordConfirm", e.target.value, {
                  shouldValidate: true,
                });
                await trigger(["password", "passwordConfirm"]);
              }}
            />
          </Grid>
          <Grid size={12}>
            <GeneratePassword handleGeneratePassword={handleGeneratePassword} />
          </Grid>
          <Grid size={4}></Grid>
          <Grid size={4} sx={{ textAlign: "center" }}>
            <Button
              disabled={Object.keys(errors).length > 0}
              type="submit"
              variant="contained"
              startIcon={<AddIcon />}
              aria-label="Mettre à jour"
            >
              Mettre à jour
            </Button>
          </Grid>
          <Grid size={4}></Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ResetPassword;
