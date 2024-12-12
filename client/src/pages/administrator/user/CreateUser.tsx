import { useRef, useState, RefObject } from "react";
import {
  useGetRolesQuery,
  useGetCommissionsQuery,
  useCreateNewUserMutation,
} from "../../../types/graphql-types";
import { BooleanMap } from "../../../types/types";
import { RefMap } from "../../../types/types";
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

export default function CreateUser() {
  const [roles, setRoles] = useState<string[]>([]);
  const [commissions, setCommissions] = useState<string[]>([]);
  const { data: rolesData } = useGetRolesQuery();
  const { data: commissionsData } = useGetCommissionsQuery();
  const [createNewUser] = useCreateNewUserMutation();

  // User feedback
  const { notifySuccess, notifyError } = useNotification();

  // used instead of states to avoid multiple re-renders when typing
  const userRef: RefMap = {
    firstname: useRef<HTMLInputElement>(null),
    lastname: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    passwordConfirm: useRef<HTMLInputElement>(null),
    roles: useRef<HTMLInputElement>(null),
    commissions: useRef<HTMLInputElement>(null),
  };

  // Check input errors
  const [inputError, setInputError] = useState<BooleanMap>({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
  });

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

  const handleInputChange = (
    field: string,
    inputRef: RefObject<HTMLInputElement>,
  ) => {
    if (field === "firstname" || field === "lastname") {
      const isValid = validateNameInput(inputRef);
      setInputError((prevErrors) => ({ ...prevErrors, [field]: !isValid }));
    } else if (field === "email") {
      const isValid = validateEmailInput(inputRef);
      setInputError((prevErrors) => ({ ...prevErrors, [field]: !isValid }));
    } else if (field === "password") {
      const isValid = validatePasswordInput(inputRef);
      setInputError((prevErrors) => ({ ...prevErrors, [field]: !isValid }));
    } else if (field === "passwordConfirm") {
      const isValid = validatePasswordConfirmInput();
      setInputError((prevErrors) => ({ ...prevErrors, [field]: !isValid }));
    }
  };

  const validateNameInput = (inputRef: RefObject<HTMLInputElement>) => {
    const value = inputRef.current && inputRef.current.value;
    return value
      ? /^.{1,50}$/.test(value) && /^[A-Za-z0-9À-ÖØ-öø-ÿ@_-\s]+$/.test(value)
      : false;
  };

  const validateEmailInput = (inputRef: RefObject<HTMLInputElement>) => {
    const value = inputRef.current && inputRef.current.value;
    return value
      ? /^.{5,150}$/.test(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      : false;
  };

  const validatePasswordInput = (inputRef: RefObject<HTMLInputElement>) => {
    const value = inputRef.current && inputRef.current.value;
    // At least one uppercase letter, one number, one special character, minimum of 8 characters
    return value
      ? /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
      : false;
  };

  const validatePasswordConfirmInput = () => {
    return userRef.password.current?.value !==
      userRef.passwordConfirm.current?.value
      ? false
      : true;
  };

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

      const selectedCommissionsObjects = commissions
        .map((commissionLabel) =>
          commissionsData?.getCommissions.find(
            (commission) => commission.name === commissionLabel,
          ),
        )
        .filter((commission) => commission !== undefined) // Ensure no `undefined` values in case of mismatch
        .map((commission) => ({ id: commission.id }));

      await createNewUser({
        variables: {
          data: {
            firstname: userRef.firstname.current
              ? userRef.firstname.current.value
              : "",
            lastname: userRef.lastname.current
              ? userRef.lastname.current.value
              : "",
            email: userRef.email.current ? userRef.email.current.value : "",
            password: userRef.password.current
              ? userRef.password.current.value
              : "",
            roles: selectedRoleObjects,
            commissions: selectedCommissionsObjects,
          },
        },
      });

      notifySuccess("Utilisateur ajouté avec succès");

      // Reset the form
      if (userRef.firstname.current) userRef.firstname.current.value = "";
      if (userRef.lastname.current) userRef.lastname.current.value = "";
      if (userRef.email.current) userRef.email.current.value = "";
      if (userRef.password.current) userRef.password.current.value = "";
      if (userRef.passwordConfirm.current)
        userRef.passwordConfirm.current.value = "";
      setRoles([]);
      setCommissions([]);
    } catch (error) {
      notifyError("Erreur lors de l'ajout de l'utilisateur");
      console.error("Erreur lors de l'ajout d'un utilisateur", error);
    }
  };

  // Disable add button if errors
  const handleDisabledButton = (): boolean => {
    return (
      Object.values(inputError).some((el) => el) ||
      Object.values(userRef).some(
        (el) => el.current != null && el.current.value == "",
      )
    );
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1>Ajouter un utilisateur</h1>
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
              inputRef={userRef.firstname}
              onChange={() => handleInputChange("firstname", userRef.firstname)}
              error={inputError.firstname}
              helperText={
                inputError.firstname
                  ? "Uniquement des caractères alphanumériques (max 50)"
                  : ""
              }
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
              inputRef={userRef.lastname}
              onChange={() => handleInputChange("lastname", userRef.lastname)}
              onBlur={() => handleInputChange("lastname", userRef.lastname)}
              error={inputError.lastname}
              helperText={
                inputError.lastname
                  ? "Uniquement des caractères alphanumériques (max 50)"
                  : ""
              }
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
              inputRef={userRef.email}
              onChange={() => handleInputChange("email", userRef.email)}
              onBlur={() => handleInputChange("email", userRef.email)}
              error={inputError.email}
              helperText={
                inputError.email
                  ? "Ceci n'est pas une adresse email valide"
                  : ""
              }
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
                input={<OutlinedInput label="Tag" />}
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
              inputRef={userRef.password}
              onChange={() => handleInputChange("password", userRef.password)}
              onBlur={() => handleInputChange("password", userRef.password)}
              error={inputError.password}
              helperText={
                inputError.password
                  ? "Le mot de passe doit contenir au minimum 8 caractères, dont au moins 1 chiffre, 1 majuscule et 1 caractère spécial"
                  : ""
              }
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
              inputRef={userRef.passwordConfirm}
              onChange={() =>
                handleInputChange("passwordConfirm", userRef.passwordConfirm)
              }
              error={inputError.passwordConfirm}
              helperText={
                inputError.passwordConfirm
                  ? "La confirmation de mot de passe ne correspond pas"
                  : ""
              }
            />
          </Grid>
          <Grid size={12}>
            Un utilisateur peut appartenir à plusieurs commissions
          </Grid>
          <Grid size={6}>
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
                input={<OutlinedInput label="Tag" />}
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
              disabled={handleDisabledButton()}
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
    </div>
  );
}
