import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const Body = () => {
  const { fetchUser } = useAuth();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="flex flex-col h-[100dvh] w-full">
      <Navbar />
      <div className="flex-1 min-h-0  flex flex-col ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
