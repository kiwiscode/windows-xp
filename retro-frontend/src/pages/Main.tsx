import { useState } from "react";

const Main = () => {
  // BG image array
  const bgImages = ["/xp-bg-opt.jpg", "/xp-bg-opt2.jpg", "/xp-bg-opt3.jpg"];

  // First Picture default
  const [bgIndex, setBgIndex] = useState(0);

  const bgImage = bgImages[bgIndex];

  return (
    <div
      className="h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="h-full w-full flex items-center justify-center text-white text-3xl"></div>
    </div>
  );
};

export default Main;
