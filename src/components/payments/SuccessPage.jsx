import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; // Assuming you use react-router-dom

const SuccessPage = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session_id");

  useEffect(() => {
    // Optionally, you can fetch the session details from your backend
    // using the sessionId to confirm the payment was successful.
    // This is an extra layer of verification, but webhooks are the primary source of truth.
    if (sessionId) {
      console.log(`Payment successful! Session ID: ${sessionId}`);
      // You might want to update local UI (e.g., show premium features)
      // or fetch user's latest subscription status from your backend.
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-inter text-center">
      <h2 className="text-4xl font-bold text-green-700 mb-4">
        Payment Successful!
      </h2>
      <p className="text-xl text-gray-700 mb-6">
        Thank you for subscribing to linktodev.
      </p>
      <p className="text-md text-gray-600 mb-8">
        Your subscription details are being updated. You will now have access to
        premium features.
      </p>
      <Link
        to="/"
        className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-300 shadow-md"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default SuccessPage;
