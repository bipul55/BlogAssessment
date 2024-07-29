import { useMutation } from "@tanstack/react-query";
import { apiPOST } from "../../APIHelper";
import { toast } from "react-toastify";

export const login = async (payload) => {
  const response = await apiPOST("/auth/login", payload);
  if (!response) {
    throw Error("Something Went Wrong");
  }
  if (response.status !== 200) {
    throw Error(response.data.message);
  }
  return response;
};

const LoginUser = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      localStorage.setItem("access_token", response.data.data.accessToken);
      window.location.reload(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export default LoginUser;
