import useOutsideClick from "@/hooks/useOutsideClick/useOutsideClick";
import usePostApi from "@/hooks/usePostApi/usePostApi";
import useSearchParamsHook from "@/hooks/useSearchParamsHook/useSearchParamsHook";
import React, { Dispatch, FormEvent, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { QueryCache, useQueryClient } from "@tanstack/react-query";
import { mutateKeys, querykeys } from "@/Utils/QueryKeys/queryKeys";
type fileRename = {
  fileName: string;
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
  const { mutate, isPending } = usePostApi(mutateKeys.ADD_FILE);
  const queryClient = useQueryClient();
  const queryCache = new QueryCache();
  const { params, deleteQuery } = useSearchParamsHook();
  const addFileId = params.get("addfile");

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleOutsideClick = () => {
    console.log("form Outside Clicked");
    // Add your logic here for outside click
  };
  const onSubmit: SubmitHandler<fileRename> = (data) => {
    const { fileName } = data;
    const [name, type] = fileName.split(".");
    queryClient.setQueryData([querykeys.GET_FOLDER_FILE], (queryData: any) => {
      const updatedQueryData = queryData?.map((d: any) => {
        if (d._id === addFileId) {
          // Assuming you have a specific data object to push into the files array
          const newData = {
            fileName: name,
            fileType: type,
            value: "",
          };
          // Push the new data into the files array of the found element
          d.files.push(newData);
        }
        return d;
      });

      return updatedQueryData;
    });
    mutate(
      {
        data: {
          fileType: type,
          fileName: name,
          id: addFileId,
        },
        path: "/api/file",
      },
      {
        onSuccess: (res) => {
          console.log(res);
          queryClient.invalidateQueries({
            queryKey: [querykeys.GET_FOLDER_FILE],
          });
          deleteQuery("addfile");
        },
      }
    );
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
          validate: (val) => {
            const allowedExtensions = /\.(ts|js|css|html|jsx|sass|scss)$/i;
            if (!allowedExtensions.test(val)) {
              return "Invalid file extension. Allowed extensions are .ts, .js, .css, .html, .jsx, .sass, .scss";
            }
            return true;
          },
        })}
      />
    </form>
  );
};

export default CodeFileRename;
