import React, { useEffect, useState } from "react";
import HorizentalStack from "@/components/FlexStack/HorizentalStack/HorizentalStack";
import CommitIcon from "../../assets/images/CommitIcon2.svg";
import SplitScreen from "../../assets/images/SplitScreenitem.svg";
import ThreeDots from "../../assets/images/ThreeDotsIcon.svg";
import Cross from "../../assets/images/CrossIcon.svg";
import useLangIcon from "@/hooks/useLangIcon/useLangIcon";
import { useOpenedFiles } from "@/components/ContextApi/ContextFile";
import useSearchParamsHook from "@/hooks/useSearchParamsHook/useSearchParamsHook";
const CodeEditorHeader = () => {
  const { findIcon } = useLangIcon();
  const { openedFiles } = useOpenedFiles();
  const { updateURL, params } = useSearchParamsHook();
  const addFileId = params.get("openFile");

  return (
    <div className="vs-editor-header">
      <div className="vs-editor-header-filename">
        {openedFiles?.map((folder: any, index: number) => (
          <HorizentalStack
            gap="10"
            key={index}
            className={addFileId == folder?._id ? "active-file-name" : ""}
          >
            <div
              className={"vs-editor-header-filename-icon"}
              key={folder?.folderId}
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                updateURL("openFile", `${folder._id}`);
              }}
            >
              {findIcon(folder?.fileType)}
              <span>{folder?.fileName + "." + folder?.fileType}</span>
            </div>
            <Cross />
          </HorizentalStack>
        ))}
      </div>

      <div className="vs-editor-header-icons">
        <CommitIcon />
        <SplitScreen />
        <ThreeDots />
      </div>
    </div>
  );
};

export default CodeEditorHeader;
