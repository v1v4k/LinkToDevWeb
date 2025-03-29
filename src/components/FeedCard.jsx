import PropTypes  from "prop-types";

const FeedCard = ({ user }) => {
  if (!user) return null;
  const {  firstName, lastName, age, gender, photoUrl, about } = user;

  return (
    <div>
      <figure className="px-10 pt-10">
        <img src={photoUrl} alt="photo" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p>{`${gender} ${age}`}</p>
        <p>{about}</p>
      </div>
    </div>
  );
};

FeedCard.propTypes = {
  user: PropTypes.shape({
    firstName : PropTypes.string.isRequired, 
    lastName : PropTypes.string.isRequired, 
    age : PropTypes.number.isRequired, 
    gender : PropTypes.string.isRequired, 
    photoUrl : PropTypes.string.isRequired, 
    about : PropTypes.string.isRequired
  }).isRequired
}

export default FeedCard;
