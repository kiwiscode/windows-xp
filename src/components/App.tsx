import TabNavbar from "./TabNavbar";
import type { App as AppType } from "../types/App";
import { useApp } from "../context/AppContext";
import { useEffect, useRef, useState } from "react";
import Winamp from "./Winamp";
import Error from "./Error";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Paint from "./Paint";

const unfocusedAdjustment = "brightness(1.05)";
const OpenedApp = (props: AppType) => {
  const {
    minimizeTab,
    maximizeTab,
    closeTab,
    activeApp,
    setActiveApp,
    openedApps,
    setOpenedApps,
    isTabDragging,
    setIsTabDragging,
    isNavbarTabClicked,
    globalErrorMessage,
    focusedAppId,
    setFocusedAppId,
  } = useApp();
  const { width } = useWindowDimensions();
  const isMobile = width <= 768;
  const [showWinamp, setShowMinamp] = useState<boolean>(false);
  const [isMinimizing, setIsMinimizing] = useState<boolean>(false);
  const tabRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setIsTabDragging(true);

    const isTabExist = openedApps.find((t) => t.id === id);
    if (!isTabExist) return;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setOpenedApps((prev) =>
        prev.map((t) => {
          if (t.id === id) {
            let newX = t.x + moveEvent.movementX;
            let newY = t.y + moveEvent.movementY;

            const tabWidth = tabRef.current?.offsetWidth || 700;
            const tabHeight = tabRef.current?.offsetHeight || 500;

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // Prevent the dragged tab from going outside the window
            if (newX < tabWidth / 2) newX = tabWidth / 2;
            if (newX > windowWidth - tabWidth / 2)
              newX = windowWidth - tabWidth / 2;
            if (newY < tabHeight / 2) newY = tabHeight / 2;
            if (newY > windowHeight - tabHeight / 2)
              newY = windowHeight - tabHeight / 2;

            return {
              ...t,
              x: newX,
              y: newY,
            };
          }
          return t;
        })
      );
    };

    const handleMouseUp = () => {
      setIsTabDragging(false);

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const winampCallback = (data: boolean) => {
    setShowMinamp(data);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isNavbarTabClicked) return;

      const target = event.target as Node;
      if (tabRef.current && !tabRef.current.contains(target)) {
        setActiveApp(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeApp]);

  return (
    <div
      ref={tabRef}
      onMouseDown={(e) => {
        e.stopPropagation();
        setActiveApp(props.title);
        setFocusedAppId(props.id);
      }}
      style={{
        left:
          props.title === "error" && isMobile
            ? props.x
            : !props.showHeader
            ? 0
            : props.maximize || isMobile
            ? 0
            : props.x,

        top:
          props.title === "error" && isMobile
            ? props.y
            : !props.showHeader
            ? 0
            : props.maximize || isMobile
            ? 0
            : props.y,

        width:
          props.title === "error" && !isMobile
            ? "380px"
            : props.title === "error" && isMobile
            ? "290px"
            : !props.showHeader
            ? "auto"
            : props.maximize || isMobile
            ? window.innerWidth
            : "700px",

        height:
          props.title === "error"
            ? "auto"
            : !props.showHeader
            ? "auto"
            : props.maximize || isMobile
            ? window.innerHeight - 30
            : "500px",

        transform:
          props.title === "error" && isMobile
            ? "translate(-50%, -50%)"
            : !props.showHeader
            ? "translate(0px, 0px)"
            : props.maximize || isMobile
            ? undefined
            : "translate(-50%, -50%)",

        zIndex: props.zIndex,
        // transition: !isTabDragging || isMinimizing ? "all 0.3s" : "none",
        position: "absolute",
        padding: !props.showHeader ? 0 : "3px",
        // backgroundColor: activeApp === props.title ? "#0831d9" : "#6582f5",
        backgroundColor: focusedAppId === props.id ? "#0831d9" : "#6582f5",
        display: !props.minimized ? "flex" : "none",
        flexDirection: "column",
        borderTopLeftRadius: props.maximize || isMobile ? "0px" : "8px",
        borderTopRightRadius: props.maximize || isMobile ? "0px" : "8px",
      }}
    >
      {/* holder header */}
      <div
        className={`header__bg 
    absolute
    after:block
    before:content-['']
    before:absolute
    before:inset-y-0
    before:left-0
    before:w-[15px]
    before:bg-gradient-to-r
    before:from-[#1638e6]
    before:to-transparent
    ${focusedAppId === props.id ? "before:opacity-100" : "before:opacity-30"}
    after:content-['']
    after:absolute
    after:inset-y-0
    after:right-0
    after:w-[15px]
    after:bg-gradient-to-l
    after:from-[#1638e6]
    after:to-transparent
    ${focusedAppId === props.id ? "after:opacity-100" : "after:opacity-40"}
  `}
        style={{
          background:
            // activeApp === props.title
            //   ? "linear-gradient(to bottom,#0058ee 0%,#3593ff 4%,#288eff 6%,#127dff 8%,#036ffc 10%,#0262ee 14%,#0057e5 20%,#0054e3 24%,#0055eb 56%,#005bf5 66%,#026afe 76%,#0062ef 86%,#0052d6 92%,#0040ab 94%,#003092 100%)"
            //   : "linear-gradient(to bottom, #7697e7 0%,#7e9ee3 3%,#94afe8 6%,#97b4e9 8%,#82a5e4 14%,#7c9fe2 17%,#7996de 25%,#7b99e1 56%,#82a9e9 81%,#80a5e7 89%,#7b96e1 94%,#7a93df 97%,#abbae3 100%)",
            focusedAppId === props.id
              ? "linear-gradient(to bottom,#0058ee 0%,#3593ff 4%,#288eff 6%,#127dff 8%,#036ffc 10%,#0262ee 14%,#0057e5 20%,#0054e3 24%,#0055eb 56%,#005bf5 66%,#026afe 76%,#0062ef 86%,#0052d6 92%,#0040ab 94%,#003092 100%)"
              : "linear-gradient(to bottom, #7697e7 0%,#7e9ee3 3%,#94afe8 6%,#97b4e9 8%,#82a5e4 14%,#7c9fe2 17%,#7996de 25%,#7b99e1 56%,#82a9e9 81%,#80a5e7 89%,#7b96e1 94%,#7a93df 97%,#abbae3 100%)",
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          height: "28px",
          pointerEvents: "none",
          borderTopLeftRadius: props.maximize ? "0px" : "8px",
          borderTopRightRadius: props.maximize ? "0px" : "8px",
          overflow: "hidden",
        }}
      />
      {/* real header */}

      <header
        onMouseDown={(e) => {
          handleMouseDown(e, props.id);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          if (props.resizable === false) return;
          maximizeTab(props.title);
        }}
        className={`app__header ${
          !props.showHeader ? "hidden" : "flex"
        }  h-[25px] leading-[25px] font-bold text-[12px] text-white absolute left-[3px] right-[3px] items-center`}
        style={{
          textShadow: "1px 1px #000",
        }}
      >
        {!props.prompt && (
          <img
            width={15}
            height={15}
            alt="icon"
            src={props.icon}
            className="ml-[1px] mr-[3px]"
          />
        )}
        <div
          className="flex-1 pointer-events-none pr-[5px] overflow-hidden whitespace-nowrap overflow-ellipsis"
          style={{ textShadow: "1px 1px rgb(0 0 0)", letterSpacing: "0.5px" }}
        >
          {props.title === "error" ? `C:\\` : props.title}
        </div>

        <div className="h-[22px] flex items-center mt-[-1px] mr-[1px]">
          {props.resizable !== false && (
            <>
              {!props.prompt && (
                <div
                  onClick={() => {
                    setIsMinimizing(true);
                    minimizeTab(props.title);
                  }}
                  style={{
                    filter: activeApp == props.title ? "" : unfocusedAdjustment,
                  }}
                  className="tab-minimise"
                />
              )}
              {!props.prompt && !isMobile && (
                <div
                  onClick={() => maximizeTab(props.title)}
                  style={{
                    filter: activeApp == props.title ? "" : unfocusedAdjustment,
                  }}
                  className={props.maximize ? "tab-resize" : "tab-maximise"}
                />
              )}
            </>
          )}
          <div
            onClick={() => closeTab(props.id)}
            style={{
              filter: activeApp == props.title ? "" : unfocusedAdjustment,
            }}
            className="tab-close"
          />
        </div>
      </header>

      <div
        className="app__content flex-1 relative mt-[25px]"
        style={{
          height: "calc(100% - 25px)",
        }}
      >
        {props.title === "error" ? (
          <Error
            _onClose={() => closeTab(props.id)}
            errorMessage={globalErrorMessage || "C:\\\nError UNKNOWN"}
          />
        ) : props.title === "Paint" ? (
          <Paint isFocus={false} />
        ) : props.title === "Winamp" ? (
          <Winamp reopen={showWinamp} close={showWinamp} cb={winampCallback} />
        ) : (
          <div className="h-full w-full absolute flex overflow-hidden flex-col bg-[linear-gradient(to_right,#edede5_0%,#ede8cd_100%)]">
            {/* tab navbar */}
            {!props.prompt && (
              <TabNavbar title={props.title} icon={props.icon} />
            )}

            {/* tab content */}
            {props.children}
          </div>
        )}
      </div>
    </div>
  );
};
export default OpenedApp;
