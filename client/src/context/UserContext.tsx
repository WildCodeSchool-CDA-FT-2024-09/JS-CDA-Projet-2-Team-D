import { createContext, useState, ReactNode } from "react";

type User = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  roles: string[];
} | null;

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// Create the context with default values
export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

// Provider component props
interface UserProviderProps {
  children: ReactNode;
}

// Implement the provider
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
