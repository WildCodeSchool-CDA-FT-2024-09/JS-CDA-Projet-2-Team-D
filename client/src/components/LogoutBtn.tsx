import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useUser } from "../hooks/useUser";

function LogoutBtn() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
          fontSize: ".8em",
        }}
      >
        <div>{`${user?.firstname} ${user?.lastname}`}</div>
        <Button onClick={handleLogout} sx={{ fontSize: ".8em" }}>
          Déconnexion
        </Button>
      </Stack>
    </>
  );
}

export default LogoutBtn;
