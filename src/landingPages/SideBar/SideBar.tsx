"use client";
import "./sidebar.scss";
import FileIcon from "../../assets/images/FileIcon.svg";
import CommitIcon from "../../assets/images/CommitIcon.svg";
import DebugIcon from "../../assets/images/DebugIcon.svg";
import SearchIcon from "../../assets/images/SearchIcon.svg";
import ExtensionIcon from "../../assets/images/ExtensionsIcon.svg";

import { ReactNode } from "react";
import useSearchParamsHook from "@/hooks/useSearchParamsHook/useSearchParamsHook";
const SideBar = () => {
  const { params, updateURL } = useSearchParamsHook();
  const path = params.get("position") ? params.get("position") : 0;
  console.log(path);
  const icons: ReactNode[] = [
    <FileIcon />,
    <SearchIcon />,
    <CommitIcon />,
    <DebugIcon />,
    <ExtensionIcon />,
  ];
  return (
    <div className="vs-sidebar">
      <ul>
        {icons.map((icon, index) => (
          <li
            key={index}
            onClick={() => {
              updateURL("position", `${index}`);
            }}
            className={path == index ? "sidebar-icon-active" : "sidebar-icon"}
          >
            {icon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
