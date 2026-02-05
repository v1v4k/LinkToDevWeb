import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const [isShowSignIn, setIsShowSignIn] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      if (user.isMfaEnable) {
        return navigate("/mfa");
      }
      return navigate("/"); 
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );

      if (!response.data) return;
      dispatch(addUser(response.data));
      if (response.data.isMfaEnable && !response.data.mfaVerified) {
        return navigate("/mfa"); 
      }
      return navigate("/");
    } catch (error) {
      setError(error?.response?.status === 401 ? "Invalid Credentials" : "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      if (!response.data) return;
      dispatch(addUser(response.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
   
    <div className="flex justify-center items-center w-full h-full bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-2xl justify-center mb-4">
            {isShowSignIn ? "Sign In" : "Sign Up"}
          </h2>
          
          <div className="flex flex-col gap-3">
            {!isShowSignIn && (
              <>
                <input
                  type="text"
                  value={firstName}
                  placeholder="First Name"
                  className="input input-bordered w-full"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  className="input input-bordered w-full"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            )}
            <input
              type="text"
              value={emailId}
              placeholder="Email Id"
              className="input input-bordered w-full"
              onChange={(e) => setEmailId(e.target.value)}
            />
            <input
              type="password" 
              value={password}
              placeholder="Password"
              className="input input-bordered w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <button
              className="btn btn-primary w-full mt-2 text-lg"
              onClick={isShowSignIn ? handleLogin : handleSignUp}
            >
              {isShowSignIn ? "Sign In" : "Sign Up"}
            </button>
          </div>

          {error && <p className="text-error text-center mt-2 text-sm font-semibold">{error}</p>}
          
          <p
            className="text-center mt-4 cursor-pointer hover:underline text-sm opacity-70"
            onClick={() => {
              setIsShowSignIn(!isShowSignIn);
              setError("");
            }}
          >
            {isShowSignIn
              ? "New User? Sign up here"
              : "Already Subscribed? Sign In here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;