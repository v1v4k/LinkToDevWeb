import PropTypes from "prop-types";

const ProfileCard = ({ user }) => {
  if (!user) return null;

  const { firstName, lastName, age, gender, photoUrl, about, skills } = user;

  const ageGender = [age, gender].filter(Boolean).join(" · ");

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-base-200 border border-base-300 shadow-xl">
      <div className="w-full h-full overflow-hidden">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover object-top"
          draggable="false"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent" />

      <div className="absolute bottom-0 left-0 w-full p-4 text-white z-10">
        <h2 className="text-2xl font-extrabold leading-tight drop-shadow-md">
          {firstName} {lastName}
        </h2>

        {ageGender && (
          <p className="text-sm font-medium opacity-80 mt-0.5">{ageGender}</p>
        )}

        {about && (
          <p className="text-xs opacity-70 mt-1 line-clamp-2">{about}</p>
        )}

        {skills?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {skills.slice(0, 5).map((skill) => (
              <span
                key={skill}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full
                  bg-white/15 backdrop-blur-sm border border-white/20"
              >
                {skill}
              </span>
            ))}
            {skills.length > 5 && (
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full
                bg-white/15 backdrop-blur-sm border border-white/20"
              >
                +{skills.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gender: PropTypes.string,
    photoUrl: PropTypes.string,
    about: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProfileCard;
