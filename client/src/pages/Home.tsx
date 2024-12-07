import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import BtnLink from "../components/BtnLink";
import { Button, TextField, Typography } from "@mui/material";
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

        <Stack spacing={2} sx={{ marginTop: "4em" }}>
          <BtnLink to="/administrator" sx={buttonStyle}>
            Administrateur
          </BtnLink>
          <BtnLink to="/accountant" sx={buttonStyle}>
            Comptable
          </BtnLink>
          <BtnLink to="/commission" sx={buttonStyle}>
            Responsable de commission
          </BtnLink>
        </Stack>
      </Box>
    </>
  );
}
