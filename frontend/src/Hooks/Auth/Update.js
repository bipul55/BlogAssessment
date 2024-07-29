import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiPOST } from "../../APIHelper";
export const update = async (payload) => {
  const response = await apiPOST("/auth/update", payload);
  if (!response) {
    throw Error("Something Went Wrong");
  }
  if (response.status !== 200) {
    throw Error(response.data.message);
  }
  return response;
};
const UpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: update,
    onSuccess: (response) => {
      toast.success("Updated Successfull");
      window.location.reload(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export default UpdateUser;
