import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

function MenuSideBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <nav className="sideBar">
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        {isMobile ? <MenuIcon /> : <p>En&nbsp;tant&nbsp;que</p>}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem className="menuSideBar" onClick={handleClose}>
          <Link
            component={RouterLink}
            to="/administrator"
            sx={{
              textDecoration: "none",
              color: "inherit",
              "&:hover": { textDecoration: "none" },
            }}
          >
            Administrateur
          </Link>
        </MenuItem>
        <MenuItem className="menuSideBar" onClick={handleClose}>
          <Link
            component={RouterLink}
            to="/commission"
            sx={{
              textDecoration: "none",
              color: "inherit",
              "&:hover": { textDecoration: "none" },
            }}
          >
            Responsable de Commission
          </Link>
        </MenuItem>

        <MenuItem className="menuSideBar" onClick={handleClose}>
          <Link
            component={RouterLink}
            to="/accountant"
            sx={{
              textDecoration: "none",
              color: "inherit",
              "&:hover": { textDecoration: "none" },
            }}
          >
            Comptable
          </Link>
        </MenuItem>
      </Menu>
    </nav>
  );
}

export default MenuSideBar;
