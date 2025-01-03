import { useUser } from "../hooks/useUser";
import LogoutBtn from "./LogoutBtn";

function UserBar() {
  const { user } = useUser();

  return <>{user && <LogoutBtn />} </>;
}

export default UserBar;
