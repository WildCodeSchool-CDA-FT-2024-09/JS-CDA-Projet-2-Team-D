import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetExercisesLazyQuery, Exercise } from "../../types/graphql-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "../avatar/Avatar";
import { useTheme, useMediaQuery } from "@mui/material";
import { useUser } from "../../hooks/useUser";
import UserBar from "../UserBar";

const roleMapping: { [key: string]: string } = {
  1: "Administrateur",
  2: "Comptable",
  3: "Responsable",
};

interface HeaderProps {
  title: string;
  logoUrl: string;
}

const Header: React.FC<HeaderProps> = ({ title, logoUrl }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [currentExercise, setCurrentExercise] = useState<
    Exercise | undefined
  >();
  const [getExercices] = useGetExercisesLazyQuery();

  const { user } = useUser();

  useEffect(() => {
    const getMyExercice = async () => {
      try {
        const { data } = await getExercices();
        if (!currentExercise && (data?.getExercises?.length as number) > 0) {
          setCurrentExercise(data?.getExercises[0] as Exercise);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      getMyExercice();
    }
  }, [user, getExercices, currentExercise]);

  const roleColorMapping: { [key: string]: string } = {
    Administrateur: theme.palette.error.main,
    Comptable: theme.palette.warning.main,
    Responsable: theme.palette.success.main,
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
            pl: isMobile ? "48px" : 0,
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
                  display: isMobile ? "none" : "flex",
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
                  sx={{ display: isMobile ? "none" : "block" }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="h2"
                  className="header-subtitle"
                  sx={{
                    color: "black",
                    fontSize: isMobile ? "1rem" : "1.25rem",
                  }}
                >
                  {currentExercise
                    ? `${currentExercise.label}`
                    : "Aucun exercice"}{" "}
                  {userType && `- ${userType}`}
                </Typography>
              </Box>
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "8px" : "16px",
            }}
          >
            <UserBar />
            <Box
              sx={{
                flexGrow: 0,
                width: isMobile ? "32px" : "40px",
                height: isMobile ? "32px" : "40px",
              }}
            >
              <Avatar color={avatarColor} />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
