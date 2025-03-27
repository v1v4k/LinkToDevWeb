import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../redux/requestSlice";

const RequestCard = ({ data }) => {
  const _id = data[0];

  const { firstName, lastName, gender, skills, photoUrl, age } = data[1];

  const dispatch = useDispatch();

  const reviewRequests = async (status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}ed/${_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if(res.status === 200){
        dispatch(removeRequest(_id));
      }
      console.log(res);
    } catch (error) {
      console.error(
        "Error occurred while reviewing connection requests:",
        error
      );
    }
  };

  return (
    <div className="flex justify-center m-2">
      <div className="flex bg-base-300 text-neutral items-center rounded-xl w-full p-2">
        <img
          className=" w-24 h-24 rounded-full m-2"
          src={photoUrl}
          alt="photo"
        />
        <div className="mx-1 p-1 flex-grow">
          <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
          <p>{`${gender} ${age}`}</p>
          <p>{`${skills}`}</p>
        </div>
        <div className="flex flex-col">
          <button
            className="btn btn-primary font-bold m-2"
            onClick={() => reviewRequests(`accept`)}
          >
            Accept
          </button>
          <button
            className="btn btn-primary font-bold m-2"
            onClick={() => reviewRequests(`reject`)}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
