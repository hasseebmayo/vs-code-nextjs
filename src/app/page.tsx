import HorizentalStack from "@/components/FlexStack/HorizentalStack/HorizentalStack";
import VerticalStack from "@/components/FlexStack/VerticalStack/VerticalStack";
import CodeEditor from "@/landingPages/CodeEditor/CodeEditor";
import FileMananger from "@/landingPages/FileManager/FileMananger";
import SideBar from "@/landingPages/SideBar/SideBar";
export default function Home() {
  return (
    <main className="vs-code-editor">
      <SideBar />
      <FileMananger />
      <CodeEditor />
    </main>
  );
}
