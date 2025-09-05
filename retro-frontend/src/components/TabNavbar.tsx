import back from "/tab-icons/tab-static-bar/back.png";
import forward from "/tab-icons/tab-static-bar/forward.png";
import folder from "/tab-icons/tab-static-bar/folder.png";
import search from "/tab-icons/tab-static-bar/search.png";
import arrowDown from "/tab-icons/tab-static-bar/arrow-down.png";
import folders from "/tab-icons/tab-static-bar/folders.png";
import go from "/tab-icons/tab-static-bar/go.png";
import thumbnail from "/tab-icons/tab-static-bar/thumbnail.png";
import tooldropdown from "/tab-icons/tab-static-bar/tooldropdown.png";

type App = "recycle" | "my computer";

interface props {
  title: string;
  icon: string;
  programType: App;
}

const TabNavbar = ({ title, icon, programType }: props) => {
  const handleBackClick = () => {};

  const backBtnActive = false;
  return (
    <>
      <div
        className="flex md:h-[32px] max-md:h-[60px] max-md:flex-wrap"
        style={{
          borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          className="flex flex-wrap items-center justify-start h-full w-full bg-[#ede9d3] pl-[2px]"
          style={{
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <p className="toolbar-item">File</p>
          <p className="toolbar-item">Edit</p>
          <p className="toolbar-item">View</p>
          {programType === "recycle" ? (
            <div style={{ display: "flex" }}>
              <p className="toolbar-item">Favourites</p>
              <p className="toolbar-item">Tools</p>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <p className="toolbar-item">Insert</p>
              <p className="toolbar-item">Format</p>
              <p className="toolbar-item">Tools</p>
              <p className="toolbar-item">Message</p>
            </div>
          )}
          <p className="toolbar-item">Help</p>
          <div className="flex ml-auto">
            <img
              src="/tab-icons/tab-static-bar/winlogo.png"
              alt=""
              width={30}
              height={30}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {(programType === "recycle" || programType === "my computer") && (
        <div>
          <div className="flex flex-wrap bg-[#ede9d3] min-h-[24px] items-center p-[5px] text-[12px]">
            <div
              onClick={handleBackClick}
              className={backBtnActive ? "back-enabled" : "back-disabled"}
            >
              <img alt="back" width={25} height={25} src={back} />
              <p style={{ margin: "0 5px" }}>Back</p>
              <hr />
              <img
                style={{ margin: "0 4px" }}
                alt="arrowDown"
                width={6}
                height={6}
                src={arrowDown}
              />
            </div>
            <div className="flex items-center grayscale-[100%]">
              <img
                style={{ margin: "0 6px" }}
                alt="forward"
                width={25}
                height={25}
                src={forward}
              />
              <img
                style={{ margin: "0 4px" }}
                alt="arrowDown"
                width={6}
                height={6}
                src={arrowDown}
              />
            </div>
            <img
              alt="folder"
              style={{ margin: "0 5px" }}
              width={25}
              height={25}
              src={folder}
            />
            <div
              className="h-full mx-[8px]"
              style={{
                borderLeft: "1px solid #cac6af",
              }}
            />
            <div className="flex items-center">
              <img
                style={{ margin: "0 6px" }}
                alt="search"
                width={25}
                height={25}
                src={search}
              />
              <p>Search</p>
            </div>
            <div className="flex items-center">
              <img
                style={{ margin: "0 6px" }}
                alt="folders"
                width={25}
                height={25}
                src={folders}
              />
              <p>Folders</p>
            </div>
            <div
              className="h-full mx-[8px]"
              style={{
                borderLeft: "1px solid #cac6af",
              }}
            />
            <img
              style={{ margin: "0 6px" }}
              alt="thumbnail"
              width={25}
              height={25}
              src={thumbnail}
            />
            <img alt="arrowDown" width={6} height={6} src={arrowDown} />
          </div>
          <div
            className="flex h-[24px] bg-[#ede9d3]"
            style={{
              borderTop: "2px solid rgba(0,0,0, 0.1)",
            }}
          >
            <div className="px-[5px] flex w-full items-center">
              <p style={{ color: "#7f7c73", fontSize: "11px", width: "55px" }}>
                Address
              </p>
              <div
                className="flex bg-white w-full items-center mx-[5px] justify-between"
                style={{
                  border: " 1px solid rgba(0,0,0,0.2)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className=" text-[12px]"
                >
                  <img
                    style={{ margin: "0px 3px" }}
                    alt="icon"
                    width={18}
                    height={18}
                    src={icon}
                  />
                  {title}
                </div>
                <img
                  alt="dropdown"
                  className="hover:brightness-[1.1]"
                  width={16}
                  height={18}
                  src={tooldropdown}
                />
              </div>
              <img
                alt="go"
                className="hover:brightness-[1.1]"
                width={20}
                height={20}
                src={go}
              />
              <p className="text-[12px]">Go</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TabNavbar;
