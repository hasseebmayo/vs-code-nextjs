export type filesType = {
  fileType: string;
  value: string;
  _id?: string;

  fileName: string;
};
export type fileManangerTypeFolder = {
  folderName: string;
  files: filesType[];
  _id?: string;
};

export const filesArraySample: fileManangerTypeFolder[] = [
  {
    folderName: "Folder One",
    files: [
      {
        fileType: "js",
        value: "",
        fileName: "index",
      },
      {
        fileType: "css",
        value: "",
        fileName: "index",
      },
    ],
  },
  {
    folderName: "Folder Two",
    files: [
      {
        fileType: "html",
        value: "",
        fileName: "index",
      },
      {
        fileType: "css",
        value: "",
        fileName: "index",
      },
    ],
  },
];
