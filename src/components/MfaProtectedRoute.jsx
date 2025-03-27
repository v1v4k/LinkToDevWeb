import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const MfaProtectedRoute = () => {
    const user = useSelector((store) => store.user);
  
    if (!user) return <Navigate to="/login" />;
    if (user.isMfaEnable && !user.mfaVerified) return <Navigate to="/mfa" />;
  
    return <Outlet />;
  };

  export default MfaProtectedRoute;