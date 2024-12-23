import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../types/graphql-types";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useUser } from "../hooks/useUser";

function LogoutBtn() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    await logoutMutation();
    setUser(null);
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
