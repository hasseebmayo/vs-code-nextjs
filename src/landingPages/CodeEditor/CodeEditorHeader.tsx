import React, { useEffect, useState } from "react";
import HorizentalStack from "@/components/FlexStack/HorizentalStack/HorizentalStack";
import Cross from "../../assets/images/CrossIcon.svg";
import useLangIcon from "@/hooks/useLangIcon/useLangIcon";
import { useOpenedFiles } from "@/components/ContextApi/ContextFile";
import useSearchParamsHook from "@/hooks/useSearchParamsHook/useSearchParamsHook";
import usePutApi from "@/hooks/usePutApi/usePutApi";
const CodeEditorHeader = () => {
  const { findIcon } = useLangIcon();
  const { openedFiles, removeFromLocalStorage } = useOpenedFiles();

  const { updateURL, params, deleteQuery } = useSearchParamsHook();
  const { mutate } = usePutApi();

  const addFileId = params.get("openFile");
  async function onCrossHandle(id: string) {
    try {
      const alertCall = confirm("Do You want to Save Changes?");
      const filteredFile = openedFiles?.find((d: any) => d?._id == id);

      if (alertCall) {
        mutate(
          {
            data: filteredFile,
            path: "/api",
          },
          {
            onSuccess: async (res) => {
              if (openedFiles.length === 1) {
                await removeFromLocalStorage(id, true);
              } else {
                await removeFromLocalStorage(id);
              }

              const previosId = openedFiles
                ?.filter((d: any) => d._id != id)
                .at(-1);

              if (openedFiles.length !== 1) {
                updateURL("openFile", previosId._id);
              } else {
                deleteQuery("openFile");
              }
            },
          }
        );
      } else {
        if (openedFiles.length === 1) {
          await removeFromLocalStorage(id, true);
        } else {
          await removeFromLocalStorage(id);
        }

        const previosId = openedFiles?.filter((d: any) => d._id != id).at(-1);

        if (openedFiles.length !== 1) {
          updateURL("openFile", previosId._id);
        } else {
          deleteQuery("openFile");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

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
            <Cross onClick={() => onCrossHandle(folder?._id)} />
          </HorizentalStack>
        ))}
      </div>
    </div>
  );
};

export default CodeEditorHeader;
