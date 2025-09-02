import { useEffect, useRef, useState } from "react";
import { UserRound } from "lucide-react";
import ShutDownScreen from "./ShutDownScreen";

const Navbar = () => {
  const [isShuttingDown, setIsShuttingDown] = useState<boolean>(false);
  const [showStartBar, setShowStartBar] = useState<boolean>(false);
  const [showShutDownScreen, setShowShutDownScreen] = useState<boolean>(false);

  const soundRef = useRef<HTMLAudioElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const startBtnRef = useRef<HTMLDivElement>(null);

  const shutDown = () => {
    console.log("Shut down clicked!");
    setShowStartBar(!showStartBar);
    setIsShuttingDown(true);

    setTimeout(() => {
      setShowShutDownScreen(true);
    }, 1000);

    setTimeout(() => {
      if (soundRef.current) {
        soundRef.current.play();
      }
    }, 1500);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        // showStartBar &&
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
    <>
      {showShutDownScreen && <ShutDownScreen />}
      <nav
        ref={navRef}
        className={`max-md:w-[70vw] md:w-[400px] h-[80vh] absolute ${
          !showStartBar ? "-left-[403px]" : "left-0"
        }  bottom-10 rounded-t-md bg-[#245DDA] transition-all duration-300 shadow-2xl border-r-3 border-[#245DDA]`}
      >
        {/* header */}
        <div className="w-full h-[80px] bg-transparent rounded-t-md flex border-b border-[#d18158]">
          <div className="ml-2 flex items-center gap-4">
            <div className="w-[60px] h-[60px] bg-[#666666] rounded-sm border flex items-center justify-center">
              <UserRound color="white" size={26} />
            </div>
            <div className="font-bold text-[22px] text-white">Gen Y</div>
          </div>
        </div>
        {/* mid content */}
        <div className="w-full h-[68vh]  grid grid-cols-12">
          {/* left */}
          <div className="w-50vw h-[full] bg-white max-md:col-span-12 md:col-span-6 border-r border-[#9bc0ef]">
            asd
          </div>
          {/* right */}
          <div className="h-full bg-[#d3e5fa] max-md:col-span-12 md:col-span-6 flex items-center justify-center">
            {/* bottom shut down btn */}
            <div className="mt-auto mb-2 w-full mx-2">
              <div className="border-t border-[#9ec1f6] cursor-pointer">
                <div
                  className="flex gap-2 mt-1 items-center hover:bg-[#0B78E3] hover:text-white py-2 px-2 rounded-sm"
                  onClick={shutDown}
                >
                  <img
                    src="/navbar-icons/237.ico"
                    width={30}
                    height={30}
                    alt=""
                  />
                  <div className="text-[14px]">Shut Down...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <nav
        className={`fixed w-full h-[40px] bg-[#245DDA] ${
          isShuttingDown ? "-bottom-[40px]" : "bottom-0"
        } right-0 left-0 transition-all duration-300`}
        style={{
          boxShadow: `
          inset 0 8px 12px -8px #233357,   /* üst gölge */
        `,
        }}
      >
        <div
          ref={startBtnRef}
          className="cursor-pointer rounded-md w-[155px] h-[42px] transition-colors duration-300 flex items-center justify-center"
          onClick={() => setShowStartBar(!showStartBar)}
        >
          <img
            src="/navbar-icons/xp-start-btn.png"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </nav>

      <audio ref={soundRef} src="/sounds/xp-shut-down.mp3" />
    </>
  );
};

export default Navbar;
