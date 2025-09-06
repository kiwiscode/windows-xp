import { useEffect, useRef } from "react";
import Webamp from "webamp";
import {
  initialTracks,
  availableSkins,
  windowLayout,
} from "../webamp-options/options";

interface WinampProps {
  onClose: () => void;
  onMinimize: () => void;
}

const MIN_MILKDROP_WIDTH = 725;

function Winamp({ onClose, onMinimize }: WinampProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const webamp = useRef<Webamp | null>(null);

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

    webamp.current.renderWhenReady(target);

    return () => {
      webamp.current?.dispose();
      webamp.current = null;
    };
  }, []);
  useEffect(() => {
    if (webamp.current) {
      webamp.current.onClose(onClose);
      webamp.current.onMinimize(onMinimize);
    }
  });
  return (
    <div
      style={{ position: "fixed", left: 0, top: 0, right: 0, bottom: 0 }}
      ref={ref}
    />
  );
}

export default Winamp;
