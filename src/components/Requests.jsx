import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../redux/requestSlice";
import  ConncectionCard, {CardForRequest} from "./ConncectionCard";

const Requests = () => {
  const dispatch = useDispatch();

  const userRequests = useSelector((store) => store.requests);

  //console.log(userRequests);

  const fetchRequests = async () => {
    const res = await axios.get(`${BASE_URL}/user/requests/received`, {
      withCredentials: true,
    });

    //console.log(res?.data?.data)
    dispatch(addRequests(res?.data?.data));
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  
  const RequestCard = CardForRequest(ConncectionCard);

  if(!userRequests || userRequests.length === 0) return ;

 // console.log(userRequests[0]?.fromUserId )
  return (
    <>
        <h2 className="text-2xl font-bold text-center m-2 p-2">Requests</h2>
        <RequestCard data={userRequests[0]?.fromUserId} />    
    </>
  );
};

export default Requests;
