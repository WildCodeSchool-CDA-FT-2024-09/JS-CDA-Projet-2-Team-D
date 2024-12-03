import { Outlet } from "react-router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./global.css";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  palette: {
    primary: {
      main: "#6EBF8B",
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
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
