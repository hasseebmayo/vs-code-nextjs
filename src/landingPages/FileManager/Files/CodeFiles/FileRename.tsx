import useOutsideClick from "@/hooks/useOutsideClick/useOutsideClick";
import useSearchParamsHook from "@/hooks/useSearchParamsHook/useSearchParamsHook";
import React, { Dispatch, FormEvent, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
type fileRename = {
  fileName: string;
};
type fromRenameType = {
  setIsRenamed?: Dispatch<React.SetStateAction<boolean>>;
  addFile?: boolean;
};
const FileRename = ({ setIsRenamed, addFile }: fromRenameType) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<fileRename>();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { deleteQuery } = useSearchParamsHook();
  const handleOutsideClick = () => {
    console.log("form Outside Clicked");
    // Add your logic here for outside click
  };
  const onSubmit: SubmitHandler<fileRename> = (data) => {
    handleOutsideClick();
    if (addFile) {
      deleteQuery("addFolder");
      console.log("i am running");
      return;
    }
    setIsRenamed?.(false);
  };

  const customSubmitHandler = handleSubmit(onSubmit);
  useOutsideClick(formRef, customSubmitHandler);
  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <input
        className={
          errors.fileName
            ? " file-rename-input file-rename-error"
            : "file-rename-input"
        }
        {...register("fileName", {
          required: true,
        })}
      />
    </form>
  );
};

export default FileRename;
