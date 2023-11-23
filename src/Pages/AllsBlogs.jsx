
import { useState } from "react";
import AllBlog from "../Components/AllBlog";
import Navbar from "../Shared/Navbar";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

const AllsBlogs = () => {
  const { data: allBlogs, isLoading, isError } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const response = await fetch("https://assignment-eleven-server-side-two.vercel.app/addBlogs");
      if (!response.ok) {
        throw new Error("Failed to fetch all blogs");
      }
      const data = await response.json();
      return data;
    },
  });

  const [filteredBlogs, setFilteredBlogs] =useState([]);

  const handleSearchBlog = (e) => {
    e.preventDefault();
    const enteredSearchValue = e.target.search.value.toLowerCase();
    e.target.reset();

    const filteredBlog = allBlogs.filter(
      (blog) => blog.title.toLowerCase() === enteredSearchValue
    );

    setFilteredBlogs(filteredBlog);
  };

  const handleSearchCategory = (e) => {
    e.preventDefault();
    const enteredSearchValue = e.target.category.value;
    e.target.reset();

    const filteredBlog = allBlogs.filter(
      (blog) => blog.coffee_type === enteredSearchValue
    );

    setFilteredBlogs(filteredBlog);
  };

  const blogsToDisplay = filteredBlogs.length ? filteredBlogs : allBlogs;

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
          className="border-2 border-gray-200 my-2 md:my-4 p-1 rounded-md flex w-full md:w-1/3"
        >
          <button className="btn-group btn border-none border-l-2 w-1/3 border-gray-200 rounded-r-md">
            Search
          </button>
          <input
            type="text"
            name="search"
            placeholder="Search Here"
            className="pl-4 w-2/3 border-none"
          />
        </form>
        <form
          onSubmit={handleSearchCategory}
          className="border-2 border-gray-200 my-2 md:my-4 p-1 rounded-md flex w-full md:w-1/3"
        >
          <select
            className="w-full my-2 p-1 rounded-md"
            name="category"
            id="category"
          >
            <option value="">Select a category</option>
            {allBlogs.map((blog) => (
              <option key={blog._id} value={blog.coffee_type}>
                {blog.coffee_type}
              </option>
            ))}
          </select>
          <button className="btn-group btn border-none border-l-2 w-1/3 border-gray-200 rounded-r-md">
            Search
          </button>
        </form>
      </div>
      <div className="max-w-6xl mx-auto md:grid grid-cols-2 justify-center gap-3">
        {blogsToDisplay.map((blog) => (
          <AllBlog key={blog._id} blogs={blog} />
        ))}
      </div>
    </div>
  );
};

export default AllsBlogs;
