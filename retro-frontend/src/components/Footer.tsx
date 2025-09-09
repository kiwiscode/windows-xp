import { useEffect, useRef, useState } from "react";
import { UserRound } from "lucide-react";
import ShutDownScreen from "./ShutDownScreen";
import { useApp } from "../context/AppContext";
import { renderTime } from "../utils/navbarTime";

import sound from "/navbar-icons/sound.png";
import usb from "/navbar-icons/usb.png";
import risk from "/navbar-icons/risk.png";
import RiskPopup from "./RiskPopup";

const Footer: React.FC = () => {
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
    <footer
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
              key={t.id | i}
              onClick={(e) => {
                e.stopPropagation();
                fromNavbar(true);
                setActiveApp(t.title);

                if (activeApp === t.title) {
                  minimizeTab(t.title);
                } else {
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
      <audio ref={soundRef} src="/sounds/xp-shut-down.mp3" />
    </footer>
  );
};

export default Footer;
