import FullScreenToggle from "./FullScreen";

interface BlueScreenProps {
  show: boolean;
}

const BlueScreen = ({ show }: BlueScreenProps) => {
  if (!show) return null;

  return (
    <>
      <FullScreenToggle
        children={
          <div className="fixed bg-[#0030ab] h-full w-full inset-0 overflow-y-auto flex">
            <div className="relative text-[#ebebf8] text-base max-md:text-[14px] md:text-[19px] py-12 px-6 sm:px-8 md:px-12 z-10 flex justify-start items-center">
              <div>
                <p className="p-0 m-0">
                  A problem has been detected and Windows has been shut down to
                  prevent damage <br /> to your computer.
                </p>
                <br />
                <p className="p-0 m-0">UNMOUNTABLE_BOOT_VOLUME</p>
                <br />
                <p className="p-0 m-0">
                  If this is the first time you've seen this error screen,{" "}
                  <br />
                  restart your computer. If this screen appears again, follow{" "}
                  <br />
                  these steps: <br />
                </p>
                <p>
                  Check to make sure any new hardware or software is properly
                  installed.
                  <br />
                  If this is a new installation, ask your hardware or software
                  manufacturer <br />
                  for any Windows updates you might need.
                </p>

                <p>
                  If problems continue, disable or remove any newly installed
                  hardware <br />
                  or software. Disable BIOS memory options such as caching or
                  shadowing.
                  <br />
                  If you need to use Safe Mode to remove or disable components,
                  restart <br />
                  your computer, press F8 to select Advanced Startup Options,
                  and then <br />
                  select Safe Mode.
                </p>

                <p>Technical Information:</p>
                <p>
                  *** STOP: 0x000000ed (0x80F128D0, 0xc000009C, 0x00000000,
                  0x00000000)
                </p>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default BlueScreen;
