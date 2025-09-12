import { useEffect, useState } from "react";
import xpLoading from "/xp-loading-logo.jpg";
import xpLoadingMsLogo from "/xp-loading-mslogo.jpg";
import startSound from "/sounds/xp-startup.mp3";
import { useApp } from "../context/AppContext";

const StartScreen = () => {
  const { setShowStartScreen, setModalAction } = useApp();
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    setModalAction(null);
    const timer = setTimeout(() => {
      setStep(1);
    }, 4900);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (step === 1) {
      const audio = new Audio(startSound);
      audio.play().catch((e) => console.log(e));

      setTimeout(() => {
        setShowStartScreen(false);
      }, 1000);
    }
  }, [step]);

  return (
    <div className="">
      {step === 0 ? (
        <div className="absolute inset-0 bg-black overflow-hidden text-slate-100">
          <div className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] animate-fadein">
            <img
              src={xpLoading}
              alt=""
              className="h-auto w-full object-cover"
            />
            <div
              className="max-w-[200px] w-[30vw] h-[22px] mx-auto mt-12 rounded-[7px] overflow-hidden relative"
              style={{ border: "2px solid #b2b2b2" }}
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 w-[9px] h-full"
                  style={{
                    background:
                      "linear-gradient(to bottom, #2838c7 0%,#5979ef 17%,#869ef3 32%,#869ef3 45%,#5979ef 59%,#2838c7 100%)",
                    left: `${i * 12}px`,
                    animation: `move 1.5s linear infinite`,
                  }}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between p-6 absolute bottom-0 w-full">
            <div>
              <p className="m-0">Copyright &copy; Microsoft Corporation</p>
            </div>
            <div>
              <img
                src={xpLoadingMsLogo}
                className="h-auto max-w-[120px] object-cover"
                alt=""
              />
            </div>
          </div>
        </div>
      ) : step === 1 ? (
        <div className="absolute inset-0 z-50 overflow-hidden flex flex-col bg-[#5a7edc] font-sans">
          <div className="h-[70px] bg-[#00309c] flex flex-row items-center shrink-0"></div>
          <div className="h-[2px] bg-[linear-gradient(45deg,#466dcd,#c7ddff,#b0c9f7,#5a7edc)] shrink-0"></div>
          <div className="grow bg-[radial-gradient(circle_at_5%_5%,#91b1ef_0,#7698e6_6%,#5a7edc_12%)] relative overflow-hidden">
            <span className="absolute top-[40%] left-[50%] text-[42px] text-slate-50 italic font-bold">
              Welcome
            </span>
          </div>
          <div className="h-[2px] bg-[linear-gradient(45deg,#003399,#f99736,#c2814d,#00309c)] shrink-0"></div>
          <div className="h-[70px] w-full bg-[linear-gradient(90deg,#3833ac,#00309c)] shrink-0 relative"></div>
        </div>
      ) : null}
    </div>
  );
};

export default StartScreen;
