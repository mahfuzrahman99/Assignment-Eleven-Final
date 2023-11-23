
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "@tanstack/react-query";
import RecentBlog from "../Components/RecentBlog";

const RecentBlogs = () => {
  const allBlogs = useQuery({
    queryKey: ["newFetchData"],
    queryFn: async () => {
      const data = await fetch("https://assignment-eleven-server-side-two.vercel.app/addBlogs", { credentials: "include" });
      return await data.json();
    }
  });

  const sortedCoffeeData = allBlogs.data
    ? allBlogs.data
        .map((coffee) => ({
          ...coffee,
          publishDate: new Date(coffee.publish_date),
        }))
        .sort((a, b) => b.publishDate - a.publishDate)
    : [];

  return (
    <>
      {allBlogs.isLoading ? (
        <div>
          <Skeleton count={10} />
        </div>
      ) : (
        <div>
          <div className="md:grid grid-cols-3 justify-center gap-3">
            {sortedCoffeeData.slice(0, 6).map((blog) => (
              <RecentBlog key={blog._id} blog={blog} />
            ))}
          </div>
          <div className="flex justify-end p-1 m-2">
            <Link
              to={`/allBlogs`}
              className="flex justify-center items-center bg-purple-300 p-2 rounded-md shadow-xl "
            >
              <p className="font-bold">View All Blogs Here</p>
              <FaLongArrowAltRight className="text-2xl" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentBlogs;
