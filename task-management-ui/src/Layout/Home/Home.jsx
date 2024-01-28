import { Outlet } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>homie</h1>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;