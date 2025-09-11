import React, { useEffect } from "react";

import error from "/error/897(32x32).png";
import errorSound from "/error/error.wav";

interface ErrorProps {
  _onClose: () => void;
  errorMessage: string;
}

function lineBreak(str: string) {
  return str.split("\n").map((s: string, i: number) => (
    <p key={i} className="leading-[16px] m-0">
      {s}
    </p>
  ));
}

const Error: React.FC<ErrorProps> = ({ _onClose, errorMessage }) => {
  useEffect(() => {
    try {
      new Audio(errorSound).play();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="bg-[#f5f5f5] w-full h-full text-[11px] p-[12px] flex flex-col ">
      <div className="flex flex-1">
        <img
          src={error}
          alt=""
          style={{
            width: 30,
            height: 30,
          }}
        />
        <div
          style={{
            padding: "2px 20px 12px",
          }}
        >
          {lineBreak(errorMessage)}
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div
          onClick={_onClose}
          className="w-[80px] h-[22px] flex border border-black justify-center items-center shadow-[inset_-1px_-1px_1px_black] group hover:active:shadow-[inset_1px_1px_1px_black]"
        >
          <span className="leading-[11px]">OK</span>
        </div>
      </div>
    </div>
  );
};

export default Error;
