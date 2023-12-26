"use client";
import { useState } from "react";
import "./fileManager.scss";
import FileManagerFiles from "./Files/FileManagerFiles";
import FileManagerHeader from "./Header/FileManagerHeader";
import { fileManangerTypeFolder, filesArraySample } from "./filemanager.types";
import useSearchParamsHook from "@/hooks/useSearchParamsHook/useSearchParamsHook";
import useFolderFiles from "@/hooks/FetchingHooks/useFolderFiles";

const FileMananger = () => {
  const [filesArray, setFilesArray] =
    useState<fileManangerTypeFolder[]>(filesArraySample);
  const { updateURL } = useSearchParamsHook();
  const { response } = useFolderFiles();
  console.log(response);
  return (
    <div className="vs-filemanager">
      <FileManagerHeader
        onClick={() => {
          updateURL("addFolder", "true");
        }}
      />
      <div className="vs-filemanager-files">
        <FileManagerFiles filesArray={filesArray} />
      </div>
    </div>
  );
};

export default FileMananger;
