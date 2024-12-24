import { useUser } from "../../hooks/useUser";
import { Link } from "react-router-dom";
import { useGetUserByIdQuery } from "../../types/graphql-types";
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
import GroupIcon from "@mui/icons-material/Group";
import TableIcon from "@mui/icons-material/TableChart";
import PieChartSharpIcon from "@mui/icons-material/PieChartSharp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const drawerWidth = 280;

function CustomDrawer() {
  const { user } = useUser();

  const { data, loading, error } = useGetUserByIdQuery({
    variables: { userId: user?.id ?? 0 },
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const commissions = data?.getUserById.commissions || [];

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
          <ListItem disablePadding>
            <Link to={`/administrator`}>
              <ListItemButton>
                <ListItemIcon>
                  <ChevronRightIcon />
                </ListItemIcon>
                <ListItemText primary="Administrateur" />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link to={`/accountant`}>
              <ListItemButton>
                <ListItemIcon>
                  <ChevronRightIcon />
                </ListItemIcon>
                <ListItemText primary="Comptable" />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link to={`/commission`}>
              <ListItemButton>
                <ListItemIcon>
                  <ChevronRightIcon />
                </ListItemIcon>
                <ListItemText primary="Commission" />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
        {/* Menu Administrateur */}
        {user?.roles.includes("1") && (
          <>
            <List>
              <ListItem disablePadding>
                <Link to={`/administrator/overview`}>
                  <ListItemButton>
                    <ListItemIcon>
                      <PieChartSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary="Vue globale du budget" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to={`/administrator/user`}>
                  <ListItemButton>
                    <ListItemIcon>
                      <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary="Gestion des utilisateurs" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to={`/administrator/budget`}>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Gestion du budget" />
                  </ListItemButton>
                </Link>
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
              {commissions.length > 0 ? (
                commissions.map((commission: { id: number; name: string }) => (
                  <ListItem key={commission.id} disablePadding>
                    <Link to={`/commission/${commission.id}`}>
                      <ListItemButton>
                        <ListItemIcon>
                          <TableIcon />
                        </ListItemIcon>
                        <ListItemText primary={commission.name} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))
              ) : (
                <ListItem disablePadding>
                  <ListItemText primary="Aucune commission assignée" />
                </ListItem>
              )}
            </List>
          </>
        )}
      </Drawer>
    </>
  );
}

export default CustomDrawer;
