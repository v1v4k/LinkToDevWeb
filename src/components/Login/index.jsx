import { useEffect, useState } from "react";
import AuthTabs from "./AuthTabs";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import OAuthButtons from "./OAuthButtons";
import useOAuthError from "../../hooks/useOAuthError";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const oauthError = useOAuthError();

  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

 useEffect(() => {
    if (user) navigate("/")
  }, [user, navigate])

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
        <div className="bg-base-200 border border-base-300 rounded-2xl shadow-2xl p-8 w-full max-w-sm">
          <AuthTabs activeTab={activeTab} onChange={setActiveTab} />
          {activeTab === "signin" ? (
            <SignInForm oauthError={oauthError} />
          ) : (
            <SignUpForm oauthError={oauthError} />
          )}
          <OAuthButtons />
          <p className="text-center text-xs text-base-content/40 mt-4">
            {activeTab === "signin"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              onClick={() =>
                setActiveTab(activeTab === "signin" ? "signup" : "signin")
              }
              className="text-primary font-bold hover:underline bg-transparent border-0 cursor-pointer p-0"
            >
              {activeTab === "signin" ? "Sign up here" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;
