import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import LOGINGPAGEBG from "../assets/coffee-3392168_1920.jpg";

// import toast from "react-hot-toast";
import swal from "sweetalert";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useAuthContext from "../Hooks/useAuthContext";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";

const Login = () => {
  const [show, setShow] = useState(true);
  // const axiosSecure = useAxiosSecure()
  const { signInUser, signInWithGoogle, signInWithGithub } = useAuthContext();

  const location = useLocation();
  const navigate = useNavigate();

  const parentDivStyle = {
    backgroundImage: `url(${LOGINGPAGEBG})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        const user = { email };
        axios
          .post(
            "https://assignment-eleven-server-side-two.vercel.app/jwt",
            user,
            { withCredentials: true }
          )
          .then((res) => {
            if (res.data.success) {
              swal("Success!", "Login Successfully!", "success");
              navigate(location?.state ? location.state : "/");
            }
          });
      })
      .catch(() => {
        swal("Error!", "Pleas check your email and password!", "error");
      });
  };
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        console.log(res.user);
        swal("Success!", "Login Successfully!", "success");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        if (err.message === "auth/invalid-login-credentials") {
          swal("Error!", "Pleas check your email or password!", "error");
        }
      });
  };

  const handleGithubLogin = () => {
    signInWithGithub()
      .then(() => {
        swal("Success!", "Login Successfully!", "success");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        if (err.message === "invalid-login-credentials") {
          swal("Error!", "Pleas check your email or password!", "error");
        }
      });
  };

  return (
    <div className="h-[100vh]" style={parentDivStyle}>
      <div className="flex justify-center items-center lg:p-12 ">
        <div className=" flex-col lg:w-1/3 ">
          <div className=" rounded-3xl  shadow-2xl">
            <form
              onSubmit={handleLogin}
              className="px-8 py-4 md:py-8 rounded-3xl bg-gray-300 "
            >
              <div className="text-center ">
                <h1 className="text-2xl  font-bold">Login your account!</h1>
                <br />
                <hr className="" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text  ">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="p-3 rounded-md bg-[#F3F3F3]"
                  required
                />
              </div>
              <div className="form-control relative">
                <div>
                  <label className="label">
                    <span className="label-text w-full">Password</span>
                  </label>
                  <input
                    type={!show ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    className="p-3 rounded-md bg-[#F3F3F3] w-full"
                    required
                  />
                </div>
                <div className="absolute top-12 right-2">
                  <span
                    className="text-xl font-extrabold"
                    onClick={() => setShow(!show)}
                  >
                    {show ? <BsEye></BsEye> : <BsEyeSlash></BsEyeSlash>}
                  </span>
                </div>
              </div>
              <div className="form-control mt-3">
                <button className="btn bg-[#403F3F] text-white rounded-none">
                  Login
                </button>
              </div>
              <div>
                <p className="text-xl text-gray-500 font-semibold">
                  Login With...!!
                </p>
                <div className="flex items-center justify-center gap-2 my-2">
                  <button
                    onClick={handleGoogleLogin}
                    className="btn border btn-outline w-1/2 border-blue-500"
                  >
                    <FcGoogle />
                    Google
                  </button>
                  <button
                    onClick={handleGithubLogin}
                    className="btn border btn-outline w-1/2 border-black"
                  >
                    <FaGithub />
                    Github
                  </button>
                </div>
              </div>
              <p className="text-center mt-2 text-[#706F6F]">
                Do not have an account? Please
                <Link className="text-[#F75B5F] font-bold" to="/register">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
