import { useEffect } from "react";
import { useApp } from "../context/AppContext";

const StandByScreen = () => {
  const { setModalAction, setShowStandByScreen } = useApp();

  useEffect(() => {
    setModalAction(null);

    const handleUserActivity = () => {
      setShowStandByScreen(false);
    };

    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    return () => {
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
    };
  }, [setModalAction]);

  return (
    <div
      onClick={() => setShowStandByScreen(false)}
      className="h-screen w-screen bg-black flex items-center justify-center relative"
    />
  );
};

export default StandByScreen;
