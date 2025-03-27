import ConncectionCard from "./ConncectionCard";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { addConnection } from "../redux/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();

  const userConnections = useSelector((store) => store?.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });

      //console.log(res);

      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.error("Error occurred while fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-center m-2 p-2">Connections</h2>
      {!userConnections || userConnections.length === 0 ? (
        <h1 className="text-center font-bold text-2xl my-6">
          No Requests Found
        </h1>
      ) : (
        <div className="mx-auto w-1/2 max-h-[720px] overflow-y-scroll">
          {userConnections.map((connection) => (
            <div className="m-1 p-1 " key={connection._id}>
              <ConncectionCard data={connection} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
