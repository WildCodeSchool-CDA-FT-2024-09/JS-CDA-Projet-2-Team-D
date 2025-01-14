import { useUser } from "../../hooks/useUser";
import { useGetUserByIdQuery } from "../../types/graphql-types";
import DrawerMenuItem from "./DrawerMenuItem";
import {
  Divider,
  Drawer,
  List,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import GroupIcon from "@mui/icons-material/Group";
import TableIcon from "@mui/icons-material/TableChart";
import PieChartSharpIcon from "@mui/icons-material/PieChartSharp";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import InboxIcon from "@mui/icons-material/Inbox";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptLongSharpIcon from "@mui/icons-material/ReceiptLongSharp";
import { useState } from "react";

function CustomDrawer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useUser();
  const drawerWidth = isMobile ? 350 : 270;

  const { data, loading, error } = useGetUserByIdQuery({
    variables: { userId: user?.id ?? 0 },
  });

  const commissions = data?.getUserById.commissions || [];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const drawerContent = (
    <>
      <Toolbar />
      {/* Menu Administrateur */}
      {user?.roles.includes("1") && (
        <>
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
              to="/administrator/invoiceOverview"
              icon={<ReceiptLongSharpIcon />}
              text="Factures par exercice"
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
            <DrawerMenuItem
              to="/administrator/bank"
              icon={<AccountBalanceIcon />}
              text="Consultation des comptes bancaires"
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
              to="/accountant"
              icon={<TableIcon />}
              text="Partie Comptable"
            />
            <DrawerMenuItem
              to="/accountant/category"
              icon={<InboxIcon />}
              text="Gestion des catégories"
            />
            <DrawerMenuItem
              to="/accountant/invoiceOverview"
              icon={<ReceiptLongSharpIcon />}
              text="Factures par exercice"
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
    </>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            position: "fixed",
            left: 18,
            top: 10,
            zIndex: (theme) => theme.zIndex.drawer + 2,
          }}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        ModalProps={{
          keepMounted: true,
        }}
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
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default CustomDrawer;
