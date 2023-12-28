import { useMutation } from "@tanstack/react-query";
import axios from "axios";
type dataRequestType = {
  path: string;
  data: any;
};
const usePostApi = () => {
  const postRequest = (data: dataRequestType) => {
    return axios.post(data.path, data.data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: postRequest,
    mutationKey: ["adding-folder"],
  });
  return {
    mutate,
    isPending,
  };
};

export default usePostApi;
