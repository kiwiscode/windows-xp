import BlueScreen from "./components/BlueScreen";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";

import { useApp } from "./context/AppContext";
import { useEffect, useRef, useState } from "react";

import "xp.css/dist/XP.css";
import OpenedApp from "./components/App";

function App() {
  const { openedApps } = useApp();

  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [tabMeasurements, setTabMeasurements] = useState<
    { x: number; y: number; width: number; height: number }[]
  >([]);

  const setTabRef = (index: number, el: HTMLDivElement | null) => {
    tabRefs.current[index] = el;
  };

  useEffect(() => {
    const measurements = openedApps.map((_, index) => {
      const el = tabRefs.current[index];
      if (el) {
        const rect = el.getBoundingClientRect();
        return {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        };
      }
      return { x: 0, y: 0, width: 0, height: 0 };
    });
    setTabMeasurements(measurements);
  }, [openedApps]);

  return (
    <div className="relative overflow-hidden h-full">
      <BlueScreen show={false} />
      <Main />
      <Navbar tabRefs={tabRefs} setTabRef={setTabRef} />

      {openedApps.map((t, i) => {
        if (t.minimized) return null;
        return (
          <OpenedApp
            key={t.id}
            id={t.id}
            title={t.title}
            icon={t.icon}
            zIndex={t.zIndex}
            programType={t.programType}
            minimized={t.minimized}
            maximize={t.maximize}
            prompt={t.prompt}
            x={t.x}
            y={t.y}
            targetX={t.targetX}
            targetY={t.targetY}
            measurements={tabMeasurements[i]}
          >
            {t.children}
          </OpenedApp>
        );
      })}
    </div>
  );
}

export default App;
