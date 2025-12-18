import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { addFeed, removeUserFromFeed } from "../redux/feedSlice";
import { useNavigate } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const feed = useSelector((state) => state.feed);
  const [dragInfo, setDragInfo] = useState(0);

  const [showInstructions, setShowInstructions] = useState(true);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);

  
  useEffect(() => {
    const fetchFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.feed));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

    if (user && !feed) {
      fetchFeed();
    }
  }, [user, feed, dispatch]);

  useEffect(() => {
    if (!user) {
      return navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  const handleSwipe = (direction) => {
    if (showInstructions) setShowInstructions(false);
    const currentUser = feed[0];
    if (direction === "right") {
      handleConnectionRequest("interested", currentUser._id);
    } else if (direction === "left") {
      handleConnectionRequest("ignored", currentUser._id);
    }
  };

  const handleConnectionRequest = async (status, userId) => {
    try {
      dispatch(removeUserFromFeed(userId));
      await axios.post(
        `${BASE_URL}/sendConnectionRequest/${status}/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error sending connection request:", error);
    }
  };

  if (!feed) return <h1 className="flex justify-center my-10">Loading...</h1>;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users found!</h1>;

  const activeUser = feed[0];

  return (
    <div className="flex justify-center items-center w-full h-full pb-8 relative overflow-hidden">
      <AnimatePresence>
        {showInstructions && (
          <>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-1/2 -translate-y-1/2 right-1/2 mr-[15rem] flex flex-col items-end gap-3  md:flex pointer-events-none z-10 w-40"
            >
              <div className="flex flex-col items-end">
                <span className="text-red-500 font-bold bg-base-300 px-3 py-1 rounded-lg shadow-sm text-sm whitespace-nowrap border border-white/50">
                  Swipe Left
                </span>
                <span className="text-xs text-gray-500 font-semibold mt-1 bg-white/50 px-2 py-0.5 rounded">
                  Ignore
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-1/2 -translate-y-1/2 left-1/2 ml-[15rem] flex flex-col items-start gap-3 md:flex pointer-events-none z-10 w-40"
            >
              <div className="flex flex-col items-start">
                <span className="text-green-600 font-bold bg-base-300 px-3 py-1 rounded-lg shadow-sm text-sm whitespace-nowrap border border-white/50">
                  Swipe Right
                </span>
                <span className="text-xs text-gray-500 font-semibold mt-1 bg-white/50 px-2 py-0.5 rounded">
                  Interested
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.div
        key={activeUser._id}
        className="relative  rounded-2xl shadow-xl w-80 md:w-96 h-[85%] max-h-[500px]  flex flex-col overflow-hidden"
        drag="x"
        style={{ x, rotate }}
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={(event, info) => setDragInfo(info.offset.x)}
        onDragStart={() => setShowInstructions(false)}
        onDragEnd={(event, info) => {
          setDragInfo(0);
          if (info.offset.x > 100) handleSwipe("right");
          if (info.offset.x < -100) handleSwipe("left");
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {dragInfo > 50 && (
          <div className="absolute top-8 left-8 bg-green-500 text-white px-4 py-2 rounded  font-bold -rotate-12 border-2 border-white z-30">
            INTERESTED
          </div>
        )}

        {dragInfo < -50 && (
          <div className="absolute top-8 right-8 bg-red-500 text-white px-4 py-2 rounded  font-bold rotate-12 border-2 border-white z-30">
            NOPE
          </div>
        )}
        <FeedCard user={activeUser} />
        <div className="absolute bottom-4 left-0 right-0 flex justify-around z-20">
          <button
            onClick={() => handleSwipe("left")}
            className="btn btn-circle btn-outline border-red-400 text-red-500 hover:bg-red-50 hover:border-red-500 transition-all"
          >
            ✖
          </button>
          <button
            onClick={() => handleSwipe("right")}
            className="btn btn-circle btn-outline border-green-400 text-green-500 hover:bg-green-50 hover:border-green-500 transition-all"
          >
            ❤️
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Feed;
