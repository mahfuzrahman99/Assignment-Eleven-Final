/* eslint-disable react/prop-types */

import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { Link, useLoaderData } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { BsFillBookmarksFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';

const RecentBlog = ({ blog }) => {
  // eslint-disable-next-line no-unused-vars
  const { _id, image, title, coffee_type, description, publish_date } = blog;

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
          if(user){
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
    <div className="my-2 md:my-0">
      <div className="card bg-base-100 shadow-xl h-[500px]">
        <motion.figure
          animate={{
            scale: [1, 1, 1, 1, 1],
            rotate: [0, 0, 0, 0, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          
          <PhotoView src={image}>
            <img src={image} className="h-[250px] rounded-t-lg w-full" alt={title} />
          </PhotoView>
        </motion.figure>
        <div className="card-body">
          <h2 className=" font-medium">
            {title}
            <div className="badge badge-secondary text-sm ml-1">
              Category: {coffee_type}
            </div>
          </h2>
          <p>Description: {description.slice(0, 100)}...<Link to={`/blogsDetails/${_id}`} className="text-red-500 font-medium">Read More</Link></p>
          <p>Posted Date: {publish_date}</p>
          <div className="card-actions justify-end">
            <div className="card-actions justify-end">
              <Link to={user ? `/wishlist/${_id}` : `/login`} onClick={handleAddToWishlist}>
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
    </div>
  );
};

export default RecentBlog;
