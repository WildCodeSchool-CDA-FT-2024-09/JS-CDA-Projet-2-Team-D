import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import useNotification from "../hooks/useNotification";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import logo from "/Logo_seul.svg";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [btnState, setBtnState] = useState<boolean>(false);

  const { user, login } = useUser();

  const { notifyError, notifySuccess } = useNotification();

  const redirectionByRoles = (roles: number[]) => {
    if (roles.includes(1)) {
      navigate(`/administrator`);
    } else if (roles.includes(2)) {
      navigate(`/accountant`);
    } else {
      navigate(`/commission`);
    }
  };

  // No need to show the login page if the user is already logged in, redirect to its department
  useEffect(() => {
    if (user?.roles) redirectionByRoles(user.roles.map(Number));
  });

  useEffect(() => {
    if (email && password) {
      setBtnState(false);
    } else {
      setBtnState(true);
    }
  }, [email, password]);

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(email.trim(), password);
      notifySuccess("Connexion réussie. Vous allez être redirigé.e");

      // Redirect to the user highest role homepage
      if (user) redirectionByRoles(user.roles.map(Number));
    } catch {
      notifyError("Problème avec vos identifiants. Veuillez réessayer.");
    }
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
        <form action="" onSubmit={handleSubmitLogin}>
          <Box sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Mot de passe"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <Button
              disabled={btnState}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Se connecter
            </Button>
          </Box>
        </form>

        <Stack spacing={2} sx={{ marginTop: "4em", marginBottom: "2em" }}>
          <Grid2 container spacing={12}>
            Comptes de démonstration : <br />
            Administrateur : zen@noisette.net (mdp : whS0@cqnuros )
            <br />
            Comptable : wanda.hayes@example.com (mdp : whS0@cqnuros )
            <br />
            Commission : vincent.harris@example.com (mdp : whS0@cqnuros )
          </Grid2>
        </Stack>
      </Box>
    </>
  );
}
