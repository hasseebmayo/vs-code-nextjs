import { Rnd } from "react-rnd";
import "./previewCode.scss";
import useSearchParamsHook from "@/hooks/useSearchParamsHook/useSearchParamsHook";
import { useOpenedFiles } from "@/components/ContextApi/ContextFile";
import { useEffect, useState } from "react";

const PreviewCode = () => {
  const { params } = useSearchParamsHook();
  const { openedFiles } = useOpenedFiles();
  const openFileId = params.get("openFile");
  const [srcDoc, setSrcDoc] = useState<any>();
  const openFile = openedFiles?.find((d: any) => d?._id == openFileId);
  const opendFolder = openedFiles?.filter(
    (file: any) => file?.folderId == openFile?.folderId
  );
  const fileContentMap = opendFolder?.reduce((acc: any, file: any) => {
    acc[file?.fileType] = file?.value;
    return acc;
  }, {});
  console.log(fileContentMap);

  useEffect(() => {
    setSrcDoc(`
          <html>
           <body>${fileContentMap?.html}</body>
           <style>${fileContentMap?.css}</style>
           <script>${fileContentMap?.js}</script>
         </html>
          `);
  }, [openFileId]);
  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 320,
        height: 200,
      }}
      style={{
        background: "white",
        borderRadius: "10px",
      }}
    >
      {openFileId ? (
        <div className="iframe-container">
          <div className="iframer-header">
            <p>
              Press
              <span> Esc </span>
              to close Preview
            </p>
            <p>
              <span>DoubleClick </span>
              on this area to drag preview
            </p>
          </div>
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            width="100%"
            height="100%"
          />
        </div>
      ) : (
        <div className="no-preview">
          <p>Open a File for preview</p>
        </div>
      )}
    </Rnd>
  );
};

export default PreviewCode;
