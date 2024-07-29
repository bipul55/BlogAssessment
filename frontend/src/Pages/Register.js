import Button from "../Components/Button";
import PassWordInput from "../Components/PasswordInput";
import TextInput from "../Components/TextInput";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import RegisterUser from "../Hooks/Auth/Register";
const { RegisterSchema } = require("../FormValidationSchema/index");
export default function Register() {
  const navigate = useNavigate();
  const registerUser = RegisterUser();
  const formik = useFormik({
    initialValues: {
      fname: "",
      mname: "",
      lname: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validateOnChange: false,
    validationSchema: RegisterSchema,
    onSubmit: ({ email, password, fname, mname, lname }) => {
      registerUser.mutate({ email, password, fname, mname, lname });
    },
  });
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Or{" "}
            <a
              className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login to your account
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <TextInput
                label="First Name"
                id="fname"
                name="fname"
                type="text"
                required={true}
                placeholder="First Name"
                onChange={formik.handleChange}
                value={formik.values.fname}
                error={formik.errors.fname}
              />

              <TextInput
                label="Middle Name"
                id="mname"
                name="mname"
                type="text"
                required={false}
                placeholder="Middle Name"
                onChange={formik.handleChange}
                value={formik.values.mname}
                error={formik.errors.mname}
              />
              <TextInput
                label="Last Name"
                id="lname"
                name="lname"
                required={true}
                type="text"
                placeholder="Last Name"
                onChange={formik.handleChange}
                value={formik.values.lname}
                error={formik.errors.lname}
              />
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
                required={true}
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
              />
              <PassWordInput
                label="Re-Type Password"
                id="rePassword"
                required={true}
                placeholder="Re-Type Password"
                onChange={formik.handleChange}
                value={formik.values.rePassword}
                error={formik.errors.rePassword}
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
                  title="Register"
                  loading={registerUser.isLoading}
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
