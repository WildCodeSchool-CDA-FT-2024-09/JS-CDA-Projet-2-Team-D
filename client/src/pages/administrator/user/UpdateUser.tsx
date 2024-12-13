import { useEffect, useState } from "react";
import {
  useGetRolesQuery,
  useGetCommissionsQuery,
  useGetUserByIdQuery,
} from "../../../types/graphql-types";
// import { BooleanMap } from "../../../types/types";
// import { useFormik } from 'formik';
import useNotification from "../../../hooks/useNotification";
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
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";

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

export default function UpdateUser() {
  const { userId } = useParams();

  const [roles, setRoles] = useState<string[]>([]);
  const [commissions, setCommissions] = useState<string[]>([]);
  const { data: rolesData } = useGetRolesQuery();
  const { data: commissionsData } = useGetCommissionsQuery();
  const { data, loading, error } = useGetUserByIdQuery({
    variables: { userId: parseInt(userId as string) },
  });

  // User feedback
  const { notifySuccess, notifyError } = useNotification();

  const [initialValues, setInitialValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  // Update initial values when data is loaded
  useEffect(() => {
    if (data?.getUserById) {
      setInitialValues({
        firstname: data.getUserById.firstname || "",
        lastname: data.getUserById.lastname || "",
        email: data.getUserById.email || "",
        password: "",
        passwordConfirm: "",
      });

      // Set initial roles
      setRoles(data.getUserById.roles?.map((role) => role.label) || []);

      // Set initial commissions
      setCommissions(
        data.getUserById.commissions?.map((comm) => comm.name) || [],
      );
    }
  }, [data]);

  // Check input errors
  // const [inputError, setInputError] = useState<BooleanMap>({
  //   firstname: false,
  //   lastname: false,
  //   email: false,
  //   password: false,
  // });

  const handleChangeRoles = (event: SelectChangeEvent<typeof roles>) => {
    const {
      target: { value },
    } = event;
    setRoles(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const handleChangeCommissions = (
    event: SelectChangeEvent<typeof commissions>,
  ) => {
    const {
      target: { value },
    } = event;
    setCommissions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  // const handleInputChange = (
  //   field: string,
  //   inputRef: RefObject<HTMLInputElement>,
  // ) => {
  //   if (field === "firstname" || field === "lastname") {
  //     const isValid = validateNameInput(inputRef);
  //     setInputError((prevErrors) => ({ ...prevErrors, [field]: !isValid }));
  //   } else if (field === "email") {
  //     const isValid = validateEmailInput(inputRef);
  //     setInputError((prevErrors) => ({ ...prevErrors, [field]: !isValid }));
  //   } else if (field === "password") {
  //     const isValid = validatePasswordInput(inputRef);
  //     setInputError((prevErrors) => ({ ...prevErrors, [field]: !isValid }));
  //   } else if (field === "passwordConfirm") {
  //     const isValid = validatePasswordConfirmInput();
  //     setInputError((prevErrors) => ({ ...prevErrors, [field]: !isValid }));
  //   }
  // };

  // const validateNameInput = (inputRef: RefObject<HTMLInputElement>) => {
  //   const value = inputRef.current && inputRef.current.value;
  //   return value
  //     ? /^.{1,50}$/.test(value) && /^[A-Za-z0-9À-ÖØ-öø-ÿ@_-\s]+$/.test(value)
  //     : false;
  // };

  // const validateEmailInput = (inputRef: RefObject<HTMLInputElement>) => {
  //   const value = inputRef.current && inputRef.current.value;
  //   return value
  //     ? /^.{5,150}$/.test(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  //     : false;
  // };

  // const validatePasswordInput = (inputRef: RefObject<HTMLInputElement>) => {
  //   const value = inputRef.current && inputRef.current.value;
  //   // At least one uppercase letter, one number, one special character, minimum of 8 characters
  //   return value
  //     ? /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
  //     : false;
  // };

  // const validatePasswordConfirmInput = () => {
  //   // return userRef.password.current?.value !==
  //   //   userRef.passwordConfirm.current?.value
  //   //   ? false
  //   //   : true;
  //   return;
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const selectedRoleObjects = roles
        .map((roleLabel) =>
          rolesData?.getRoles.find((role) => role.label === roleLabel),
        )
        .filter((role) => role !== undefined) // Ensure no `undefined` values in case of mismatch
        .map((role) => ({ id: role.id }));

      // Default role is set to commission
      if (selectedRoleObjects.length === 0) selectedRoleObjects.push({ id: 3 });

      // const selectedCommissionsObjects = commissions
      //   .map((commissionLabel) =>
      //     commissionsData?.getCommissions.find(
      //       (commission) => commission.name === commissionLabel,
      //     ),
      //   )
      //   .filter((commission) => commission !== undefined) // Ensure no `undefined` values in case of mismatch
      //   .map((commission) => ({ id: commission.id }));

      // await UpdateUser({
      //   variables: {
      //     data: {
      //       firstname: initialValues.firstname ? initialValues.firstname : "",
      //       lastname: initialValues.lastname ? initialValues.lastname : "",
      //       email: initialValues.email,
      //       password: userRef.password.current
      //         ? userRef.password.current.value
      //         : "",
      //       roles: selectedRoleObjects,
      //       commissions: selectedCommissionsObjects,
      //     },
      //   },
      // });

      notifySuccess("Utilisateur mis à jour avec succès");
    } catch (error) {
      notifyError("Erreur lors de la mise à jour de l'utilisateur");
      console.error("Erreur lors de la mise à jour de l'utilisateur", error);
    }
  };

  // Disable add button if errors
  // const handleDisabledButton = (): boolean => {
  //   return (
  //     Object.values(inputError).some((el) => el) ||
  //     Object.values(userRef).some(
  //       (el) => el.current != null && el.current.value == "",
  //     )
  //   );
  // };

  if (loading) return <p>🥁 Chargement...</p>;
  if (error) return <p>☠️ Erreur: {error.message}</p>;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1>Editer un utilisateur</h1>
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
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
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
              fullWidth
              required
              id="firstname"
              label="Prénom"
              name="firstname"
              variant="outlined"
              value={initialValues.firstname}
              onChange={(e) =>
                setInitialValues((prev) => ({
                  ...prev,
                  firstname: e.target.value,
                }))
              }
              // error={inputError.firstname}
              // helperText={
              //   inputError.firstname
              //     ? "Uniquement des caractères alphanumériques (max 50)"
              //     : ""
              // }
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              required
              id="lastname"
              label="Nom"
              name="lastname"
              variant="outlined"
              value={initialValues.lastname}
              onChange={(e) =>
                setInitialValues((prev) => ({
                  ...prev,
                  lastname: e.target.value,
                }))
              }
              // error={inputError.lastname}
              // helperText={
              //   inputError.lastname
              //     ? "Uniquement des caractères alphanumériques (max 50)"
              //     : ""
              // }
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              required
              id="email"
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              value={initialValues.email}
              onChange={(e) =>
                setInitialValues((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              // error={inputError.email}
              // helperText={
              //   inputError.email
              //     ? "Ceci n'est pas une adresse email valide"
              //     : ""
              // }
            />
          </Grid>
          <Grid size={6}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="role-select-label">Roles</InputLabel>
              <Select
                fullWidth
                required
                labelId="role-select-label"
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
            </FormControl>
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              required
              id="password"
              label="Mot de passe"
              name="password"
              type="password"
              variant="outlined"
              // inputRef={userRef.password}
              // onChange={() => handleInputChange("password", userRef.password)}
              // onBlur={() => handleInputChange("password", userRef.password)}
              // error={inputError.password}
              // helperText={
              //   inputError.password
              //     ? "Le mot de passe doit contenir au minimum 8 caractères, dont au moins 1 chiffre, 1 majuscule et 1 caractère spécial"
              //     : ""
              // }
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              required
              id="passwordConfirm"
              label="Confirmer le mot de passe"
              name="passwordConfirm"
              type="password"
              variant="outlined"
              // inputRef={userRef.passwordConfirm}
              // onChange={() =>
              //   handleInputChange("passwordConfirm", userRef.passwordConfirm)
              // }
              // error={inputError.passwordConfirm}
              // helperText={
              //   inputError.passwordConfirm
              //     ? "La confirmation de mot de passe ne correspond pas"
              //     : ""
              // }
            />
          </Grid>
          <Grid size={12}>
            Il est possible d'associer un utilisateur à une ou plusieurs
            commissions.
          </Grid>
          <Grid size={12}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="commission-select-label">Commissions</InputLabel>
              <Select
                fullWidth
                labelId="commission-select-label"
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
              // disabled={handleDisabledButton()}
              type="submit"
              variant="contained"
              startIcon={<EditIcon />}
            >
              Mettre à jour
            </Button>
          </Grid>
          <Grid size={4}></Grid>
        </Grid>
      </Box>
    </div>
  );
}
