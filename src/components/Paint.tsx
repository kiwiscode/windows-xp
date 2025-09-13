import React from "react";

interface PaintProps {
  isFocus: boolean;
}

// add child div to capture mouse event when not focused

const Paint: React.FC<PaintProps> = ({ isFocus }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <iframe
        src="https://jspaint.app"
        frameBorder="0"
        title="paint"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          backgroundColor: "rgb(192,192,192)",
        }}
      />
      {!isFocus && (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
          }}
        />
      )}
    </div>
  );
};

export default Paint;
