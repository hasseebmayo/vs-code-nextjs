import HorizentalStack from "@/components/FlexStack/HorizentalStack/HorizentalStack";
import SettingIcon from "../../../../assets/images/SettingIcon.svg";
import "./filemanagerCode.scss";
import { filesType } from "../../filemanager.types";
import useLangIcon from "@/hooks/useLangIcon/useLangIcon";
const FileManagerCodeFile = ({ file }: { file: filesType }) => {
  const { findIcon } = useLangIcon();
  console.log("files", file);
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
