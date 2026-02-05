import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center border-t-4 border-red-500">
        {/* Error Icon */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
          <svg
            className="h-10 w-10 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h2>
        <p className="text-gray-600 mb-8">
          Your transaction was not completed. If you encountered an error,
          please try a different payment method.
        </p>

        <div className="space-y-3">
          <Link
            to="/premium"
            className="block w-full bg-gray-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition"
          >
            Try Again
          </Link>
          <Link
            to="/"
            className="block w-full text-gray-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
