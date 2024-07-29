import { useQuery } from "@tanstack/react-query";

import { apiGET } from "../../APIHelper";
export const getBlogs = async (page = 1, limit = 10, search = "") => {
  const response = await apiGET(
    `/blog?search=${search}&page=${page}&limit=${limit}`
  );
  if (!response) {
    throw Error("Something Went Wrong");
  }
  if (response.status !== 200) {
    throw Error(response.data.message);
  }
  return response.data.data;
};

const GetBlogs = ({ page = 1, limit = 10, search = "" }) => {
  return useQuery({
    queryKey: ["blogs", page, limit, search],
    queryFn: () => getBlogs(page, limit, search),
  });
};

export default GetBlogs;
