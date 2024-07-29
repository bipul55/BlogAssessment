import { useNavigate, useParams } from "react-router-dom";
import PassWordInput from "../Components/PasswordInput";
import TextInput from "../Components/TextInput";
import Button from "../Components/Button";
import { useFormik } from "formik";
import InputImage from "../Components/InputImage";
import RichText from "../Components/RichText";
import CategoryDropDown from "../Components/CategoryDropDown";
import { IoCloseCircleSharp } from "react-icons/io5";
import TextArea from "../Components/TextArea";
import GetBlogById from "../Hooks/Blogs/GetBlogById";
import { useContext, useEffect } from "react";
import decodeHtmlEntitiesSafely from "../Utils/decodeHtml";
import loading from "../Images/loading.svg";
import { UserValue } from "../Context/UserContext";
import { toast } from "react-toastify";
import UpdateBlogHook from "../Hooks/Blogs/UpdateBlog";
import TagInput from "../Components/TagInput";

const { BlogSchema } = require("../FormValidationSchema/index");

function convertToJSONString(input) {
  // Parse the input to convert HTML entities to characters
  const parsedInput = input.replace(/&quot;/g, '"');
  // Parse the string to JSON
  const jsonObject = JSON.parse(parsedInput);
  // Convert the JSON object to a JSON string
  return JSON.stringify(jsonObject);
}

export default function EditBlog() {
  const navigate = useNavigate();
  const update = UpdateBlogHook();
  const { user } = useContext(UserValue);

  const { id } = useParams();

  const blog = GetBlogById(id);
  const formik = useFormik({
    initialValues: {
      topic: "",
      description: "",
      bannerImage: "",
      category: "",
      tags: "",
      overview: "",
    },
    validateOnChange: false,
    validationSchema: BlogSchema,
    onSubmit: ({
      topic,
      description,
      bannerImage,
      category,
      tags,
      overview,
    }) => {
      update.mutate({
        topic,
        description,
        bannerImage,
        category,
        tags,
        overview,
        id,
      });
    },
  });
  useEffect(() => {
    if (blog.data) {
      if (user.id != blog.data?.user?.id) {
        toast.error("Invalid Access");
        navigate.to(`/detail/${id}`);
      }
      formik.setFieldValue("topic", blog.data.topic);
      formik.setFieldValue(
        "description",
        decodeHtmlEntitiesSafely(blog.data.description)
      );
      formik.setFieldValue("bannerImage", blog.data.bannerImage);
      formik.setFieldValue("category", convertToJSONString(blog.data.category));
      formik.setFieldValue("tags", convertToJSONString(blog.data.tags));
      formik.setFieldValue("overview", blog.data.overview);
    }
  }, [blog.data]);
  if (blog.isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-[#d3d3d3]">
        <img src={loading} className="h-10" />
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div
          className="absolute top-[2%] right-[2%] cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <IoCloseCircleSharp />
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-xl">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Edit Blog
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

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl lg:max-w-2xl">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <TextInput
                label="Topic"
                id="topic"
                name="topic"
                type="text"
                required={true}
                placeholder="Topic Of Blog"
                onChange={formik.handleChange}
                value={formik.values.topic}
                error={formik.errors.topic}
              />
              <InputImage
                label="Banner Image"
                id="bannerImage"
                name="bannerImage"
                required={true}
                placeholder="Banner Image"
                value={formik.values.bannerImage}
                onChange={(file) => formik.setFieldValue("bannerImage", file)}
                error={formik.errors.bannerImage}
              />
              <TextArea
                label="Overview"
                id="overview"
                name="overview"
                required={true}
                placeholder="Overview of the blog"
                onChange={formik.handleChange}
                value={formik.values.overview}
                error={formik.errors.overview}
              />
              <RichText
                label="Description"
                id="description"
                name="description"
                required={true}
                onChange={(data) => {
                  formik.setFieldValue("description", data);
                }}
                value={formik.values.description}
                error={formik.errors.description}
              />

              <CategoryDropDown
                label="Category"
                id="category"
                name="category"
                required={true}
                placeholder="Select Category"
                onChange={(value) => {
                  formik.setFieldValue("category", value);
                }}
                value={formik.values.category}
                error={formik.errors.category}
              />
              <TagInput
                label="Tags"
                id="tags"
                name="tags"
                required={true}
                placeholder="Select Tags"
                onChange={(value) => {
                  formik.setFieldValue("tags", JSON.stringify(value));
                }}
                value={formik.values.tags ? JSON.parse(formik.values.tags) : []}
                error={formik.errors.tags}
              />

              {/* <TagsDropDown
                label="Tags"
                id="tags"
                name="tags"
                required={true}
                placeholder="Select Tags"
                onChange={(value) => {
                  formik.setFieldValue("tags", value);
                }}
                value={formik.values.tags}
                error={formik.errors.tags}
              /> */}

              <div>
                <Button
                  title="Update Blog"
                  loading={blog.isLoading}
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
