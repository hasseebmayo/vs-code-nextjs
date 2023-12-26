"use client";
import "./codeEditor.scss";
import { Editor } from "@monaco-editor/react";
import CodeEditorHeader from "./CodeEditorHeader";

const CodeEditor = () => {
  return (
    <div className="vs-editor">
      <CodeEditorHeader />
      <Editor
        height={"100vh"}
        language="css"
        theme="vs-dark"
        onChange={(val) => {
          console.log("val", val);
        }}
      />
    </div>
  );
};

export default CodeEditor;
