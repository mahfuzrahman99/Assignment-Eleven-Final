import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";

const axiosSecure = axios.create({
  baseURL: "https://assignment-eleven-server-side-two.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        console.log(res);
        return res;
      },
      (error) => {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
          logOut()
            .then(() => {
              navigate("/login");
            })
            .catch((error) => console.log(error));
        }
      }
    );
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
