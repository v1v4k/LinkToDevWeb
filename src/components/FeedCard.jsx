import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../redux/feedSlice";

/* eslint-disable react/prop-types */
const FeedCard = ({ user }) => {
  const dispatch = useDispatch();
  if (!user) return;
  const { _id, firstName, lastName, age, gender, photoUrl, about } = user;

 

  const handleConnectionRequest = async (status) => {
    await axios.post(`${BASE_URL}/sendConnectionRequest/${status}/${_id}`, {}, {
      withCredentials : true
    });
    dispatch(removeUserFromFeed(_id));
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl m-2">
      <figure className="px-10 pt-10">
        <img src={photoUrl} alt="photo" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p>{`${gender} ${age}`}</p>
        <p>{about}</p>
        <div className="card-actions">
          <button
            className="btn btn-primary mx-1"
            onClick={() => {
              handleConnectionRequest("interested");
            }}
          >
            Interested
          </button>
          <button
            className="btn btn-primary mx-1"
            onClick={() => {
              handleConnectionRequest("ignored");
            }}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
