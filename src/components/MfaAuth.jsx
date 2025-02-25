import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MfaAuth = () => {
  const [qrCode, setQrcode] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const isMfaEnable = useSelector(store=>store?.user?.isMfaEnable)

  const setupMFA = async () => {
    const res = await axios.get(`${BASE_URL}/mfa/setup`, {
      withCredentials: true,
    });
    setQrcode(res.data.qrCode);
    //console.log(res.data.qrCode);
  };

  const verifyMFA = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/mfa/verify`,
        { token },
        {
          withCredentials: true,
        }
      );
      //console.log(res);
      if (res.status === 200) {
        return navigate("/");
      } else {
        return navigate("/mfa");
      }
    } catch (err) {
      console.log(`${err}`);
    }
  };
  return (
    <div className="">
      <h1 className="text-center text-2xl font-bold">
        Multifactor Authentication
      </h1>
      <div className="bg-primary mx-auto my-4 p-4 w-1/4 rounded-xl">
       { !isMfaEnable && <div className="mt-4 flex justify-center items-center">
          {qrCode && <img src={qrCode} alt="Scan this QR code" />}
          <button className="btn ml-4" onClick={setupMFA}>
            Generate QR
          </button>
        </div>}
        <div className="mt-4 flex justify-center">
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="p-3 rounded-md"
            placeholder="enter qrcode"
          />
          <submit className="btn  ml-3" onClick={verifyMFA}>
            Submit
          </submit>
        </div>
      </div>
    </div>
  );
};

export default MfaAuth;
