import { useState } from "react";
import { useApp } from "../context/AppContext";
import ChildTab from "../components/ChildTab";

const Recycle = () => {
  const { recycled, restoreApp, deletePermanent } = useApp();
  const [showUndoRecycleWindow, setShowUndoRecycleWindow] =
    useState<boolean>(false);

  const [clickedAppTitle, setClickedAppTitle] = useState<string | null>(null);

  const handleAppClick = (appTitle: string) => {
    setClickedAppTitle(appTitle);
  };
  return (
    <>
      <ChildTab
        title="Recycle Bin"
        children={
          <div>
            <div className="field-row" style={{ justifyContent: "center" }}>
              <p></p>
              <button
                onClick={() => {
                  setShowUndoRecycleWindow(false);
                  restoreApp(clickedAppTitle);
                }}
              >
                Restore
              </button>
              <button
                onClick={() => {
                  setShowUndoRecycleWindow(false);
                  deletePermanent(clickedAppTitle);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        }
        show={showUndoRecycleWindow}
        setShow={setShowUndoRecycleWindow}
      />

      <div className="overflow-y-auto flex flex-wrap gap-2 py-2">
        {recycled && recycled.length > 0 ? (
          recycled.map((i) => (
            <div
              onDoubleClick={() => {
                setShowUndoRecycleWindow(true);
              }}
              key={i.id}
              className={`flex flex-col items-center cursor-pointer select-none rounded-md w-[100px]`}
              onMouseDown={() => {
                handleAppClick(i.title);
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <img
                src={i.icon}
                alt={i.title}
                width={48}
                height={48}
                className="mb-1"
              />
              <span
                className={`text-black px-1 text-[12px] text-center flex ${
                  clickedAppTitle === i.title ? "bg-[#0d61ff] text-white" : ""
                }`}
              >
                {i.title}
              </span>
            </div>
          ))
        ) : (
          <div>You haven’t deleted any files yet.</div>
        )}
      </div>
    </>
  );
};

export default Recycle;
