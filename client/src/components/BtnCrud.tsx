import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import { BtnCrudType } from "../types/BtnCrudType";

// This button is used to handle CRUD actions
// it has 5 display modes, try them out with the type prop
export default function BtnCrud({
  type,
  disabled = false,
  handleClick,
}: BtnCrudType) {
  const colorMap: { [key: string]: "success" | "error" | "primary" } = {
    edit: "primary",
    delete: "error",
    disable: "error",
    enable: "primary",
    add: "primary",
    save: "success",
    cancel: "error",
  };

  const innerTextMap: { [key: string]: string } = {
    edit: "EDITER",
    delete: "SUPPRIMER",
    disable: "DESACTIVER",
    enable: "ACTIVER",
    add: "AJOUTER",
    save: "SAUVEGARDER",
    cancel: "ANNULER",
  };

  const iconMap = {
    edit: <EditIcon />,
    delete: <DeleteIcon />,
    disable: <PersonOffIcon />,
    enable: <PersonIcon />,
    add: <AddIcon />,
    save: <SaveIcon />,
    cancel: <CloseIcon />,
  };

  const variantMap: { [key: string]: "contained" | "outlined" } = {
    edit: "outlined",
    delete: "outlined",
    disable: "outlined",
    enable: "outlined",
    add: "contained",
    save: "contained",
    cancel: "outlined",
  };

  return (
    <Button
      color={colorMap[type]}
      disabled={disabled}
      variant={variantMap[type]}
      onClick={handleClick}
      startIcon={iconMap[type]}
    >
      {innerTextMap[type]}
    </Button>
  );
}
