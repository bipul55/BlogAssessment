import { useNavigate } from "react-router-dom";
import formatDate from "../Utils/formatDate";
import GetBlogById from "../Hooks/Blogs/GetBlogById";
import { useContext, useState } from "react";
import { UserValue } from "../Context/UserContext";
import BlogOptionsContainer from "./BlogOptionsContainer";

function convertToJSON(input) {
  // Parse the input to convert HTML entities to characters
  const parsedInput = input.replace(/&quot;/g, '"');
  // Parse the string to JSON
  const jsonObject = JSON.parse(parsedInput);
  // Convert the JSON object to a JSON string
  return jsonObject;
}

export default function BlogCard(props) {
  const navigate = useNavigate();
  const blog = GetBlogById(props.blog.id);
  const { user } = useContext(UserValue);
  if (blog.isLoading) {
    return <div>Loading</div>;
  }
  if (blog.isError) {
    return null;
  }
  return (
    <article
      className="flex flex-col shadow my-4 mb-2 cursor-pointer w-full relative"
      key={blog.data.id}
    >
      <BlogOptionsContainer
        blogUserId={blog.data.user.id}
        blogId={blog.data.id}
      />
      <div className="bg-white flex flex-col justify-start p-6">
        <a className="text-blue-700 text-sm font-bold uppercase pb-4">
          {blog.data.category &&
            convertToJSON(blog.data.category).map((cat, index) => (
              <label key={cat} className="mr-3">
                {cat}
              </label>
            ))}
        </a>
        <a className="text-3xl font-bold  pb-4">{blog.data?.topic}</a>
        <p className="text-sm pb-3">
          By{" "}
          <a className="font-semibold">
            {blog.data?.user?.fname + " " + blog.data?.user?.lname}
          </a>
          , Published on {formatDate(blog.data?.createdAt)}
        </p>
        <a className="pb-6 custom-two-line-text">{blog.data?.overview}</a>
        <div className="flex w-full gap-2">
          {blog.data.tags &&
            convertToJSON(blog.data.tags).map((tag) => (
              <a className="text-blue-600 text-sm pb-4 cursor-pointer hover:text-blue-900">
                #{tag}
              </a>
            ))}
        </div>
        <a
          className="uppercase text-gray-800 hover:text-black mt-1"
          onClick={() => {
            navigate(`/detail/${blog.data.id}`);
          }}
        >
          Continue Reading <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </article>
  );
}
