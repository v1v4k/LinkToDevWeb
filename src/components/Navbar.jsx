import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const { handleSignout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();

  const onLogout = async () => {
    setIsLoggingOut(true);
    await handleSignout();
    setIsLoggingOut(false);
  };

  return (
    <div className="relative z-50">

      {/* Top accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-80" />

      {/* Navbar */}
      <div className="navbar bg-base-200 border-b border-base-300 px-6">

        <div className="flex-1">
          <Link to="/" className="text-base font-extrabold tracking-tight">
            LinkToDev
          </Link>
          {user && (
            <Link
              to="/messages"
              className={`hidden sm:block text-sm font-semibold ml-8
                transition-colors duration-200
                ${location.pathname === "/messages"
                  ? "text-primary"
                  : "text-base-content/70 hover:text-base-content"
                }`}
            >
              Messages
            </Link>
          )}
        </div>

        <div className="flex-none flex items-center gap-4">
          {user && (
            <div className="hidden md:block">
              <SearchBar />
            </div>
          )}

          <ThemeToggle />

          {user && (
            <>
              <div className="hidden md:block text-sm font-semibold">
                {user.firstName}
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar hover:bg-base-300"
                >
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      alt="profile"
                      src={user.photoUrl}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <span
                      style={{ display: "none" }}
                      className="w-full h-full flex items-center justify-center bg-primary text-primary-content font-bold text-sm"
                    >
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </span>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content font-medium bg-base-100 rounded-box mt-4 w-52 p-2 shadow-lg z-[100] gap-1"
                >
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/connections">Connections</Link></li>
                  <li><Link to="/requests">Requests</Link></li>
                  <li><Link to="/premium">Premium</Link></li>
                  <li><Link to="/settings">Settings</Link></li>
                  <li>
                    <button
                      onClick={onLogout}
                      disabled={isLoggingOut}
                      className="text-error"
                    >
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;