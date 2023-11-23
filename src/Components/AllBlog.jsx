/* eslint-disable react/prop-types */

import { motion } from "framer-motion";
import { PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BsFillBookmarksFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AllBlog = ({ blogs }) => {
  // eslint-disable-next-line no-unused-vars
  const { _id, image, title, coffee_type, description, publish_date } = blogs;

  const BlogDetail = useLoaderData();
  const { user } = useContext(AuthContext);
  const [allWishlistCards, setAllWishlistCards] = useState([]);

  const blogDetails = { BlogDetail };

  const newDataToSend = {
    image,
    title,
    coffee_type,
    description,
    publish_date,
    currentId: _id,
  };

  const newData = Object.assign(newDataToSend, { userEmail: user?.email });

  useEffect(() => {
    axios
      .get(
        `https://assignment-eleven-server-side-two.vercel.app/wishlist/${user?.email}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setAllWishlistCards(res.data);
      });
  }, [user]);

  const handleAddToWishlist = () => {
    const getWishlistCards = allWishlistCards || [];
    // console.log(getCartCards);
    const isExist = getWishlistCards.find(
      (wishlistCard) => wishlistCard._id === blogDetails._id
    );
    if (!isExist) {
      fetch("https://assignment-eleven-server-side-two.vercel.app/wishlist", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (user) {
            if (data.insertedId) {
              return Swal.fire({
                title: "Success!",
                text: "Added to Wishlist Successfully",
                icon: "success",
                confirmButtonText: "Cool",
              });
            }
          }
        });
    } else {
      return Swal.fire({
        title: "Error!",
        text: "Duplicate Item",
        icon: "error",
        confirmButtonText: "Go back",
      });
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 p-4 shadow-lg border-2 border-gray-200 rounded-xl overflow-hidden my-2 h-[420px] md:h-[400px]">
        <motion.div>
          <PhotoView src={image}>
            <img
              src={image || <Skeleton count={5} />}
              className=" h-[150px] md:h-[210px] rounded-md"
              alt=""
            />
          </PhotoView>
        </motion.div>
        <div className="col-span-1 mt-2 md:mt-10 ml-6">
          <div>
            <p className="text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-l from-red-400 to-blue-400">
              {title}
            </p>
            <p className="md:text-xl font-medium">Category: {coffee_type}</p>
            <p>Posted Date: {publish_date}</p>
          </div>
        </div>
        <p className="col-span-2 p-2">
          {" "}
          <span className="md:text-xl font-medium">Description: </span>
          {description.slice(0, 150)}...
          <Link
            to={`/blogsDetails/${_id}`}
            className="text-red-500 font-medium"
          >
            Read More
          </Link>
        </p>
        <div className="card-actions justify-end col-span-2">
          <div className="card-actions justify-end">
            <Link
              to={user ? `/wishlist/${_id}` : `/login`}
              onClick={handleAddToWishlist}
            >
              <div
                className="badge badge-outline text-black bg-blue-500 h-7 border-none rounded-md w-16"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Wishlist!"
              >
                <BsFillBookmarksFill />
              </div>
            </Link>
            <Tooltip id="my-tooltip" />
            <Link to={`/blogsDetails/${_id}`}>
              <div
                className="badge badge-outline text-black bg-amber-500 h-7 border-none rounded-md w-16"
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
  );
};

export default AllBlog;
