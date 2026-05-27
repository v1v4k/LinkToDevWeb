import { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-base-100 px-4 gap-4">
          <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-error"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-base-content">
            Something went wrong
          </h1>
          <p className="text-sm text-base-content/60 text-center max-w-md">
            We hit an unexpected error. Please refresh the page or try again.
          </p>
          <div className="flex gap-3 mt-2">
            <button onClick={this.handleReset} className="btn btn-primary">
              Try Again
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="btn btn-ghost"
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
