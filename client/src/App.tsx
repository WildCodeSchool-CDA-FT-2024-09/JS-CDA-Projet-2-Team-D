import { Outlet } from "react-router";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./global.css";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
    h1: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: "#D9D9D9", // Gris
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFDD83", //Jaune
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#6EBF8B", // Vert
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#E21818", // Rouge
      contrastText: "#FFFFFF",
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header
          title="ClubCompta"
          subtitle="Budget 2024/2025"
          userType="Comptable"
          logoUrl="/Logo.svg"
          avatarColor="#6EBF8B"
        />
        <Outlet />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
