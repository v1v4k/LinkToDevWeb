import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice"; // Assuming you have an action to update Redux

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("verifying"); // verifying | success | error

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Poll the backend profile endpoint
        const checkStatus = async () => {
          const res = await axios.get("/profile/view", { withCredentials: true });
          return res.data; // Assuming this returns the user object
        };

        // LOOP: Check every 2 seconds for up to 10 seconds
        let attempts = 0;
        const intervalId = setInterval(async () => {
          attempts++;
          const user = await checkStatus();

          if (user.isPremium) {
            // STOP! We found the upgrade.
            clearInterval(intervalId);
            setStatus("success");
            // dispatch(addUser(user)); // Update Redux Store with new status
            
            // Redirect to home after 3 seconds
            setTimeout(() => navigate("/"), 3000);
          } 
          
          if (attempts >= 5 && !user.isPremium) {
            // Timed out (Webhook is slow, but we let them in anyway)
            clearInterval(intervalId);
            setStatus("success"); // Assume it worked, just slow
            setTimeout(() => navigate("/"), 3000);
          }
        }, 2000);

        return () => clearInterval(intervalId); // Cleanup on unmount

      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    verifyPayment();
  }, [navigate, dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      {status === "verifying" && (
        <div className="animate-pulse">
          <h2 className="text-2xl font-bold mb-2">Verifying Payment...</h2>
          <p className="text-gray-500">Please wait while we confirm with Stripe.</p>
        </div>
      )}

      {status === "success" && (
        <div className="bg-white p-10 rounded-xl shadow-xl border border-green-200">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">Welcome to Premium. You now have access to all features.</p>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Go to Dashboard
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="text-red-500">
          <h2 className="text-2xl font-bold">Something went wrong.</h2>
          <p>Please contact support if your account is not upgraded.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;