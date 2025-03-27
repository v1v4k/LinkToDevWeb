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
  //console.log(user);

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      if (user.isMfaEnable) {
        return navigate("/mfa");
      }
      return navigate("/"); // Redirect to homepage if user is logged in
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
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

      if (!response.data) return;
      dispatch(addUser(response.data));
      if (response.data.isMfaEnable && !response.data.mfaVerified){
        return navigate("/mfa"); // Redirect to MFA if enabled but not verified
      }
      return navigate("/");
    } catch (error) {
      //console.error("Error occurred while login:", error);
      setError(error?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        {
          withCredentials: true,
        }
      );
      if (!response.data) return;
      dispatch(addUser(response.data));
      return navigate("/profile");
    } catch (error) {
      //console.error("Error occurred while login:", error);
      setError(error?.response?.data || "Something went wrong");
    }
  };

  console.log("render")
  return (
    <div className="card bg-primary text-neutal w-1/4 mx-auto my-[3%]">
      <div className="card-body flex  flex-col items-center ">
        <h2 className="card-title text-2xl">{isShowSignIn ? "Sign In" : "Sign Up"}</h2>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="flex flex-col justify-center">
              {!isShowSignIn && (
                <>
                  <input
                    type="text"
                    value={firstName}
                    placeholder="First Name"
                    className="input input-bordered w-full max-w-xs m-1"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={lastName}
                    placeholder="Last Name"
                    className="input input-bordered w-full max-w-xs m-1"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}
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
              <button
                className="btn bg-base-100 w-full max-w-xs m-1 text-lg"
                onClick={isShowSignIn ? handleLogin : handleSignUp}
              >{isShowSignIn ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </label>
        </div>
        <p className="text-red-500">{error}</p>
        <p
          className="cursor-pointer"
          onClick={() => {
            setIsShowSignIn(!isShowSignIn);
          }}
        >
          {isShowSignIn
            ? `New User ? Sign up here`
            : `Already Subscribed ? Sign In here`}
        </p>
      </div>
    </div>
  );
};

export default Login;
