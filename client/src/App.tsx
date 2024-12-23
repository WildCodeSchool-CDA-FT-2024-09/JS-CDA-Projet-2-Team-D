// import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import NotificationProvider from "./context/NotificationContext";
// import { useUser } from "./hooks/useUser";
// import { useGetAuthenticatedUserQuery } from "./types/graphql-types";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Drawer from "./components/drawer/Drawer";
import Home from "./pages/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
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
      main: "#00235B", // Blue
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      contrastText: "#F5F5F5",
    },
    secondary: {
      main: "#D2DEF1", // Light blue
      contrastText: "#00235B",
    },
    success: {
      main: "#6EBF8B", // Green
      contrastText: "#1F1F1F",
    },
    warning: {
      main: "#FFDD83", // yellow
      contrastText: "#1F1F1F",
    },
    error: {
      main: "#E21818", // Red
      contrastText: "#1F1F1F",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 798,
      lg: 1024,
      xl: 1280,
    },
  },
});

function App() {
  const location = useLocation();
  const currentPage = location.pathname;

  // const {
  //   data: loggedInUser,
  //   loading,
  //   error: loggedInUserError,
  // } = useGetAuthenticatedUserQuery();

  // const { setUser } = useUser();

  // useEffect(() => {
  //   if (!loggedInUserError && loggedInUser) {
  //     setUser({
  //       id: loggedInUser!.getAuthenticatedUser.id,
  //       firstname: loggedInUser!.getAuthenticatedUser.firstname,
  //       lastname: loggedInUser!.getAuthenticatedUser.lastname,
  //       email: loggedInUser!.getAuthenticatedUser.email,
  //       roles: loggedInUser!.getAuthenticatedUser.roles.map((role) =>
  //         role.id.toString(),
  //       ),
  //     });
  //   }
  // }, [loggedInUser, loggedInUserError, setUser]);

  // if (loading) {
  //   return <Box>🥁 Chargement...</Box>;
  // }

  return (
    <>
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          {currentPage !== "/" ? (
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Header
                title="ClubCompta"
                subtitle="Budget 2024/2025"
                logoUrl="/Logo.svg"
              />
              <Drawer />
              <Box component="main" sx={{ flexGrow: 1, p: 3, mt: "4rem" }}>
                <Outlet />
                <Footer />
              </Box>
            </Box>
          ) : (
            <Home />
          )}
        </NotificationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
