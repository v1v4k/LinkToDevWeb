import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../redux/requestSlice";
import RequestCard from "./RequestCard";


const Requests = () => {
  const dispatch = useDispatch();


  const userRequests = useSelector((store) => store.requests);

  //console.log(userRequests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });

      //console.log(res?.data?.data)
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.error("Error occurred while login:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

 /*  const RequestCard = CardForRequest(ConncectionCard);*/

/*   if (!userRequests || userRequests.length === 0)
    return (
      <h1 className="text-center font-bold text-2xl my-6">No Requests Found</h1>
    ); */
 
   //console.log(userRequests[0]?.fromUserId )
  return (
    <>
      <h2 className="text-2xl font-bold text-center m-2 p-2">Requests</h2>
      {
        (!userRequests || userRequests.length === 0) ? <h1 className="text-center  text-2xl my-4">No Requests Found</h1> :
      
        userRequests.map((req)=><RequestCard key={req._id} data={[req._id, req.fromUserId]}/>)}
      
    </>
  );
};

export default Requests;
