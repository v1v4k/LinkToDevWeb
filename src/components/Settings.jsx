import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import MfaSetup from "./MfaSetup";

const Settings = () => {
  const [isEnable, setIsEnable] = useState("");
  const handleMfa = async (value) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/mfa/enable/${value}`,
        {},
        {
          withCredentials: true,
        }
      );
      setIsEnable((prevState) => !prevState);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-1/2 mx-auto text-center">
      <h1 className="text-2xl font-bold mt-[5%] ">Settings</h1>
      <div className="flex md:justify-evenly md:items-center mt-4">
        <p className="font-bold text-md md:text-xl">Multifactor Authentication</p>
        <button
          className="btn btn-secondary"
          onClick={isEnable ? () => handleMfa(false) : () => handleMfa(true)}
        >
          {isEnable ? "Disable" : "Enable"}
        </button>
      </div>
      {isEnable && <MfaSetup />}
    </div>
  );
};

export default Settings;
