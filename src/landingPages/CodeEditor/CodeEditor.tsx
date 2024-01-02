"use client";
import "./codeEditor.scss";
import { Editor } from "@monaco-editor/react";
import CodeEditorHeader from "./CodeEditorHeader";
import { useOpenedFiles } from "@/components/ContextApi/ContextFile";
import useSearchParamsHook from "@/hooks/useSearchParamsHook/useSearchParamsHook";

const CodeEditor = () => {
  const { openedFiles, onChangeCode } = useOpenedFiles();
  const { params } = useSearchParamsHook();
  const addFileId = params.get("openFile");
  const openFile = openedFiles.find((d: any) => d._id == addFileId);

  return (
    <div className="vs-editor">
      <CodeEditorHeader />
      {addFileId ? (
        <Editor
          height={"100vh"}
          language={
            openFile?.fileType == "js" ? "javascript" : openFile?.fileType
          }
          theme="vs-dark"
          value={openFile?.value}
          onChange={(val) => {
            onChangeCode(addFileId, val);
          }}
        />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            color: "white",
          }}
        >
          No File is opened!
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
