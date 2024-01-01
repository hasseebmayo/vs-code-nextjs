import HorizentalStack from "@/components/FlexStack/HorizentalStack/HorizentalStack";
import "./filemanagerCode.scss";
import { filesType } from "../../filemanager.types";
import useLangIcon from "@/hooks/useLangIcon/useLangIcon";
import { useQueryClient } from "@tanstack/react-query";
import { querykeys } from "@/Utils/QueryKeys/queryKeys";
import { useOpenedFiles } from "@/components/ContextApi/ContextFile";

const FileManagerCodeFile = ({
  file,
  folderId,
}: {
  file: filesType;
  folderId?: string;
}) => {
  const { setToLocalStorage } = useOpenedFiles();
  const { findIcon } = useLangIcon();
  const queryClient = useQueryClient();
  const folderData: any = queryClient.getQueryData([querykeys.GET_FOLDER_FILE]);
  const selectedFile = folderData
    ?.find((d: any) => d?._id == folderId)
    ?.files?.find((d: any) => file?._id == d._id);
  const localStorageData = {
    folderId,
    ...selectedFile,
  };

  return (
    <>
      {file ? (
        <div className="filemanager-code-files">
          <HorizentalStack
            alignItems="center"
            onClick={() => {
              setToLocalStorage(localStorageData);
            }}
          >
            {findIcon(file.fileType)}

            <span>{file.fileName + "." + file?.fileType}</span>
          </HorizentalStack>
        </div>
      ) : null}
    </>
  );
};

export default FileManagerCodeFile;
