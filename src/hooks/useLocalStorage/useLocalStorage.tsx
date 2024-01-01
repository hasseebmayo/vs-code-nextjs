"use client";
import { useState, useEffect } from "react";
const useLocalStorage = () => {
  const [openedFiles, setOpenedFiles] = useState<any>([]);
  console.log(openedFiles);
  useEffect(() => {
    const storedFiles = window.localStorage.getItem("openedFiles");
    if (storedFiles) {
      setOpenedFiles(JSON.parse(storedFiles));
    }
  }, []);

  const setToLocalStorage = (data: any) => {
    const updatedFiles = [...openedFiles, data];
    window.localStorage.setItem("openedFiles", JSON.stringify(updatedFiles));
    setOpenedFiles(updatedFiles);
  };

  const removeFromLocalStorage = (folderId: string, fileId: string) => {
    const updatedFiles = openedFiles.map((folder: any) => {
      // if (folder.folderId === folderId) {
      //   folder.files = folder.files.filter((file) => file._id !== fileId);
      // }
      return folder;
    });

    window.localStorage.setItem("openedFiles", JSON.stringify(updatedFiles));
    setOpenedFiles(updatedFiles);
  };

  return {
    openedFiles,
    setToLocalStorage,
    removeFromLocalStorage,
  };
};

export default useLocalStorage;
