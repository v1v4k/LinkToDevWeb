import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { addFeed } from "../redux/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store?.feed?.feed);
  const fetchFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });

      if (!res) return;
      //console.log(res.data);
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if(!feed) return;

  return (
    <div className="flex justify-center my-16">
      {feed.map(feed => <FeedCard key={feed} user={feed} />)}
    </div>
  );
};

export default Feed;
