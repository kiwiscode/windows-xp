import { useEffect, useRef } from "react";
import Webamp from "webamp";
import {
  initialTracks,
  availableSkins,
  windowLayout,
} from "../webamp-options/options";
import { useApp } from "../context/AppContext";

interface WinampProps {
  reopen: boolean;
  close: boolean;
  cb: (param: boolean) => void;
}

function Winamp({ reopen, close, cb }: WinampProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const webamp = useRef<Webamp | null>(null);
  const { closeTab, minimizeTab, setActiveApp } = useApp();
  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }
    webamp.current = new Webamp({
      initialTracks,
      availableSkins,
      windowLayout,
      __butterchurnOptions: {
        // @ts-ignore
        importButterchurn: () => import("butterchurn"),
        // @ts-ignore
        getPresets: async () => {
          const butterchurnPresets = await import(
            // @ts-ignore
            "butterchurn-presets/dist/base.js"
          );
          // Convert the presets object
          return Object.entries(butterchurnPresets.default).map(
            ([name, preset]) => {
              return { name, butterchurnPresetObject: preset };
            }
          );
        },
        butterchurnOpen: true,
      },
      enableHotkeys: true,
    });

    webamp.current.renderWhenReady(target).then(() => {
      const webampEl = document.querySelector("#webamp");
      if (!webampEl) return;
      target.appendChild(webampEl);

      const closeBtn = webampEl.querySelector("#title-bar #close");
      const minimizeBtn = webampEl.querySelector(
        "#webamp #title-bar #minimize"
      );

      if (!closeBtn) return;
      if (!minimizeBtn) return;

      // close Winamp from its own header
      const handleClickClose = () => {
        closeTab("Winamp");
        setActiveApp(null);
      };
      // minimize Winamp from its own header
      const handleClickMinimize = () => {
        minimizeTab("Winamp");
        setActiveApp(null);
      };

      closeBtn.addEventListener("click", handleClickClose);
      minimizeBtn.addEventListener("click", handleClickMinimize);

      return () => {
        closeBtn.removeEventListener("click", handleClickClose);
        minimizeBtn.removeEventListener("click", handleClickMinimize);
      };
    });

    return () => {
      webamp.current?.dispose();
      webamp.current = null;
    };
  }, []);

  useEffect(() => {
    if (close) {
      webamp.current?.close();
    }
    if (reopen) {
      webamp.current?.reopen();
    }
  }, [close, reopen]);

  useEffect(() => {
    if (webamp.current) {
      webamp.current.onClose(() => cb(false));
    }
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      }}
      ref={ref}
    />
  );
}

export default Winamp;
