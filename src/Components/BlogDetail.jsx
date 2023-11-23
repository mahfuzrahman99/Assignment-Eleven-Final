/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Navbar from "../Shared/Navbar";
// import navbarADBG from "..";


const BlogDetail = ({ DBlog }) => {
  // eslint-disable-next-line no-unused-vars
  const {_id, image, title, coffee_type, description, publish_date } = DBlog;



  const parentDivStyle = {
    // backgroundImage: `url(${navbarADBG})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const handleAddToWishlist = () => {

  }


  return (
    <div>
      <div style={parentDivStyle} className="">
        <Navbar />
      </div>
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
            <Link className="flex justify-between items-center">
              <button
                onClick={handleAddToWishlist}
                className=" md:btn btn-sm text-black md:text-black bg-blue-400 md:bg-blue-400 rounded-md font-medium"
              >
                Add To Wishlist
              </button>
            </Link>
          </div>
        </div>
        <div className="">
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
    </div>
  );
};

export default BlogDetail;
