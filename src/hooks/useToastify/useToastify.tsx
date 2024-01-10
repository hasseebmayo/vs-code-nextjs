import { toast } from "react-toastify";
type toastType = "success" | "warning" | "info" | "error";
const useToastify = () => {
  function fireToast(title: string, type: toastType) {
    toast(title, {
      type,
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
    });
  }
  return {
    fireToast,
  };
};

export default useToastify;
