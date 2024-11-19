import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("Vivek@gmail.com");
  const [password, setPassword] = useState("Vivek@123");

  const handleLogin = async () => {

    const response = await axios.post('http://localhost:4444/login',{
      emailId,
      password
    },{
      withCredentials : true
    });

    //console.log(data);

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
