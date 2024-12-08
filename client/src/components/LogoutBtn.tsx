import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useUser } from "../hooks/useUser";

function LogoutBtn() {
  const { user, logout } = useUser();

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
        <div>{user?.email}</div>
        <Button onClick={logout} sx={{ fontSize: ".8em" }}>
          Déconnexion
        </Button>
      </Stack>
    </>
  );
}

export default LogoutBtn;
