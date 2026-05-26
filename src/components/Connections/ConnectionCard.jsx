import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ConnectionCard = ({ data }) => {
  if (!data) return null;

  const { firstName, lastName, age, gender, photoUrl, skills, about, _id } = data;

  return (
    <div className="flex bg-base-200 hover:bg-base-300 transition-colors rounded-xl border border-base-300 p-4 w-full gap-4 items-center cursor-pointer">
      
      <div className="avatar shrink-0">
        <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={photoUrl} alt="profile" className="object-cover" />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <h2 className="font-bold text-lg truncate text-base-content">
          {firstName} {lastName}
        </h2>
        {(age || gender) && (
          <p className="text-sm text-base-content/50 font-medium">
            {[age, gender].filter(Boolean).join(" · ")}
          </p>
        )}
        {about && (
          <p className="text-xs text-base-content/40 line-clamp-1 mt-0.5">{about}</p>
        )}
        {skills?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
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
        <Link to={`/developer/${_id}`}>
          <button className="btn btn-outline btn-sm w-full">Profile</button>
        </Link>
        <Link to="/messages" state={{ targetUser: { _id, firstName, lastName, photoUrl } }}>
          <button className="btn btn-primary btn-sm w-full">Chat</button>
        </Link>
      </div>

    </div>
  );
};

ConnectionCard.propTypes = {
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

export default ConnectionCard;