import { useUser } from "../../hooks/useUser";
import { useGetUserByIdQuery } from "../../types/graphql-types";
import DrawerMenuItem from "./DrawerMenuItem";
import { Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import TableIcon from "@mui/icons-material/TableChart";
import PieChartSharpIcon from "@mui/icons-material/PieChartSharp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import InboxIcon from "@mui/icons-material/Inbox";

const drawerWidth = 280;

function CustomDrawer() {
  const { user } = useUser();

  const { data, loading, error } = useGetUserByIdQuery({
    variables: { userId: user?.id ?? 0 },
  });

  const commissions = data?.getUserById.commissions || [];

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

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
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List component="nav" sx={{ px: 1 }}>
          <DrawerMenuItem
            to="/administrator"
            icon={<ChevronRightIcon />}
            text="Administrateur"
          />
          <DrawerMenuItem
            to="/accountant"
            icon={<ChevronRightIcon />}
            text="Comptable"
          />
          <DrawerMenuItem
            to="/commission"
            icon={<ChevronRightIcon />}
            text="Commission"
          />
        </List>
        <Divider />
        {/* Menu Administrateur */}
        {user?.roles.includes("1") && (
          <>
            <Divider sx={{ my: 1 }} />
            <Typography
              variant="overline"
              sx={{ px: 3, color: "text.secondary", fontSize: "0.75rem" }}
            >
              Administration
            </Typography>
            <List component="nav" sx={{ px: 1 }}>
              <DrawerMenuItem
                to="/administrator/overview"
                icon={<PieChartSharpIcon />}
                text="Vue globale du budget"
              />
              <DrawerMenuItem
                to="/administrator/user"
                icon={<GroupIcon />}
                text="Gestion des utilisateurs"
              />
              <DrawerMenuItem
                to="/administrator/exercise"
                icon={<CardTravelIcon />}
                text="Gestion des exercises"
              />
            </List>
          </>
        )}
        {/* Menu Comptable */}
        {user?.roles.includes("2") && (
          <>
            <Divider sx={{ my: 1 }} />
            <Typography
              variant="overline"
              sx={{ px: 3, color: "text.secondary", fontSize: "0.75rem" }}
            >
              Comptabilité
            </Typography>
            <List component="nav" sx={{ px: 1 }}>
              <DrawerMenuItem
                to="/accountant/dashboard"
                icon={<TableIcon />}
                text="Partie Comptable"
              />
            </List>
          </>
        )}
        {/* Menu Responsable de commission */}
        {user?.roles.includes("3") && (
          <>
            <Divider sx={{ my: 1 }} />
            <Typography
              variant="overline"
              sx={{ px: 3, color: "text.secondary", fontSize: "0.75rem" }}
            >
              Commissions
            </Typography>
            <List component="nav" sx={{ px: 1 }}>
              {commissions.map((commission) => (
                <DrawerMenuItem
                  key={commission.id}
                  to={`/commission/${commission.id}`}
                  icon={<TableIcon />}
                  text={commission.name}
                />
              ))}
              <DrawerMenuItem
                to="/commission/invoice"
                icon={<InboxIcon />}
                text="Nouvelle Facture"
              />
            </List>
          </>
        )}
      </Drawer>
    </>
  );
}

export default CustomDrawer;
