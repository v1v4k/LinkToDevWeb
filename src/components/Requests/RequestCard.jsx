import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeRequest } from "../../redux/requestSlice";
import axiosInstance from "../../services/axiosInstance";

const RequestCard = ({ request }) => {
  const { _id, fromUserId } = request;
  const dispatch = useDispatch();

  if (!fromUserId) return null;

  const { firstName, lastName, gender, skills, photoUrl, age, _id: userId } = fromUserId;

  const reviewRequest = async (status) => {
    try {
      await axiosInstance.post(`/request/review/${status}ed/${_id}`)
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error("Error reviewing request:", error);
    }
  };

  return (
    <div className="flex bg-base-200 hover:bg-base-300 transition-colors rounded-xl border border-base-300 p-4 w-full gap-4 items-center">

      <div className="avatar shrink-0">
        <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={photoUrl} alt={`${firstName}'s profile`} className="object-cover" />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <h2 className="font-bold text-lg truncate text-base-content">
          {firstName} {lastName}
        </h2>
        {(age || gender) && (
          <p className="text-sm text-base-content/50">
            {[age, gender].filter(Boolean).join(" · ")}
          </p>
        )}
        {skills?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {skills.slice(0, 3).map((skill) => (
              <span key={skill} className="badge badge-ghost badge-sm text-xs">{skill}</span>
            ))}
            {skills.length > 3 && (
              <span className="text-xs text-base-content/40 self-center">+{skills.length - 3}</span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 shrink-0">
        <Link to={`/developer/${userId}`}>
          <button className="btn btn-outline btn-sm w-full">Profile</button>
        </Link>
        <button
          className="btn btn-primary btn-sm w-full"
          onClick={() => reviewRequest("accept")}
        >
          Accept
        </button>
        <button
          className="btn btn-error btn-sm w-full"
          onClick={() => reviewRequest("reject")}
        >
          Reject
        </button>
      </div>

    </div>
  );
};

RequestCard.propTypes = {
  request: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    fromUserId: PropTypes.shape({
      _id: PropTypes.string,
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