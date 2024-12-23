import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContext";

export const useUser = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
