import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useEffect } from "react";

const Body = () => {
  const user = useSelector(store=>store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile`, {
          withCredentials: true,
        });

      if (!response.data) return;
      //console.log(response.data);
      dispatch(addUser(response.data));
    } catch (error) {
      if(error.status===401){
        navigate("/login")
      }
    }
  };

  useEffect(() => {
    if(user) return;
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
