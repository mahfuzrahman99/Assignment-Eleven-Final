import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../Shared/Navbar";
import Skeleton from "react-loading-skeleton";
import OnePopularWishlist from "../Components/OnePopularWishlist";

const PopularWishlists = () => {
  const { user } = useContext(AuthContext);

  const { data: popularWishlistsBlog, isLoading, isError } = useQuery({
    queryKey: ["wishlists", user?.email],
    queryFn: async () => {
      const response = await fetch(`https://assignment-eleven-server-side-two.vercel.app/popularWishlist/${user?.email}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch wishlists");
      }

      const data = await response.json();
      return data;
    },
  });

  if (isLoading) {
    return (
      <Skeleton count={5}/>
    );
  }

  if (isError) {
    return <div>Error fetching wishlists</div>;
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      {popularWishlistsBlog.length > 0 ? (
        <div className="md:grid grid-cols-2 justify-center items-center gap-3 max-w-6xl mx-auto my-8">
          {popularWishlistsBlog.map((list) => (
            <OnePopularWishlist
              popularWishlistsBlog={popularWishlistsBlog}
              key={list._id}
              list={list}
            />
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-xl md:text-5xl font-bold text-red-500 text-center my-5">No Wishlists Here</h1>
        </div>
      )}
      </div>
    </div>
  );
};

export default PopularWishlists;
