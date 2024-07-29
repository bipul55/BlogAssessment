import { useNavigate, useParams } from "react-router-dom";
import GetBlogById from "../Hooks/Blogs/GetBlogById";
import formatDate from "../Utils/formatDate";
import DynamicImage from "../Components/DynamicImage";
import decodeHtmlEntitiesSafely from "../Utils/decodeHtml";
import BlogOptionsContainer from "../Components/BlogOptionsContainer";
import UserProfile from "../Components/UserProfile";
import CommentSection from "../Components/CommentSection";
function convertToJSON(input) {
  // Parse the input to convert HTML entities to characters
  const parsedInput = input.replace(/&quot;/g, '"');
  // Parse the string to JSON
  const jsonObject = JSON.parse(parsedInput);
  // Convert the JSON object to a JSON string
  return jsonObject;
}
export default function BlogDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const blog = GetBlogById(id);

  if (blog.isLoading) {
    return <div>Loading</div>;
  }
  return (
    <>
      <UserProfile />

      <div className="container mx-auto flex flex-wrap py-6">
        <section className="w-full md:w-2/3 flex flex-col items-center px-3 relative">
          <BlogOptionsContainer
            blogUserId={blog.data.user.id}
            blogId={blog.data.id}
          />
          <article className="flex flex-col shadow my-4">
            <a className="hover:opacity-75">
              <DynamicImage image={blog.data?.bannerImage} className="w-full" />
            </a>
            <div className="bg-white flex flex-col justify-start p-6">
              <a className="text-blue-700 text-sm font-bold uppercase pb-4">
                {blog.data.category &&
                  convertToJSON(blog.data.category).map((cat) => (
                    <label className="mr-3" key={cat}>
                      {cat}
                    </label>
                  ))}
              </a>
              <div className="flex w-full gap-2">
                {blog.data.tags &&
                  convertToJSON(blog.data.tags).map((tag) => (
                    <a className="text-blue-600 text-sm pb-4 cursor-pointer hover:text-blue-900">
                      #{tag}
                    </a>
                  ))}
              </div>

              <a className="text-3xl font-bold hover:text-gray-700 pb-4">
                {blog.data?.topic}
              </a>
              <p className="text-sm pb-8">
                By{" "}
                <a className="font-semibold hover:text-gray-800">
                  {blog.data?.user?.fname + " " + blog.data?.user?.lname}
                </a>
                , {formatDate(blog.data?.createdAt)}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHtmlEntitiesSafely(blog.data?.description),
                }}
              ></div>
            </div>
          </article>
          <CommentSection comments={blog.data.comments} blogid={blog.data.id} />
        </section>

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
