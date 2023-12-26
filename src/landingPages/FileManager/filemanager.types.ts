export type filesType = {
  type: string;
  value: string;
  fileName: string;
};
export type fileManangerTypeFolder = {
  folderName: string;
  files: filesType[];
};

export const filesArraySample: fileManangerTypeFolder[] = [
  {
    folderName: "Folder One",
    files: [
      {
        type: "js",
        value: "",
        fileName: "index",
      },
      {
        type: "css",
        value: "",
        fileName: "index",
      },
    ],
  },
  {
    folderName: "Folder Two",
    files: [
      {
        type: "html",
        value: "",
        fileName: "index",
      },
      {
        type: "css",
        value: "",
        fileName: "index",
      },
    ],
  },
];
