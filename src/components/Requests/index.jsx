import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../../redux/requestSlice";
import axiosInstance from "../../services/axiosInstance";
import RequestCard from "./RequestCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store?.requests ?? []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosInstance.get("/user/requests/received");
        console.log(res.data)
        dispatch(addRequests(res.data));
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, [dispatch]);

  if (!requests) return (
    <div className="flex-1 flex justify-center items-center">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col items-center overflow-hidden px-4">
      <div className="py-4 shrink-0">
        <h2 className="text-3xl font-extrabold text-base-content">
          Connection Requests
        </h2>
      </div>

      {requests.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <div className="bg-base-200 rounded-2xl p-8 text-center">
            <h1 className="text-xl font-bold text-base-content">No Pending Requests</h1>
            <p className="text-sm text-base-content/50 mt-1">Your inbox is all caught up!</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 w-full max-w-2xl overflow-y-auto pb-8 flex flex-col gap-3 min-h-0">
          {requests.map((request) => (
            <RequestCard key={request._id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;