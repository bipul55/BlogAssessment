import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiPOST } from "../../APIHelper";
export const register = async (payload) => {
  const response = await apiPOST("/auth/register", payload);
  if (!response) {
    throw Error("Something Went Wrong");
  }
  if (response.status !== 200) {
    throw Error(response.data.message);
  }
  return response;
};
const RegisterUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      toast.success("Register Successfull");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export default RegisterUser;
