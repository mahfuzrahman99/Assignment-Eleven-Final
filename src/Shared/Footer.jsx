import { Link } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center p-10 text-base-content border-t-4 rounded">
        <nav className="grid grid-flow-col text-blue-500 underline gap-4">
          <Link className="link link-hover">About us</Link>
          <Link to="#">
            <a
              href="mailto:mahfuzurrahmashabbir@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </a>
          </Link>
          <Link to={`/popularWishlist`} className="link link-hover">
           Popular Wishlist
          </Link>
          <Link to={`/addBlog`} className="link link-hover">
            Add Blog
          </Link>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4 text-4xl">
            <Link className="">
              <FaGithub />
            </Link>
            <Link className="">
              <FaGoogle />
            </Link>
            <Link className="">
              <SiGmail />
            </Link>
          </div>
        </nav>
        <aside>
          <p>
            Copyright © 2023 - All right reserved by Md : Mahfuzur Rahman
            Shabbir
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
