import { useRef, useState } from "react";
import { useGetRolesQuery } from "../../../types/graphql-types";
import {
  Box,
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
import BtnCrud from "../../../components/BtnCrud";
import { RefMap } from "../../../types/types";

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
  const { data: rolesData } = useGetRolesQuery();

  // used instead of states to avoid multiple re-renders when typing
  const userRef: RefMap = {
    firstname: useRef<HTMLInputElement>(null),
    lastname: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    passwordConfirm: useRef<HTMLInputElement>(null),
    //roles: useRef([]),
  };

  const handleChangeRoles = (event: SelectChangeEvent<typeof roles>) => {
    const {
      target: { value },
    } = event;
    setRoles(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(userRef.firstname.current, userRef.lastname.current);
  };

  return (
    <div>
      <h1>Ajouter un utilisateur</h1>
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
              ref={userRef.firstname}
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
              ref={userRef.lastname}
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
              ref={userRef.email}
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
              ref={userRef.password}
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
              ref={userRef.passwordConfirm}
            />
          </Grid>

          <Grid size={4}></Grid>
          <Grid size={4}>
            <BtnCrud disabled={false} handleClick={() => null} type={"add"} />
          </Grid>
          <Grid size={4}></Grid>
        </Grid>
      </Box>
    </div>
  );
}
