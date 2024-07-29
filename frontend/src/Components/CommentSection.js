import { useFormik } from "formik";
import MakeComment from "../Hooks/Blogs/MakeComment";
import TextArea from "./TextArea";
import { CommentSchema } from "../FormValidationSchema";
import Button from "./Button";
import DynamicImage from "./DynamicImage";
import defaultProfileImage from "../Images/defaultProfile.svg";
import timeDifferenceDate from "../Utils/timeDifferenceDate";
export default function CommentSection(props) {
  const formik = useFormik({
    initialValues: {
      body: "",
    },
    validateOnChange: false,
    validationSchema: CommentSchema,
    onSubmit: ({ body }) => {
      comment.mutate({ body: body, blogid: props.blogid });
    },
  });
  function makeBodyEmpty() {
    formik.setFieldValue("body", "");
  }
  const comment = MakeComment(props.blogid, makeBodyEmpty);

  return (
    <div className="w-full bg-white  shadow p-2 my-4 mx-6">
      <h3 className="font-bold">Discussion</h3>

      <div>
        {props.comments && props.comments.length >= 1 ? (
          props.comments.map((comment) => {
            return (
              <div className="flex flex-col" key={comment.id}>
                <div className="border rounded-md p-3 ml-3 my-3">
                  <div className="flex gap-3 items-center">
                    {comment.user.profilePic ? (
                      <DynamicImage
                        image={comment.user.profilePic}
                        className="object-cover w-8 h-8 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                      />
                    ) : (
                      <img
                        src={defaultProfileImage}
                        className="object-cover w-8 h-8 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                      />
                    )}
                    <div>
                      <h3 className="font-bold">
                        {comment.user.fname + " " + comment.user.lname}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {" "}
                        {timeDifferenceDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 mt-2">{comment.body}</p>
                </div>
              </div>
            );
          })
        ) : (
          <h3 className=" text-center">No comment yet. Be first to comment.</h3>
        )}

        <div className="w-full px-3 my-2">
          <TextArea
            name="body"
            placeholder="Comment here ..."
            id="body"
            onChange={formik.handleChange}
            value={formik.values.body}
            error={formik.errors.body}
          />
        </div>

        <div className="w-full flex justify-end px-3">
          <Button
            title="Submit"
            loading={comment.isLoading}
            onClick={formik.handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
