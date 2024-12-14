import { Outlet, useLocation } from "react-router";
import { UserProvider } from "./context/UserContext";
import NotificationProvider from "./context/NotificationContext";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
// import Container from "@mui/material/Container";
import MenuSideBar from "./components/menuSideBar/MenuSideBar";
import Home from "./pages/Home";
import UserBar from "./components/UserBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
// import { Grid2 } from "@mui/material";
import "./global.css";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import GroupIcon from "@mui/icons-material/Group";
import TableIcon from "@mui/icons-material/TableChart";

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
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#E21818", // Red
      contrastText: "#FFFFFF",
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

const drawerWidth = 300;

function App() {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <NotificationProvider>
            {currentPage !== "/" ? (
              <>
                <Box sx={{ display: "flex" }}>
                  <CssBaseline />
                  <Header
                    title="ClubCompta"
                    subtitle="Budget 2024/2025"
                    userType="Responsable"
                    logoUrl="/Logo.svg"
                    avatarColor="#6EBF8B"
                  />
                  <Drawer
                    sx={{
                      width: drawerWidth,
                      flexShrink: 0,
                      "& .MuiDrawer-paper": {
                        backgroundColor: "#f3f3f3",
                        width: drawerWidth,
                        boxSizing: "border-box",
                      },
                    }}
                    variant="permanent"
                    anchor="left"
                  >
                    <Toolbar />
                    <Divider />
                    <List>
                      <MenuSideBar />
                    </List>
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <TableIcon />
                          </ListItemIcon>
                          <ListItemText primary="Opérations" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <AnalyticsIcon />
                          </ListItemIcon>
                          <ListItemText primary="Statistiques" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                    <Divider />
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <GroupIcon />
                          </ListItemIcon>
                          <ListItemText primary="Gestion des utilisateurs" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <InboxIcon />
                          </ListItemIcon>
                          <ListItemText primary="Gestion du budget" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Drawer>

                  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {/* <MenuSideBar /> */}
                    <UserBar />
                    <Outlet />
                    <Footer />
                  </Box>
                </Box>
              </>
            ) : (
              <Home />
            )}
          </NotificationProvider>
        </ThemeProvider>
      </UserProvider>
    </>
  );
}

export default App;
