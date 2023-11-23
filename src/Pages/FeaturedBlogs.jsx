
import Navbar from "../Shared/Navbar";
import MUIDataTable from "mui-datatables";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

const FeaturedBlogs = () => {
  const { data: topTenBlogs, isLoading, isError } = useQuery({
    queryKey: ["topTenBlogs"],
    queryFn: async () => {
      const response = await fetch("https://assignment-eleven-server-side-two.vercel.app/addBlogs");
      if (!response.ok) {
        throw new Error("Failed to fetch top ten blogs");
      }
      const data = await response.json();
      return data;
    },
  });

  const columns = ["No", "Blog Title", "Owner Name", "Owner Photo"];

  const sortedData = [...(topTenBlogs || [])].sort(
    (a, b) => b.description.length - a.description.length
  );

  const tableData = sortedData
    .slice(0, 10)
    .map((blog, index) => [
      index + 1,
      blog.title,
      `${blog.userName}`,
      <img
        key={blog._id}
        className="h-16 rounded-3xl"
        src={blog.userPhoto}
        alt={blog.userName}
      />,
    ]);

  const options = {
    filterType: "checkbox",
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
      <div className="text-center overflow-x-auto">
        <h1 className="text-5xl font-bold text-center my-7 bg-clip-text text-transparent bg-gradient-to-l from-red-400 to-blue-400">
          Top 10 Posts
        </h1>
        <MUIDataTable
          title={"Top Ten Posts"}
          data={tableData}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
};

export default FeaturedBlogs;
