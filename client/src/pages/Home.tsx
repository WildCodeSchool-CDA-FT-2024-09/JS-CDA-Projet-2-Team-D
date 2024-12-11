import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import BtnLink from "../components/BtnLink";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import logo from "/Logo_seul.svg";

const buttonStyle = {
  display: "inline-block",
  marginLeft: "auto",
  padding: "8px 16px",
  backgroundColor: "secondary.main",
  color: "secondary.contrastText",
  textTransform: "uppercase",
  borderRadius: "4px",
  textDecoration: "none",
  textAlign: "center",
  "&:hover": {
    textDecoration: "none",
    backgroundColor: "primary.light",
    color: "secondary.main",
  },
};

export default function Home() {
  const { login } = useUser();
  const navigate = useNavigate();

  // Log fake account for dev purpose only
  const handleFakeLogin = (
    fakeUser: {
      id: number;
      firstname: string;
      email: string;
      roles: string[];
    },
    path: string,
  ) => {
    login(fakeUser);
    navigate(path);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <img src={logo} alt="ClubCompta" style={{ marginBottom: "20px" }} />
        <Typography variant="h4" component="h2">
          Connexion ClubCompta
        </Typography>
        <Box sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Se connecter
          </Button>
        </Box>

        <Stack spacing={2} sx={{ marginTop: "4em", marginBottom: "2em" }}>
          <Grid2 container spacing={2}>
            <Grid2
              display="flex"
              justifyContent="center"
              alignItems="center"
              size={6}
              spacing={2}
            >
              <BtnLink
                sx={buttonStyle}
                onClick={() =>
                  handleFakeLogin(
                    {
                      id: 1,
                      firstname: "Maxime Roux",
                      email: "maxime.roux@association.com",
                      roles: ["1", "2"],
                    },
                    "/administrator",
                  )
                }
              >
                Login Administrateur
              </BtnLink>
            </Grid2>
            <Grid2 size={6} spacing={2}>
              <BtnLink to="/administrator" sx={buttonStyle}>
                Administrateur
              </BtnLink>
            </Grid2>
            <Grid2
              display="flex"
              justifyContent="center"
              alignItems="center"
              size={6}
            >
              <BtnLink
                sx={buttonStyle}
                onClick={() =>
                  handleFakeLogin(
                    {
                      id: 2,
                      firstname: "Lucie Bernard",
                      email: "lucie.bernard@association.com",
                      roles: ["2", "3"],
                    },
                    "/accountant",
                  )
                }
              >
                Login Comptable
              </BtnLink>
            </Grid2>
            <Grid2 size={6}>
              <BtnLink to="/accountant" sx={buttonStyle}>
                Comptable
              </BtnLink>
            </Grid2>
            <Grid2
              display="flex"
              justifyContent="center"
              alignItems="center"
              size={6}
            >
              <BtnLink
                sx={buttonStyle}
                onClick={() =>
                  handleFakeLogin(
                    {
                      id: 3,
                      firstname: "Caroline Mercier",
                      email: "caroline.mercier@association.com",
                      roles: ["3"],
                    },
                    "/commission",
                  )
                }
              >
                Login Responsable de commission
              </BtnLink>
            </Grid2>
            <Grid2 size={6}>
              <BtnLink to="/commission" sx={buttonStyle}>
                Responsable de commission
              </BtnLink>
            </Grid2>
          </Grid2>
        </Stack>
      </Box>
    </>
  );
}
