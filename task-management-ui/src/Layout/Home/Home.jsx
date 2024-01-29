import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthProvider/AuthProvider";
import Footer from "../../Shared/Footer";

const Home = () => {
    
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Home;