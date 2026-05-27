import { useEffect } from "react";
import { addFeed, removeUserFromFeed } from "../redux/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { getFeed, sendConnectionRequest } from "../services/userApi";

const useFeed = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const feed = useSelector((store) => store.feed);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await getFeed();

        dispatch(addFeed(res?.data));
      } catch (err) {
        console.error("Error fetching feed:", err);
      }
    };

    fetchFeed();
  }, [user, feed, dispatch]);

    const handleSwipe = async (direction, targetUserId) => {
    const status = direction === "right" ? "interested" : "ignored"
    try {
      dispatch(removeUserFromFeed(targetUserId))
      await sendConnectionRequest(status, targetUserId)
    } catch (err) {
      console.error("Error sending connection request:", err)
    }
  }

  return {feed, handleSwipe};
};
export default useFeed