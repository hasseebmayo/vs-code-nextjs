"use client";
import "./codeEditor.scss";
import { Editor } from "@monaco-editor/react";
import CodeEditorHeader from "./CodeEditorHeader";
import { useOpenedFiles } from "@/components/ContextApi/ContextFile";
import useSearchParamsHook from "@/hooks/useSearchParamsHook/useSearchParamsHook";
import { useEffect, useState } from "react";

const CodeEditor = () => {
  const { openedFiles, onChangeCode } = useOpenedFiles();
  const [editorCode, setEditorCode] = useState<any>();
  const { params } = useSearchParamsHook();
  const addFileId = params.get("openFile");
  useEffect(() => {
    const openFile = openedFiles.find((d: any) => d._id == addFileId);
    setEditorCode(openFile);
  }, [addFileId]);

  return (
    <div className="vs-editor">
      <CodeEditorHeader />
      {addFileId ? (
        <Editor
          height={"100vh"}
          language={
            editorCode?.fileType == "js" ? "javascript" : editorCode?.fileType
          }
          theme="vs-dark"
          value={editorCode?.value}
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
