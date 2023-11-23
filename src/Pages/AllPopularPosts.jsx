import axios from "axios";
import { useEffect, useState } from "react";
import SinglePopular from "../Components/SinglePopular";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const AllPopularPosts = () => {
  const [allPoplars, setAllPoplars] = useState([]);

  useEffect(() => {
    axios
      .get("https://assignment-eleven-server-side-two.vercel.app/popularPosts")
      .then(function (response) {
        console.log(response);
        setAllPoplars(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // const sortedCoffeeData = allPoplars.map(populars => ({
  //   ...populars,
  //   publishDate: new Date(populars.publish_date)
  // })).sort((a, b) => b.publishDate - a.publishDate);

  return (
    <div>
      <div className="md:grid grid-cols-3 justify-center items-center gap-3">
        {allPoplars.slice(0, 6).map((popular) => (
          <SinglePopular key={popular._id} popular={popular} />
        ))}
      </div>
      <div className="flex justify-end p-1 m-2">
        <Link
          to={`/allPopularPosts`}
          className="flex justify-center items-center bg-purple-300 p-2 rounded-md shadow-xl "
        >
          <p className="font-bold">View All Hare</p>
          <FaLongArrowAltRight className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default AllPopularPosts;
