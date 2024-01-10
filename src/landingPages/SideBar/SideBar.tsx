"use client";
import "./sidebar.scss";
import FileIcon from "../../assets/images/FileIcon.svg";
import Logout from "../../assets/images/Logout.svg";
// import CommitIcon from "../../assets/images/CommitIcon.svg";
// import DebugIcon from "../../assets/images/DebugIcon.svg";
// import SearchIcon from "../../assets/images/SearchIcon.svg";
// import ExtensionIcon from "../../assets/images/ExtensionsIcon.svg";

// import { ReactNode } from "react";
import useSearchParamsHook from "@/hooks/useSearchParamsHook/useSearchParamsHook";
import usePostApi from "@/hooks/usePostApi/usePostApi";
import { useRouter } from "next/navigation";
import useToastify from "@/hooks/useToastify/useToastify";
const SideBar = () => {
  const { params, updateURL } = useSearchParamsHook();
  const path = params.get("position") ? params.get("position") : 0;
  const { mutate } = usePostApi();
  const { fireToast } = useToastify();
  const router = useRouter();
  // const icons: ReactNode[] = [
  //   <FileIcon />,
  //   <SearchIcon />,
  //   // <CommitIcon />,
  //   // <DebugIcon />,
  //   // <ExtensionIcon />,
  // ];
  function logoutHandler() {
    mutate(
      {
        data: {},
        path: "/api/logout",
      },
      {
        onSuccess: () => {
          fireToast("Logout Succesfully!", "success");
          localStorage.removeItem("openedFiles");
          router.push("/");
        },
      }
    );
  }
  return (
    <div className="vs-sidebar">
      <ul>
        <li
          // key={index + "soe"}
          onClick={() => {
            // updateURL("position", `${index}`);
          }}
          className={"sidebar-icon-active"}
        >
          <FileIcon />
        </li>
      </ul>
      <div className="bottom-logout">
        <Logout onClick={logoutHandler} />
      </div>
    </div>
  );
};

export default SideBar;
