import { useRef, useState } from "react";

interface AppItem {
  id: number;
  title: string;
  icon: string;
  x: number;
  y: number;
  targetX?: number;
  targetY?: number;
}

const Main = () => {
  const bgImages = ["/xp-bg-opt.jpg", "/xp-bg-opt2.jpg", "/xp-bg-opt3.jpg"];
  const [bgIndex, setBgIndex] = useState(0);
  const [recycleBin, setRecycleBin] = useState<AppItem[]>([]);

  const initialApps: AppItem[] = [
    {
      id: 1,
      title: "Internet Explorer",
      icon: "/desktop-icons/internet-explorer.ico",
      x: 15,
      y: 15,
    },
    {
      id: 2,
      title: "My Computer",
      icon: "/desktop-icons/this-pc.ico",
      x: 15,
      y: 135,
    },
    {
      id: 3,
      title: "Recycle Bin",
      icon: "/desktop-icons/recycle-bin.ico",
      x: 15,
      y: 245,
    },
    {
      id: 4,
      title: "Gta Vice City",
      icon: "/desktop-icons/vice-city.png",
      x: 15,
      y: 355,
    },
    {
      id: 5,
      title: "Messenger",
      icon: "/desktop-icons/messenger.png",
      x: 15,
      y: 475,
    },
    {
      id: 6,
      title: "WINAMP",
      icon: "/desktop-icons/Winamp-logo.png",
      x: 15,
      y: 585,
    },
  ];

  const [apps, setApps] = useState<AppItem[]>([
    {
      id: 1,
      title: "Internet Explorer",
      icon: "/desktop-icons/internet-explorer.ico",
      x: 15,
      y: 15,
    },
    {
      id: 2,
      title: "My Computer",
      icon: "/desktop-icons/this-pc.ico",
      x: 15,
      y: 135,
    },
    {
      id: 3,
      title: "Recycle Bin",
      icon: "/desktop-icons/recycle-bin.ico",
      x: 15,
      y: 245,
    },
    {
      id: 4,
      title: "Gta Vice City",
      icon: "/desktop-icons/vice-city.png",
      x: 15,
      y: 355,
    },
    {
      id: 5,
      title: "Messenger",
      icon: "/desktop-icons/messenger.png",
      x: 15,
      y: 475,
    },
    {
      id: 6,
      title: "WINAMP",
      icon: "/desktop-icons/Winamp-logo.png",
      x: 15,
      y: 585,
    },
  ]);

  const [clickedAppId, setClickedAppId] = useState<number | null>(null);

  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);

  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);

  const recycleBinSoundRef = useRef<HTMLAudioElement>(null);
  const folderOpenSoundRef = useRef<HTMLAudioElement>(null);

  const handleAppClick = (id: number | null) => {
    setClickedAppId(id);
  };

  // Drag işlemleri
  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setDraggingId(id);
    setIsDragging(true);

    const app = apps.find((a) => a.id === id);
    if (!app) return;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setApps((prev) =>
        prev.map((a) =>
          a.id === id
            ? {
                ...a,
                // X ve Y'yi direkt mouse hareketi ile değil
                // ikonun kendi başlangıç pozisyonundan hesapla
                x: a.x + moveEvent.movementX,
                y: a.y + moveEvent.movementY,
              }
            : a
        )
      );
    };

    const handleMouseUp = () => {
      setDraggingId(null);
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

  const handleClick = () => {
    if (menuVisible) setMenuVisible(false);
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
        setRecycleBin((prev) => [...prev, movedApp]);
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
      onClick={() => handleAppClick(null)} // ← burayı ekledik
      onContextMenu={(e) => handleContextMenu(e, null)}
    >
      {apps.map((app) => (
        <div
          onDoubleClick={() => {
            if (folderOpenSoundRef.current) {
              folderOpenSoundRef.current.play();
            }
          }}
          onContextMenu={(e) => handleContextMenu(e, app.id)}
          key={app.id}
          className={`absolute flex flex-col items-center cursor-pointer select-none rounded-md w-[100px]`}
          style={{
            top: draggingId === app.id ? app.y : app.targetY ?? app.y,
            left: draggingId === app.id ? app.x : app.targetX ?? app.x,
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
            className={`text-white px-1 text-sm text-center flex ${
              clickedAppId === app.id ? "bg-[#0d61ff]" : ""
            }`}
          >
            {app.title}
          </span>
        </div>
      ))}

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
            {selectedAppId !== 3 && (
              <li
                className="hover:bg-[#1a6ebf] rounded-sm hover:text-white cursor-pointer relative text-black py-2 px-10 mx-1"
                onClick={handleMoveToBin}
              >
                Move to Bin
              </li>
            )}
          </ul>
        </div>
      ) : null}

      <audio
        ref={recycleBinSoundRef}
        src="/sounds/windows-xp-recycle-bin.mp3"
      />
      <audio ref={folderOpenSoundRef} src="/sounds/folder-open.mp3" />
    </div>
  );
};

export default Main;
