import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const ConncectionCard = ({ data }) => {
  if (!data) return;

  const { firstName, lastName, age, gender, photoUrl, skills, _id } = data;

  return (
    <div className="flex bg-base-300 text-neutral items-center rounded-xl w-full p-2">
      <img className=" w-24 h-24 rounded-full m-2" src={photoUrl} alt="photo" />
      <div className="mx-1 p-1 flex-grow">
        <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
        <p>{`${gender} ${age}`}</p>
        <p>{`${skills?.slice(0,2)}`}</p>
      </div>
      <Link to={`/chat/${_id}`}>
        <button className="btn btn-primary ">chat</button>
      </Link>
    </div>
  );
};

ConncectionCard.propTypes ={
  data: PropTypes.shape({
    firstName : PropTypes.string.isRequired,
     lastName : PropTypes.string.isRequired, 
     age : PropTypes.number.isRequired, 
     gender : PropTypes.string.isRequired, 
     photoUrl : PropTypes.string.isRequired, 
     skills : PropTypes.string.isRequired, 
     _id : PropTypes.string.isRequired

  }).isRequired
}

export default ConncectionCard;
