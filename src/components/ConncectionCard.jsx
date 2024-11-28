/* eslint-disable react/display-name */
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeRequest } from "../redux/requestSlice";
import { useDispatch } from "react-redux";


/* eslint-disable react/prop-types */
const ConncectionCard = ({ data }) => {
  // console.log(data)
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
  const dispatch = useDispatch();

  return (props) => {
    //console.log(props.data._id)

    const { fromUserId, _id } = props.data;

    try {
      var reviewRequests = async (status, id) => {
        await axios.post(
          `${BASE_URL}/request/review/${status}/${id}`,
          {},
          {
            withCredentials: true,
          }
        );

        dispatch(removeRequest(_id));
      };
    } catch (error) {
      console.error(
        "Error occurred while reviewing connection requests:",
        error
      );
    
    }

    return (
      <div className="flex justify-center ">
        <ConnectionCard data={fromUserId} />
        <div className=" m-1  flex flex-col items-stretch text-xl">
          <button
            className="btn btn-primary m-2 p-3 font-bold"
            onClick={() => reviewRequests("accepted", _id)}
          >
            Accept
          </button>
          <button
            className="btn btn-accent m-2 p-3 font-bold"
            onClick={() => reviewRequests("rejected", _id)}
          >
            Reject
          </button>
        </div>
      </div>
    );
  };
};

export default ConncectionCard;
