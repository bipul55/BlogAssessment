import { useMutation } from "@tanstack/react-query";
import { apiPOST } from "../../APIHelper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const createBlog = async (payload) => {
  const response = await apiPOST("/blog/create", payload);
  if (!response) {
    throw Error("Something Went Wrong");
  }
  if (response.status !== 200) {
    throw Error(response.data.message);
  }
  return response;
};

const CreateBlogHook = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createBlog,
    onSuccess: (response) => {
      toast.success("Blog created successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export default CreateBlogHook;
