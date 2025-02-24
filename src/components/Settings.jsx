import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";

const Settings = () => {
  const [isEnable, setIsEnable] = useState(true);
  const handleMfa = async (value) => {
    const data = await axios.post(`${BASE_URL}/mfa/enable/${value}`,{}, {
        withCredentials : true
    });
    
    setIsEnable(prevState => !prevState);
  };
  return (
    <div className="w-1/2 mx-auto text-center">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="flex justify-between mt-4">
        <p className="font-bold text-2xl">Multifactor Authentication</p>
        <button
          className="btn btn-secondary"
          onClick={isEnable ? () => handleMfa(false) : () => handleMfa(true)}
        >
          {isEnable ? "Disable" : "Enable"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
