import { useNavigate } from "react-router-dom";
import {
  useSoftDeleteUserMutation,
  GetUsersDocument,
  useRestoreUserMutation,
} from "../../types/graphql-types";
import useNotification from "../../hooks/useNotification";
import BtnCrud from "../BtnCrud";
import { Chip, TableCell, TableRow, Typography } from "@mui/material";
import { Stack } from "@mui/system";

type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  roles: {
    id: number;
    label: string;
  }[];
  deletedAt?: string | null;
};

type UserRowType = {
  user: UserType;
  offset: number;
  limit: number;
};

function UserRow({ user, offset, limit }: UserRowType) {
  const navigate = useNavigate();

  // User feedback
  const { notifySuccess, notifyError } = useNotification();

  const [softDeleteUserMutation] = useSoftDeleteUserMutation();
  const [restoreUserMutation] = useRestoreUserMutation();

  const handleSoftDeleteUser = async (userId: number) => {
    try {
      await softDeleteUserMutation({
        variables: {
          data: { id: userId },
        },
        refetchQueries: [
          {
            query: GetUsersDocument,
            variables: {
              limit: limit,
              offset: offset,
            },
          },
        ],
      });

      notifySuccess("Utilisateur désactivé avec succès");
    } catch (error) {
      notifyError("Erreur lors de la désactivation de l'utilisateur");
      console.error("Erreur lors de la désactivation de l'utilisateur", error);
    }
  };

  const handleRestoreUser = async (userId: number) => {
    try {
      await restoreUserMutation({
        variables: {
          data: { id: userId },
        },
        refetchQueries: [
          {
            query: GetUsersDocument,
            variables: {
              limit: limit,
              offset: offset,
            },
          },
        ],
      });

      notifySuccess("Utilisateur réactivé avec succès");
    } catch (error) {
      notifyError("Erreur lors de la réactivé de l'utilisateur");
      console.error("Erreur lors de la réactivé de l'utilisateur", error);
    }
  };

  const handleEditUser = (userId: number) => {
    navigate(`/administrator/user/edit/${userId}`);
  };

  return (
    <>
      <TableRow
        key={user.id}
        sx={{
          backgroundColor: user.deletedAt === null ? "white" : "#f1f1f1",
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell align="left">
          {user.deletedAt !== null && (
            <span style={{ textDecoration: "line-through" }}>
              {user.lastname}
            </span>
          )}
          {user.deletedAt === null && user.lastname}
        </TableCell>
        <TableCell align="left">
          {user.deletedAt !== null && (
            <span style={{ textDecoration: "line-through" }}>
              {user.firstname}
            </span>
          )}
          {user.deletedAt === null && user.firstname}
        </TableCell>
        <TableCell align="left">
          {user.email}
          <br />
          <Typography
            component="div"
            sx={{ fontSize: ".8rem", marginTop: ".5em" }}
          >
            {user.roles.map((role) => (
              <Chip
                key={role.id}
                label={role.label}
                size="small"
                variant="outlined"
                sx={{ marginRight: ".5em" }}
              />
            ))}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Stack spacing={2} direction="row">
            <BtnCrud
              disabled={false}
              handleClick={() => handleEditUser(user.id)}
              type={"edit"}
            />
            {user.deletedAt === null ? (
              <BtnCrud
                disabled={false}
                handleClick={() => handleSoftDeleteUser(user.id)}
                type={"disable"}
              />
            ) : (
              <BtnCrud
                disabled={false}
                handleClick={() => handleRestoreUser(user.id)}
                type={"enable"}
              />
            )}
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
}

export default UserRow;
