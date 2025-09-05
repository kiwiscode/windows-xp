import React from "react";

interface ChildTabPropTypes {
  title: string;
  children: React.ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChildTab = ({ show, setShow, title, children }: ChildTabPropTypes) => {
  return (
    <>
      {show && (
        <>
          {/* Overlay */}
          <div className="fixed h-full w-full left-0 top-0 bg-black/30"></div>

          {/* Window */}
          <div
            style={{ width: 300 }}
            className="window absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="title-bar">
              <div className="title-bar-text">{title}</div>
              <div className="title-bar-controls">
                <button aria-label="Minimize" />
                <button aria-label="Maximize" />
                <button aria-label="Close" onClick={() => setShow(false)} />
              </div>
            </div>
            <div className="window-body">{children}</div>
          </div>
        </>
      )}
    </>
  );
};

export default ChildTab;
