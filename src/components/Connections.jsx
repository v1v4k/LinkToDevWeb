import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { addConnection } from "../redux/connectionSlice";
import ConncectionCard from "./ConncectionCard"; 
import { Link } from "react-router-dom";
// import { MOCK_CONNECTIONS } from "../utils/mock"; 

const Connections = () => {
  const dispatch = useDispatch();
  
 
  const connections = useSelector((store) => store?.connections);

 // const connections = [...MOCK_CONNECTIONS, ...MOCK_CONNECTIONS, ...MOCK_CONNECTIONS];

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/connections`, {
          withCredentials: true,
        });
        dispatch(addConnection(res?.data?.data));
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };

   
    fetchConnections(); 
  }, [dispatch]);

  if (!connections) 
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
   
    <div className="h-full w-full flex flex-col items-center px-4 overflow-hidden">
      
      <div className="py-4 shrink-0">
        <h2 className="text-3xl font-extrabold text-base-content my-2">
          My Connections
        </h2>
      </div>

      {connections.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" 
              alt="No connections" 
              className="w-32 h-32 opacity-50"
            />
            <h1 className="font-bold text-2xl text-gray-500">
                No Connections Yet!
            </h1>
            <p className="text-gray-400">Start swiping to find new developers.</p>
            <Link to="/">
                <button className="btn btn-primary">Go to Feed</button>
            </Link>
        </div>
      ) : (
    
        <div className="flex-1 w-full max-w-2xl overflow-y-auto flex flex-col gap-3 min-h-0 pb-10 scrollbar-hide">
          {connections.map((connection, index) => (
            // Using index in key because we duplicated mock data
            <div key={connection._id + index} className="w-full">
              <ConncectionCard data={connection} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;