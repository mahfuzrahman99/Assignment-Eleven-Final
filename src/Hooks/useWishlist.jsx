import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";

const useWishlist = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useContext(AuthContext);
    const { refetch, data: wishlist = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
            console.log(wishlist);
            return res.data;
        }
    })
    return [wishlist, refetch]
};
export default useWishlist;