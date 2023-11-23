import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddsBlogs from "../Pages/AddsBlogs";
import BlogsDetailsPage from "../Pages/BlogsDetailsPage";
import AllsBlogs from "../Pages/AllsBlogs";
import Wishlists from "../Pages/Wishlists";
import AllPopularPost from "../Components/AllPopularPost";
import PopularDetails from "../Pages/PopularDetails";
import RecentBlog from "../Components/RecentBlog";
import UpdateBlogs from "../Pages/UpdateBlogs";
import PrivetRout from "./PrivetRoute";
import FeaturedBlogs from "../Pages/FeaturedBlogs";
import AllBlog from "../Components/AllBlog";
import SinglePopular from "../Components/SinglePopular";
import AllPopular from "../Components/AllPopular";
import PopularWishlists from "../Pages/PopularWishlists";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/addBlog",
        element: <AddsBlogs />,
      },
      {
        path: `/blogsDetails/:id`,
        element: (
          <PrivetRout>
            <BlogsDetailsPage />
          </PrivetRout>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assignment-eleven-server-side-two.vercel.app/addBlogs/${params.id}`
          ),
      },
      {
        path: `/blogsDetails/:id`,
        element: <RecentBlog />,
        loader: ({ params }) =>
          fetch(
            `https://assignment-eleven-server-side-two.vercel.app/addBlogs/${params.id}`
          ),
      },
      {
        path: `/blogsDetails/:id`,
        element: <SinglePopular />,
        loader: ({ params }) =>
          fetch(
            `https://assignment-eleven-server-side-two.vercel.app/addBlogs/${params.id}`
          ),
      },
      {
        path: `/blogsDetails/:id`,
        element: <AllBlog />,
        loader: ({ params }) =>
          fetch(
            `https://assignment-eleven-server-side-two.vercel.app/addBlogs/${params.id}`
          ),
      },
      {
        path: `/blogsDetails/:id`,
        element: <AllPopular />,
        loader: ({ params }) =>
          fetch(
            `https://assignment-eleven-server-side-two.vercel.app/popularPosts/${params.id}`
          ),
      },
      {
        path: "/allBlogs",
        element: <AllsBlogs />,
      },
      {
        path: `/wishlist/:id`,
        element: <PrivetRout><Wishlists /></PrivetRout>,
      },
      {
        path: `/popularWishlist/:id`,
        element: <PrivetRout><PopularWishlists /></PrivetRout>,
      },
      {
        path: "/wishlist",
        element: <PrivetRout><Wishlists /></PrivetRout>,
      },
      {
        path: "/popularWishlist",
        element: <PrivetRout><PopularWishlists /></PrivetRout>,
      },
      {
        path: "/allPopularPosts",
        element: <AllPopularPost />,
      },
      {
        path: `/popularDetails/:id`,
        element: <PopularDetails />,
        loader: ({ params }) =>
          fetch(
            `https://assignment-eleven-server-side-two.vercel.app/popularPosts/${params.id}`
          ),
      },
      {
        path: "updateBlog/:id",
        element: <PrivetRout><UpdateBlogs /></PrivetRout>,
        loader: ({ params }) => {
          return fetch(
            `https://assignment-eleven-server-side-two.vercel.app/addBlogs/${params.id}`
          );
        },
      },
      {
        path: "/featuredBlogs",
        element: (
          <PrivetRout>
            <FeaturedBlogs />
          </PrivetRout>
        ),
      },
      {},
      {},
      {},
      {},
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
