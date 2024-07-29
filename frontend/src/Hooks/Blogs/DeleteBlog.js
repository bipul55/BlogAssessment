import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPOST } from "../../APIHelper";
import { toast } from "react-toastify";

const deleteBlog = async (payload) => {
  const response = await apiPOST(`/blog/delete/${payload.id}`);
  if (!response) {
    throw Error("Something Went Wrong");
  }
  if (response.status !== 200) {
    throw Error(response.data.message);
  }
  return response;
};

const DeleteBlogHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: (response) => {
      toast.success("Blog deleted successfully");
      queryClient.refetchQueries(["blog", response.data.data.id]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export default DeleteBlogHook;
