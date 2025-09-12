import windowsLogo from "/log-off-modal/windows-off.png";
import off from "/log-off-modal/310(32x32).png";
import lock from "/log-off-modal/546(32x32).png";
import restart from "/log-off-modal/restart.ico";
import switcher from "/log-off-modal/290.png";
import switchUserSound from "/xp-logoff.mp3";

import { generateIndex, useApp } from "../context/AppContext";
import type { ModalMode, ModalAction } from "../types/Modal";
import { useEffect, useState } from "react";
import shutdownAudio from "/sounds/xp-shut-down.mp3";
interface ModalProps {
  mode: ModalMode;
  onClose: () => void;
  onClickButton: (state: ModalAction) => void;
}

const powerState = {
  START: "START",
  LOG_OFF: "LOG_OFF",
  TURN_OFF: "TURN_OFF",
};

const Modal: React.FC<ModalProps> = ({ mode, onClose, onClickButton }) => {
  const {
    setShowOpenScreen,
    setShowStartScreen,
    setShowPowerModal,
    setModalMode,
    setShowStandByScreen,
    setShowSwitchUserScreen,
  } = useApp();
  const [bgActive, setBgActive] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => setBgActive(true), 300);
    return () => clearTimeout(timer);
  }, []);

  function renderButtons() {
    if (mode === powerState.TURN_OFF) {
      return (
        <>
          <div className="flex flex-col items-center text-white">
            <img
              onClick={() => {
                setShowPowerModal(false);
                setModalMode(null);
                onClickButton("Stand By");

                setTimeout(() => {
                  setShowStandByScreen(true);
                }, 3000);
              }}
              src={off}
              alt="Stand By"
              className="hover:brightness-[1.1] hover:active:brightness-[0.7]"
              style={{
                width: "30px",
                height: "30px",
              }}
            />
            <span className="pt-[3px] font-bold text-[11px]">Stand By</span>
          </div>
          {/* turn off btn */}
          <div className="flex flex-col items-center text-white">
            <img
              onClick={() => {
                setShowPowerModal(false);
                setModalMode(null);
                new Audio(shutdownAudio).play();
                onClickButton("Turn Off");

                setTimeout(() => {
                  setShowOpenScreen(true);
                }, 3000);
              }}
              src={off}
              alt="Turn Off"
              className="hover:brightness-[1.1] hover:active:brightness-[0.7]"
              style={{
                width: "30px",
                height: "30px",
              }}
            />
            <span className="pt-[3px] font-bold text-[11px]">Turn Off</span>
          </div>
          {/* restart btn */}
          <div className="flex flex-col items-center text-white">
            <img
              onClick={() => {
                setShowPowerModal(false);
                setModalMode(null);
                new Audio(shutdownAudio).play();
                onClickButton("Restart");
                setShowOpenScreen(false);
                setTimeout(() => {
                  setShowStartScreen(true);
                }, 5000);
              }}
              src={restart}
              alt="Restart"
              className="hover:brightness-[1.1] hover:active:brightness-[0.7]"
              style={{
                width: "33px",
                height: "33px",
                margin: "-3px 0 0px 0",
              }}
            />
            <span className="pt-[3px] font-bold text-[11px]">Restart</span>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="flex flex-col items-center text-white">
          <img
            onClick={() => {
              setShowPowerModal(false);
              setModalMode(null);
              new Audio(switchUserSound).play();
              onClickButton("Switch User");
              setShowSwitchUserScreen(true);
            }}
            src={switcher}
            alt="Switch User"
            className="hover:brightness-[1.1] hover:active:brightness-[0.7] rounded-[3px]"
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid #fff",
            }}
          />
          <span className="pt-[3px] font-bold text-[11px]">Switch User</span>
        </div>
        <div className="flex flex-col items-center text-white">
          <img
            onClick={() => {
              setShowPowerModal(false);
              setModalMode(null);
              new Audio(shutdownAudio).play();
              onClickButton("Log Off");

              setTimeout(() => {
                setShowSwitchUserScreen(true);
              }, 4000);
            }}
            src={lock}
            alt="Log Off"
            className="hover:brightness-[1.1] hover:active:brightness-[0.7] rounded-[3px]"
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid #fff",
            }}
          />
          <span className="pt-[3px] font-bold text-[11px]">Log Off</span>
        </div>
      </>
    );
  }
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex justify-center  transition-all duration-3000"
      style={{
        zIndex: generateIndex(),
        backgroundColor: bgActive ? "rgba(0,0,0,0.7)" : "transparent",
      }}
    >
      <div
        className="mt-[30vh] w-[300px] h-[190px] flex flex-col"
        style={{
          border: "1px solid black",
        }}
      >
        <header className="h-[42px] flex pl-[10px] items-center bg-[#092178]">
          <span className="font-[17px] text-white flex-1">Log Off Windows</span>
          <img src={windowsLogo} alt="" className="w-auto h-[30px] mr-[5px]" />
        </header>
        <div
          className="content flex-1 flex items-center justify-around px-[30px] relative before:content-[''] before:block before:absolute before:h-[2px] before:top-0 before:left-0 before:right-0 before:bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.3)_40%,rgba(255,255,255,0.3)_60%,transparent_100%)]"
          style={{
            background: `linear-gradient(
      to right,
      #3349e0 0%,
      #617ee6 47%,
      #617ee6 53%,
      #3349e0 100%
    )`,
          }}
        >
          {renderButtons()}
        </div>
        <footer className="h-[42px] bg-[#092178] flex justify-end items-center">
          <button
            onClick={onClose}
            className="font-[11px] px-[8px] leading-[10px] mr-[10px] h-[16px] rounded-[1px] border-0 outline-none  hover:shadow-[1px_1px_black,1px_1px_2px_0px_white,inset_0_0_0_1px_orange,inset_2px_-2px_orange] 
    active:shadow-none 
    active:bg-[rgb(220,220,220)]"
            style={{
              background: "rgb(240, 240, 240)",
              boxShadow: `2px 2px 4px 1px #0005b0, 2px 2px 2px 0px white,
      inset 0 0 0 1px skyblue, inset 2px -2px skyblue`,
            }}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
