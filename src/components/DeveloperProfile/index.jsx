import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getUserById,
  getConnectionStatus,
  sendConnectionRequest,
} from "../../services/userApi";
import ProfileCard from "../shared/ProfileCard";

const DeveloperProfile = () => {
  const { toUserId } = useParams();
  const [developer, setDeveloper] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("none");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userResult, statusResult] = await Promise.all([
          getUserById(toUserId),
          getConnectionStatus(toUserId),
        ]);
        setDeveloper(userResult.data);
        setConnectionStatus(statusResult.data.status);
      } catch (err) {
        setError(err?.message || "User not found");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toUserId]);

  const handleConnect = async () => {
    try {
      setConnecting(true);
      await sendConnectionRequest("interested", toUserId);
      setConnectionStatus("pending_sent");
    } catch (err) {
      console.error("Connect error:", err?.message);
    } finally {
      setConnecting(false);
    }
  };

  if (loading)
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );

  if (error)
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-error font-semibold">{error}</p>
      </div>
    );

  if (!developer) return null;

  return (
    <div className="h-full flex flex-col md:flex-row overflow-auto md:overflow-hidden">
      <div className=" flex flex-col justify-center items-center shrink-0 bg-base-100 py-4">
        <div className="md:w-[30%] flex flex-col items-center gap-3 w-full px-4">
          <div className="w-[280px]  md:max-w-[320px] rounded-2xl overflow-hidden shadow-2xl">
            <ProfileCard user={developer} />
          </div>

          {connectionStatus === "none" && (
            <button
              className="btn btn-primary w-[280px]  md:max-w-[320px]"
              onClick={handleConnect}
              disabled={connecting}
            >
              {connecting ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                "Connect"
              )}
            </button>
          )}

          {connectionStatus === "pending_sent" && (
            <button
              className="btn btn-outline w-[280px]  md:max-w-[320px] opacity-50"
              disabled
            >
              Request Sent
            </button>
          )}
          {connectionStatus === "connected" && (
  <div className="text-xs font-semibold text-success text-center">
    ✓ Connected
  </div>
)}
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-6 flex flex-col gap-4">
        <div className="bg-base-200 border border-base-300 rounded-2xl p-5 flex-1">
          <h2 className="text-xs font-bold text-base-content/40 uppercase tracking-widest mb-4">
            Posts
          </h2>
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <p className="text-base-content/30 text-sm font-medium">
              No posts yet
            </p>
            <p className="text-base-content/20 text-xs">
              Posts feature coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfile;
