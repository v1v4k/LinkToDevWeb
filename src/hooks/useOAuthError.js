import { useSearchParams } from "react-router-dom";

const useOAuthError = () => {
  const [searchParams] = useSearchParams();
  const key = searchParams.get("error");

  const errorMap = {
    github_failed: "GitHub Authentication failed",
    server_error: "Server failed",
  };

  return errorMap[key] || "";
};

export default useOAuthError;
