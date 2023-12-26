"use client";
import { fileManangerTypeFolder } from "../filemanager.types";
import FileManagerSingleFile from "./FileManagerSingleFile";
import VerticalStack from "@/components/FlexStack/VerticalStack/VerticalStack";
import { useState } from "react";
import FileAddNew from "./FileNewAdd";
import useSearchParamsHook from "@/hooks/useSearchParamsHook/useSearchParamsHook";
type FileManagerFiles = {
  filesArray: fileManangerTypeFolder[];
};
const FileManagerFiles = ({ filesArray }: FileManagerFiles) => {
  const [isFilesOpen, setIsFilesOpened] = useState<boolean>(true);
  const { params, updateURL } = useSearchParamsHook();
  const isAddNew = params.get("addFolder");
  console.log(isAddNew);
  return (
    <div className="vs-filemanager-files-main">
      <FileManagerSingleFile
        folderTitle="Vs Code"
        setIsFilesOpened={setIsFilesOpened}
        mainFolder
        isOpenedFolder={isFilesOpen}
      />
      {isFilesOpen ? (
        <VerticalStack gap="4">
          {filesArray.map((file, index) => (
            <FileManagerSingleFile
              key={index}
              folderTitle={file.folderName}
              files={file.files}
            />
          ))}
        </VerticalStack>
      ) : null}
      {isAddNew ? <FileAddNew /> : null}
    </div>
  );
};

export default FileManagerFiles;
