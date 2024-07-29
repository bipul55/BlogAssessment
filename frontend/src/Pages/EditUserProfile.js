import Button from "../Components/Button";
import TextInput from "../Components/TextInput";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import FileUploadComponent from "../Components/InputImage";
import defaultProfilePic from "../Images/defaultProfile.svg";
import { useContext, useEffect } from "react";
import { UserValue } from "../Context/UserContext";
import DynamicImage from "../Components/DynamicImage";
import UpdateUser from "../Hooks/Auth/Update";
import TextArea from "../Components/TextArea";
const { UpdateUserSchema } = require("../FormValidationSchema/index");

export default function EditUserProfile() {
  const navigate = useNavigate();
  const update = UpdateUser();
  const { user } = useContext(UserValue);
  const formik = useFormik({
    initialValues: {
      fname: "",
      mname: "",
      lname: "",
      email: "",
      profilePic: "",
      bio: "",
    },
    validateOnChange: false,
    validationSchema: UpdateUserSchema,
    onSubmit: ({ email, profilePic, fname, mname, lname, bio }) => {
      update.mutate({
        email,
        profilePic,
        fname,
        mname,
        lname,
        id: user.id,
        bio,
      });
    },
  });
  useEffect(() => {
    if (user) {
      formik.setFieldValue("fname", user.fname);
      formik.setFieldValue("mname", user.mname);
      formik.setFieldValue("lname", user.lname);
      formik.setFieldValue("email", user.email);
      formik.setFieldValue("profilePic", user.profilePic);
      formik.setFieldValue("bio", user.bio);
    } else {
      navigate("/login");
    }
  }, [user]);
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update Profile
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Or{" "}
            <a
              className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              Go Back
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div className="w-full flex">
                <label className="m-auto w-fit cursor-pointer">
                  {formik.values.profilePic ? (
                    <DynamicImage
                      image={formik.values.profilePic}
                      className="h-20 w-20 rounded-full"
                    />
                  ) : (
                    <img
                      src={defaultProfilePic}
                      className="h-20 w-20 rounded-full"
                    />
                  )}
                  <div className="hidden">
                    <FileUploadComponent
                      id="bannerImage"
                      name="bannerImage"
                      placeholder="Banner Image"
                      value={formik.values.profilePic}
                      onChange={(file) =>
                        formik.setFieldValue("profilePic", file)
                      }
                    />
                  </div>
                </label>
              </div>

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
                disabled={true}
              />
              <TextArea
                label="Bio"
                id="bio"
                name="bio"
                required={true}
                placeholder="Give your Bio"
                onChange={formik.handleChange}
                value={formik.values.bio}
                error={formik.errors.bio}
              />
              <div>
                <Button
                  title="Update"
                  loading={update.isLoading}
                  onClick={formik.handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
