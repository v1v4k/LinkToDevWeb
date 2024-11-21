const FeedCard = ({ user }) => {
  

  const { firstName, lastName, age, gender, photoUrl, about } = user;

 

  return (
    <div className="card bg-base-300 w-96 shadow-xl m-2">
      <figure className="px-10 pt-10">
        <img src={photoUrl} alt="photo" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p>{`${gender} ${age}`}</p>
        <p>{about}</p>
        <div className="card-actions">
          <button className="btn btn-primary mx-1">Interested</button>
          <button className="btn btn-primary mx-1">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
