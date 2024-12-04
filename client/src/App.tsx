import { Outlet } from "react-router";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MenuSideBar from "./components/menuSideBar/MenuSideBar";

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
      main: "#1879CD",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#393939",
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
        <MenuSideBar />
        <Outlet />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
