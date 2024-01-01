"use client";
import CodeEditor from "@/landingPages/CodeEditor/CodeEditor";
import FileMananger from "@/landingPages/FileManager/FileMananger";
import SideBar from "@/landingPages/SideBar/SideBar";
import { OpenFilesProvider } from "@/components/ContextApi/ContextFile";
export default function Home() {
  return (
    <OpenFilesProvider>
      <main className="vs-code-editor">
        <SideBar />
        <FileMananger />
        <CodeEditor />
      </main>
    </OpenFilesProvider>
  );
}
