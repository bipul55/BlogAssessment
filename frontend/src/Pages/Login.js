import { useNavigate } from "react-router-dom";
import PassWordInput from "../Components/PasswordInput";
import TextInput from "../Components/TextInput";
import LoginUser from "../Hooks/Auth/Login";
import Button from "../Components/Button";
import { useFormik } from "formik";
const { LoginSchema } = require("../FormValidationSchema/index");

export default function Login() {
  const navigate = useNavigate();
  const loginUser = LoginUser();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    validationSchema: LoginSchema,
    onSubmit: ({ email, password }) => {
      loginUser.mutate({ email, password });
    },
  });
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Or{" "}
            <a
              className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              create an account
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <TextInput
                label="Email"
                id="email"
                name="email"
                type="text"
                required={true}
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
              />
              <PassWordInput
                label="Password"
                id="password"
                name="password"
                required={true}
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
              />
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <Button
                  title="Sign in"
                  loading={loginUser.isLoading}
                  onClick={formik.handleSubmit}
                />
              </div>
            </div>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-100 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <a className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <img
                      className="h-5 w-5"
                      src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                      alt=""
                    />
                  </a>
                </div>
                <div>
                  <a className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <img
                      className="h-5 w-5"
                      src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                      alt=""
                    />
                  </a>
                </div>
                <div>
                  <a className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <img
                      className="h-6 w-6"
                      src="https://www.svgrepo.com/show/506498/google.svg"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
