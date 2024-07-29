import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BlogDetail from "../Pages/BlogDetail";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import loading from "../Images/loading.svg";
import { LuPointer } from "react-icons/lu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyToken from "../Hooks/Auth/VerifyToken";
import { UserValue } from "../Context/UserContext";
import Blogs from "../Pages/Blogs";
import CreateBlog from "../Pages/CreateBlog";
import EditBlog from "../Pages/EditBlog";
import EditUserProfile from "../Pages/EditUserProfile";
export default function Router() {
  const verifyToken = VerifyToken();
  const { user } = useContext(UserValue);
  const logout = () => {
    localStorage.removeItem("access_token");
    window.location.reload(false);
  };
  useEffect(() => {
    try {
      let loggedUser = localStorage.getItem("access_token");
      if (loggedUser) {
        verifyToken.mutate({});
      }
    } catch (err) {}
  }, []);
  if (localStorage.getItem("access_token") && !user) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-[#d3d3d3]">
        <img src={loading} className="h-10" />
      </div>
    );
  }
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Blogs /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/detail/:id"
            element={user ? <BlogDetail /> : <Navigate replace to="/login" />}
          />
          <Route
            path="createBlog"
            element={user ? <CreateBlog /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/editBlog/:id"
            element={user ? <EditBlog /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/editProfile"
            element={
              user ? <EditUserProfile /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/login"
            element={user ? <Navigate replace to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate replace to="/" /> : <Register />}
          />

          <Route path="*" element={<>404 Page Not Found</>} />
        </Routes>
      </BrowserRouter>

      {user && (
        <div className="logout-container">
          <span
            className="font-extrabold text-[#fff] logout hover:text-[#f00]"
            onClick={logout}
          >
            Logout
          </span>
          <span className=" text-sm hover-me absolute bottom-[15px] left-[20px]">
            <LuPointer />
          </span>
        </div>
      )}
    </div>
  );
}
