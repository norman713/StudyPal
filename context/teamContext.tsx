import React, { createContext, ReactNode, useContext, useState } from "react";
interface TeamContextProps {
  role: string;
  setRole: (value: string) => void;
  getRole: () => string;
  id: string;
  setId: (value: string) => void;
  getId: () => string;
}

interface TeamProviderProps {
  children: ReactNode;
}

const TeamContext = createContext<TeamContextProps | undefined>(undefined);

// Provider
export const TeamProvider = ({ children }: TeamProviderProps) => {
  const [role, setRole] = useState<string>(""); // initial state role
  const [id, setId] = useState<string>(""); // initial state id

  const getRole = () => role;
  const getId = () => id;

  return (
    <TeamContext.Provider value={{ role, setRole, getRole, id, setId, getId }}>
      {children}
    </TeamContext.Provider>
  );
};

// Hook use context
export const useTeamContext = (): TeamContextProps => {
  const context = useContext(TeamContext);

  if (!context) {
    throw new Error("useTeamContext must be used within a TeamProvider");
  }

  return context;
};
