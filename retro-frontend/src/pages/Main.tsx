import { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import type { AppItem } from "../types/AppItem";
import Winamp from "../components/Winamp";
import { initialApps } from "../data/initialApps";
import OpenedApp from "../components/App";

const Main = () => {
  const bgImages = ["/xp-bg-opt.jpg", "/xp-bg-opt2.jpg", "/xp-bg-opt3.jpg"];
  const [showWinamp, setShowMinamp] = useState<boolean>(false);

  const winampCallback = (data: boolean) => {
    setShowMinamp(data);
  };

  const [bgIndex, setBgIndex] = useState(0);
  const {
    recycled,
    setRecycled,
    emptyBin,
    apps,
    setApps,
    setActiveApp,
    fromNavbar,
    openedApps,
  } = useApp();

  const [clickedAppId, setClickedAppId] = useState<number | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);

  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const [selectedAppTitle, setSelectedAppTitle] = useState<string | null>(null);

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
  const handleContextMenu = (e: React.MouseEvent, appTitle: string | null) => {
    e.preventDefault();
    setMenuVisible(true);
    setMenuX(e.clientX);
    setMenuY(e.clientY);

    if (appTitle) {
      setSelectedAppTitle(appTitle);
    }
  };

  const handleSortByName = () => {
    setIsDragging(false);
    setApps(initialApps);
    setMenuVisible(false);
  };

  const handleRename = () => {
    if (selectedAppTitle !== null) {
      const newName = prompt("Enter new name:");
      if (newName) {
        setApps((prev) =>
          prev.map((app) =>
            app.title === selectedAppTitle ? { ...app, title: newName } : app
          )
        );
      }
    }
    setMenuVisible(false);
    setSelectedAppTitle(null);
  };

  const handleMoveToBin = () => {
    if (selectedAppTitle !== null) {
      const movedApp = apps.find((app) => app.title === selectedAppTitle);
      if (movedApp) {
        if (recycleBinSoundRef.current) {
          recycleBinSoundRef.current.play();
        }
        setRecycled((prev: AppItem[]) => [...prev, movedApp]);
        setApps((prev) => prev.filter((app) => app.title !== selectedAppTitle));
      }
    }
    setMenuVisible(false);
    setSelectedAppTitle(null);
  };

  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [tabMeasurements, setTabMeasurements] = useState<
    { x: number; y: number; width: number; height: number }[]
  >([]);

  useEffect(() => {
    const measurements = openedApps.map((_, index) => {
      const el = tabRefs.current[index];
      if (el) {
        const rect = el.getBoundingClientRect();
        return {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        };
      }
      return { x: 0, y: 0, width: 0, height: 0 };
    });
    setTabMeasurements(measurements);
  }, [openedApps]);

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
            setActiveApp(app.title);
            if (app.id === 6) {
              setShowMinamp(true);
            }
          }}
          onContextMenu={(e) => handleContextMenu(e, app.title)}
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
          <img
            src={app.icon}
            alt={app.title}
            className="w-[32px] h-[32px] mb-1"
          />
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
        {menuVisible && !selectedAppTitle ? (
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
        ) : menuVisible && selectedAppTitle ? (
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
              {selectedAppTitle !== "Recycle Bin" ? (
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
                        setSelectedAppTitle(null);
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

      {openedApps.map((t, i) => {
        if (t.minimized || t.programType === "winamp") {
          return (
            <Winamp
              key={t.id || i}
              close={showWinamp}
              reopen={showWinamp}
              cb={winampCallback}
            />
          );
        }

        return (
          <OpenedApp
            key={t.id}
            id={t.id}
            title={t.title}
            icon={t.icon}
            zIndex={t.zIndex}
            programType={t.programType}
            minimized={t.minimized}
            maximize={t.maximize}
            prompt={t.prompt}
            x={t.x}
            y={t.y}
            targetX={t.targetX}
            targetY={t.targetY}
            measurements={tabMeasurements[i]}
          >
            {t.children}
          </OpenedApp>
        );
      })}
    </div>
  );
};

export default Main;
