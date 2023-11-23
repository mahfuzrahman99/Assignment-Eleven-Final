import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Navbar from "../Shared/Navbar";
import { useLoaderData } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const UpdateBlogs = () => {
  const updateBlogs = useLoaderData();
  console.log(updateBlogs);
  const { _id } = updateBlogs;
  const { user } = useContext(AuthContext);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    axios
      .get("https://assignment-eleven-server-side-two.vercel.app/addBlogs",{withCredentials:true})
      .then(function (response) {
        console.log(response);
        setCategoryData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleAddFourProducts = (e) => {
    const currentTimestamp = new Date().toLocaleString();
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const coffee_type = form.category.value;
    const image = form.photoURL.value;
    const publish_date = form.date.value;
    const userEmail = user.email;
    form.reset();
    const blog = {
      title: title,
      description: description,
      category: coffee_type,
      photo: image,
      publish_date,
      createdAt: currentTimestamp,
      userEmail,
    };

    fetch(
      `https://assignment-eleven-server-side-two.vercel.app/addBlogs/${_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          swal("Blog Updated!", "Your Blog has been updated.", "success");
        }
        // navigate("/");
      });
  };
  return (
    <div
      className=""
      style={{
        backgroundImage:
          "url(https://i.ibb.co/p2Rnzwc/coffee-1973549-1280.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-30 object-cover"></div>
      <div className="">
        <Navbar />
      </div>
      <div className="md:w-1/2 mx-auto h-auto mt-10 rounded-lg bg-[#F4F3F0] p-7 md:p-24">
        <form onSubmit={handleAddFourProducts}>
          <div className="text-center">
            <p className=" text-2xl font-semibold md:font-bold md:text-4xl my-4 text-[#374151]">
              Update Your Blog Hare
            </p>
          </div>
          <div className="md:flex justify-between gap-3">
            <div>
              <input
                type="text"
                defaultValue={updateBlogs.title}
                className="w-full my-2 p-1 rounded-md"
                name="title"
                placeholder="Enter Blog Title"
                id=""
              />
              <input
                type="text"
                defaultValue={updateBlogs.description}
                className="w-full my-2 p-1 rounded-md"
                name="description"
                placeholder="Enter Description"
                id=""
              />
              {/* <input
                type="text"
                defaultValue={updateBlogs.coffee_type}
                className="w-full my-2 p-1 rounded-md"
                name="category"
                placeholder="Enter Category"
                id=""
              /> */}

              <select
                className="w-full my-2 p-1 rounded-md"
                name="category"
                defaultValue={updateBlogs.coffee_type}
                
              >
                {categoryData.map((category) => (
                  <option key={category.id}>
                    {category.coffee_type}
                  </option>
                ))}
              </select>
              <input
                type="date"
                defaultValue={updateBlogs.publish_date}
                className="w-full my-2 p-1 rounded-md"
                name="date"
              />
            </div>
          </div>
          <input
            type="text"
            name="photoURL"
            defaultValue={updateBlogs.image}
            className="w-full my-2 p-1 rounded-md"
            placeholder="Enter Blog photoURL"
            id=""
          />
          <br />
          <input
            type="submit"
            name="submit"
            value="Add Blog"
            className="text-lg btn p-1 my-2 text-white w-full font-semibold text-center rounded-md bg-[#444342] hover:text-black"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateBlogs;
