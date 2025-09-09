import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { DesktopApp } from "../types/DesktopApp";
import type { App as AppType } from "../types/App";
import Recycle from "../tabContent/Recycle";
import MyComputer from "../tabContent/MyComputer";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { desktopApps } from "../data/desktopApps";

interface AppContextType {
  recycled: DesktopApp[];
  setRecycled: React.Dispatch<React.SetStateAction<DesktopApp[]>>;
  apps: DesktopApp[];
  setApps: React.Dispatch<React.SetStateAction<DesktopApp[]>>;
  activeApp: string | null;
  setActiveApp: React.Dispatch<React.SetStateAction<string | null>>;
  openedApps: AppType[];
  setOpenedApps: React.Dispatch<React.SetStateAction<AppType[]>>;
  emptyBin: () => void;
  deletePermanent: (appTitle: string | null) => void;
  restoreApp: (appTitle: string | null) => void;
  minimizeTab: (appTitle: string | null) => void;
  maximizeTab: (appTitle: string | null) => void;
  closeTab: (appTitle: string | null) => void;
  isTabDragging: boolean;
  setIsTabDragging: React.Dispatch<React.SetStateAction<boolean>>;
  fromNavbar: (param: boolean) => void;
  isNavbarTabClicked: boolean;
}

interface AppProviderProps {
  children: ReactNode;
}

const generate = () => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};

const generateId = generate();
const generateIndex = generate();

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [apps, setApps] = useState<DesktopApp[]>(desktopApps);
  const [recycled, setRecycled] = useState<DesktopApp[]>([]);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [openedApps, setOpenedApps] = useState<AppType[]>([]);
  const [isNavbarTabClicked, setIsNavbarTabClicked] = useState<boolean>(false);

  const [isTabDragging, setIsTabDragging] = useState<boolean>(false);

  const { width, height } = useWindowDimensions();
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const emptyBin = () => {
    setRecycled([]);
  };

  const deletePermanent = (appTitle: string | null): void => {
    setApps((prev) => prev.filter((app) => app.title !== appTitle));
    setRecycled((prev) => prev.filter((app) => app.title !== appTitle));
  };

  const restoreApp = (appTitle: string | null): void => {
    const appToRestore = recycled.find((app) => app.title === appTitle);
    if (appToRestore) {
      setApps((prev) => [...prev, appToRestore]);
      setRecycled((prev) => prev.filter((app) => app.title !== appTitle));
    }
  };

  const minimizeTab = (appTitle: string | null) => {
    setOpenedApps((prev) =>
      prev.map((app) =>
        app.title === appTitle ? { ...app, minimized: true } : app
      )
    );
    if (activeApp === appTitle) {
      setActiveApp(null);
    }
  };

  const maximizeTab = (appTitle: string | null) => {
    setOpenedApps((prev) =>
      prev.map((app) =>
        app.title === appTitle
          ? {
              ...app,
              maximize: !app.maximize,
              x: width / 2,
              y: height * 0.4,
              minimized: false,
            }
          : app
      )
    );
  };

  const closeTab = (appTitle: string | null) => {
    setOpenedApps((prev) => prev.filter((app) => app.title !== appTitle));

    if (activeApp === appTitle) {
      setActiveApp(null);
    }
  };

  useEffect(() => {
    if (firstLoad) {
      setOpenedApps((prev) => {
        return [
          ...prev,
          {
            id: generateId(),
            zIndex: generateIndex(),
            title: "Winamp",
            icon: "/desktop-icons/Winamp-logo.png",
            minimized: false,
            maximize: false,
            showHeader: false,
            children: "winamp",
            programType: "winamp",
            prompt: false,
            x: width / 2,
            y: height * 0.4,
          },
          {
            id: generateId(),
            zIndex: generateIndex(),
            title: "My Computer",
            icon: "/desktop-icons/this-pc.ico",
            minimized: false,
            maximize: false,
            showHeader: true,
            children: <MyComputer />,
            programType: "my computer",
            prompt: false,
            x: width / 2,
            y: height * 0.4,
          },
          {
            id: generateId(),
            zIndex: generateIndex(),
            title: "Recycle Bin",
            icon: "/desktop-icons/recycle-bin.ico",
            minimized: false,
            maximize: false,
            showHeader: true,
            children: <Recycle />,
            programType: "recycle",
            prompt: false,
            x: width / 2,
            y: height * 0.4,
          },
        ];
      });
    }

    setFirstLoad(false);
  }, []);

  useEffect(() => {
    if (!activeApp) return;

    setOpenedApps((prev) =>
      prev.map((tab) => {
        if (tab.title === activeApp) {
          return { ...tab, zIndex: generateIndex(), minimized: false };
        }
        return tab;
      })
    );
  }, [activeApp]);

  useEffect(() => {
    if (activeApp == null || isTabDragging) return;

    setOpenedApps((prev) =>
      prev.map((t) =>
        t.id && !t.maximize ? { ...t, x: width / 2, y: height * 0.4 } : t
      )
    );
  }, [width, height]);

  const fromNavbar = (data: boolean) => {
    setIsNavbarTabClicked(data);
  };

  console.log("opened apps:", openedApps);

  return (
    <AppContext.Provider
      value={{
        recycled,
        setRecycled,
        apps,
        setApps,
        activeApp,
        setActiveApp,
        openedApps,
        setOpenedApps,
        emptyBin,
        deletePermanent,
        restoreApp,
        closeTab,
        minimizeTab,
        maximizeTab,
        isTabDragging,
        setIsTabDragging,
        fromNavbar,
        isNavbarTabClicked,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
