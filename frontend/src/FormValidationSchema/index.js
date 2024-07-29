import * as Yup from "yup";

// login user
export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(5, "Too Short!"),
});

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(5, "Too Short!"),
  rePassword: Yup.string()
    .required("Required")
    .min(5, "Too Short!")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  fname: Yup.string().required("Required").min(3, "Too Short!"),
  mname: Yup.string().min(3, "Too Short!"),
  lname: Yup.string().required("Required").min(3, "Too Short!"),
});

export const UpdateUserSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  fname: Yup.string().required("Required").min(3, "Too Short!"),
  mname: Yup.string().min(3, "Too Short!"),
  lname: Yup.string().required("Required").min(3, "Too Short!"),
  profilePic: Yup.string().min(3, "Too Short!"),
  bio: Yup.string().required("Required").min(3, "Too Short!"),
});

export const BlogSchema = Yup.object().shape({
  topic: Yup.string().required("Required").min(5, "Too Short!"),
  description: Yup.string().required("Required").min(3, "Too Short!"),
  overview: Yup.string().required("Required").min(3, "Too Short!"),
  bannerImage: Yup.string().min(3, "Too Short!"),
  category: Yup.string().required("Required").min(3, "Too Short!"),
  tags: Yup.string().required("Required").min(3, "Too Short!"),
});
export const CommentSchema = Yup.object().shape({
  body: Yup.string().required("Required").min(5, "Too Short!"),
});
