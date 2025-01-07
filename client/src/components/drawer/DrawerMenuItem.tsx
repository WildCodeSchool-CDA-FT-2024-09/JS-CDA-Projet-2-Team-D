import { useNavigate, useLocation } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

type MenuItemType = {
  to: string;
  icon: React.ReactNode;
  text: string;
};

function DrawerMenuItem({ to, icon, text }: MenuItemType) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          selected={location.pathname === to}
          onClick={() => navigate(to)}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
              "& .MuiListItemIcon-root": {
                color: "primary.contrastText",
              },
            },
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={text}
            primaryTypographyProps={{
              fontSize: "0.875rem",
              fontWeight: location.pathname === to ? 500 : 400,
            }}
          />
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default DrawerMenuItem;
