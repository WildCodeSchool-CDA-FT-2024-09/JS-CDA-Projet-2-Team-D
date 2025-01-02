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
import GroupIcon from "@mui/icons-material/Group";
import TableIcon from "@mui/icons-material/TableChart";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import InboxIcon from "@mui/icons-material/Inbox";

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
                <Link to={`/administrator/exercise`}>
                  <ListItemButton>
                    <ListItemIcon>
                      <CardTravelIcon />
                    </ListItemIcon>
                    <ListItemText primary="Gestion des exercises" />
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
              {/* Bouton Facture pour les membres des commissions */}
              <ListItem disablePadding>
                <Link to={`/commission/invoice`}>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Nouvelle Facture" />
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          </>
        )}
      </Drawer>
    </>
  );
}

export default CustomDrawer;
