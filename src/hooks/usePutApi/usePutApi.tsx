import { useMutation } from "@tanstack/react-query";
import axios from "axios";
type dataRequestType = {
  path: string;
  data: any;
};
const usePutApi = () => {
  const putRequest = (data: dataRequestType) => {
    return axios.put(data.path, data.data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: putRequest,
    mutationKey: ["delete-adding-folder"],
    onSuccess: (res) => {
      console.log("res", res);
    },
  });
  return {
    mutate,
    isPending,
  };
};

export default usePutApi;
