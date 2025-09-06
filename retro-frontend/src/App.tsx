import BlueScreen from "./components/BlueScreen";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";

import { useApp } from "./context/AppContext";
import Tab from "./components/Tab";
import { useEffect, useRef, useState } from "react";

import "xp.css/dist/XP.css";

function App() {
  const { openedTabs } = useApp();

  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [tabMeasurements, setTabMeasurements] = useState<
    { x: number; y: number; width: number; height: number }[]
  >([]);

  const setTabRef = (index: number, el: HTMLDivElement | null) => {
    tabRefs.current[index] = el;
  };

  useEffect(() => {
    const measurements = openedTabs.map((tab, index) => {
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
  }, [openedTabs]);

  return (
    <div className="relative">
      <BlueScreen show={false} />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <Navbar tabRefs={tabRefs} setTabRef={setTabRef} />

      {openedTabs.map((t, i) => {
        if (t.minimized) return null;
        return (
          <Tab
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
          </Tab>
        );
      })}
    </div>
  );
}

export default App;
