
import { motion } from "framer-motion";
import { PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const BlogOwner = () => {
    return (
        <div className="md:grid grid-cols-3 justify-center items-center gap-4 p-6">
            <motion.div className="col-span-1">
                <PhotoView src="https://yourdreamcoffee.com/wp-content/uploads/2023/10/yourdreamcoffee-profile-picture.png">
                <img src="https://yourdreamcoffee.com/wp-content/uploads/2023/10/yourdreamcoffee-profile-picture.png" className="rounded-lg" alt="" />
                </PhotoView>
            </motion.div>
            <div className="col-span-2 text-lg p-4 md:text-2xl font-semibold text-gray-500 space-y-8">
                <p>Hi, my name is Jeffrey, and I’m 23 years of age. I live in The Netherlands, as I have for my entire life. I am the writer of the articles published on Your Dream Coffee.</p>
                <p>A few years back, I finished culinary school and have been working in the kitchen ever since. This is where I found out I like drinking coffee and haven’t stopped since.</p>
                <p className="bg-clip-text text-transparent bg-gradient-to-l from-red-400 to-blue-400 font-bold">Learn more about me</p>
            </div>
        </div>
    );
};

export default BlogOwner;