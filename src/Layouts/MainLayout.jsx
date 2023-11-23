import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";



const MainLayout = () => {
    return (
        <div>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayout;