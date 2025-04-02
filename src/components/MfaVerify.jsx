import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";

const MfaVerify = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const verifyMFA = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/mfa/verify`,
        { code },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        dispatch(addUser({ ...user, mfaVerified: true }));
        navigate("/");
      }
    } catch (err) {
      console.log(`${err}`);
    }
  };

  return (
    <div className="flex-col justify-center md:mt-[5%]">
      <h1 className="text-center text-2xl font-bold">
        Multifactor Authentication
      </h1>
      <div className="bg-primary mx-auto my-4 p-4 w-[80%] md:w-1/4 rounded-xl">
        <div className="mt-4 flex justify-center">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="p-3 rounded-md"
            placeholder="enter qrcode"
          />
          <button className="btn  ml-3" onClick={verifyMFA}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaVerify;
