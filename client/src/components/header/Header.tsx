import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "../avatar/Avatar";
import { useTheme } from "@mui/material/styles";
import { useUser } from "../../hooks/useUser";
import UserBar from "../UserBar";

const roleMapping: { [key: string]: string } = {
  1: "Administrateur",
  2: "Comptable",
  3: "Responsable",
};
interface HeaderProps {
  title: string;
  subtitle?: string;
  logoUrl: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, logoUrl }) => {
  const theme = useTheme();
  const { user } = useUser();

  const roleColorMapping: { [key: string]: string } = {
    Administrateur: theme.palette.error.main, // Red
    Comptable: theme.palette.warning.main, // Yellow
    Responsable: theme.palette.success.main, // Green
  };

  const userRole = user?.roles[0];
  const userType =
    userRole && roleMapping[userRole] ? roleMapping[userRole] : "Visiteur";
  const avatarColor = roleColorMapping[userType] || "#D9D9D9";

  return (
    <AppBar
      position="fixed"
      color="secondary"
      sx={{
        height: "4rem",
        backgroundColor: "#D9D9D9",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: "12px",
                  boxShadow: theme.shadows[3],
                  padding: 1,
                  height: "3.5rem",
                  width: "4rem",
                  marginRight: 2,
                }}
              >
                <img
                  src={logoUrl}
                  alt="Logo Club Compta"
                  style={{ height: "3rem", width: "auto" }}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h1"
                  component="div"
                  className="header-title"
                  sx={{
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {title}
                </Typography>
                {(subtitle || userType) && (
                  <Typography
                    variant="h2"
                    className="header-subtitle"
                    sx={{
                      color: "black",
                    }}
                  >
                    {subtitle} {userType && `- ${userType}`}
                  </Typography>
                )}
              </Box>
            </Link>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <UserBar />
            <Box sx={{ flexGrow: 0, width: "40px", height: "40px" }}>
              <Avatar color={avatarColor} />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
