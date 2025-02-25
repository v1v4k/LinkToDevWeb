const FeedCard = ({ user }) => {
  if (!user) return;
  const { _id, firstName, lastName, age, gender, photoUrl, about } = user;

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

export default FeedCard;
