import TabNavbar from "./TabNavbar";
import type { Tab as TabType } from "../types/Tab";
import { useApp } from "../context/AppContext";
import { useEffect, useRef, useState } from "react";

const unfocusedAdjustment = "brightness(1.05)";
const Tab = (props: TabType) => {
  const {
    minimizeTab,
    maximizeTab,
    closeTab,
    activeTab,
    setActiveTab,
    openedTabs,
    setOpenedTabs,
    isTabDragging,
    setIsTabDragging,
    isNavbarTabClicked,
  } = useApp();

  const [isMinimizing, setIsMinimizing] = useState<boolean>(false);
  const tabRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setIsTabDragging(true);

    const isTabExist = openedTabs.find((t) => t.id === id);
    if (!isTabExist) return;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setOpenedTabs((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                x: t.x + moveEvent.movementX,
                y: t.y + moveEvent.movementY,
              }
            : t
        )
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

  console.log(props.x);
  console.log(props.y);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isNavbarTabClicked) return;

      const target = event.target as Node;
      if (tabRef.current && !tabRef.current.contains(target)) {
        setActiveTab(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeTab]);

  return (
    <div
      ref={tabRef}
      onMouseDown={(e) => {
        e.stopPropagation();
        setActiveTab(props.id);
      }}
      className="absolute"
      style={{
        left: props.maximize ? 0 : props.x,

        top: props.maximize ? 0 : props.y,

        transform: props.maximize ? undefined : "translate(-50%, -50%)",

        width: props.maximize ? "100%" : "50vw",

        height: props.maximize ? "90%" : "50vh",

        zIndex: activeTab === props.id ? 11 : props.zIndex,
        transition: !isTabDragging || isMinimizing ? "all 0.3s" : "none",
      }}
    >
      <div
        onMouseDown={(e) => {
          handleMouseDown(e, props.id);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          maximizeTab(props.id);
        }}
        className={
          "h-[35px]  rounded-tr-[8px] rounded-tl-[8px] bg-[#5c5c5c] text-white flex items-center justify-between z-10"
        }
        style={{
          pointerEvents: "auto",
          background:
            activeTab == props.id
              ? `
                linear-gradient(
    rgb(0, 88, 238) 0%,
    rgb(53, 147, 255) 4%,
    rgb(40, 142, 255) 6%,
    rgb(18, 125, 255) 8%,
    rgb(3, 111, 252) 10%,
    rgb(2, 98, 238) 14%,
    rgb(0, 87, 229) 20%,
    rgb(0, 84, 227) 24%,
    rgb(0, 85, 235) 56%,
    rgb(0, 91, 245) 66%,
    rgb(2, 106, 254) 76%,
    rgb(0, 98, 239) 86%,
    rgb(0, 82, 214) 92%,
    rgb(0, 64, 171) 94%,
    rgb(0, 48, 146) 100%
  )
            `
              : `linear-gradient(
      rgb(118, 151, 231) 0%,
      rgb(126, 158, 227) 3%,
      rgb(148, 175, 232) 6%,
      rgb(151, 180, 233) 8%,
      rgb(130, 165, 228) 14%,
      rgb(124, 159, 226) 17%,
      rgb(121, 150, 222) 25%,
      rgb(123, 153, 225) 56%,
      rgb(130, 169, 233) 81%,
      rgb(128, 165, 231) 89%,
      rgb(123, 150, 225) 94%,
      rgb(122, 147, 223) 97%,
      rgb(171, 186, 227) 100%
    )`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
          className="handle"
        >
          {!props.prompt && (
            <img
              width={20}
              height={20}
              alt="icon"
              src={props.icon}
              className="ml-[8px]"
            />
          )}
          <div
            className="text-[14px] font-bold ml-[5px]"
            style={{ textShadow: "1px 1px rgb(0 0 0)" }}
          >
            {props.title}
          </div>
        </div>
        <div className="flex items-center">
          {!props.prompt && (
            <div
              onClick={() => {
                setIsMinimizing(true);
                minimizeTab(props.id);
              }}
              style={{
                filter: activeTab == props.id ? "" : unfocusedAdjustment,
              }}
              className="tab-minimise"
            />
          )}
          {!props.prompt && (
            <div
              onClick={() => maximizeTab(props.id)}
              style={{
                filter: activeTab == props.id ? "" : unfocusedAdjustment,
              }}
              className={props.maximize ? "tab-resize" : "tab-maximise"}
            />
          )}
          <div
            onClick={() => closeTab(props.id)}
            style={{
              filter: activeTab == props.id ? "" : unfocusedAdjustment,
            }}
            className="tab-close"
          />
        </div>
      </div>

      <div
        className="flex px-[4px] pb-[4px] h-full transition-all duration-300"
        style={{
          backgroundColor:
            activeTab == props.id ? "rgb(8, 49, 217)" : "rgb(117, 135, 221)",
        }}
      >
        <div className="flex flex-col bg-white h-full w-full">
          {!props.prompt && (
            <TabNavbar
              title={props.title}
              icon={props.icon}
              programType={props.programType}
            />
          )}
          {props.children}
        </div>
      </div>
    </div>
  );
};
export default Tab;
