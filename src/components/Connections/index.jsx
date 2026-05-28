import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addConnection } from "../../redux/connectionSlice";
import { Link } from "react-router-dom";
import ConnectionCard from "./ConnectionCard";
import axiosInstance from "../../services/axiosInstance";
// import { MOCK_CONNECTIONS } from "../utils/mock"; 

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store?.connections);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axiosInstance.get("/user/connections");
        dispatch(addConnection(res.data));
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };
    fetchConnections();
  }, [dispatch]);

  if (!connections) return (
    <div className="flex-1 flex justify-center items-center">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col items-center px-4 overflow-hidden">

      <div className="py-4 shrink-0">
        <h2 className="text-3xl font-extrabold text-base-content">My Connections</h2>
      </div>

      {connections.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png"
            alt="No connections"
            className="w-32 h-32 opacity-30"
          />
          <h1 className="font-bold text-2xl text-base-content/50">No Connections Yet!</h1>
          <p className="text-base-content/40">Start swiping to find new developers.</p>
          <Link to="/"><button className="btn btn-primary">Go to Feed</button></Link>
        </div>
      ) : (
        <div className="flex-1 w-full max-w-2xl overflow-y-auto flex flex-col gap-3 min-h-0 pb-10">
          {connections.map((connection) => (
            <ConnectionCard key={connection._id} data={connection} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Connections;