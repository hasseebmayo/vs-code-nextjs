import React from "react";
import HorizentalStack from "@/components/FlexStack/HorizentalStack/HorizentalStack";
import CommitIcon from "../../assets/images/CommitIcon2.svg";
import SplitScreen from "../../assets/images/SplitScreenitem.svg";
import ThreeDots from "../../assets/images/ThreeDotsIcon.svg";
import Cross from "../../assets/images/CrossIcon.svg";
import useLangIcon from "@/hooks/useLangIcon/useLangIcon";
const CodeEditorHeader = () => {
  const { findIcon } = useLangIcon();

  return (
    <div className="vs-editor-header">
      <div className="vs-editor-header-filename">
        <HorizentalStack gap="10">
          <div className="vs-editor-header-filename-icon">
            {findIcon("js")}
            <span>Some Name</span>
          </div>
          <Cross />
        </HorizentalStack>
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
