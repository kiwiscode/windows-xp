import r from "/open-screen/r.gif";
import l from "/open-screen/l.gif";
import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import startSound from "/sounds/xp-startup.mp3";
import useWindowDimensions from "../hooks/useWindowDimensions";

const options = [
  "Safe Mode",
  "Safe Mode with Networking",
  "Safe Mode with Command Prompt",
];

const OpenXpScreen = () => {
  const {
    setShowOpenScreen,
    setShowStartScreen,
    setModalAction,
    setOpenedApps,
  } = useApp();
  const [dots, setDots] = useState<string>(".");
  const [finished, setFinished] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { width } = useWindowDimensions();

  useEffect(() => {
    setOpenedApps([]);
    setModalAction(null);
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 300);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setDots("");
      setFinished(true);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!finished) return;

      if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % options.length);
      } else if (e.key === "ArrowUp") {
        setSelectedIndex(
          (prev) => (prev - 1 + options.length) % options.length
        );
      } else if (e.key === "Enter") {
        setShowOpenScreen(false);
        setShowStartScreen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [finished, selectedIndex]);

  const handleTouch = (index: number) => {
    setSelectedIndex(index);
    setTimeout(() => {
      setShowOpenScreen(false);
      setShowStartScreen(true);
    }, 450);

    // for mobile sound play
    setTimeout(() => {
      const audio = new Audio(startSound);
      audio.play().catch((e) => console.log(e));
      // IMPORTANT
      // Mobile Browsers does not accept setTimeout values of 5000ms or higher, but it works with slightly lower values like 4995ms
    }, 4995);
  };

  return (
    <div
      className="text-shadow-openXPsc pixel-test bg-[#000] text-[#aaa] flex flex-col md:select-none md:pointer-events-none"
      style={{
        fontFamily: "ibm",
      }}
    >
      <div className="flex flex-col items-start md:flex-row gap-4 md:py-10">
        <div className="md:flex-1 md:basis-10/12 text-[40px] max-md:text-[24px] flex flex-col md:gap-12 max-md:gap-4">
          <div className="flex items-end max-md:items-center gap-2">
            <div>
              <img
                src={l}
                alt="Example"
                className="w-[50px] h-auto object-cover"
                style={{
                  imageRendering: "pixelated",
                }}
              />
            </div>
            <div>
              <div>Award Modular BIOS v6.00PG, An Energy Star Ally</div>
              <div>Copyright (C) 1984-2020, Award Software, Inc.</div>
            </div>
          </div>

          <div>
            Intel X38 BIOS for X38-DQ6 F6B <br />
            <br />
            br Main Processor : Intel(R) Core(TM)2 Extreme CPU X9770 @ 3.20GHz
            <br />
            &lt;CPUID:0676 Patch ID:0606&gt;
            <br />
            Memory Testing : &nbsp;4194304K OK
            <br /> <br />
            Memory Runs at Dual Channel Interleaved
            <br />
            IDE Channel 1 Master : WDC WD3200AAJS-00RY10 12.01B01
            <br />
            <br />
            {!finished && (
              <>
                Detecting IDE drives {dots}
                <br />
              </>
            )}
            <div className={`${finished ? "opacity-100" : "opacity-0"}`}>
              Primary Master: ST3160815AS 160GB <br />
              <br />
              Windows Advanced Options Menu <br />
              Please select an option: <br /> <br />
              <div className="text-left select-auto flex flex-col items-start md:select-none md:pointer-events-none max-md:pointer-events-auto">
                {options.map((opt, idx) => (
                  <div
                    onClick={() => handleTouch(idx)}
                    key={idx}
                    className={`pl-[70px] py-1 pr-3 inline-block my-1 cursor-default ${
                      selectedIndex === idx ? "bg-white text-black" : ""
                    }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Image */}
        <div className="md:basis-2/12 flex justify-end md:justify-end max-md:mt-10 max-md:w-[65%] max-md:mx-auto">
          <img
            src={r}
            alt="Example"
            className="w-full h-auto object-contain"
            style={{
              imageRendering: "pixelated",
            }}
          />
        </div>
        {width <= 768 && <br />}
      </div>
      <div className="mt-auto crt">
        <span className="text-[40px] max-md:text-[24px]">
          <span className="">
            &lt;<span className="text-white">DEL</span>&gt;: BIOS Setup &lt;
            <span className="text-white">F9</span>&gt;: XpressRecovery2 &lt;
            <span className="text-white">F12</span>&gt;: Boot Menu &lt;
            <span className="text-white">END</span>&gt;: Qflash
          </span>
          <br />
          10/30/2020-X38-ICH9-6A790G0QC-00
        </span>
      </div>
    </div>
  );
};

export default OpenXpScreen;
