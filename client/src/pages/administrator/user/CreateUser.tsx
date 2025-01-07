import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "../../../utils/userValidation";
import {
  useGetRolesQuery,
  useGetCommissionsQuery,
  useCreateNewUserMutation,
} from "../../../types/graphql-types";
import { generatePassword } from "../../../utils/generatePassword";
import useNotification from "../../../hooks/useNotification";
import BtnLink from "../../../components/BtnLink";
import GeneratePassword from "../../../components/user/GeneratePassword";
import PasswordField from "../../../components/user/PasswordField";
import PageTitle from "../../../components/PageTitle";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CreateUser() {
  const [roles, setRoles] = useState<string[]>([]);
  const [commissions, setCommissions] = useState<string[]>([]);
  const { data: rolesData } = useGetRolesQuery();
  const { data: commissionsData } = useGetCommissionsQuery();
  const [createNewUser] = useCreateNewUserMutation();

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
    resolver: zodResolver(updateUserSchema),
    mode: "onChange", // Validate on every change
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      roles: [],
      commissions: [],
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

  const handleChangeRoles = (event: SelectChangeEvent<typeof roles>) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value
    const selectedRoles = typeof value === "string" ? value.split(",") : value;
    setRoles(selectedRoles);
  };

  const handleChangeCommissions = (
    event: SelectChangeEvent<typeof commissions>,
  ) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value
    const selectedCommissions =
      typeof value === "string" ? value.split(",") : value;
    setCommissions(selectedCommissions);
  };

  // Form submission handler
  const onSubmit = async (formData: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    roles: string[];
    commissions?: string[];
  }) => {
    try {
      const selectedRoleObjects: { id: number }[] = roles
        .map((roleLabel: string) =>
          rolesData?.getRoles.find((role) => role.label === roleLabel),
        )
        .filter((role) => role !== undefined) // Ensure no `undefined` values in case of mismatch
        .map((role) => ({ id: role.id }));

      // Default role is set to commission
      if (selectedRoleObjects.length === 0) selectedRoleObjects.push({ id: 3 });

      const selectedCommissionsObjects: { id: number }[] = commissions
        .map((commissionLabel: string) =>
          commissionsData?.getCommissions.find(
            (commission) => commission.name === commissionLabel,
          ),
        )
        .filter((commission) => commission !== undefined) // Ensure no `undefined` values in case of mismatch
        .map((commission) => ({ id: commission.id }));

      await createNewUser({
        variables: {
          data: {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            password: formData.password,
            roles: selectedRoleObjects,
            commissions: selectedCommissionsObjects,
          },
        },
      });

      notifySuccess("Utilisateur ajouté avec succès");

      // Reset the form
      if (formData.firstname) setValue("firstname", "");
      if (formData.lastname) setValue("lastname", "");
      if (formData.email) setValue("email", "");
      if (formData.password) {
        setValue("password", "");
        setValue("passwordConfirm", "");
      }
      setRoles([]);
      setCommissions([]);
    } catch (error) {
      notifyError("Erreur lors de l'ajout de l'utilisateur");
      console.error("Erreur lors de l'ajout d'un utilisateur", error);
    }
  };

  return (
    <>
      <PageTitle title="Ajouter un utilisateur">
        <BtnLink
          to="/administrator/user"
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
          Liste des utilisateurs
        </BtnLink>
      </PageTitle>

      {Object.keys(errors).length > 0 && (
        <Box sx={{ color: "red", mt: 2, textAlign: "center" }}>
          Veuillez corriger les erreurs dans le formulaire
        </Box>
      )}

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
            <TextField
              {...register("firstname")}
              fullWidth
              required
              id="firstname"
              label="Prénom"
              aria-label="Prénom"
              name="firstname"
              variant="outlined"
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
              onChange={async (e) => {
                setValue("firstname", e.target.value, { shouldValidate: true });
                await trigger("firstname");
              }}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              {...register("lastname")}
              fullWidth
              required
              id="lastname"
              label="Nom"
              aria-label="Nom"
              name="lastname"
              variant="outlined"
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
              onChange={async (e) => {
                setValue("lastname", e.target.value, { shouldValidate: true });
                await trigger("lastname");
              }}
            />
          </Grid>
          <Grid size={6}>
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
          <Grid size={6}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="role-select-label">Rôles</InputLabel>
              <Select
                {...register("roles")}
                fullWidth
                required
                labelId="role-select-label"
                aria-label="Rôles"
                id="roles"
                name="roles"
                multiple
                value={roles}
                onChange={handleChangeRoles}
                input={<OutlinedInput label="Roles" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {rolesData &&
                  rolesData.getRoles.map((role) => (
                    <MenuItem key={role.id} value={role.label}>
                      <Checkbox checked={roles.includes(role.label)} />
                      <ListItemText primary={role.label} />
                    </MenuItem>
                  ))}
              </Select>
              {errors.roles && (
                <p style={{ color: "red", margin: "4px 14px 0" }}>
                  {errors.roles.message}
                </p>
              )}
            </FormControl>
          </Grid>
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
          <Grid size={12}>
            Il est possible d'associer un utilisateur à une ou plusieurs
            commissions.
          </Grid>
          <Grid size={12}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="commission-select-label">Commissions</InputLabel>
              <Select
                {...register("commissions")}
                fullWidth
                labelId="commission-select-label"
                aria-label="Commissions"
                id="commissions"
                name="commissions"
                multiple
                value={commissions}
                onChange={handleChangeCommissions}
                input={<OutlinedInput label="Commissions" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {commissionsData &&
                  commissionsData.getCommissions.map((comm) => (
                    <MenuItem key={comm.id} value={comm.name}>
                      <Checkbox checked={commissions.includes(comm.name)} />
                      <ListItemText primary={comm.name} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={6}></Grid>

          <Grid size={4}></Grid>
          <Grid size={4} sx={{ textAlign: "center" }}>
            <Button
              disabled={Object.keys(errors).length > 0}
              type="submit"
              variant="contained"
              startIcon={<AddIcon />}
              aria-label="Ajouter l'utilisateur"
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
