import TabNavbar from "./TabNavbar";
import type { App as AppType } from "../types/App";
import { useApp } from "../context/AppContext";
import { useEffect, useRef, useState } from "react";

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
  } = useApp();

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
      }}
      style={{
        left: props.maximize ? 0 : props.x,

        top: props.maximize ? 0 : props.y,

        transform: props.maximize ? undefined : "translate(-50%, -50%)",

        width: props.maximize ? window.innerWidth - 3 : "700px",

        height: props.maximize ? window.innerHeight - 36 : "500px",

        zIndex: activeApp === props.title ? 11 : props.zIndex,
        // transition: !isTabDragging || isMinimizing ? "all 0.3s" : "none",
        position: "absolute",
        padding: "3px",
        backgroundColor: activeApp === props.title ? "#0831d9" : "#6582f5",
        display: "flex",
        flexDirection: "column",
        borderTopLeftRadius: props.maximize ? "0px" : "8px",
        borderTopRightRadius: props.maximize ? "0px" : "8px",
      }}
    >
      {/* holder header */}
      <div
        className={`
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
    ${activeApp === props.title ? "before:opacity-100" : "before:opacity-30"}
    after:content-['']
    after:absolute
    after:inset-y-0
    after:right-0
    after:w-[15px]
    after:bg-gradient-to-l
    after:from-[#1638e6]
    after:to-transparent
    ${activeApp === props.title ? "after:opacity-100" : "after:opacity-40"}
  `}
        style={{
          background:
            activeApp === props.title
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
      <div
        onMouseDown={(e) => {
          handleMouseDown(e, props.id);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          maximizeTab(props.title);
        }}
        className={
          "flex h-[25px] leading-[25px] font-bold text-[12px] text-white absolute left-[3px] right-[3px] items-center"
        }
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
          {props.title}
        </div>

        <div className="h-[22px] flex items-center mt-[-1px] mr-[1px]">
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
          {!props.prompt && (
            <div
              onClick={() => maximizeTab(props.title)}
              style={{
                filter: activeApp == props.title ? "" : unfocusedAdjustment,
              }}
              className={props.maximize ? "tab-resize" : "tab-maximise"}
            />
          )}
          <div
            onClick={() => closeTab(props.title)}
            style={{
              filter: activeApp == props.title ? "" : unfocusedAdjustment,
            }}
            className="tab-close"
          />
        </div>
      </div>

      <div
        className="flex-1 relative mt-[25px]"
        style={{
          height: "calc(100% - 25px)",
        }}
      >
        <div className="h-full w-full absolute flex overflow-hidden flex-col bg-[linear-gradient(to_right,#edede5_0%,#ede8cd_100%)]">
          {/* tab navbar */}
          {!props.prompt && (
            <TabNavbar
              title={props.title}
              icon={props.icon}
              programType={props.programType}
            />
          )}

          {/* tab content */}
          {props.children}
        </div>
      </div>
    </div>
  );
};
export default OpenedApp;
