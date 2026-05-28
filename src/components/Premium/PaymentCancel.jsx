import { Link } from "react-router-dom";

const PaymentCancel = () => (
  <div className="h-full flex items-center justify-center bg-base-100 px-4">
    <div className="bg-base-200 border border-error/30 border-t-4 border-t-error p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-error/10 mb-6">
        <svg
          className="h-8 w-8 text-error"
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

      <h2 className="text-2xl font-bold text-base-content mb-2">
        Payment Cancelled
      </h2>
      <p className="text-base-content/60 mb-8">
        Your transaction was not completed. Please try a different payment
        method.
      </p>

      <div className="flex flex-col gap-3">
        <Link to="/premium" className="btn btn-primary w-full">
          Try Again
        </Link>
        <Link to="/" className="btn btn-ghost w-full">
          Go to Dashboard
        </Link>
      </div>
    </div>
  </div>
);

export default PaymentCancel;
