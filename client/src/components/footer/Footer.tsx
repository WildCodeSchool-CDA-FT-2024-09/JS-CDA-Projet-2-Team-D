import React from "react";
import { Stack, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Stack
      width="100%"
      minHeight={75}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <Stack direction="row" spacing={4} alignItems="center">
        <Typography variant="body2" color="textSecondary">
          © Copyright - ClubCompta - {new Date().getFullYear()}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Footer;
