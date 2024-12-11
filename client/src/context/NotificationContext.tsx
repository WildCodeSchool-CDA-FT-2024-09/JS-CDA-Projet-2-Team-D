import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { Snackbar, Alert } from "@mui/material";
import { Notification } from "../types/types";

interface NotificationContextType {
  setNotification: Dispatch<SetStateAction<Notification>>;
  notifyError: (message: string) => void;
  notifySuccess: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export default function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notification, setNotification] = useState<Notification>({
    open: false,
    message: "",
    severity: "error",
  });

  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };

  // these two functions are needed in order to have a shorthand way of notifying for refactoring purposes, and legibility.
  const notifyError = (message: string) => {
    setNotification({
      open: true,
      message: message,
      severity: "error",
    });
  };

  const notifySuccess = (message: string) => {
    setNotification({
      open: true,
      message: message,
      severity: "success",
    });
  };

  return (
    <NotificationContext.Provider
      value={{ setNotification, notifyError, notifySuccess }}
    >
      {children}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}

export { NotificationContext };
