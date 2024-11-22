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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []); 
  
 

  if(!userConnections || userConnections.length === 0) return ;
 
  return (
    <div >
    <h2 className="text-2xl font-bold text-center m-2 p-2">Connections</h2>
    <div className="flex justify-center">
        {
        userConnections.map(connection => <ConncectionCard key = {connection._id} data = {connection}/>)
    }
    </div>
    </div>
  );
};

export default Connections;
