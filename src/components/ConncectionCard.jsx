/* eslint-disable react/prop-types */
const ConncectionCard = ({ data }) => {
  if (!data) return;
  
  const { firstName, lastName, age, gender, photoUrl, skills } = data;

  return (
    <div className="flex bg-base-300 text-neutral-content items-center rounded-xl w-1/3">
      <img className=" w-24 h-24 rounded-full m-2" src={photoUrl} alt="photo" />
      <div className="mx-1 p-1">
        <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
        <p>{`${gender} ${age}`}</p>
        <p>{`${skills}`}</p>
      </div>
    </div>
  );
};

export const CardForRequest = (ConnectionCard) => {
  // eslint-disable-next-line react/display-name
  return (props) => (
    <div className="flex justify-center ">
      <ConnectionCard {...props} />
      <div className=" m-1  flex flex-col items-stretch text-xl">
        <button className="btn btn-primary m-2 p-3 font-bold">Accept</button>
        <button className="btn btn-accent m-2 p-3 font-bold">Reject</button>
      </div>
    </div>
  );
};

export default ConncectionCard;
