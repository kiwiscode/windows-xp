import { useEffect, useRef, useState } from "react";
import { UserRound } from "lucide-react";
import ShutDownScreen from "./ShutDownScreen";
import { useApp } from "../context/AppContext";
import { renderTime } from "../utils/navbarTime";

import sound from "/navbar-icons/sound.png";
import usb from "/navbar-icons/usb.png";
import risk from "/navbar-icons/risk.png";
import RiskPopup from "./RiskPopup";

interface NavbarProps {
  tabRefs: React.RefObject<(HTMLDivElement | null)[]>;
  setTabRef: (index: number, el: HTMLDivElement | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({ tabRefs, setTabRef }) => {
  const [isShuttingDown, setIsShuttingDown] = useState<boolean>(false);
  const [showStartBar, setShowStartBar] = useState<boolean>(false);
  const [showShutDownScreen, setShowShutDownScreen] = useState<boolean>(false);

  const {
    openedApps,
    activeApp,
    fromNavbar,
    setActiveApp,
    minimizeTab,
    setOpenedApps,
  } = useApp();

  const soundRef = useRef<HTMLAudioElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const startBtnRef = useRef<HTMLImageElement>(null);

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
        className={`h-[30px] absolute bottom-0 left-0 right-0 flex ${
          isShuttingDown ? "-bottom-[40px]" : "bottom-0"
        } transition-all duration-300`}
        style={{
          background: `linear-gradient(
    to bottom,
    #1f2f86 0,
    #3165c4 3%,
    #3682e5 6%,
    #4490e6 10%,
    #3883e5 12%,
    #2b71e0 15%,
    #2663da 18%,
    #235bd6 20%,
    #2258d5 23%,
    #2157d6 38%,
    #245ddb 54%,
    #2562df 86%,
    #245fdc 89%,
    #2158d4 92%,
    #1d4ec0 95%,
    #1941a5 98%
  )`,
        }}
      >
        <div className="h-full flex-1 overflow-hidden flex items-center">
          <img
            ref={startBtnRef}
            onClick={() => setShowStartBar(!showStartBar)}
            src="/navbar-icons/xp-start-btn.png"
            alt=""
            className="h-full mr-[10px] relative hover:brightness-[105%] active:brightness-[85%] active:pointer-none:"
          />

          {openedApps
            .filter((tab) => tab.prompt !== true)
            .map((t, i) => (
              <div
                ref={(el) => setTabRef(i, el)}
                onClick={(e) => {
                  e.stopPropagation();
                  fromNavbar(true);
                  if (activeApp === t.title) {
                    minimizeTab(t.title);
                  } else {
                    setActiveApp(t.title);
                    setOpenedApps((prev) =>
                      prev.map((tab) =>
                        tab.id === t.id ? { ...tab, minimized: false } : tab
                      )
                    );
                  }
                }}
                style={{
                  boxShadow:
                    t.title === activeApp
                      ? `rgb(0 0 0 / 20%) 0px 0px 1px 1px inset, rgb(0 0 0 / 70%) 1px 0px 1px inset`
                      : `rgb(0 0 0 / 30%) -1px 0px inset, rgb(255 255 255 / 20%) 1px 1px 1px inset`,
                }}
                className={`
    cursor-default flex-1 max-w-[150px] text-white rounded-[2px] mt-[2px] px-[8px] h-[22px] text-[11px]
    relative flex items-center 
    ${
      t.title === activeApp
        ? "bg-[rgb(30,82,183)] hover:bg-[#184293] shadow-[rgb(0_0_0/20%)_0px_0px_1px_1px_inset,_rgb(0_0_0/70%)_1px_0px_1px_inset] hover:shadow-[rgb(0_0_0/30%)_-1px_0px_inset,_rgb(255_255_255/20%)_1px_1px_1px_inset]"
        : "bg-[rgb(60,129,243)] hover:bg-[#2f6dd1] shadow-[rgb(0_0_0/30%)_-1px_0px_inset,_rgb(255_255_255/20%)_1px_1px_1px_inset] hover:shadow-[rgb(0_0_0/20%)_0px_0px_1px_1px_inset,_rgb(0_0_0/70%)_1px_0px_1px_inset]"
    }
  `}
              >
                <img width={15} height={15} alt="icon" src={t.icon} />
                <div className="absolute left-[27px] right-[8px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {t.title}
                </div>
              </div>
            ))}
        </div>
        <div
          className="bg-[#0b77e9] shrink-0  px-[10px] ml-[10px] flex items-center"
          style={{
            borderLeft: "1px solid #1042af",
            boxShadow: "inset 1px 0 1px #18bbff",
            background: `linear-gradient(
      to bottom,
      #0c59b9 1%,
      #139ee9 6%,
      #18b5f2 10%,
      #139beb 14%,
      #1290e8 19%,
      #0d8dea 63%,
      #0d9ff1 81%,
      #0f9eed 88%,
      #119be9 91%,
      #1392e2 94%,
      #137ed7 97%,
      #095bc9 100%
    )`,
          }}
        >
          <img width={15} height={15} src={sound} alt="" />
          <img width={15} height={15} src={usb} alt="" />
          <img width={15} height={15} src={risk} alt="" />
          <div style={{ position: "relative", width: 0, height: 0 }}>
            <RiskPopup />
          </div>
          <div className="mx-[5px] text-white text-[11px] font-light shadow-none">
            {renderTime()}
          </div>
        </div>
      </nav>

      <audio ref={soundRef} src="/sounds/xp-shut-down.mp3" />
    </>
  );
};

export default Navbar;
