import { ReactNode } from "react";
import { useTheme, useMediaQuery, Typography } from "@mui/material";
import { Box } from "@mui/system";

function PageTitle({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: isMobile ? "18px" : "24px",
            fontWeight: "bold",
            marginTop: "1.5em",
            marginBottom: "1.5em",
          }}
        >
          {title}
        </Typography>
        {children}
      </Box>
    </>
  );
}

export default PageTitle;
