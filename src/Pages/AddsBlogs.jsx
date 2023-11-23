import swal from "sweetalert";
import Navbar from "../Shared/Navbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const AddsBlogs = () => {
  const { user } = useContext(AuthContext);
  const [categoryData, setCategoryData] = useState([]);
  const handleAddBlogs = (e) => {
    const currentTimestamp = new Date().toLocaleString();
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const coffee_type = form.category.value;
    const image = form.photoURL.value;
    const publish_date = form.date.value;
    const userEmail = user.email;
    const userName = user.displayName;
    const userPhoto = user.photoURL;
    form.reset();
    const blog = {
      title,
      description,
      coffee_type,
      image,
      publish_date,
      createdAt: currentTimestamp,
      userEmail,
      userName,
      userPhoto,
    };

    fetch("https://assignment-eleven-server-side-two.vercel.app/addBlogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          swal("Blog Added!", "Your Blog has been added.", "success");
        }
        // navigate("/");
      });
  };
  // console.log(categoryData[0].coffee_type);
  useEffect(() => {
    axios
      .get("https://assignment-eleven-server-side-two.vercel.app/addBlogs")
      .then(function (response) {
        console.log(response);
        setCategoryData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div
      className=""
      style={{
        backgroundImage:
          "url(https://i.ibb.co/7bxK9RV/coffee-3120750-1280.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-30 object-cover"></div>
      <div className="">
        <Navbar />
      </div>
      <div className="md:w-1/2 mx-auto h-auto mt-10 rounded-lg bg-[#F4F3F0] p-7 md:p-24">
        <form onSubmit={handleAddBlogs}>
          <div className="text-center">
            <p className=" text-2xl font-semibold md:font-bold md:text-4xl my-4 text-[#374151]">
              Add Your Blog Hare
            </p>
          </div>
          <div className="md:flex justify-between gap-3">
            <div>
              <input
                type="text"
                className="w-full my-2 p-1 rounded-md"
                name="title"
                placeholder="Enter Blog Title"
                id=""
              />
              <input
                type="text"
                className="w-full my-2 p-1 rounded-md"
                name="description"
                placeholder="Enter Description"
                id=""
              />
              {/* <input
                type="text"
                className="w-full my-2 p-1 rounded-md"
                name="category"
                placeholder="Enter category"
                id=""
              /> */}
              <select
                className="w-full my-2 p-1 rounded-md"
                name="category"
                id="category"
              >
                {categoryData.map((category) => (
                  <option key={category.id} value="Select a category">
                    {category.coffee_type}
                  </option>
                ))}
              </select>

              <input
                type="date"
                className="w-full my-2 p-1 rounded-md"
                name="date"
                id=""
              />
            </div>
          </div>
          <input
            type="text"
            name="photoURL"
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

export default AddsBlogs;
