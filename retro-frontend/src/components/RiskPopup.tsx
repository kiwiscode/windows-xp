import { useState, useEffect } from "react";
import risk from "/navbar-icons/risk.png";

interface RiskPopupProps {
  startAfter?: number;
  duration?: number;
}

const RiskPopup = ({ startAfter = 3000, duration = 15000 }: RiskPopupProps) => {
  const [show, setShow] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(false);

  useEffect(() => {
    const openTimer = setTimeout(() => setStart(true), startAfter);
    const fadeTimer = setTimeout(() => setShow(false), startAfter + duration);
    const closeTimer = setTimeout(
      () => setStart(false),
      startAfter + duration + 1000
    );
    return () => {
      clearTimeout(openTimer);
      clearTimeout(fadeTimer);
      clearTimeout(closeTimer);
    };
  }, [startAfter, duration]);

  return (
    start && (
      <div
        className={`absolute right-[-4px] bottom-[19px] border border-black rounded-[7px] px-[10px] py-[6px] pr-[28px] bg-[#ffffe1] text-[11px] opacity-0 whitespace-nowrap drop-shadow-md
                 ${show ? "fadeInRiskPopup" : "fadeOutRiskPopup"}`}
      >
        <div
          onClick={() => setShow(false)}
          className="group outline-none absolute right-[4px] top-[4px] w-[14px] h-[14px] rounded-[3px] bg-transparent hover:bg-[#ffa90c] hover:text-white border border-[rgba(0,0,0,0.1)] hover:border-white"
        >
          <span className="absolute w-[2px] h-[8px] bg-gray-400 rotate-45 transform left-[50%] top-[50%] -translate-y-1/2 -translate-x-1/2 group-hover:bg-white"></span>
          <span className="absolute w-[2px] h-[8px] bg-gray-400 -rotate-45 transform left-[50%] top-[50%] -translate-y-1/2 -translate-x-1/2 group-hover:bg-white"></span>
        </div>

        <div className="flex items-center font-bold">
          <img className="w-[14px] h-[14px] mr-2" src={risk} alt="risk" />
          <span>Your computer might be at risk</span>
        </div>

        <p className="my-[5px] mb-[10px]">
          Antivirus software might not be installed
        </p>
        <p>Click this balloon to fix this problem.</p>

        <span className="absolute bottom-[-19px] right-[14px] w-0 h-0 border-r-[19px] border-b-[19px] border-r-black border-b-transparent"></span>
        <span className="absolute bottom-[-17px] right-[15px] w-0 h-0 border-r-[18px] border-b-[18px] border-r-[#ffffe1] border-b-transparent"></span>
      </div>
    )
  );
};

export default RiskPopup;
