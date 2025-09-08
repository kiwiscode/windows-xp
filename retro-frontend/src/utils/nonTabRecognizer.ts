export const toTheFront = (activeApp: string | null) => {
  const winamp = document.getElementById("webamp");

  const fullDiv = document.querySelector(
    "#webamp div[style*='width: 100%'][style*='height: 100%']"
  );
  console.log(fullDiv);
  document.addEventListener("click", (e) => {
    if (!winamp) return;

    const rect = winamp.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    const isInsideWinamp =
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

    if (isInsideWinamp) {
      winamp.style.zIndex = "30";
    } else if (activeApp !== "Winamp") {
      winamp.style.zIndex = "initial";
    }

    console.log("rect:", rect);
  });

  if (winamp) {
    if (activeApp === "Winamp") {
      winamp.style.zIndex = "30";
    } else {
      winamp.style.zIndex = "initial";
    }
  }
};
