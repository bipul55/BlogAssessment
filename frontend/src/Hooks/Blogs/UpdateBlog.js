import { useMutation } from "@tanstack/react-query";
import { apiPOST } from "../../APIHelper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const updateBlog = async (payload) => {
  const response = await apiPOST(`/blog/update/${payload.id}`, payload);
  if (!response) {
    throw Error("Something Went Wrong");
  }
  if (response.status !== 200) {
    throw Error(response.data.message);
  }
  return response;
};

const UpdateBlogHook = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: updateBlog,
    onSuccess: (response) => {
      toast.success("Blog updated successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export default UpdateBlogHook;
