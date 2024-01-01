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
import useSearchParamsHook from "@/hooks/useSearchParamsHook/useSearchParamsHook";
import CodeFileRename from "./CodeFiles/CodeFileRename";
import useKeyPress from "@/hooks/useKeyPress/useKeyPress";
import { querykeys } from "@/Utils/QueryKeys/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import usePatchApi from "@/hooks/usePatchApi/usePatchApi";

type vsFiles = {
  folderTitle: string;
  files?: filesType[];
  mainFolder?: boolean;
  isOpenedFolder?: boolean;
  id?: string;
  index?: number;
  setIsFilesOpened?: Dispatch<SetStateAction<boolean>>;
};
const FileManagerSingleFile = ({
  folderTitle,
  files,
  mainFolder = false,
  isOpenedFolder = false,
  setIsFilesOpened,
  id,
  index,
}: vsFiles) => {
  const fileNameRef = useRef<HTMLSpanElement | null>(null);
  const { mutate } = usePatchApi();
  const queryClient = useQueryClient();
  const handleDeleteAction = () => {
    // Your logic for delete action (e.g., delete from the database)
    if (isActive) {
      mutate(
        {
          data: {
            id,
          },
          path: `/api`,
        },
        {
          onSuccess: (res) => {
            console.log(res);
            queryClient.invalidateQueries({
              queryKey: [querykeys.GET_FOLDER_FILE],
            });
          },
        }
      );
    }
  };
  // Following state will be to show dropdown.
  const [isDropOpen, setIsDropOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(false);
  // Following stated when ever user double clicked on the file name input will appear
  const [isRenamed, setIsRenamed] = useState<boolean>(false);
  const { updateURL } = useSearchParamsHook();
  const { params } = useSearchParamsHook();
  const addFile = params.get("addfile") ? params.get("addfile") : null;
  // Outside Click
  useOutsideClick(fileNameRef, () => {
    if (isRenamed) {
      setIsRenamed(false);
    }
  });
  useKeyPress("Delete", handleDeleteAction);

  return (
    <div
      tabIndex={index}
      className={
        mainFolder
          ? "vs-filemanager-subfiles vs-files-main-folder"
          : "vs-filemanager-subfiles"
      }
      onFocus={() => {
        setIsActive(true);
      }}
      onBlur={() => {
        console.log("on Blur");
        setIsActive(false);
      }}
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
          <div
            className="vs-filemanager-subfiles-file"
            style={{
              outline: isActive ? "1px solid white" : "",
            }}
          >
            <span
              ref={fileNameRef}
              onDoubleClick={() => {
                if (mainFolder) {
                  return;
                }
                // setIsRenamed(true);
              }}
            >
              {folderTitle}
            </span>
            {mainFolder ? null : (
              <HorizentalStack gap="10">
                {/* <Delete /> */}
                <PlusIcon
                  onClick={() => {
                    updateURL("addfile", id!);
                  }}
                />
              </HorizentalStack>
            )}
          </div>
        )}
      </HorizentalStack>

      {isDropOpen ? (
        <>
          {files?.map((file, index) => (
            <FileManagerCodeFile file={file} key={index} folderId={id} />
          ))}
        </>
      ) : null}
      {mainFolder ? null : id == addFile ? (
        <div className="code-rename-file">
          <CodeFileRename />
        </div>
      ) : null}
    </div>
  );
};

export default FileManagerSingleFile;
