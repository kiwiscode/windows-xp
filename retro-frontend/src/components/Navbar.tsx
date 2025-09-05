import { useEffect, useRef, useState } from "react";
import { UserRound } from "lucide-react";
import ShutDownScreen from "./ShutDownScreen";
import { useApp } from "../context/AppContext";

interface NavbarProps {
  tabRefs: React.RefObject<(HTMLDivElement | null)[]>;
  setTabRef: (index: number, el: HTMLDivElement | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({ tabRefs, setTabRef }) => {
  const [isShuttingDown, setIsShuttingDown] = useState<boolean>(false);
  const [showStartBar, setShowStartBar] = useState<boolean>(false);
  const [showShutDownScreen, setShowShutDownScreen] = useState<boolean>(false);

  const {
    openedTabs,
    activeTab,
    fromNavbar,
    setActiveTab,
    minimizeTab,
    setOpenedTabs,
  } = useApp();

  const soundRef = useRef<HTMLAudioElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const startBtnRef = useRef<HTMLDivElement>(null);

  const shutDown = () => {
    setShowStartBar(!showStartBar);
    setIsShuttingDown(true);

    setTimeout(() => {
      setShowShutDownScreen(true);
    }, 1000);

    setTimeout(() => {
      if (soundRef.current) {
        soundRef.current.play();
      }
    }, 1500);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        // showStartBar &&
        navRef.current &&
        !navRef.current.contains(target) &&
        startBtnRef.current &&
        !startBtnRef.current.contains(target)
      ) {
        setShowStartBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showStartBar]);

  useEffect(() => {
    tabRefs.current.forEach((tab, index) => {
      if (tab) {
        const rect = tab.getBoundingClientRect();
        console.log(
          `Tab ${index} position:`,
          rect.x,
          rect.y,
          rect.width,
          rect.height
        );
      }
    });
  }, [openedTabs]);

  return (
    <>
      {showShutDownScreen && <ShutDownScreen />}
      <nav
        ref={navRef}
        className={`z-20 max-md:w-[50vw] md:w-[400px] h-[80vh] absolute ${
          !showStartBar ? "-left-[403px]" : "left-0"
        }  bottom-[30px] rounded-t-md transition-all duration-300 shadow-2xl border-r-3 border-[#245DDA]`}
        style={{
          backgroundColor: "rgb(66, 130, 214)",
        }}
      >
        {/* header */}
        <div
          className="w-full h-[80px] bg-transparent rounded-t-md flex relative"
          style={{
            background: `linear-gradient(
      0deg,
      rgb(24, 104, 206) 0%,
      rgb(14, 96, 203) 12%,
      rgb(14, 96, 203) 20%,
      rgb(17, 100, 207) 32%,
      rgb(22, 103, 207) 33%,
      rgb(27, 108, 211) 47%,
      rgb(30, 112, 217) 54%,
      rgb(36, 118, 220) 60%,
      rgb(41, 122, 224) 65%,
      rgb(52, 130, 227) 77%,
      rgb(55, 134, 229) 79%,
      rgb(66, 142, 233) 90%,
      rgb(71, 145, 235) 100%
    )`,
          }}
        >
          <div
            className="h-[4px] w-full absolute bottom-0"
            style={{
              background:
                "linear-gradient(to right, transparent 10%, orange 50%, transparent 100%)",
            }}
          ></div>

          <div className="ml-2 flex items-center gap-4">
            <div className="w-[60px] h-[60px] bg-[#666666] rounded-sm border flex items-center justify-center">
              <UserRound color="white" size={26} />
            </div>
            <div className="font-bold text-[22px] text-white">Gen Y</div>
          </div>
        </div>
        {/* mid content */}
        <div className="w-full h-[68vh]  grid grid-cols-12">
          {/* left */}
          <div className="w-50vw h-[full] bg-white max-md:col-span-12 md:col-span-6 border-r border-[#9bc0ef]">
            asd
          </div>
          {/* right */}
          <div className="h-full bg-[#d3e5fa] max-md:col-span-12 md:col-span-6 flex items-center justify-center">
            {/* bottom shut down btn */}
            <div className="mt-auto mb-2 w-full mx-2">
              <div className="border-t border-[#9ec1f6] cursor-pointer">
                <div
                  className="flex gap-2 mt-1 items-center hover:bg-[#1a6ebf] hover:text-white py-2 px-2 rounded-sm"
                  onClick={shutDown}
                >
                  <img
                    src="/navbar-icons/237.ico"
                    width={30}
                    height={30}
                    alt=""
                  />
                  <div className="text-[14px]">Shut Down...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <nav
        onClick={() => {
          fromNavbar(false);
        }}
        className={`fixed w-full h-[35px] bg-[#245DDA] ${
          isShuttingDown ? "-bottom-[40px]" : "bottom-0"
        } right-0 left-0 transition-all duration-300`}
        style={{
          boxShadow: "inset 0 8px 12px -8px #233357", // üst gölge
          background: `linear-gradient(
      rgb(31, 47, 134) 0px,
      rgb(49, 101, 196) 3%,
      rgb(54, 130, 229) 6%,
      rgb(68, 144, 230) 10%,
      rgb(56, 131, 229) 12%,
      rgb(43, 113, 224) 15%,
      rgb(38, 99, 218) 18%,
      rgb(35, 91, 214) 20%,
      rgb(34, 88, 213) 23%,
      rgb(33, 87, 214) 38%,
      rgb(36, 93, 219) 54%,
      rgb(37, 98, 223) 86%,
      rgb(36, 95, 220) 89%,
      rgb(33, 88, 212) 92%,
      rgb(29, 78, 192) 95%,
      rgb(25, 65, 165) 98%
    )`,
        }}
      >
        <div className="flex">
          <div
            ref={startBtnRef}
            className="cursor-pointer w-[120px] h-[35px] outline-0"
            onClick={() => setShowStartBar(!showStartBar)}
          >
            <img
              src="/navbar-icons/xp-start-btn.png"
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex justify-start items-center w-[80%] h-[35px]">
            {openedTabs
              .filter((tab) => tab.prompt !== true)
              .map((t, i) => (
                <div
                  ref={(el) => setTabRef(i, el)}
                  onClick={(e) => {
                    e.stopPropagation();
                    fromNavbar(true);
                    console.log("works");
                    if (activeTab === t.id) {
                      minimizeTab(t.id);
                    } else {
                      setActiveTab(t.id);
                      setOpenedTabs((prev) =>
                        prev.map((tab) =>
                          tab.id === t.id ? { ...tab, minimized: false } : tab
                        )
                      );
                    }
                  }}
                  className={`
                    overflow-ellipsis relative flex items-center mt-[2px] mb-[1px]  max-w-[200px] h-[30px] cursor-default rounded-[2px] overflow-hidden whitespace-nowrap active:shadow_[box-shadow: rgb(0 0 0 / 20%) 0px 0px 1px 1px inset,
    rgb(0 0 0 / 70%) 1px 0px 1px inset] hover:brightness-[120%]
                    `}
                  style={{
                    flex: "2 2 0%",
                    backgroundColor:
                      t.id === activeTab
                        ? "rgb(30, 82, 183)"
                        : "rgb(60, 129, 243)",
                    boxShadow:
                      t.id === activeTab
                        ? `rgb(0 0 0 / 20%) 0px 0px 1px 1px inset, rgb(0 0 0 / 70%) 1px 0px 1px inset`
                        : `rgb(0 0 0 / 30%) -1px 0px inset, rgb(255 255 255 / 20%) 1px 1px 1px inset`,
                  }}
                >
                  <img
                    width={20}
                    height={20}
                    alt="icon"
                    className="mx-[10px]"
                    src={t.icon}
                  />
                  <div className="text-white text-[14px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {t.title}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </nav>

      <audio ref={soundRef} src="/sounds/xp-shut-down.mp3" />
    </>
  );
};

export default Navbar;
