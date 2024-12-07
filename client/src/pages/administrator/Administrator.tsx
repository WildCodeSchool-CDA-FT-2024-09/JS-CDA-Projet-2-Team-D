import Stack from "@mui/material/Stack";
import BtnLink from "../../components/BtnLink";

export default function Administrator() {
  return (
    <>
      <h1>Accès administrateur</h1>
      <Stack spacing={2}>
        <BtnLink
          to="/administrator/user"
          sx={{
            display: "inline-block",
            marginLeft: "auto",
            backgroundColor: "primary.main",
            padding: "8px 16px",
            color: "primary.contrastText",
            textTransform: "uppercase",
            borderRadius: "4px",
            textDecoration: "none",
            textAlign: "center",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Gestion des utilisateurs
        </BtnLink>
      </Stack>
    </>
  );
}
