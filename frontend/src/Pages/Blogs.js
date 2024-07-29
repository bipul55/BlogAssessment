import BlogCard from "../Components/BlogCard";
import GetBlogs from "../Hooks/Blogs/GetBlogs";
import React, { useContext, useState } from "react";
import loading from "../Images/loading.svg";
import TextInput from "../Components/TextInput";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import { UserValue } from "../Context/UserContext";
import UserProfile from "../Components/UserProfile";

export default function Blogs() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const blogs = GetBlogs({ page: page, search: search });
  return (
    <>
      <UserProfile />

      <nav className="w-full py-4 border-t border-b bg-gray-100">
        <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
          <div className="w-full container mx-auto flex flex-row items-center justify-between text-sm font-bold uppercase mt-0 px-6 py-2">
            <TextInput
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />

            <div className="hidden md:block">
              <Button
                title="Create Blog"
                onClick={() => navigate("/createBlog")}
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto flex flex-wrap py-6">
        {blogs.isLoading && (
          <div className="h-screen w-screen flex justify-center items-center bg-[#d3d3d3]">
            <img src={loading} className="h-10" />
          </div>
        )}
        {blogs.isError && (
          <div className="h-screen w-screen flex justify-center items-center bg-[#d3d3d3]">
            <h1>Something Went Wrong</h1>
          </div>
        )}
        {!blogs.isLoading && !blogs.isError && blogs.data && (
          <section className="w-full md:w-2/3 flex flex-col items-center px-3">
            {blogs.data.result.length <= 0 && (
              <div>
                <h1>No Blogs Found</h1>
              </div>
            )}
            {blogs.data?.result?.map((blog) => {
              return <BlogCard key={blog.id} blog={blog} />;
            })}
            <div className="w-full flex pt-6">
              {blogs?.data.previous ? (
                <a
                  className="w-1/2 bg-white shadow hover:shadow-md text-left p-6 cursor-pointer"
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  <p className="text-lg text-blue-800 font-bold flex items-center">
                    <i className="fas fa-arrow-left pr-1"></i> Previous
                  </p>
                </a>
              ) : (
                <div className="w-1/2"></div>
              )}
              {blogs?.data?.next && (
                <a
                  className="w-1/2 bg-white shadow hover:shadow-md text-right p-6 cursor-pointer"
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  <p className="text-lg text-blue-800 font-bold flex items-center justify-end">
                    Next <i className="fas fa-arrow-right pl-1"></i>
                  </p>
                </a>
              )}
            </div>
          </section>
        )}
        <aside className="w-full md:w-1/3 flex flex-col items-center px-3">
          <div className="w-full bg-white shadow flex flex-col my-4 p-6">
            <p className="text-xl font-semibold pb-5">About Us</p>
            <p className="pb-2">
              At Reliance Home Loan, we understand that buying a home is one of
              the most significant financial decisions you'll make in your
              lifetime. That's why we're committed to providing you with
              personalized, reliable, and efficient home loan solutions tailored
              to your unique needs.
            </p>
            <a className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4">
              Get to know us
            </a>
          </div>
        </aside>
      </div>

      <footer className="w-full border-t bg-white pb-12">
        <div className="w-full container mx-auto flex flex-col items-center">
          <div className="flex flex-col md:flex-row text-center md:text-left md:justify-between py-6">
            <a className="uppercase px-3">About Us</a>
            <a className="uppercase px-3">Privacy Policy</a>
            <a className="uppercase px-3">Terms & Conditions</a>
            <a className="uppercase px-3">Contact Us</a>
          </div>
          <div className="uppercase pb-6">Bipulneupane55@gmail.com</div>
        </div>
      </footer>
    </>
  );
}
