import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector,  } from "react-redux";
import { addRequests } from "../redux/requestSlice";
import RequestCard from "./RequestCard";
//import { MOCK_REQUESTS } from "../utils/mock";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store?.requests);
  //const requests = [...MOCK_REQUESTS, ...MOCK_REQUESTS];

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/requests/received`, {
          withCredentials: true,
        });
        dispatch(addRequests(res?.data?.data));
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, [dispatch]);

  if (!requests)
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className=" w-full h-full flex flex-col items-center overflow-hidden px-4">
      <div className="flex-shrink-0">
        <h2 className="text-3xl font-extrabold text-base-content my-2">
          Connection Requests
        </h2>{" "}
      </div>
      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10 p-8 bg-base-200 rounded-2xl shadow-sm opacity-70">
          <h1 className="text-xl font-bold">No Pending Requests</h1>
          <p className="text-sm">Your inbox is all caught up!</p>
        </div>
      ) : (
        <div className="flex-1 w-full max-w-2xl overflow-y-auto pb-8 ">
          {requests.map((request) => (
            <div key={request._id} className="w-full">
              <RequestCard request={request} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
