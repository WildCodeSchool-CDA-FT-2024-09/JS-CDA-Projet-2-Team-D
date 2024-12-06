import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import BtnLink from "../components/BtnLink";

const buttonStyle = {
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
};

export default function Home() {
  return (
    <Box sx={{ marginTop: "1em" }}>
      <Stack spacing={2}>
        <BtnLink to="/administrator" sx={buttonStyle}>
          Administrateur
        </BtnLink>
        <BtnLink to="/accountant" sx={buttonStyle}>
          Comptable
        </BtnLink>
        <BtnLink to="/commission" sx={buttonStyle}>
          Responsable de commission
        </BtnLink>
      </Stack>
    </Box>
  );
}
