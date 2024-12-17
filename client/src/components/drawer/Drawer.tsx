import { useUser } from "../../hooks/useUser";
import MenuSideBar from "../menuSideBar/MenuSideBar";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import GroupIcon from "@mui/icons-material/Group";
import TableIcon from "@mui/icons-material/TableChart";

const drawerWidth = 300;

function CustomDrawer() {
  const { user } = useUser();

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            backgroundColor: "#f3f3f3",
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <MenuSideBar />
        </List>
        {/* Menu Administrateur */}
        {user?.roles.includes("1") && (
          <>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TableIcon />
                  </ListItemIcon>
                  <ListItemText primary="Opérations" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AnalyticsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Statistiques" />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary="Gestion des utilisateurs" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Gestion du budget" />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        )}
        {/* Menu Comptable */}
        {user?.roles.includes("2") && (
          <>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TableIcon />
                  </ListItemIcon>
                  <ListItemText primary="Partie Comptable" />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        )}
        {/* Menu Responsable de commission */}
        {user?.roles.includes("3") && (
          <>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TableIcon />
                  </ListItemIcon>
                  <ListItemText primary="Partie Commission" />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        )}
      </Drawer>
    </>
  );
}

export default CustomDrawer;
