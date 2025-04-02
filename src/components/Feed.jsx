import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { addFeed, removeUserFromFeed } from "../redux/feedSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const Feed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const feed = useSelector((state) => state.feed);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.feed));
    } catch (error) {
      //console.error("Error occurred while fetching feed:", error);
    }
  };

  useEffect(() => {
    if (user && !feed) {
      fetchFeed();
    }
  }, [user, feed]);

  useEffect(() => {
    if (!user) {
      return navigate("/login" , { replace: true });
    }
  }, [user]);

  const handleSwipe = (direction) => {
    if (direction === "right") {
      console.log("Accepeted", feed[currentIndex]);
      handleConnectionRequest("interested");
    } else if (direction === "left") {
      handleConnectionRequest("ignored");
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < feed.length) {
      setCurrentIndex(nextIndex);
    } else {
      console.log("End of feed");
    }
  };

  const handleConnectionRequest = async (status) => {
    try {
      await axios.post(
        `${BASE_URL}/sendConnectionRequest/${status}/${feed[currentIndex]._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(feed[currentIndex]._id));
    } catch (error) {
      console.error("Error occurred while sending connection requests:", error);
    }
  };

  if (!feed?.length || currentIndex >= feed.length) return <div></div>;

  return (
    <div className="flex justify-center mt-[20%] md:mt-[2%] ">
      <motion.div
        key={feed[currentIndex]._id}
        className="bg-primary p-8 rounded-2xl shadow-xl w-72 h-96 text-xl"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(event, info) => {
          if (info.offset.x > 100) handleSwipe("right");
          if (info.offset.x < -100) handleSwipe("left");
        }}
        whileTap={{ scale: 0.95 }}
      >
        <FeedCard user={feed[currentIndex]} />
      </motion.div>
    </div>
  );
};

export default Feed;
