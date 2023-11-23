/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PrivetRout = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  console.log(loading);
  if (loading) {
    return (
      <div>
         <Skeleton count={15} />
      </div>
    );
  }
  if (user) {
    return <>{children}</>;
  }
  return <Navigate state={location.pathname} to={`/login`} />;
};

export default PrivetRout;
