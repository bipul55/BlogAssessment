import { useQuery } from "@tanstack/react-query";

import { apiGET } from "../../APIHelper";
const getBlogById = async (id) => {
  const response = await apiGET(`/blog/${id}`);
  if (!response) {
    throw Error("Something Went Wrong");
  }
  if (response.status !== 200) {
    throw Error(response.data.message);
  }
  return response.data.data._blog;
};

const GetBlogById = (id) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
  });
};

export default GetBlogById;
