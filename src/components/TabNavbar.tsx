import back from "/tab-icons/tab-static-bar/back.png";
import forward from "/tab-icons/tab-static-bar/forward.png";
import folder from "/tab-icons/tab-static-bar/folder.png";
import search from "/tab-icons/tab-static-bar/search.png";
import folders from "/tab-icons/tab-static-bar/folders.png";
import go from "/tab-icons/tab-static-bar/go.png";
import thumbnail from "/tab-icons/tab-static-bar/thumbnail.png";
import tooldropdown from "/tab-icons/tab-static-bar/tooldropdown.png";

interface props {
  title: string;
  icon: string;
}

const TabNavbar = ({ title, icon }: props) => {
  return (
    <>
      <section
        className="com__toolbar relative flex items-center h-[24px] shrink-0 border-b"
        style={{
          borderBottom: "2px solid rgba(255, 255, 255, 0.7)",
        }}
      >
        {/* left side */}
        <div
          className="h-[23px] py-[1px] pl-[2px] border-l-0 flex-1 cursor-default"
          style={{
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="inline-flex h-[20px] items-center mt-[2px] leading-[20px] relative">
            <p className="text-[11px] h-full relative px-[7px] hover:bg-[#1660e8] hover:text-white">
              File
            </p>
            <p className="text-[11px] h-full relative px-[7px] hover:bg-[#1660e8] hover:text-white">
              Edit
            </p>
            <p className="text-[11px] h-full relative px-[7px] hover:bg-[#1660e8] hover:text-white">
              View
            </p>
            <p className="text-[11px] h-full relative px-[7px] hover:bg-[#1660e8] hover:text-white">
              Favorites
            </p>
            <p className="text-[11px] h-full relative px-[7px] hover:bg-[#1660e8] hover:text-white">
              Tools
            </p>
            <p className="text-[11px] h-full relative px-[7px] hover:bg-[#1660e8] hover:text-white">
              Help
            </p>
          </div>
        </div>
        {/* windows logo */}
        <img
          src="/tab-icons/tab-static-bar/winlogo.png"
          alt=""
          className="h-full"
          style={{
            borderLeft: "1px solid white",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        />
      </section>

      {/* navigation */}
      <section className="com__function_bar h-[36px] flex items-center text-[11px] py-[1px] px-[3px] shrink-0 border-b-[1px] border-b-[rgba(0,0,0,0.1)] cursor-default">
        <div
          className="opacity-[0.7] flex h-full items-center"
          style={{
            filter: "grayscale(1)",
            border: "1px solid rgba(0,0,0,0)",
          }}
        >
          <img alt="back" src={back} />
          <span style={{ marginRight: "4px" }}>Back</span>{" "}
          <div
            className="h-full flex items-center mx-[4px] before:content-[''] before:block before:border-solid
  before:border-t-[3px] 
  before:border-x-[3px] 
  before:border-b-0
  before:border-t-black
  before:border-x-transparent
  before:border-b-transparent"
          />
        </div>
        <div
          className="opacity-[0.7] flex h-full items-center"
          style={{
            filter: "grayscale(1)",
            border: "1px solid rgba(0,0,0,0)",
          }}
        >
          <img alt="back" src={forward} />
          <div
            className="h-full flex items-center mx-[4px] before:content-[''] before:block before:border-solid
  before:border-t-[3px] 
  before:border-x-[3px] 
  before:border-b-0
  before:border-t-black
  before:border-x-transparent
  before:border-b-transparent"
          />
        </div>
        <div className="nav-btn-tab">
          <img
            alt="back"
            width={22}
            height={22}
            className="mr-[4px] ml-[1px]"
            src={folder}
          />
        </div>
        <div
          className="h-[90%] w-[1px] mx-[2px]"
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
        />

        <div className="nav-btn-tab">
          <img
            alt="back"
            width={22}
            height={22}
            className="mr-[4px] ml-[1px]"
            src={search}
          />
          <span className="mr-[4px]">Search</span>{" "}
        </div>
        <div className="nav-btn-tab">
          <img
            alt="back"
            width={22}
            height={22}
            className="mr-[4px] ml-[1px]"
            src={folders}
          />
          <span className="mr-[4px]">Folders</span>{" "}
        </div>
        <div
          className="h-[90%] w-[1px] mx-[2px]"
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
        />
        <div className="nav-btn-tab">
          <img
            alt="back"
            width={22}
            height={22}
            className="mr-[1px] ml-[2px]"
            src={thumbnail}
          />
          <div
            className="h-full flex items-center mx-[4px] before:content-[''] before:block before:border-solid
  before:border-t-[3px] 
  before:border-x-[3px] 
  before:border-b-0
  before:border-t-black
  before:border-x-transparent
  before:border-b-transparent"
          />
        </div>
      </section>
      {/* adress bar */}
      <section
        className="com__address_bar flex items-center h-[20px] text-[11px] px-[2px] shrink-0"
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.7)",
          boxShadow: "inset 0 -2px 3px -1px #b0b0b0",
        }}
      >
        <div className="p-[5px] text-[rgba(0,0,0,0.5)] leading-[100%]">
          Address
        </div>
        <div
          className="h-full flex flex-1 items-center bg-white relative"
          style={{
            border: "1px solid rgba(122, 122, 255, 0.6)",
          }}
        >
          <img
            alt="icon"
            width={14}
            height={14}
            src={icon}
            className="ml-[2px]"
          />
          <div className="whitespace-nowrap absolute left-[18px] right-[17px]">
            {title}
          </div>

          <img
            alt="dropdown"
            className="absolute right-[1px] hover:brightness-[1.1]"
            width={15}
            height={15}
            src={tooldropdown}
          />
        </div>

        <div className="flex items-center h-[95%] relative pr-[18px] pl-[5px]">
          <img
            alt="go"
            className="h-[95%] mr-[3px] "
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
            }}
            src={go}
          />
          <span className="text-[rgba(0, 0, 0, 0.5)]">Go</span>
        </div>
      </section>
    </>
  );
};

export default TabNavbar;
