import { useContext, useState } from "react";
import { UserValue } from "../Context/UserContext";
import { SlOptionsVertical } from "react-icons/sl";
import { Navigate, useNavigate } from "react-router-dom";
import DeleteBlogHook from "../Hooks/Blogs/DeleteBlog";

export default function BlogOptionsContainer({ blogUserId, blogId }) {
  const { user } = useContext(UserValue);
  const [showOptions, setShowOptions] = useState(false);
  const deleteBlog = DeleteBlogHook();
  const navigate = useNavigate();
  if (blogUserId == user.id) {
    return (
      <div
        className="absolute right-2 top-2"
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <SlOptionsVertical />
        {showOptions && (
          <div className="absolute border border-[#d3d3d3] right-[5%] bg-[#fff]">
            <div
              className=" p-2 hover:bg-[#d3d3d3]"
              onClick={() => navigate(`/editBlog/${blogId}`)}
            >
              Edit
            </div>
            <div
              className="p-2 hover:bg-[#d3d3d3]"
              onClick={() => {
                deleteBlog.mutate({ id: blogId });
              }}
            >
              Delete
            </div>
          </div>
        )}
      </div>
    );
  }
  return null;
}
