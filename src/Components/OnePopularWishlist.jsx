/* eslint-disable react/prop-types */

import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useQueryClient } from "@tanstack/react-query";
import swal from "sweetalert";
import useWishlist from "../Hooks/useWishlist";

const OnePopularWishlist = ({ list }) => {
  const queryClient = useQueryClient();

  const [, refetch] = useWishlist();

  const {
    _id,
    currentId,
    img,
    title,
    description,
    publish_date,
  } = list;

  const handleDelete = async (_id) => {
    try {
      const response = await fetch(
        `https://assignment-eleven-server-side-two.vercel.app/popularWishlist/${_id}`,
        {
          method: "DELETE",
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }
  
      const data = await response.json();
  
      if (data.deletedCount > 0) {
        swal("Blog Deleted!", "Your blog has been deleted.", "success");
  
        // Update local state to remove the deleted blog
        refetch()
  
        // Update the cache by invalidating the "wishlists" query
        queryClient.invalidateQueries("wishlists");
      }
    } catch (error) {
      console.error("Error deleting blog:", error.message);
    }
  };
  

  return (
    <div>
      <div className="md:grid grid-cols-5 text-black rounded-xl my-3 md:my-auto shadow-lg bg-pink-300 h-[210px]">
        <div className="col-span-2">
          <img
            className="w-full h-[210px] rounded-tr-xl rounded-tl-xl md:rounded-tl-xl md:rounded-bl-xl bg-gray-400"
            src={img}
            alt=""
          />
        </div>
        <div className="col-span-3 p-4  ">
          <div className="flex">
            <div className="flex-1">
              <p className="font-medium">Name: {title}</p>
              <div className="">
                <p className="font-medium">
                  Publish Date:{" "}
                  <span className="text-red-500">{publish_date}</span>
                </p>
              </div>
              <p className="font-medium">
                Description: {description.slice(0, 80)}...
                <Link
                  to={`/popularDetails/${_id}`}
                  className="text-red-500 font-medium"
                >
                  Read More
                </Link>
              </p>
            </div>
            <div className="flex flex-col justify-around items-center">
              <Link>
                <div
                  className="badge badge-outline text-black bg-blue-500 h-8 border-none rounded-md w-20 text-2xl"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Delete!"
                  onClick={() => handleDelete(_id)}
                >
                  <MdDelete />
                </div>
              </Link>
              <Tooltip id="my-tooltip" />
              <Link to={`/blogsDetails/${currentId}`}>
                <div
                  className="badge badge-outline text-black bg-amber-500 h-8 border-none rounded-md w-20 text-2xl"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="View Details!"
                >
                  <FaEye />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnePopularWishlist;
