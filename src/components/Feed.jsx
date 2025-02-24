import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { addFeed } from "../redux/feedSlice";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const dispatch = useDispatch();
  const { user, feed } = useSelector((store) => store);

  const navigate = useNavigate();
  const fetchFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.feed));
    } catch (error) {
      console.error("Error occurred while fetching feed:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFeed();
    }
  }, []);

  if (!feed) return navigate("/login");

  return (
    <div className="flex justify-center my-16">
      {feed.map((feed) => (
        <FeedCard key={feed._id} user={feed} />
      ))}
    </div>
  );
};

export default Feed;
