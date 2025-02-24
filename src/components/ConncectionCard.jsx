import { Link } from "react-router-dom";

const ConncectionCard = ({ data }) => {
  if (!data) return;

  const { firstName, lastName, age, gender, photoUrl, skills, _id } = data;

  return (
    <div className="flex bg-base-300 text-neutral items-center rounded-xl w-1/3 p-2">
      <img className=" w-24 h-24 rounded-full m-2" src={photoUrl} alt="photo" />
      <div className="mx-1 p-1 flex-grow">
        <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
        <p>{`${gender} ${age}`}</p>
        <p>{`${skills}`}</p>
      </div>
      <Link to={`/chat/${_id}`}>
        <button className="btn btn-primary">chat</button>
      </Link>
    </div>
  );
};

export default ConncectionCard;
