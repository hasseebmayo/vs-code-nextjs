import HorizentalStack from "@/components/FlexStack/HorizentalStack/HorizentalStack";
import SettingIcon from "../../../../assets/images/SettingIcon.svg";
import "./filemanagerCode.scss";
import { filesType } from "../../filemanager.types";
import useLangIcon from "@/hooks/useLangIcon/useLangIcon";
import { useState } from "react";
const FileManagerCodeFile = ({ file }: { file: filesType }) => {
  const { findIcon } = useLangIcon();
  const [isNewFile, setIsNewFile] = useState<boolean>();
  return (
    <>
      {file ? (
        <div className="filemanager-code-files">
          <HorizentalStack alignItems="center">
            {findIcon(file.type)}
            <span>{file.fileName + "." + file?.type}</span>
          </HorizentalStack>
        </div>
      ) : null}
    </>
  );
};

export default FileManagerCodeFile;
