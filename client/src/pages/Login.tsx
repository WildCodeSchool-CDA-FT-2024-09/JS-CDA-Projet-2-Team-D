import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import useNotification from "../hooks/useNotification";
import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "/Logo_seul.svg";
import BtnLink from "../components/BtnLink";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [btnState, setBtnState] = useState<boolean>(false);

  // Password texfield
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

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
          maxWidth: { xs: "90%", md: "40%" },
          margin: "0 auto",
        }}
      >
        <img src={logo} alt="ClubCompta" style={{ marginBottom: "20px" }} />
        <Typography variant="h4" component="h2" sx={{ textAlign: "center" }}>
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
              aria-label="Adresse Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="password">Mot de passe</InputLabel>
              <OutlinedInput
                required
                fullWidth
                id="password"
                label="Mot de passe"
                aria-label="Mot de passe"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "Cacher le mot de passe"
                          : "Afficher le mot de passe"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              ></OutlinedInput>
            </FormControl>
            <Button
              disabled={btnState}
              type="submit"
              fullWidth
              variant="contained"
              aria-label="Se connecter"
              sx={{ mt: 3, mb: 2 }}
            >
              Se connecter
            </Button>
            <BtnLink
              aria-label="J'ai perdu mon mot de passe"
              to="/lost-password"
              sx={{ fontSize: ".8em" }}
            >
              J'ai perdu mon mot de passe
            </BtnLink>
          </Box>
        </form>
      </Box>
    </>
  );
}
