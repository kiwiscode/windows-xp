import React, { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { renderTime } from "../utils/navbarTime";

import { submenuApps } from "../data/submenuData";

import sound from "/navbar-icons/sound.png";
import usb from "/navbar-icons/usb.png";
import risk from "/navbar-icons/risk.png";
import RiskPopup from "./RiskPopup";
import bike from "/navbar-icons/Dirt_Bike.webp";
import ie from "/navbar-icons/ie.png";
import mine from "/navbar-icons/mine-icon.png";
import setAccess from "/navbar-icons/227(32x32).png";
import outlook from "/navbar-icons/887(32x32).png";
import mediaPlayer from "/navbar-icons/846(32x32).png";
import messenger from "/navbar-icons/msn.png";
import documents from "/navbar-icons/308(32x32).png";
import recentDocuments from "/navbar-icons/301(32x32).png";
import pictures from "/navbar-icons/307(32x32).png";
import music from "/navbar-icons/550(32x32).png";
import computer from "/navbar-icons/676(32x32).png";
import controlPanel from "/navbar-icons/300(32x32).png";
import connect from "/navbar-icons/309(32x32).png";
import printer from "/navbar-icons/549(32x32).png";
import paint from "/navbar-icons/680(32x32).png";
import help from "/navbar-icons/747(32x32).png";
import search from "/navbar-icons/299(32x32).png";
import run from "/navbar-icons/743(32x32).png";
import lock from "/navbar-icons/546(32x32).png";
import shut from "/navbar-icons/310(32x32).png";
import allProgramsIcon from "/navbar-icons/all-programs.ico";
import winamp from "/navbar-icons/winamp.png";
import notepad from "/navbar-icons/327(32x32).png";
import empty from "/navbar-icons/empty.png";

interface OnClickProps {
  onClickMenuItem: (name: string) => void;
  onClickMenuFooterOption: () => void;
}

const Footer: React.FC = () => {
  const {
    openedApps,
    activeApp,
    fromNavbar,
    minimizeTab,
    addTab,
    setFocusedAppId,
  } = useApp();

  const [showStartBar, setShowStartBar] = useState<boolean>(false);

  function onClickMenuItem(name: string) {
    setShowStartBar(false);
    addTab(name);
  }

  function onClickMenuFooterOption() {
    setShowStartBar(false);
  }

  const navRef = useRef<HTMLDivElement>(null);
  const startBtnRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
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
      className={`cursor-default h-[30px] absolute bottom-0 left-0 right-0 flex `}
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
        {showStartBar && (
          <div
            ref={navRef}
            className="absolute left-0 bottom-[100%]"
            style={{
              boxShadow: "2px 4px 2px rgba(0, 0, 0, 0.5)",
            }}
          >
            <FooterNav
              onClickMenuItem={onClickMenuItem}
              onClickMenuFooterOption={onClickMenuFooterOption}
            />
          </div>
        )}
        <img
          ref={startBtnRef}
          onClick={() => setShowStartBar(!showStartBar)}
          src="/navbar-icons/xp-start-btn.png"
          alt=""
          className="h-full mr-[10px] relative hover:brightness-[105%] active:brightness-[85%] active:pointer-none:"
        />

        {openedApps
          .filter((tab) => tab.prompt !== true && !tab.noFooterWindow)
          .map((t, i) => (
            <div
              key={t.id | i}
              onClick={(e) => {
                e.stopPropagation();
                fromNavbar(true);
                setFocusedAppId(t.id);
                if (activeApp === t.title) {
                  minimizeTab(t.title);
                } else {
                  addTab(t.title);
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
    </footer>
  );
};

const FooterNav: React.FC<OnClickProps> = ({
  onClickMenuItem,
  onClickMenuFooterOption,
}) => {
  const { setShowPowerModal, setModalMode } = useApp();
  const [hovering, setHovering] = useState<string | null>(null);

  function onMouseOver(e: React.MouseEvent) {
    const item = (e.target as HTMLElement).closest(
      ".menu_item"
    ) as HTMLElement | null;
    if (!item) return;

    const textEl = item.querySelector(".menu_item_text") as HTMLElement | null;
    if (!textEl) return;

    const text = textEl.textContent;
    if (!text) return;

    setHovering(text);
  }

  return (
    <div className="text-[11px] leading-[14px] flex flex-col items-center bg-[#4282d6] rounded-tr-[5px] rounded-tl-[5px]">
      <header
        className="relative self-start flex items-center text-[#fff] h-[54px] w-full rounded-tr-[5px] rounded-tl-[5px] overflow-hidden before:content-[''] before:absolute before:top-[1px] before:left-0 before:w-full before:h-[3px] before:bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.3)_1%,rgba(255,255,255,0.5)_2%,rgba(255,255,255,0.5)_95%,rgba(255,255,255,0.3)_98%,rgba(255,255,255,0.2)_99%,transparent_100%)] before:shadow-[inset_0_-1px_1px_#0e60cb]"
        style={{
          background: `linear-gradient(
      to bottom,
      #1868ce 0%,
      #0e60cb 12%,
      #0e60cb 20%,
      #1164cf 32%,
      #1667cf 33%,
      #1b6cd3 47%,
      #1e70d9 54%,
      #2476dc 60%,
      #297ae0 65%,
      #3482e3 77%,
      #3786e5 79%,
      #428ee9 90%,
      #4791eb 100%
    )`,
          padding: "6px 5px 5px",
        }}
      >
        <img
          src={bike}
          width={42}
          height={42}
          className=" mr-[5px] rounded-[3px]"
          style={{
            border: "2px solid rgb(222,222,222,0.8)",
          }}
          alt=""
        />
        <span
          className="text-[14px] font-bold"
          style={{
            textShadow: "1px 1px rgba(0,0,0,0.7)",
          }}
        >
          User
        </span>
      </header>
      <section
        onMouseOver={onMouseOver}
        className="flex mx-[2px] relative border-t-[#385de7]"
        style={{
          boxShadow: "0 1px #385de7",
        }}
      >
        <hr
          className="absolute left-0 right-0 top-0 block h-[2px] border-0 m-0 p-0"
          style={{
            background: `linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      #da884a 50%,
      rgba(0, 0, 0, 0) 100%
    )`,
          }}
        />
        {/* left */}
        <div
          className="menu_left bg-[#fff] w-[190px] flex flex-col "
          style={{
            padding: "6px 5px 0px",
            height: "400px",
          }}
        >
          <FooterItem
            onClick={onClickMenuItem}
            text="Internet"
            icon={ie}
            className="group"
          >
            <div className="leading-[12px] mb-[1px] group-hover:text-white text-[rgba(0,0,0,0.4)]">
              Internet Explorer
            </div>
          </FooterItem>

          <FooterItem
            onClick={onClickMenuItem}
            text="E-mail"
            icon={outlook}
            className="group"
          >
            <div className="leading-[12px] mb-[1px] group-hover:text-white text-[rgba(0,0,0,0.4)]">
              Outlook Express
            </div>
          </FooterItem>

          <div className="h-[7.5px] border-t-[3px] border-b-[3px] border-transparent [background-clip:content-box] bg-[linear-gradient(to_right,rgba(0,0,0,0)_0%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0)_100%)]" />

          <FooterItems
            onClick={onClickMenuItem}
            items={[
              { icon: mine, text: "Minesweeper" },
              { icon: notepad, text: "Notepad" },
              { icon: winamp, text: "Winamp" },
              { icon: paint, text: "Paint" },
              { icon: mediaPlayer, text: "Windows Media Player" },
              { icon: messenger, text: "Windows Messenger" },
            ]}
          />
          <div style={{ flex: "1 1 0%" }} />

          <div className="h-[7.5px] border-t-[3px] border-b-[3px] border-transparent [background-clip:content-box] bg-[linear-gradient(to_right,rgba(0,0,0,0)_0%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0)_100%)]" />

          <FooterItem
            style={
              hovering === "All Programs"
                ? {
                    backgroundColor: "#2f71cd",
                    color: "#FFF",
                    height: "24px",
                  }
                : { height: "24px" }
            }
            text={"All Programs"}
            icon={empty}
          >
            {hovering === "All Programs" && (
              <SubMenu
                data={submenuApps.allPrograms}
                onClick={onClickMenuItem}
              />
            )}
          </FooterItem>
        </div>

        {/* right */}
        <div
          className="menu_right group bg-[#cbe3ff] w-[190px] text-[#00136b]"
          style={{
            borderLeft: "1px solid #3a3aff5e",
            padding: "6px 5px 5px",
          }}
        >
          <FooterItem
            onClick={onClickMenuItem}
            text="My Documents"
            icon={documents}
          />
          <FooterItem
            style={
              hovering === "My Recent Documents"
                ? {
                    backgroundColor: "#2f71cd",
                    color: "#FFF",
                  }
                : {}
            }
            text="My Recent Documents"
            icon={recentDocuments}
          >
            <div
              style={{
                border: "3.5px solid transparent",
                borderRight: 0,
                borderLeftColor:
                  hovering === "My Recent Documents" ? "#FFF" : "#00136b",
                position: "absolute",
                left: "146px",
              }}
            />
            {hovering === "My Recent Documents" && (
              <SubMenu
                left="153px"
                data={submenuApps.myRecentDocuments}
                onClick={onClickMenuItem}
              />
            )}
          </FooterItem>
          <FooterItems
            onClick={onClickMenuItem}
            items={[
              { icon: pictures, text: "My Pictures" },
              { icon: music, text: "My Music" },
              { icon: computer, text: "My Computer" },
            ]}
          />
          <div className="h-[7.5px] border-t-[3px] border-b-[3px] border-transparent [background-clip:content-box] bg-[linear-gradient(to_right,rgba(0,0,0,0)_0%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0)_100%)]" />
          <FooterItems
            onClick={onClickMenuItem}
            items={[
              { icon: controlPanel, text: "Control Panel" },
              { icon: setAccess, text: "Set Program Access and Defaults" },
            ]}
          />
          <FooterItem
            style={
              hovering === "Connect To"
                ? {
                    backgroundColor: "#2f71cd",
                    color: "#FFF",
                  }
                : {}
            }
            text="Connect To"
            icon={connect}
          >
            <div
              style={{
                borderLeftColor: hovering === "Connect To" ? "#FFF" : "#00136b",
              }}
              className="menu__arrow"
            />
            {hovering === "Connect To" && (
              <SubMenu
                left="153px"
                data={submenuApps.connectTo}
                onClick={onClickMenuItem}
              />
            )}
          </FooterItem>
          <FooterItem
            onClick={onClickMenuItem}
            text="Printers and Faxes"
            icon={printer}
          />{" "}
          <div className="h-[7.5px] border-t-[3px] border-b-[3px] border-transparent [background-clip:content-box] bg-[linear-gradient(to_right,rgba(0,0,0,0)_0%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0)_100%)]" />
          <FooterItems
            onClick={onClickMenuItem}
            items={[
              { icon: help, text: "Help and Support" },
              { icon: search, text: "Search" },
              { icon: run, text: "Run..." },
            ]}
          />
        </div>
      </section>
      <footer
        className="flex self-end items-center justify-end text-white h-[36px] w-full"
        style={{
          background: `linear-gradient(
      to bottom,
      #4282d6 0%,
      #3b85e0 3%,
      #418ae3 5%,
      #418ae3 17%,
      #3c87e2 21%,
      #3786e4 26%,
      #3482e3 29%,
      #2e7ee1 39%,
      #2374df 49%,
      #2072db 57%,
      #196edb 62%,
      #176bd8 72%,
      #1468d5 75%,
      #1165d2 83%,
      #0f61cb 88%
    )`,
        }}
      >
        <div
          className="footer_item p-[3px] flex mr-[10px] items-center cursor-default"
          onClick={() => {
            setShowPowerModal(true);
            setModalMode("LOG_OFF");
            onClickMenuFooterOption();
          }}
        >
          <img
            className=" w-[22px] h-[22px] mr-[2px] rounded-[3px]"
            src={lock}
            alt=""
          />
          <span>Log Off</span>
        </div>
        <div
          className="footer_item p-[3px] flex mr-[10px] items-center cursor-default"
          onClick={() => {
            setShowPowerModal(true);
            setModalMode("TURN_OFF");
            onClickMenuFooterOption();
          }}
        >
          <img
            className=" w-[22px] h-[22px] mr-[2px] rounded-[3px] "
            src={shut}
            alt=""
          />
          <span>Turn Off Computer</span>
        </div>
      </footer>
    </div>
  );
};

interface FooterItemProps {
  style?: React.CSSProperties;
  text: string;
  icon: string;
  onHover?: (param: string) => void;
  onClick?: (param: string) => void;
  children?: React.ReactNode;
  className?: string;
}

const FooterItem: React.FC<FooterItemProps> = ({
  style,
  text,
  icon,
  onHover = () => {},
  onClick = () => {},
  children,
}) => {
  function _onClick() {
    onClick(text);
  }
  function onMouseEnter() {
    onHover(text);
  }

  return (
    <div
      className="p-[1px] flex items-center mb-[4px] group menu_item hover:bg-[#2f71cd]  hover:text-white"
      style={style}
      onClick={_onClick}
      onMouseEnter={onMouseEnter}
    >
      <img className="mr-[3px]" src={icon} alt={""} />
      <div className="flex flex-col justify-center h-full relative">
        <div className="menu_item_text">
          {text === "All Programs" ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              All Programs
              <img
                src={allProgramsIcon}
                style={{
                  marginLeft: "5px",
                  height: "18px",
                  width: "22px",
                }}
              />
            </div>
          ) : (
            text
          )}
        </div>

        {children}
      </div>
    </div>
  );
};

interface FooterItemsProps {
  items: FooterItemProps[];
  onHover?: (param: string) => void;
  onClick?: (param: string) => void;
}

const FooterItems: React.FC<FooterItemsProps> = ({ items, ...rest }) => {
  return (
    <>
      {items.map((item, i) => (
        <FooterItem key={i} {...item} {...rest} />
      ))}
    </>
  );
};

type SubMenuItemType =
  | { type: "item"; icon?: string; text: string }
  | { type: "separator" }
  | {
      type: "menu";
      icon?: string;
      text: string;
      bottom?: string;
      items: SubMenuItemType[];
    };

interface SubMenuProps {
  className?: string;
  data: SubMenuItemType[];
  style?: React.CSSProperties;
  onClick: (text: string) => void;
  left?: string;
  bottom?: string;
}

export const SubMenu: React.FC<SubMenuProps> = ({
  className = "",
  data,
  style,
  onClick,
  left,
  bottom,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number>(-1);

  return (
    <div
      style={{
        ...style,
        boxShadow: "inset 0 0 0 1px #72ade9, 2px 3px 3px rgb(0, 0, 0, 0.5)",
        left: left ? `${left}` : "100%",
        bottom: bottom ? `${bottom}` : "-1px",
      }}
      className={`${className}  absolute z-[1] bg-white pl-[1px]`}
    >
      {data.map((item, index) => (
        <SubMenuItem
          key={index}
          index={index}
          item={item}
          hover={hoverIndex === index}
          onHover={setHoverIndex}
          onClick={onClick}
          className={className}
        />
      ))}
    </div>
  );
};

interface SubMenuItemProps {
  index: number;
  item: SubMenuItemType;
  hover: boolean;
  onHover: (index: number) => void;
  onClick: (text: string) => void;
  className?: string;
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({
  index,
  item,
  hover,
  onHover,
  onClick,
}) => {
  const handleMouseOver = () => onHover(index);
  const handleClick = () => item.type === "item" && onClick(item.text);
  function onClickMenuItem(name: string) {
    onClick(name);
  }
  if (item.type === "separator") {
    return (
      <div
        className="px-[5px] h-[2px]"
        style={{
          boxShadow: "inset 3px 0 #4081ff",
          background: `linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0) 100%
    )`,
        }}
      />
    );
  }

  if (item.type === "item") {
    return (
      <div
        onClick={handleClick}
        onMouseEnter={handleMouseOver}
        className={`group h-[25px] flex items-center pl-[10px] relative pr-[22px] text-black hover:text-white hover:bg-[#1b65cc]`}
        style={{
          boxShadow: "inset 3px 0 #4081ff",
        }}
      >
        <img
          src={item.icon}
          alt=""
          className="mr-[6px]"
          style={{
            width: 16,
            height: 16,
          }}
        />
        <div className="text-[11px] whitespace-nowrap">{item.text}</div>
      </div>
    );
  }

  if (item.type === "menu") {
    return (
      <div
        onMouseEnter={handleMouseOver}
        className={`group h-[25px] flex items-center pl-[10px] relative pr-[22px] text-black hover:text-white hover:bg-[#1b65cc]`}
        style={{
          boxShadow: "inset 3px 0 #4081ff",
        }}
      >
        <img
          src={item.icon}
          alt=""
          className="mr-[6px]"
          style={{
            width: 16,
            height: 16,
          }}
        />
        <div className="text-[11px] whitespace-nowrap">{item.text}</div>
        <div className="absolute right-0 h-full w-[10px] before:top-[9px] before:right-[6px] before:content-[''] before:block before:border-r-0 before:absolute before:border-[4px] before:border-solid before:border-transparent before:border-l-[#000]">
          {hover && <SubMenu data={item.items} onClick={onClickMenuItem} />}
        </div>
      </div>
    );
  }

  return null;
};

export default Footer;
