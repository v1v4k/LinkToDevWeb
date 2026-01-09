import axios from "axios";
import PropTypes from "prop-types";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../redux/requestSlice";

const RequestCard = ({ request }) => {
  const { _id, fromUserId } = request;
  const dispatch = useDispatch();

  if (!fromUserId) {
    return null; 
  }

  const { firstName, lastName, gender, skills, photoUrl, age } = fromUserId;

  const reviewRequests = async (status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}ed/${_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        dispatch(removeRequest(_id));
      }
    } catch (error) {
      console.error("Error reviewing connection request:", error);
    }
  };

  return (
    <div className="flex justify-center m-2">
      <div className="flex bg-base-300 text-neutral items-center rounded-xl w-full p-2 shadow-md">
        <img
          className="w-24 h-24 rounded-full m-2 object-cover"
          src={photoUrl}
          alt={`${firstName}'s profile`}
        />
        <div className="mx-1 p-1 flex-grow text-left">
          <h2 className="font-bold text-xl capitalize">
            {firstName} {lastName}
          </h2>
          <p className="text-sm">
            {gender} {age && `, ${age}`}
          </p>
          <p className="text-sm text-gray-500">
            {skills?.slice(0, 3).join(", ")}
          </p>
        </div>
        <div className="flex flex-col">
          <button
            className="btn btn-success btn-sm font-bold m-1"
            onClick={() => reviewRequests("accept")}
          >
            Accept
          </button>
          <button
            className="btn btn-error btn-sm font-bold m-1"
            onClick={() => reviewRequests("reject")}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

RequestCard.propTypes = {
  request: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    fromUserId: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      gender: PropTypes.string,
      skills: PropTypes.arrayOf(PropTypes.string),
      photoUrl: PropTypes.string,
      age: PropTypes.number,
    })
  }).isRequired,
};

export default RequestCard;
