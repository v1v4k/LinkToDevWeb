import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";

const MfaSetup = () => {
  const [qrCode, SetQrCode] = useState("");
  const handleSetupMFA = async () => {
    const res = await axios.get(`${BASE_URL}/mfa/setup`, {
      withCredentials: true,
    });
    SetQrCode(res.data.qrCode);
    //console.log(res.data.qrCode);
  };
  return (
    <div className="">
        <p className="font-bold text-xl text-left">MFA Setup</p>
      <div className="mt-4 flex justify-center items-center">
        {qrCode && <img src={qrCode} alt="Scan this QR code" />}
        <button className="btn ml-4" onClick={handleSetupMFA}>
          Generate QR
        </button>
      </div>
    </div>
  );
};

export default MfaSetup;
