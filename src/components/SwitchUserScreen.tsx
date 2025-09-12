import { useEffect } from "react";
import { useApp } from "../context/AppContext";
import bike from "/navbar-icons/Dirt_Bike.webp";
import logOn from "/xp-logon-alternate.mp3";

const SwitchUserScreen = () => {
  const { setModalAction, setShowSwitchUserScreen } = useApp();
  useEffect(() => {
    setModalAction(null);
  }, []);
  return (
    <div className="absolute inset-0 z-50 overflow-hidden flex flex-col bg-[#5a73dc]">
      <div className="h-[70px] bg-[#00309c] flex items-center shrink-0" />

      <div className="h-[2px] bg-[linear-gradient(45deg,#466dcd,#c7ddff,#b0c9f7,#5a7edc)] shrink-0" />

      <div className="grow bg-[radial-gradient(circle_at_5%_5%,#91b1ef_0,#7698e6_6%,#5a7edc_12%)] w-full relative overflow-hidden h-full flex justify-center items-center gap-12 max-md:flex-col">
        <div className="flex flex-col items-end">
          <img src="/modal-actions/xp_logo.png" width="200" className="" />
          <p className="mr-4 mt-8 text-[24px] text-slate-50">
            To begin, click your user name
          </p>
        </div>
        <div
          className="md:h-[70%] max-md:h-[12px] md:w-[3px] max-md:w-[90%] border-t-[3px] border-b-[3px] border-transparent [background-clip:content-box]   bg-[linear-gradient(to_top,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.15)_100%,rgba(255,255,255,0)_0%)]
"
        />

        <div
          onClick={() => {
            new Audio(logOn).play();
            setTimeout(() => {
              setShowSwitchUserScreen(false);
            }, 125);
          }}
          className="w-[30vw] max-md:w-[90%] rounded-[12px] shadow-lg flex items-start px-4 py-2 cursor-pointer gap-5
               bg-[linear-gradient(180deg,#5a7edc_0%,#466dcd_50%,#2b4ea5_100%)] 
               transition-transform duration-300"
        >
          <img
            src={bike}
            alt="user avatar"
            className="w-20 h-20 rounded-[3px] shadow-md mb-3"
            style={{
              border: "2px solid rgb(222,222,222,0.8)",
            }}
          />

          {/* Username */}
          <div className="flex items-start flex-col">
            <span className="text-white font-extrabold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] text-[24px] max-md:20px">
              Guest
            </span>
            <span className="font-bold text-white mt-[1px]">Logged on</span>
          </div>
        </div>
      </div>

      <div className="h-[2px] bg-[linear-gradient(45deg,#003399,#f99736,#c2814d,#00309c)] shrink-0" />
      <div className="h-[70px] w-full bg-[linear-gradient(90deg,#3833ac,#00309c)] shrink-0 relative" />
    </div>
  );
};

export default SwitchUserScreen;
