import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-inter text-center">
      <h2 className="text-4xl font-bold text-red-700 mb-4">
        Payment Cancelled
      </h2>
      <p className="text-xl text-gray-700 mb-6">
        Your payment was not completed.
      </p>
      <p className="text-md text-gray-600 mb-8">
        If you have any issues, please contact support or try again.
      </p>
      <Link
        to="/subscribe"
        className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
      >
        Try Again
      </Link>
    </div>
  );
};

export default CancelPage;
