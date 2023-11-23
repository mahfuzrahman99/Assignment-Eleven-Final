import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import { Tooltip } from "react-tooltip";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { BsFillBookmarksFill } from "react-icons/bs";

const PopularDetails = () => {
  const BlogDetail = useLoaderData();
  // eslint-disable-next-line no-unused-vars
  const { _id, img, title, description, publish_date } = BlogDetail;

  const { user } = useContext(AuthContext);
  const [allWishlistCards, setAllWishlistCards] = useState([]);

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
    <div className="">
      <div>
        <Navbar />
      </div>
      <div className="max-w-6xl mx-auto md:grid grid-cols-2 p-4 shadow-lg hover:border-4 hover:border-black border-2 border-gray-200 rounded-xl md:h-[450px]">
        <div>
          <img src={img || <Skeleton count={5}/>} className="h-full rounded-md" alt="" />
        </div>
        <div className="col-span-1 mt-5 ml-6">
          <div>
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-l from-red-400 to-blue-400">
              {title}
            </p>
            <p>Posted Date: {publish_date}</p>
            <p className=" p-2">
              {" "}
              <span className="text-xl font-medium">Description: </span>
              {description}
            </p>
            <div className="card-actions justify-end">
          <div className="card-actions justify-end">
            <Link to={user ? `/wishlist/${_id}` : `/login`} onClick={handleAddToWishlist}>
              <div
                className="badge badge-outline text-black bg-blue-500 h-10 border-none rounded-md w-24"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Wishlist!"
              >
                <BsFillBookmarksFill />
              </div>
            </Link>
            <Tooltip id="my-tooltip" />
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularDetails;
