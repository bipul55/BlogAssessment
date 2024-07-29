import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPOST } from "../../APIHelper";
import { toast } from "react-toastify";

const makeComment = async (payload) => {
  const response = await apiPOST(`/blog/comment/add`, payload);
  if (!response) {
    throw Error("Something Went Wrong");
  }
  if (response.status !== 200) {
    throw Error(response.data.message);
  }
  return response;
};

const MakeComment = (blogid, callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: makeComment,
    onSuccess: (response) => {
      toast.success("Comment added successfully");
      queryClient.refetchQueries(["blog", blogid]);
      if (callback) {
        callback();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export default MakeComment;
