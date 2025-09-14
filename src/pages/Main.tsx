import { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { desktopApps } from "../data/desktopApps";
import OpenedApp from "../components/App";
import Footer from "../components/Footer";
import type { DesktopApp } from "../types/DesktopApp";
import Modal from "../components/Modal";
import type { ModalAction } from "../types/Modal";
import ShutDownScreen from "../components/ShutDownScreen";
import OpenXpScreen from "../components/OpenXpScreen";
import StartScreen from "../components/StartScreen";
import StandByScreen from "../components/StandByScreen";
import SwitchUserScreen from "../components/SwitchUserScreen";
import GameComponent from "../components/Game";

const Main = () => {
  const bgImages = ["/xp-bg-opt.jpg", "/xp-bg-opt2.jpg", "/xp-bg-opt3.jpg"];

  const {
    recycled,
    setRecycled,
    emptyBin,
    apps,
    setApps,
    openedApps,
    addTab,
    showPowerModal,
    setShowPowerModal,
    modalMode,
    modalAction,
    setModalAction,
    showOpenScreen,
    showStartScreen,
    showStandByScreen,
    showSwitchUserScreen,
    isDragging,
    setIsDragging,
    activeGame,
    setActiveGame,
  } = useApp();

  const [clickedAppId, setClickedAppId] = useState<number | null>(null);

  const [menuVisible, setMenuVisible] = useState<boolean>(false);

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

    const app = apps.find((a) => a.id === id);
    if (!app) return;

    setIsDragging(app?.id);

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
      setIsDragging(null);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleSortByName = () => {
    setIsDragging(null);
    setApps(desktopApps);
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
        setRecycled((prev: DesktopApp[]) => [...prev, movedApp]);
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

  useEffect(() => {
    setApps(
      desktopApps
        .filter((app) => {
          if (app.title === "Recycle Bin") {
            return recycled.length > 0
              ? app.icon.includes("full")
              : app.icon.includes("recycle-bin.ico");
          }
          return true;
        })
        .map((app) => {
          if (app.title === "Recycle Bin") {
            return {
              ...app,
              show: true,
            };
          }
          return app;
        })
    );
  }, [recycled]);

  return (
    <>
      {activeGame ? (
        <GameComponent game={activeGame} />
      ) : showSwitchUserScreen ? (
        <SwitchUserScreen />
      ) : showStandByScreen ? (
        <StandByScreen />
      ) : showStartScreen ? (
        <StartScreen />
      ) : showOpenScreen ? (
        <OpenXpScreen />
      ) : modalAction ? (
        <ShutDownScreen />
      ) : (
        <div
          className="h-full overflow-hidden relative bg-cover bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `url(${bgImages[0]}) `,
          }}
        >
          {showPowerModal && (
            <Modal
              mode={modalMode}
              onClose={() => setShowPowerModal(false)}
              onClickButton={(data: ModalAction) => {
                setModalAction(data);
              }}
            />
          )}

          <div>
            {/* desktop apps */}
            <div
              className="absolute w-full h-full"
              onClick={() => setClickedAppId(null)}
            >
              {apps.map((app) => {
                if ("show" in app && !app.show) return null;
                return (
                  <div
                    onDoubleClick={() => {
                      setClickedAppId(null);
                      if (app.isGame) {
                        switch (app.title) {
                          case "Gta Vice City":
                          case "Cs 1.6":
                          case "Max Payne":
                            setActiveGame(app.title);
                            break;

                          default:
                            break;
                        }
                      } else {
                        addTab(app.title);
                      }
                    }}
                    key={app.id}
                    className={`absolute flex flex-col items-center cursor-pointer select-none rounded-md w-[100px]`}
                    style={{
                      left: app.x,
                      top: app.y,
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
                );
              })}
            </div>

            {/* right click options */}
            <div className="bg-black" ref={menuRef}>
              {menuVisible && !selectedAppTitle ? (
                <div
                  className="absolute bg-[#f9f9f9] rounded-md min-w-[280px] text-black shadow-lg z-50"
                  style={{
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
                          setApps(desktopApps);
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
          </div>

          {/* app content */}
          <div className="relative z-0">
            {openedApps.map((t, i) => {
              return (
                <OpenedApp
                  key={t.id || i}
                  id={t.id}
                  title={t.title}
                  icon={t.icon}
                  resizable={t.resizable}
                  zIndex={t.zIndex}
                  showHeader={t.showHeader}
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

          <Footer />
        </div>
      )}
    </>
  );
};

export default Main;
