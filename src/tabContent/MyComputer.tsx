import { useState } from "react";
import accordion from "/tab-icons/accordion.png";
import viewInfo from "/tab-icons/view-info.ico";
import toggleAction from "/tab-icons/toggle-action.png";
import settings from "/tab-icons/settings.png";
import network from "/tab-icons/network.png";
import document from "/tab-icons/document.png";
import folder from "/tab-icons/folder.png";
import control from "/tab-icons/control.png";
import folderBig from "/tab-icons/folderBig.png";
import localDisk from "/tab-icons/localDisk.png";
import cdDrive from "/tab-icons/cdDrive.png";

type closedTab = "A" | "B" | "C";

const MyComputer = () => {
  const [closedTabs, setCloseTabs] = useState<closedTab[]>([]);
  return (
    <div
      className="com__content flex-1 border-t-0 bg-[#f1f1f1] overflow-auto text-[11px] relative"
      style={{
        border: "1px solid rgba(0,0,0,0.4)",
      }}
    >
      <div className="flex h-full overflow-auto">
        {/* left */}
        <div className="w-[180px] h-[100%] overflow-auto box-border p-[10px] bg-[linear-gradient(to_bottom,#748aff_0%,#4057d3_100%)] ">
          {/* first */}
          <div
            className="flex items-center h-[23px] rounded-tr-[3px] rounded-tl-[3px] pl-[11px] pr-[2px] cursor-pointer 
                bg-[linear-gradient(to_right,rgb(240,240,255)_0%,rgb(240,240,255)_30%,rgb(168,188,255)_100%)] 
                group"
          >
            <div
              className="flex items-center cursor-pointer w-full"
              onClick={() => {
                setCloseTabs((prev) => {
                  if (prev.includes("A")) {
                    return prev.filter((tab) => tab !== "A");
                  } else {
                    return [...prev, "A"];
                  }
                });
              }}
            >
              <div className="group-hover:text-[#1c68ff] font-bold text-[#0c327d] flex-1">
                System Tasks
              </div>
              <img
                style={{
                  transform: closedTabs.includes("A") ? "rotate(180deg)" : "",
                }}
                src={accordion}
                width={18}
                height={18}
                alt=""
                className="drop-shadow-[1px_1px_3px_rgba(0,0,0,0.3)]"
              />
            </div>
          </div>
          {!closedTabs.includes("A") && (
            <div className="py-[5px] px-[10px] bg-[linear-gradient(to_right,rgb(180,200,251)_0%,rgb(164,185,251)_50%,rgb(180,200,251)_100%)] bg-[rgba(198,211,255,0.87)]">
              <div className="flex mb-[2px]">
                <img
                  width={14}
                  height={14}
                  className="mr-[5px]"
                  src={viewInfo}
                  alt="control"
                />
                <div className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline">
                  View system information
                </div>
              </div>
              <div className="flex mb-[2px]">
                <img
                  width={14}
                  height={14}
                  className="mr-[5px]"
                  src={toggleAction}
                  alt="control"
                />
                <div className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline">
                  Add or remove programs
                </div>
              </div>
              <div className="flex mb-[2px]">
                <img
                  width={14}
                  height={14}
                  className="mr-[5px]"
                  src={settings}
                  alt="control"
                />
                <div className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline">
                  Change a setting
                </div>
              </div>
            </div>
          )}

          {/* second */}
          <div
            className="mt-[12px] flex items-center h-[23px] rounded-tr-[3px] rounded-tl-[3px] pl-[11px] pr-[2px] cursor-pointer 
                bg-[linear-gradient(to_right,rgb(240,240,255)_0%,rgb(240,240,255)_30%,rgb(168,188,255)_100%)] 
                group"
          >
            <div
              className="flex items-center cursor-pointer w-full"
              onClick={() => {
                setCloseTabs((prev) => {
                  if (prev.includes("B")) {
                    return prev.filter((tab) => tab !== "B");
                  } else {
                    return [...prev, "B"];
                  }
                });
              }}
            >
              <div className="group-hover:text-[#1c68ff] font-bold text-[#0c327d] flex-1">
                Other Places
              </div>
              <img
                style={{
                  transform: closedTabs.includes("B") ? "rotate(180deg)" : "",
                }}
                src={accordion}
                width={18}
                height={18}
                alt=""
                className="drop-shadow-[1px_1px_3px_rgba(0,0,0,0.3)]"
              />
            </div>
          </div>
          {!closedTabs.includes("B") && (
            <div className="py-[5px] px-[10px] bg-[linear-gradient(to_right,rgb(180,200,251)_0%,rgb(164,185,251)_50%,rgb(180,200,251)_100%)] bg-[rgba(198,211,255,0.87)]">
              <div className="flex mb-[2px]">
                <img
                  width={14}
                  height={14}
                  className="mr-[5px]"
                  src={network}
                  alt="control"
                />
                <div className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline">
                  My Network Places
                </div>
              </div>
              <div className="flex mb-[2px]">
                <img
                  width={14}
                  height={14}
                  className="mr-[5px]"
                  src={document}
                  alt="control"
                />
                <div className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline">
                  My Documents
                </div>
              </div>
              <div className="flex mb-[2px]">
                <img
                  width={14}
                  height={14}
                  className="mr-[5px]"
                  src={folder}
                  alt="control"
                />
                <div className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline">
                  Shared Documents
                </div>
              </div>
              <div className="flex mb-[2px]">
                <img
                  width={14}
                  height={14}
                  className="mr-[5px]"
                  src={control}
                  alt="control"
                />
                <div className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline">
                  Control Panel
                </div>
              </div>
            </div>
          )}
        </div>
        {/* right */}
        <div className="h-full overflow-y-auto bg-[#fff] flex-1">
          {/* first */}
          <div>
            <div className="w-[300px] font-bold pt-[2px] pb-[3px] pl-[12px] relative after:content-[''] after:block after:absolute after:bottom-0 after:left-[-12px] after:h-[1px] after:w-full after:bg-[linear-gradient(to_right,#70bfff_0%,#fff_100%)]">
              Files Stored on This Computer
            </div>
            <div className="flex items-center flex-wrap pt-[15px] pr-[15px] pb-0 pl-[15px]">
              <div className="flex items-center w-[200px] mb-[15px] h-auto">
                <img
                  width={45}
                  height={45}
                  className="mr-[5px]"
                  src={folderBig}
                  alt=""
                />
                <div className="">
                  <div className="whitespace-nowrap h-full">
                    Shared documents
                  </div>
                </div>
              </div>
              <div className="flex items-center w-[200px] mb-[15px] h-auto">
                <img
                  width={45}
                  height={45}
                  className="mr-[5px]"
                  src={folderBig}
                  alt=""
                />
                <div className="">
                  <div className="whitespace-nowrap h-full">
                    User's documents
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* second */}
          <div>
            <div className="w-[300px] font-bold pt-[2px] pb-[3px] pl-[12px] relative after:content-[''] after:block after:absolute after:bottom-0 after:left-[-12px] after:h-[1px] after:w-full after:bg-[linear-gradient(to_right,#70bfff_0%,#fff_100%)]">
              Hard Disk Drives
            </div>
            <div className="flex items-center flex-wrap pt-[15px] pr-[15px] pb-0 pl-[15px]">
              <div className="flex items-center w-[200px] mb-[15px] h-auto">
                <img
                  width={45}
                  height={45}
                  className="mr-[5px]"
                  src={localDisk}
                  alt=""
                />
                <div className="">
                  <div className="whitespace-nowrap h-full">
                    Local Disk (C:)
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* third */}
          <div>
            <div className="w-[300px] font-bold pt-[2px] pb-[3px] pl-[12px] relative after:content-[''] after:block after:absolute after:bottom-0 after:left-[-12px] after:h-[1px] after:w-full after:bg-[linear-gradient(to_right,#70bfff_0%,#fff_100%)]">
              Devices with Removable Storage
            </div>
            <div className="flex items-center flex-wrap pt-[15px] pr-[15px] pb-0 pl-[15px]">
              <div className="flex items-center w-[200px] mb-[15px] h-auto">
                <img
                  width={45}
                  height={45}
                  className="mr-[5px]"
                  src={cdDrive}
                  alt=""
                />
                <div className="">
                  <div className="whitespace-nowrap h-full">CD Drive (D:)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComputer;
