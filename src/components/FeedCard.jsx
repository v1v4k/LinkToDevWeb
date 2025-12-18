import PropTypes from "prop-types";

const FeedCard = ({ user }) => {
  if (!user) return null;
  const { firstName, lastName, age, gender, photoUrl } = user;

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <img
        src={photoUrl}
        alt="user-image"
        className="w-full h-full object-cover object-center"
        draggable="false"
        onDragStart={(e) => e.preventDefault()}
      />
      <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full p-4 pb-16 text-white z-10">
        <h2 className="text-3xl font-extrabold drop-shadow-md leading-tight pb-1">
          {firstName} {lastName}
        </h2>
        <p className="text-lg font-medium opacity-90 drop-shadow-sm capitalize mb-1">
          {age} {gender}
        </p>
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
  }).isRequired,
};

export default FeedCard;
