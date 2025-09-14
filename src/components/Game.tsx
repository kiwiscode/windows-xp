import React, { useEffect } from "react";
import { useApp } from "../context/AppContext";

type Game = "Gta Vice City" | "Cs 1.6" | "Max Payne";

interface GameProps {
  game: Game;
}

const videos: Record<Game, string> = {
  "Gta Vice City": "/videos/gta-vice-city.mp4",
  "Cs 1.6": "/videos/cs1.6.mp4",
  "Max Payne": "/videos/max-payne.mp4",
};

const GameComponent: React.FC<GameProps> = ({ game }) => {
  const { setActiveGame } = useApp();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveGame(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setActiveGame]);

  return (
    <div className="fixed left-0 top-0 w-full h-screen">
      <video
        src={videos[game]}
        autoPlay
        loop
        className="w-full h-full object-cover"
      />
      <button
        onClick={() => setActiveGame(null)}
        style={{
          fontFamily: "ibm",
          border: "1px solid gray",
        }}
        className="absolute bottom-4 right-4 text-[#aaa] px-4 py-2 text-shadow-openXPsc bg-[#000] outline-0 cursor-pointer"
      >
        Quit / {game} (ESC)
      </button>
    </div>
  );
};

export default GameComponent;
