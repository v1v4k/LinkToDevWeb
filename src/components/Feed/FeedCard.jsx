import PropTypes from "prop-types";

const FeedCard = ({ user }) => {
  if (!user) return null;
  const { firstName, lastName, age, gender, photoUrl, about, skills } = user;

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-base-200">
      <img
        src={photoUrl}
        alt={firstName}
        className="w-full h-full object-cover object-top"
        draggable="false"
        onDragStart={(e) => e.preventDefault()}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5 pb-20 text-white z-10">
        <h2 className="text-2xl font-extrabold leading-tight drop-shadow-md">
          {firstName} {lastName}
        </h2>
        {(age || gender) && (
          <p className="text-sm font-medium opacity-80 capitalize mt-0.5">
            {[age, gender].filter(Boolean).join(" · ")}
          </p>
        )}
        {about && (
          <p className="text-sm opacity-80 mt-2 line-clamp-2">{about}</p>
        )}
        {skills?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="text-xs bg-white/15 backdrop-blur-sm border border-white/20 px-2 py-0.5 rounded-full"
              >
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="text-xs text-white/60 self-center">
                +{skills.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

FeedCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.number,
    gender: PropTypes.string,
    photoUrl: PropTypes.string,
    about: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default FeedCard;
