import { useDispatch, useSelector } from "react-redux";
import { login, logout, signup } from "../services/authApi";
import axiosInstance from "../services/axiosInstance";
import { addUser, removeUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { clearFeed } from "../redux/feedSlice";
import { useCallback } from "react";

const useAuth = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    const { data } = await signup(formData);

    dispatch(addUser(data));
    return navigate("/profile");
  };

  const handleSignin = async (formData) => {
    const { data } = await login(formData);
    dispatch(addUser(data));
    return navigate("/");
  };

  const handleSignout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error?.message);
    } finally {
      dispatch(removeUser());
      dispatch(clearFeed());
      navigate("/login");
    }
  };

  const fetchUser = useCallback(async () => {
    try {
      if (user) return;
      const { data } = await axiosInstance.get(`/profile`);

      dispatch(addUser(data));
    } catch (error) {
      console.error("Failed to fetch user:", error?.message);
    }
  }, [user, dispatch]);

  return { handleSignup, handleSignin, handleSignout, fetchUser };
};

export default useAuth;
