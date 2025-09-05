import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AppItem } from "../types/AppItem";
import type { Tab } from "../types/Tab";
import Recycle from "../tabContent/Recycle";
import MyComputer from "../tabContent/MyComputer";
import useWindowDimensions from "../hooks/useWindowDimensions";

interface AppContextType {
  recycled: AppItem[];
  setRecycled: React.Dispatch<React.SetStateAction<AppItem[]>>;
  apps: AppItem[];
  setApps: React.Dispatch<React.SetStateAction<AppItem[]>>;
  activeTab: number | null;
  setActiveTab: React.Dispatch<React.SetStateAction<number | null>>;
  openedTabs: Tab[];
  setOpenedTabs: React.Dispatch<React.SetStateAction<Tab[]>>;
  emptyBin: () => void;
  deletePermanent: (selectedAppId: number) => void;
  restoreApp: (selectedAppId: number) => void;
  minimizeTab: (tabId: number) => void;
  maximizeTab: (tabId: number) => void;
  closeTab: (tabId: number) => void;
  isTabDragging: boolean;
  setIsTabDragging: React.Dispatch<React.SetStateAction<boolean>>;
  fromNavbar: (param: boolean) => void;
  isNavbarTabClicked: boolean;
}

interface AppProviderProps {
  children: ReactNode;
}

const initialApps: AppItem[] = [
  {
    id: 1,
    title: "Internet Explorer",
    icon: "/desktop-icons/internet-explorer.ico",
    x: 0,
    y: 60,
  },
  {
    id: 2,
    title: "My Computer",
    icon: "/desktop-icons/this-pc.ico",
    x: 0,
    y: 160,
  },
  {
    id: 3,
    title: "Recycle Bin",
    icon: "/desktop-icons/recycle-bin.ico",
    x: 0,
    y: 260,
  },
  {
    id: 4,
    title: "Gta Vice City",
    icon: "/desktop-icons/vice-city.png",
    x: 0,
    y: 360,
  },
  {
    id: 5,
    title: "Messenger",
    icon: "/desktop-icons/messenger.png",
    x: 0,
    y: 460,
  },
  {
    id: 6,
    title: "WINAMP",
    icon: "/desktop-icons/Winamp-logo.png",
    x: 0,
    y: 560,
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [apps, setApps] = useState<AppItem[]>(initialApps);
  const [recycled, setRecycled] = useState<AppItem[]>([]);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [openedTabs, setOpenedTabs] = useState<Tab[]>([]);
  const [isNavbarTabClicked, setIsNavbarTabClicked] = useState<boolean>(false);

  const [isTabDragging, setIsTabDragging] = useState<boolean>(false);

  const { width, height } = useWindowDimensions();

  const emptyBin = () => {
    setRecycled([]);
  };

  const deletePermanent = (selectedAppId: number): void => {
    setApps((prev) => prev.filter((app) => app.id !== selectedAppId));
    setRecycled((prev) => prev.filter((app) => app.id !== selectedAppId));
  };

  const restoreApp = (selectedAppId: number): void => {
    const appToRestore = recycled.find((app) => app.id === selectedAppId);
    if (appToRestore) {
      setApps((prev) => [...prev, appToRestore]);
      setRecycled((prev) => prev.filter((app) => app.id !== selectedAppId));
    }
  };

  const minimizeTab = (tabId: number) => {
    setOpenedTabs((prev) =>
      prev.map((tab) => (tab.id === tabId ? { ...tab, minimized: true } : tab))
    );
    if (activeTab === tabId) {
      setActiveTab(null);
    }
  };

  const maximizeTab = (tabId: number) => {
    setOpenedTabs((prev) =>
      prev.map((tab) =>
        tab.id === tabId
          ? {
              ...tab,
              maximize: !tab.maximize,
              x: width / 2,
              y: height * 0.4,
              minimized: false,
            }
          : tab
      )
    );
  };

  const closeTab = (tabId: number) => {
    setOpenedTabs((prev) => prev.filter((tab) => tab.id !== tabId));

    if (activeTab === tabId) {
      setActiveTab(null);
    }
  };

  useEffect(() => {
    if (activeTab === 2) {
      setOpenedTabs((prev) => {
        const exists = prev.some((tab) => tab.id === 2);
        if (exists) return prev;

        return [
          ...prev,
          {
            id: 2,
            title: "My Computer",
            icon: "/desktop-icons/this-pc.ico",
            minimized: false,
            maximize: false,
            zIndex: 10,
            children: <MyComputer />,
            programType: "my computer",
            prompt: false,
            x: width / 2,
            y: height * 0.4,
          },
        ];
      });
    }

    if (activeTab === 3) {
      setOpenedTabs((prev) => {
        const exists = prev.some((tab) => tab.id === 3);
        if (exists) return prev;

        return [
          ...prev,
          {
            id: 3,
            title: "Recycle Bin",
            icon: "/desktop-icons/recycle-bin.ico",
            minimized: false,
            maximize: false,
            zIndex: 10,
            children: <Recycle />,
            programType: "recycle",
            prompt: false,
            x: width / 2,
            y: height * 0.4,
          },
        ];
      });
    }
  }, [activeTab, width, height]);

  console.log("active tab:", activeTab);

  useEffect(() => {
    if (activeTab == null || isTabDragging) return;

    setOpenedTabs((prev) =>
      prev.map((t) =>
        t.id && !t.maximize ? { ...t, x: width / 2, y: height * 0.4 } : t
      )
    );
  }, [width, height]);

  console.log("opened tabs:", openedTabs);

  const fromNavbar = (data: boolean) => {
    setIsNavbarTabClicked(data);
    console.log("data from navbar:", data);
  };

  return (
    <AppContext.Provider
      value={{
        recycled,
        setRecycled,
        apps,
        setApps,
        activeTab,
        setActiveTab,
        openedTabs,
        setOpenedTabs,
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
