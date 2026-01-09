import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ConncectionCard = ({ data }) => {
  if (!data) return null;

  const { firstName, lastName, age, gender, photoUrl, skills, about, _id } = data;

  return (
    <div className="flex bg-base-100 hover:bg-base-200 transition-colors rounded-xl shadow-sm border border-base-200 p-4 w-full gap-4 items-center">

      <div className="avatar">
        <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img 
            src={photoUrl} 
            alt="profile"
            className="object-cover" 
          />
        </div>
      </div>
      <div className="flex-grow overflow-hidden">
        <h2 className="font-bold text-lg md:text-xl truncate text-base-content">
          {firstName} {lastName}
        </h2>
        <p className="text-sm text-gray-500 font-medium mb-1">
          {age && `${age}, `} {gender}
        </p>
        <div className="flex flex-wrap gap-1">
          {skills && skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="badge badge-ghost badge-sm text-xs">
              {skill}
            </span>
          ))}
          {skills && skills.length > 3 && (
            <span className="text-xs text-gray-400 self-center">+{skills.length - 3}</span>
          )}
        </div>
        {about && <p className="text-xs text-gray-500 line-clamp-1 mt-1">{about}</p>}
      </div>
      <Link to={`/chat/${_id}`}>
        <button className="btn btn-primary btn-sm md:btn-md">Chat</button>
      </Link>
    </div>
  );
};

ConncectionCard.propTypes = {
  data: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string, 
    age: PropTypes.number,
    gender: PropTypes.string,
    photoUrl: PropTypes.string,
    about: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default ConncectionCard;
