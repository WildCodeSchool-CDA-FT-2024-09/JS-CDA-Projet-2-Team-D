import { Button } from "@mui/material";
import { useUser } from "../hooks/useUser";

function LogoutBtn() {
  const { user, logout } = useUser();

  return <Button onClick={logout}>{user?.email} - Déconnexion</Button>;
}

export default LogoutBtn;
