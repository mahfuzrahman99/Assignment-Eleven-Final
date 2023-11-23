/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { FaEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import { motion } from "framer-motion";
import { BsFillBookmarksFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const SinglePopular = ({ popular }) => {
  const { _id, img, title, description, publish_date } = popular;
console.log(popular)
  const BlogDetail = useLoaderData();
  const { user } = useContext(AuthContext);
  const [allWishlistCards, setAllWishlistCards] = useState([]);
  // const { _id, image, title, coffee_type, description, publish_date } =
  const blogDetails = { BlogDetail };

  const newDataToSend = {
    img,
    title,
    description,
    publish_date,
    currentId: _id,
  };

  const newData = Object.assign(newDataToSend, { userEmail: user?.email });

  useEffect(() => {
    axios
      .get(
        `https://assignment-eleven-server-side-two.vercel.app/popularWishlist/${user?.email}`,
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
      fetch("https://assignment-eleven-server-side-two.vercel.app/popularWishlist", {
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
    <div className="rounded-xl shadow-lg my-2 md:my-0">
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
          <PhotoProvider>
          <PhotoView src={img}>
            <img src={img} className="h-[250px] w-full" alt={title} />
          </PhotoView>
        </PhotoProvider>
        </motion.figure>
      <div className="p-4">
        <div className="p-3">
          <h1 className="text-xl font-semibold">{title}</h1>
          <p>{description.slice(0, 150)}...</p>
        </div>
        <div className="card-actions justify-end">
          <div className="card-actions justify-end">
          <Link to={user ? `/popularWishlist/${_id}` : `/login`} onClick={handleAddToWishlist}>
                <div
                  className="badge badge-outline text-black bg-blue-500 h-7 border-none rounded-md w-16"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Wishlist!"
                >
                  <BsFillBookmarksFill />
                </div>
              </Link>
            <Tooltip id="my-tooltip" />
            <Link to={`/popularDetails/${_id}`}>
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

export default SinglePopular;
