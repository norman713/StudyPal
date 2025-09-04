import { Href, router } from "expo-router";
import { createContext, useContext, useState } from "react";

interface NavigationContextProps {
  sideNavPath: string;
  bottomNavPath: string;
  setSidePath: (value: string) => void;
  setBottomPath: (value: string) => void;
  onChangeSidePath: (oldValue: string, newValue: string) => void;
  onChangeBottomPath: (oldValue: string, newValue: string) => void;
}

const defaultValue: NavigationContextProps = {
  sideNavPath: "Plan",
  bottomNavPath: "Me",
  setSidePath: () => {},
  setBottomPath: () => {},
  onChangeSidePath: () => {},
  onChangeBottomPath: () => {},
};

const NavigationContext = createContext<NavigationContextProps>(defaultValue);

export const useNavigationContext = () => useContext(NavigationContext);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sideNavPath, setSideNavPath] = useState<string>("Plan");
  const [bottomNavPath, setBottomNavPath] = useState<string>("Me");

  const setSidePath = (value: string) => setSideNavPath(value);
  const setBottomPath = (value: string) => setBottomNavPath(value);

  const onChangeSidePath = (oldValue: string, newValue: string) => {
    if (oldValue === newValue) return;
    setSideNavPath(newValue);
    const path = `/${bottomNavPath}/${newValue}`;
    router.push(path as Href);
  };

  const onChangeBottomPath = (oldValue: string, newValue: string) => {
    // 1) if in team then choose option in side bar, navigate to : /Team/sideNavPath
    if (oldValue === newValue) {
      if (newValue === "Team") {
        const path = `/${newValue}/${sideNavPath}`;
        router.push(path as Href);
      }
      return;
    }

    //2. update state
    setBottomNavPath(newValue);

    // 3. others to team then route to /(team)/main
    if (newValue === "Team") {
      router.push("/(team)/main");
      return;
    }

    // 4) others
    const path =
      newValue === "Notification" || newValue === "MissedDeadline"
        ? `/${newValue}`
        : `/${newValue}/${sideNavPath}`;

    if (path === "/Me/Management") {
      router.push("/(me)/main");
    } else {
      router.push(path as Href);
    }
  };

  const value = {
    sideNavPath,
    bottomNavPath,
    setSidePath,
    setBottomPath,
    onChangeSidePath,
    onChangeBottomPath,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
