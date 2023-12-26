"use client";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { useState } from "react";
import FileDropIcon from "../../../assets/images/FileDropIcon.svg";
import PlusIcon from "../../../assets/images/PlusIcon.svg";
import HorizentalStack from "@/components/FlexStack/HorizentalStack/HorizentalStack";
import FileManagerCodeFile from "./CodeFiles/FileManagerCodeFile";
import useOutsideClick from "@/hooks/useOutsideClick/useOutsideClick";
import FileRename from "./CodeFiles/FileRename";
import { filesType } from "../filemanager.types";
type vsFiles = {
  folderTitle: string;
  files?: filesType[];
  mainFolder?: boolean;
  isOpenedFolder?: boolean;
  setIsFilesOpened?: Dispatch<SetStateAction<boolean>>;
};
const FileManagerSingleFile = ({
  folderTitle,
  files,
  mainFolder = false,
  isOpenedFolder = false,
  setIsFilesOpened,
}: vsFiles) => {
  const fileNameRef = useRef<HTMLSpanElement | null>(null);
  // Following state will be to show dropdown.
  const [isDropOpen, setIsDropOpen] = useState<boolean>(false);
  // Following stated when ever user double clicked on the file name input will appear
  const [isRenamed, setIsRenamed] = useState<boolean>(false);

  // Outside Click
  useOutsideClick(fileNameRef, () => {
    if (isRenamed) {
      console.log("clicked");
      setIsRenamed(false);
    }
  });
  return (
    <div
      className={
        mainFolder
          ? "vs-filemanager-subfiles vs-files-main-folder"
          : "vs-filemanager-subfiles"
      }
    >
      <HorizentalStack
        className=""
        onClick={() => {
          setIsDropOpen((prev) => !prev);
          setIsFilesOpened?.((prev) => !prev);
        }}
      >
        <FileDropIcon
          style={{
            rotate: mainFolder
              ? !isOpenedFolder
                ? "-90deg"
                : "0deg"
              : !isDropOpen
              ? "-90deg"
              : "0deg",
            transition: "rotate 0.3s ease",
          }}
        />

        {isRenamed ? (
          <FileRename setIsRenamed={setIsRenamed} />
        ) : (
          <div className="vs-filemanager-subfiles-file">
            <span
              ref={fileNameRef}
              onDoubleClick={() => {
                if (mainFolder) {
                  return;
                }
                setIsRenamed(true);
              }}
            >
              {folderTitle}
            </span>
            {mainFolder ? null : <PlusIcon />}
          </div>
        )}
      </HorizentalStack>
      {files && isDropOpen ? (
        <>
          {files.length == 0
            ? null
            : files?.map((file, index) => (
                <FileManagerCodeFile file={file} key={index} />
              ))}
        </>
      ) : null}
    </div>
  );
};

export default FileManagerSingleFile;
