import useOutsideClick from "@/hooks/useOutsideClick/useOutsideClick";
import usePostApi from "@/hooks/usePostApi/usePostApi";
import useSearchParamsHook from "@/hooks/useSearchParamsHook/useSearchParamsHook";
import React, { Dispatch, FormEvent, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { QueryCache, useQueryClient } from "@tanstack/react-query";
import { querykeys } from "@/Utils/QueryKeys/queryKeys";
type fileRename = {
  folderName: string;
};
type fromRenameType = {
  setIsRenamed?: Dispatch<React.SetStateAction<boolean>>;
  addFile?: boolean;
};
const CodeFileRename = ({ setIsRenamed, addFile }: fromRenameType) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<fileRename>();
  const { mutate, isPending } = usePostApi();
  const queryClient = useQueryClient();
  const queryCache = new QueryCache();

  const formRef = useRef<HTMLFormElement | null>(null);
  const { deleteQuery } = useSearchParamsHook();
  const handleOutsideClick = () => {
    console.log("form Outside Clicked");
    // Add your logic here for outside click
  };
  const onSubmit: SubmitHandler<fileRename> = (data) => {
    queryClient.setQueryData([querykeys.GET_FOLDER_FILE], (queryData: any) => {
      return [
        ...queryData,
        {
          folderName: data.folderName,
          files: [],
        },
      ];
    });
    if (addFile) {
      mutate(
        {
          data,
          path: "/api",
        },
        {
          onSuccess: (res) => {
            queryClient.invalidateQueries({
              queryKey: [querykeys.GET_FOLDER_FILE],
            });
          },
        }
      );
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
          errors.folderName
            ? " file-rename-input file-rename-error"
            : "file-rename-input"
        }
        {...register("folderName", {
          required: true,
        })}
      />
    </form>
  );
};

export default CodeFileRename;