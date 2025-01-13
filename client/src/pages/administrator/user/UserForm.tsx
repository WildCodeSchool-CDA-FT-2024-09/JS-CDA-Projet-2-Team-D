import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "../../../utils/userValidation";
import {
  useGetRolesQuery,
  useGetCommissionsQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useCreateNewUserMutation,
} from "../../../types/graphql-types";
import useNotification from "../../../hooks/useNotification";
import PageTitle from "../../../components/PageTitle";
import BtnLink from "../../../components/BtnLink";
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
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid2";

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

type UserFormProps = {
  mode: "create" | "update";
};
export default function UserForm({ mode }: UserFormProps) {
  const { userId } = useParams();
  const isUpdateMode = mode === "update";

  const [roles, setRoles] = useState<string[]>([]);
  const [commissions, setCommissions] = useState<string[]>([]);
  const { data: rolesData } = useGetRolesQuery();
  const { data: commissionsData } = useGetCommissionsQuery();
  const { data, loading, error } = useGetUserByIdQuery({
    variables: { userId: parseInt(userId as string) },
    skip: !isUpdateMode || !userId,
  });
  const [updateUserMutation] = useUpdateUserMutation();
  const [createUserMutation] = useCreateNewUserMutation();

  // User feedback
  const { notifySuccess, notifyError } = useNotification();

  // Zod
  const {
    register,
    handleSubmit,
    setValue,
    trigger, // Manual validation trigger
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
      roles: [],
      commissions: [],
    },
  });

  // Populate form with existing values
  useEffect(() => {
    if (isUpdateMode && data?.getUserById) {
      const userData = data.getUserById;
      setValue("firstname", userData.firstname || "");
      setValue("lastname", userData.lastname || "");
      setValue("email", userData.email || "");

      // Set roles and commissions
      const userRoles = userData.roles?.map((role) => role.label) || [];
      const userCommissions =
        userData.commissions?.map((comm) => comm.name) || [];

      setRoles(userRoles);
      setCommissions(userCommissions);
    }
  }, [data, setValue, isUpdateMode]);

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
    roles: string[];
    commissions?: string[];
  }) => {
    try {
      const selectedRoleObjects: { id: number }[] = formData.roles
        .map((roleLabel: string) =>
          rolesData?.getRoles.find((role) => role.label === roleLabel),
        )
        .filter((role) => role !== undefined)
        .map((role) => ({ id: role.id }));

      // Default role is set to commission if no roles selected
      if (selectedRoleObjects.length === 0) {
        selectedRoleObjects.push({ id: 3 });
      }

      const selectedCommissionsObjects: { id: number }[] =
        formData.commissions
          ?.map((commissionLabel: string) =>
            commissionsData?.getCommissions.find(
              (commission) => commission.name === commissionLabel,
            ),
          )
          .filter((commission) => commission !== undefined)
          .map((commission) => ({ id: commission.id as number })) || [];

      const userData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        roles: selectedRoleObjects,
        commissions: selectedCommissionsObjects,
      };

      if (isUpdateMode) {
        await updateUserMutation({
          variables: {
            data: userData,
            userId: parseInt(userId as string),
          },
        });

        notifySuccess("Utilisateur mis à jour avec succès");
      } else {
        await createUserMutation({
          variables: {
            data: userData,
          },
        });

        notifySuccess("Utilisateur créé avec succès");
      }
    } catch (error) {
      const action = isUpdateMode ? "mise à jour" : "création";
      notifyError(`Erreur lors de la ${action} de l'utilisateur`);
      console.error(`Erreur lors de la ${action} de l'utilisateur`, error);
    }
  };

  if (loading) return <p>🥁 Chargement...</p>;
  if (error) return <p>☠️ Erreur: {error.message}</p>;

  return (
    <>
      <PageTitle
        title={isUpdateMode ? "Editer un utilisateur" : "Créer un utilisateur"}
      >
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
                id="commissions"
                name="commissions"
                aria-label="Commissions"
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
              startIcon={isUpdateMode ? <EditIcon /> : <AddIcon />}
              aria-label={
                isUpdateMode
                  ? "Mettre à jour l'utilisateur"
                  : "Ajouter l'utilisateur"
              }
            >
              {isUpdateMode ? "Mettre à jour" : "Ajouter"}
            </Button>
          </Grid>
          <Grid size={4}></Grid>
        </Grid>
      </Box>
    </>
  );
}
