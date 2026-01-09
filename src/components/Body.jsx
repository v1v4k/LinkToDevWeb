import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useEffect } from "react";

const Body = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
 

  useEffect(() => {
     const fetchUser = async () => {
    try {
      if (user) return;
      const response = await axios.get(`${BASE_URL}/profile`, {
        withCredentials: true,
      });

      if (!response.data) return;
      //console.log(response.data);
      dispatch(addUser(response.data));
      //navigate("/");
    } catch (error) {
      if (error.status === 401 && location.pathname !== "/login") {
        navigate("/login");
      }
      console.error("Error occurred while fetching feed:", error);
    }
  };
    fetchUser();
  }, [dispatch, navigate, user, location.pathname]);

  return (
    <div className="flex flex-col h-[100dvh] w-full overflow-hidden">
      <Navbar />
      <div className="flex-1  overflow-hidden ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
