"use client";
import React, { useRef } from "react";

import FileDropIcon from "../../../assets/images/FileDropIcon.svg";

import HorizentalStack from "@/components/FlexStack/HorizentalStack/HorizentalStack";

import FileRename from "./CodeFiles/FileRename";

const FileAddNew = () => {
  return (
    <div className={"vs-filemanager-subfiles"}>
      <HorizentalStack className="" onClick={() => {}}>
        <FileDropIcon />

        <FileRename addFile />
      </HorizentalStack>
    </div>
  );
};

export default FileAddNew;
