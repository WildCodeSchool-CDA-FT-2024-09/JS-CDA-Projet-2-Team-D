import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "../Avatar/Avatar";

interface HeaderProps {
  title: string;
  subtitle?: string;
  logoUrl: string;
  avatarColor: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  logoUrl,
  avatarColor,
}) => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#D9D9D9" }}>
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
                variant="h6"
                component="div"
                sx={{ color: "black", textAlign: "left" }}
              >
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="subtitle2" sx={{ color: "black" }}>
                  {subtitle}
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
