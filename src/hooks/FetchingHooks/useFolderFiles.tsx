import { querykeys } from "@/Utils/QueryKeys/queryKeys";
import { useFetch } from "../useFetchApi/useFetchApi";

const useFolderFiles = () => {
  const { isLoading, response } = useFetch(
    [querykeys.GET_FOLDER_FILE],
    "/api",
    {
      // staleTime: Infinity,
    }
  );
  return {
    isLoading,
    response,
  };
};

export default useFolderFiles;
