"use client";
import CodeEditor from "@/landingPages/CodeEditor/CodeEditor";
import FileMananger from "@/landingPages/FileManager/FileMananger";
import SideBar from "@/landingPages/SideBar/SideBar";
import { OpenFilesProvider } from "@/components/ContextApi/ContextFile";
import PreviewCode from "@/landingPages/PreviewCode/PreviewCode";
import useKeyPress from "@/hooks/useKeyPress/useKeyPress";
import useSearchParamsHook from "@/hooks/useSearchParamsHook/useSearchParamsHook";
export default function Home() {
  const { params, deleteQuery, updateURL } = useSearchParamsHook();
  const isPreviewOpened = params.get("openPreview");
  useKeyPress(
    "R",
    () => {
      updateURL("openPreview", "true");
    },
    true
  );
  useKeyPress("Escape", () => {
    deleteQuery("openPreview");
  });
  return (
    <OpenFilesProvider>
      <main className="vs-code-editor">
        <SideBar />
        <FileMananger />
        <CodeEditor />
        {isPreviewOpened ? <PreviewCode /> : null}
      </main>
    </OpenFilesProvider>
  );
}
