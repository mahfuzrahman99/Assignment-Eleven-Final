import { useState } from "react";
import Navbar from "../Shared/Navbar";
import AllPopular from "./AllPopular";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

const AllPopularPost = () => {
  const { data: allPoplars, isLoading, isError } = useQuery({
    queryKey: ["allPoplars"],
    queryFn: async () => {
      const response = await fetch("https://assignment-eleven-server-side-two.vercel.app/popularPosts");
      if (!response.ok) {
        throw new Error("Failed to fetch popular posts");
      }
      const data = await response.json();
      return data;
    },
  });

  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const sortedCoffeeData = filteredBlogs.length
    ? filteredBlogs.map((populars) => ({
        ...populars,
        publishDate: new Date(populars.publish_date),
      })).sort((a, b) => b.publishDate - a.publishDate)
    : allPoplars
      ? allPoplars.map((populars) => ({
          ...populars,
          publishDate: new Date(populars.publish_date),
        })).sort((a, b) => b.publishDate - a.publishDate)
      : [];

  const handleSearchBlog = (e) => {
    e.preventDefault();
    const enteredSearchValue = e.target.search.value.toLowerCase();
    e.target.reset();

    const filteredProduct = allPoplars.filter(
      (blog) => blog.title.toLowerCase().includes(enteredSearchValue)
    );
    setFilteredBlogs(filteredProduct);
  };

  const handleSearchTitle = (e) => {
    e.preventDefault();
    const enteredCategoryValue = e.target.title.value;
    e.target.reset();

    const filteredBlog = allPoplars.filter(
      (blog) => blog.title === enteredCategoryValue
    );

    setFilteredBlogs(filteredBlog);
  };

  if (isLoading) {
    return (
      <Skeleton count={5}/>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="md:flex justify-between max-w-6xl mx-auto">
        <form
          onSubmit={handleSearchBlog}
          className="border-2 border-gray-200 my-2 md:my-4 p-1 rounded-md flex w-full  md:w-1/3"
        >
          <input
            type="text"
            name="search"
            placeholder="Search Here"
            className="pl-4  w-2/3  border-none"
          />
          <button className="btn-group btn border-none border-l-2 w-1/3 border-gray-200 rounded-r-md">
            Search
          </button>
        </form>
        <form
          onSubmit={handleSearchTitle}
          className="border-2 border-gray-200 my-2 md:my-4 p-1 rounded-md flex w-full md:w-1/3"
        >
          <select
            className="w-full my-2 p-1 rounded-md"
            name="title"
          >
            <option value="">Select a title</option>
            {allPoplars.map((blog) => (
              <option key={blog._id} value={blog.title}>
                {blog.title}
              </option>
            ))}
          </select>
          <button className="btn-group btn border-none border-l-2 w-1/3 border-gray-200 rounded-r-md">
            Search
          </button>
        </form>
      </div>
      <div className="max-w-6xl mx-auto md:grid grid-cols-2 justify-center items-center gap-3 my-8">
        {sortedCoffeeData.map((popular) => (
          <AllPopular key={popular._id} popular={popular} />
        ))}
      </div>
    </div>
  );
};

export default AllPopularPost;
