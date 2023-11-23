import BlogOwner from "../Components/BlogOwner";
import NewsletterSection from "../Components/NewsletterSection";
import Banner from "../Shared/Banner";
import Navbar from "../Shared/Navbar";
import AllPopularPosts from "./AllPopularPosts";
import RecentBlogs from "./RecentBlogs";


const Home = () => {
    return (
        <div>
            <Navbar/>
            <Banner/>
            <div className="max-w-6xl mx-auto border-2 p-4 border-gray-200 my-6 md:my-14 rounded-lg">
                <h1 className="text-3xl md:text-5xl font-bold text-center my-7 bg-clip-text text-transparent bg-gradient-to-l from-red-400 to-blue-400">Latest Posts</h1>
                <RecentBlogs/>
            </div>
            <div className="max-w-6xl mx-auto border-2 p-4 border-gray-200 my-6 md:my-14 rounded-lg">
                <h1 className="text-3xl md:text-5xl font-bold text-center my-7 bg-clip-text text-transparent bg-gradient-to-l from-red-400 to-blue-400">Popular Posts</h1>
                <AllPopularPosts/>
            </div>
            <div className="max-w-6xl mx-auto border-2 p-4 border-gray-200 my-6 md:my-14 rounded-lg">
                <h1 className="text-3xl md:text-5xl font-bold text-center my-7 bg-clip-text text-transparent bg-gradient-to-l from-red-400 to-blue-400">Newsletter Section</h1>
                <NewsletterSection/>
            </div>
            <div className="max-w-6xl mx-auto border-2 p-4 border-gray-200 my-6 md:my-14 rounded-lg">
                <h1 className="text-3xl md:text-5xl font-bold text-center my-7 bg-clip-text text-transparent bg-gradient-to-l from-red-400 to-blue-400">Blog Owner</h1>
                <BlogOwner/>
            </div>
        </div>
    );
};

export default Home;