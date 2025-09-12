import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

const ShutDownScreen = () => {
  const { modalAction } = useApp();
  const [logOfText, setLogOfText] = useState<string>("Logging off...");
  useEffect(() => {
    setTimeout(() => {
      setLogOfText("Saving your settings...");
    }, 1000);
  }, []);

  function renderActionScreen() {
    switch (modalAction) {
      case "Switch User":
        return null;
      case "Log Off":
        return (
          <div className="absolute inset-0 z-50 overflow-hidden flex flex-col bg-[#5a73dc]">
            <div className="h-[70px] bg-[#00309c] flex items-center shrink-0" />

            <div className="h-[2px] bg-[linear-gradient(45deg,#466dcd,#c7ddff,#b0c9f7,#5a7edc)] shrink-0" />

            <div className="grow bg-[radial-gradient(circle_at_5%_5%,#91b1ef_0,#7698e6_6%,#5a7edc_12%)] relative overflow-hidden">
              <div className="absolute top-[50%] transform translate-y-[-50%] flex flex-col items-end w-full px-[32px]">
                <img src="/modal-actions/xp_logo.png" width="200" />
                <span className="mr-4 mt-8 text-right text-[24px] text-slate-50">
                  {logOfText}
                </span>
              </div>
            </div>
            <div className="h-[2px] bg-[linear-gradient(45deg,#003399,#f99736,#c2814d,#00309c)] shrink-0" />
            <div className="h-[70px] w-full bg-[linear-gradient(90deg,#3833ac,#00309c)] shrink-0 relative" />
          </div>
        );
      case "Stand By":
        return (
          <div className="absolute inset-0 z-50 overflow-hidden flex flex-col bg-[#5a73dc]">
            <div className="h-[70px] bg-[#00309c] flex items-center shrink-0" />

            <div className="h-[2px] bg-[linear-gradient(45deg,#466dcd,#c7ddff,#b0c9f7,#5a7edc)] shrink-0" />

            <div className="grow bg-[radial-gradient(circle_at_5%_5%,#91b1ef_0,#7698e6_6%,#5a7edc_12%)] relative overflow-hidden">
              <div className="absolute top-[50%] transform translate-y-[-50%] flex flex-col items-end w-full px-[32px]">
                <img src="/modal-actions/xp_logo.png" width="200" />
                <p className="mr-4 mt-8 text-right text-[24px] text-slate-50">
                  Preparing to stand by...
                </p>
              </div>
            </div>
            <div className="h-[2px] bg-[linear-gradient(45deg,#003399,#f99736,#c2814d,#00309c)] shrink-0" />
            <div className="h-[70px] w-full bg-[linear-gradient(90deg,#3833ac,#00309c)] shrink-0 relative" />
          </div>
        );
      case "Turn Off":
        return (
          <div className="absolute inset-0 z-50 overflow-hidden flex flex-col bg-[#5a73dc]">
            <div className="h-[70px] bg-[#00309c] flex items-center shrink-0" />

            <div className="h-[2px] bg-[linear-gradient(45deg,#466dcd,#c7ddff,#b0c9f7,#5a7edc)] shrink-0" />

            <div className="grow bg-[radial-gradient(circle_at_5%_5%,#91b1ef_0,#7698e6_6%,#5a7edc_12%)] relative overflow-hidden">
              <div className="absolute top-[50%] transform translate-y-[-50%] flex flex-col items-end w-full px-[32px]">
                <img src="/modal-actions/xp_logo.png" width="200" />
                <p className="mr-4 mt-8 text-right text-[24px] text-slate-50">
                  Windows is shutting down...
                </p>
              </div>
            </div>
            <div className="h-[2px] bg-[linear-gradient(45deg,#003399,#f99736,#c2814d,#00309c)] shrink-0" />
            <div className="h-[70px] w-full bg-[linear-gradient(90deg,#3833ac,#00309c)] shrink-0 relative" />
          </div>
        );
      case "Restart":
        return (
          <div className="absolute inset-0 z-50 overflow-hidden flex flex-col bg-[#5a73dc]">
            <div className="h-[70px] bg-[#00309c] flex items-center shrink-0" />

            <div className="h-[2px] bg-[linear-gradient(45deg,#466dcd,#c7ddff,#b0c9f7,#5a7edc)] shrink-0" />

            <div className="grow bg-[radial-gradient(circle_at_5%_5%,#91b1ef_0,#7698e6_6%,#5a7edc_12%)] relative overflow-hidden">
              <div className="absolute top-[50%] transform translate-y-[-50%] flex flex-col items-end w-full px-[32px]">
                <img src="/modal-actions/xp_logo.png" width="200" />
                <p className="mr-4 mt-8 text-right text-[24px] text-slate-50">
                  Windows is shutting down...
                </p>
              </div>
            </div>
            <div className="h-[2px] bg-[linear-gradient(45deg,#003399,#f99736,#c2814d,#00309c)] shrink-0" />
            <div className="h-[70px] w-full bg-[linear-gradient(90deg,#3833ac,#00309c)] shrink-0 relative" />
          </div>
        );
      default:
        return null;
    }
  }

  return renderActionScreen();
};

export default ShutDownScreen;
