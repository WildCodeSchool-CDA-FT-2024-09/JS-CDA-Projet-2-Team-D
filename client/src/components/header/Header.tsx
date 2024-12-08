import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "../avatar/Avatar";
import { useTheme } from "@mui/material/styles";
import "./Header.css";

interface HeaderProps {
  title: string;
  subtitle?: string;
  userType?: string;
  logoUrl: string;
  avatarColor: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  userType,
  logoUrl,
}) => {
  const theme = useTheme();

  // Color mapping depending on user role
  const roleColorMapping: { [key: string]: string } = {
    Administrateur: theme.palette.error.main, // Red
    Comptable: theme.palette.secondary.main, // Yellow
    Responsable: theme.palette.success.main, // Green
  };

  const avatarColor = roleColorMapping[userType || "default"];

  return (
    <AppBar position="fixed" color="secondary">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src={logoUrl}
              alt="Logo Club Compta"
              style={{ height: "40px" }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h1"
                component="div"
                className="header-title"
                sx={{
                  display: { xs: "none", sm: "block" }, // Masked on mobile (xs) and displayed for sm +
                }}
              >
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: theme.palette.primary.main,
                  }}
                >
                  {title}
                </Link>
              </Typography>
              {(subtitle || userType) && (
                <Typography variant="h2" className="header-subtitle">
                  {subtitle} {userType && `- ${userType}`}
                </Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0, width: "40px", height: "40px" }}>
            <Avatar color={avatarColor} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
