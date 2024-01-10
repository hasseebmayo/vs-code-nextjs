"use client";
import useSearchParamsHook from "@/hooks/useSearchParamsHook/useSearchParamsHook";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FilesContext = createContext<any>({});
export function useOpenedFiles() {
  return useContext(FilesContext);
}

export function OpenFilesProvider({ children }: { children: ReactNode }) {
  const [openedFiles, setOpenedFiles] = useState<any>([]);
  const { updateURL } = useSearchParamsHook();

  useEffect(() => {
    const storedFiles = window.localStorage.getItem("openedFiles");

    if (storedFiles) {
      setOpenedFiles(JSON.parse(storedFiles));
    }
  }, []);
  const setToLocalStorage = (data: any) => {
    updateURL("openFile", `${data?._id}`);
    const isAdded = openedFiles?.find((d: any) => d?._id == data?._id);
    if (isAdded) {
      return;
    }
    const updatedFiles = [...openedFiles, data];
    window.localStorage.setItem("openedFiles", JSON.stringify(updatedFiles));
    setOpenedFiles(updatedFiles);
  };
  const onChangeCode = (id: string, value: any) => {
    setOpenedFiles((prev: any) => {
      const updatedFiles = prev.map((file: any) => {
        if (file._id === id) {
          // Update the value of the file with matching id
          return { ...file, value: value };
        } else {
          return file;
        }
      });

      return updatedFiles;
    });
    localStorage.setItem("openedFiles", JSON.stringify(openedFiles));
  };

  const removeFromLocalStorage = (fileId: string, last: boolean) => {
    if (last) {
      localStorage.removeItem("openedFiles");
      setOpenedFiles([]);
      return;
    }
    const updatedFiles = openedFiles.filter(
      (folder: any) => folder?._id != fileId
    );
    console.log("Updated File", updatedFiles);
    setOpenedFiles(updatedFiles);
    localStorage.setItem("openedFiles", JSON.stringify(openedFiles));
  };

  const values = {
    openedFiles,
    setOpenedFiles,
    setToLocalStorage,
    onChangeCode,
    removeFromLocalStorage,
  };

  return (
    <FilesContext.Provider value={values}>{children}</FilesContext.Provider>
  );
}
