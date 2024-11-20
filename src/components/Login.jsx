import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [emailId, setEmailId] = useState("Vivek@gmail.com");
  const [password, setPassword] = useState("Vivek@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const handleLogin = async () => {
    try{
      const response = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
  
      //console.log(data);
      if(!response) return;
      dispatch(addUser(response.data))
      navigate("/feed")

    }
    catch(error){
      console.log(error)
    }
    
  };

  return (
    <div className="card bg-primary text-primary-content w-96 mx-[40%] my-[5%]">
      <div className="card-body flex  flex-col items-center ">
        <h2 className="card-title">Sign In</h2>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="flex flex-col justify-center">
              <input
                type="text"
                value={emailId}
                placeholder="Email Id"
                className="input input-bordered w-full max-w-xs m-1"
                onChange={(e) => setEmailId(e.target.value)}
              />
              <input
                type="text"
                value={password}
                placeholder="Password"
                className="input input-bordered w-full max-w-xs m-1"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>
        </div>
        <button className="btn" onClick={handleLogin}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
