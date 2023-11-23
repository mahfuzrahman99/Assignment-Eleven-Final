import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import swal from "sweetalert";
import CommentOne from "../Components/CommentOne";
// import Skeleton from "react-loading-skeleton";
// import navbarADBG from "..";

const BlogsDetailsPage = () => {
  const parentDivStyle = {
    // backgroundImage: `url(${navbarADBG})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const BlogDetail = useLoaderData();
  const { user } = useContext(AuthContext);
  const [allWishlistCards, setAllWishlistCards] = useState([]);
  const [comments, setComments] = useState([]);
  const location = useLocation();
  console.log(user);
  const navigate = useNavigate();
  const {
    _id,
    image,
    title,
    coffee_type,
    description,
    publish_date,
    userEmail,
  } = BlogDetail;

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
      (wishlistCard) => wishlistCard._id === BlogDetail._id
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
          if (data.insertedId) {
            return (
              Swal.fire({
                title: "Success!",
                text: "Added to Wishlist Successfully",
                icon: "success",
                confirmButtonText: "Cool",
              }),
              navigate(location?.state?.from || "/wishlist")
            );
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

  const handleTextarea = (e) => {
    e.preventDefault();
    const userComment = e.target.comment.value;
    const userName = user.displayName;
    const userPhoto = user.photoURL;
    const BlogId = _id;
    e.target.reset();
    const textarea = { userName, userComment, userPhoto, BlogId };
    axios
      .post(
        "https://assignment-eleven-server-side-two.vercel.app/addComments",
        textarea
      )
      .then(function (response) {
        if (userComment.length > 0) {
          if (response.data.insertedId) {
            swal("Comment Added!!", "Your Comment has been added.", "success");
          }
        } else {
          swal("Error!!", "Your Do Not Comment Write Hare.", "error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://assignment-eleven-server-side-two.vercel.app/addComments/${_id}`
      )
      .then(function (response) {
        console.log(response);
        setComments(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [_id]);

  return (
    <div>
      <div style={parentDivStyle} className="">
        <Navbar />
      </div>
      <div className="max-w-6xl mx-auto">
      <div className="md:mx-24 p-4 md:mb-16 space-y-3rounded-xl">
        <div className="relative rounded-xl">
          <div
            data-aos="flip-up"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <img
              className="w-full h-[30vh] md:h-[80vh] bg-pink-300  rounded-xl"
              src={image}
              alt=""
            />
          </div>
          <div
            className="p-3 md:p-6 absolute bottom-0 w-full rounded-br-xl rounded-bl-xl"
            style={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}
          >
            <p className="flex justify-between items-center">
              <button
                onClick={handleAddToWishlist}
                className=" md:btn btn-sm text-black md:text-black bg-blue-400 md:bg-blue-400 rounded-md font-medium"
              >
                Add To Wishlist
              </button>
              {user.email === userEmail ? (
                <Link
                  to={`/updateBlog/${_id}`}
                  className=" md:btn btn-sm text-black md:text-black bg-orange-400 md:bg-orange-400 rounded-md font-medium"
                >
                  Update Blog
                </Link>
              ) : (
                ""
              )}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h2
              className="text-lg md:text-4xl font-bold relative"
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-l from-red-400 to-blue-400">
                {title}
              </span>
            </h2>
            <h2>Publish Date: {publish_date}</h2>
          </div>
          <div className="my-5 space-y-2">
            <h2 className=" text-sm md:text-xl font-bold">
              Category: {coffee_type}
            </h2>
          </div>
        </div>
        <p className=" text-xs md:text-xl  font-normal text-gray-500">
          {description}
        </p>
      </div>
      <div>
        {user.email === userEmail ? (
          <p className="text-center text-3xl md:text-5xl text-red-500 font-bold">
            !You Can Not Comment In Your Own Blogs
          </p>
        ) : (
          <div className="flex justify-center rounded-lg">
            <div>
              <h1 className="text-center text-3xl font-semibold text-purple-500 my-2">
                Comment Hare
              </h1>
              <form
                onSubmit={handleTextarea}
                className="flex flex-col border-2 border-gray-400 rounded-lg"
              >
                <textarea
                  name="comment"
                  className="border-2 w-full border-gray-300 rounded-lg p-3"
                  cols="40"
                  rows="5"
                ></textarea>
                <input
                  type="submit"
                  value="Submit"
                  className="w-full bg-purple-400 p-1 rounded"
                />
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="border-2 border-gray-200 max-w-6xl mx-auto my-5 md:px-4">
        <h1 className="text-3xl font-bold text-purple-500 text-center my-3">
          Users Comments
        </h1>
        <div className="md:grid grid-cols-4 items-center gap-4 my-5">
          {comments.map((comment) => (
            <CommentOne key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default BlogsDetailsPage;
