import { useContext } from "react";
import { UserValue } from "../Context/UserContext";
import DynamicImage from "./DynamicImage";
import defaultProfilePic from "../Images/defaultProfile.svg";
import { MdEmail } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { user } = useContext(UserValue);
  const navigate = useNavigate();
  return (
    <header className="w-full container flex justify-between flex-wrap md:flex-nowrap">
      <div className="flex items-center p-5 md:p-12 w-screen md:w-1/2">
        <div className="flex items-start items-center">
          {user.profilePic ? (
            <DynamicImage
              image={user.profilePic}
              className="h-20 w-20 rounded-full"
            />
          ) : (
            <img src={defaultProfilePic} className="h-20 w-20 rounded-full" />
          )}
          <div className="ml-2">
            <p className="text-lg text-gray-600 font-bold flex items-center gap-1">
              {user.fname + " " + user.lname}
              <FaEdit
                className="cursor-pointer color-[#f00]"
                onClick={() => {
                  navigate("/editProfile");
                }}
              />
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MdEmail />
              {user.email}
            </p>
            <p
              className="text-sm text-blue-600 font-bold cursor-pointer block md:hidden"
              onClick={() => navigate("/createBlog")}
            >
              + New Blog
            </p>
          </div>
        </div>
      </div>
      <div className="w-screen px-5 md:pr-2 md-p  md:w-1/2 flex items-center ">
        <div>
          <p className="text-lg text-gray-600 font-bold flex items-center gap-1">
            Bio
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            {user.bio ? user.bio : "No Bio"}
          </p>
        </div>
      </div>
    </header>
  );
}
