import { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import type { AppItem } from "../types/AppItem";
import Winamp from "../components/Webamp";

const Main = () => {
  const bgImages = ["/xp-bg-opt.jpg", "/xp-bg-opt2.jpg", "/xp-bg-opt3.jpg"];
  const [bgIndex, setBgIndex] = useState(0);
  const {
    recycled,
    setRecycled,
    emptyBin,
    apps,
    setApps,
    setActiveTab,
    fromNavbar,
  } = useApp();

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

  const [clickedAppId, setClickedAppId] = useState<number | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);

  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const recycleBinSoundRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleAppClick = (id: number | null) => {
    setClickedAppId(id);
  };

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setIsDragging(true);

    const app = apps.find((a) => a.id === id);
    if (!app) return;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setApps((prev) =>
        prev.map((a) =>
          a.id === id
            ? {
                ...a,
                x: a.x + moveEvent.movementX,
                y: a.y + moveEvent.movementY,
              }
            : a
        )
      );
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Sağ tık menüsü
  const handleContextMenu = (e: React.MouseEvent, appId: number | null) => {
    e.preventDefault();
    setMenuVisible(true);
    setMenuX(e.clientX);
    setMenuY(e.clientY);

    if (appId) {
      setSelectedAppId(appId);
    }
  };

  const handleSortByName = () => {
    setIsDragging(false);
    setApps(initialApps);
    setMenuVisible(false);
  };

  const handleRename = () => {
    if (selectedAppId !== null) {
      const newName = prompt("Enter new name:");
      if (newName) {
        setApps((prev) =>
          prev.map((app) =>
            app.id === selectedAppId ? { ...app, title: newName } : app
          )
        );
      }
    }
    setMenuVisible(false);
    setSelectedAppId(null);
  };

  const handleMoveToBin = () => {
    if (selectedAppId !== null) {
      const movedApp = apps.find((app) => app.id === selectedAppId);
      if (movedApp) {
        if (recycleBinSoundRef.current) {
          recycleBinSoundRef.current.play();
        }
        setRecycled((prev: AppItem[]) => [...prev, movedApp]);
        setApps((prev) => prev.filter((app) => app.id !== selectedAppId));
      }
    }
    setMenuVisible(false);
    setSelectedAppId(null);
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImages[bgIndex]})` }}
      onClick={() => {
        fromNavbar(false);
        handleAppClick(null);
      }}
      onContextMenu={(e) => handleContextMenu(e, null)}
    >
      {apps.map((app) => (
        <div
          onDoubleClick={() => {
            setClickedAppId(null);
            setActiveTab(app.id);
          }}
          onContextMenu={(e) => handleContextMenu(e, app.id)}
          key={app.id}
          className={`absolute flex flex-col items-center cursor-pointer select-none rounded-md w-[100px]`}
          style={{
            left: app.x,
            top: app.y,
            zIndex: clickedAppId === app.id ? 11 : 10,
            transition: !isDragging ? "all 0.3s" : "none",
          }}
          onMouseDown={(e) => {
            handleAppClick(app.id);
            handleMouseDown(e, app.id);
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleAppClick(app.id);
          }}
        >
          <img src={app.icon} alt={app.title} className="w-13 h-13 mb-1" />
          <span
            className={`text-white px-1 text-[12px] text-center flex ${
              clickedAppId === app.id ? "bg-[#0d61ff]" : ""
            }`}
          >
            {app.title}
          </span>
        </div>
      ))}

      <div className="bg-black" ref={menuRef}>
        {menuVisible && !selectedAppId ? (
          <div
            className="absolute bg-[#f9f9f9] rounded-md min-w-[280px] text-black shadow-lg z-50"
            style={{
              top: menuY,
              left: menuX,
              fontFamily: 'Arial, "Open Sans", sans-serif',
            }}
          >
            <ul
              onMouseLeave={() => setHoveredMenu("")}
              className="list-none text-[13px] mt-2 p-0
            "
            >
              <li
                onMouseLeave={() => setHoveredMenu("")}
                onMouseEnter={() => setHoveredMenu("view")}
                className="hover:bg-[#1a6ebf] rounded-sm hover:text-white cursor-pointer relative text-black py-2 px-10 mx-1"
                onClick={() => setMenuVisible(false)}
              >
                View
              </li>
              <li
                className="relative text-black p-0 mr-1 mx-1"
                onMouseEnter={() => setHoveredMenu("sortBy")}
                onMouseLeave={() => setHoveredMenu("")}
              >
                <div className="hover:bg-[#1a6ebf] hover:text-white rounded-sm cursor-pointer text-black py-2 px-10">
                  Sort By
                </div>

                {hoveredMenu === "sortBy" && (
                  <ul
                    className="absolute top-0 left-full bg-[#f9f9f9] rounded-md min-w-[180px] text-black z-50 list-none text-[13px] p-2 m-0"
                    onMouseEnter={() => setHoveredMenu("sortBy")}
                    onMouseLeave={() => setHoveredMenu("")}
                  >
                    <li
                      className="hover:bg-[#1a6ebf] hover:text-white rounded-sm cursor-pointer text-black py-2 px-10"
                      onClick={handleSortByName}
                    >
                      Name
                    </li>
                  </ul>
                )}
              </li>

              <li
                onMouseLeave={() => setHoveredMenu("")}
                onMouseEnter={() => setHoveredMenu("refresh")}
                className="hover:bg-[#1a6ebf] rounded-sm hover:text-white cursor-pointer text-black py-2 px-10 mx-1"
                onClick={() => {
                  setApps([]);
                  setTimeout(() => {
                    setApps(initialApps);
                  }, 150);
                  setMenuVisible(false);
                }}
              >
                Refresh
              </li>
              <div className="bg-[#f2f2f2] h-[2px] w-[95%] mx-auto"></div>
            </ul>
          </div>
        ) : menuVisible && selectedAppId ? (
          <div
            className="absolute bg-[#f9f9f9] rounded-md min-w-[280px] text-black shadow-lg z-50"
            style={{
              top: menuY,
              left: menuX,
              fontFamily: 'Arial, "Open Sans", sans-serif',
            }}
          >
            <ul className="list-none text-[13px] mt-2 p-0 mx-1">
              <li
                className="hover:bg-[#1a6ebf] rounded-sm hover:text-white cursor-pointer relative text-black py-2 px-10 mx-1"
                onClick={handleRename}
              >
                Rename
              </li>
              {selectedAppId !== 3 ? (
                <li
                  className="hover:bg-[#1a6ebf] rounded-sm hover:text-white cursor-pointer relative text-black py-2 px-10 mx-1"
                  onClick={handleMoveToBin}
                >
                  Move to Bin
                </li>
              ) : (
                <>
                  {recycled && recycled.length > 0 ? (
                    <li
                      className="hover:bg-[#1a6ebf] rounded-sm hover:text-white cursor-pointer relative text-black py-2 px-10 mx-1"
                      onClick={() => {
                        if (recycleBinSoundRef.current) {
                          recycleBinSoundRef.current.play();
                        }
                        emptyBin();
                        setMenuVisible(false);
                        setSelectedAppId(null);
                      }}
                    >
                      Empty bin
                    </li>
                  ) : null}
                </>
              )}
            </ul>
          </div>
        ) : null}
      </div>

      <audio
        ref={recycleBinSoundRef}
        src="/sounds/windows-xp-recycle-bin.mp3"
      />

      <Winamp
        onClose={() => console.log("close winamp")}
        onMinimize={() => console.log("minimize winamp")}
      />
    </div>
  );
};

export default Main;
