import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../redux/userSlice";
import { clearFeed } from "../redux/feedSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true});
      dispatch(removeUser());
      dispatch(clearFeed());
      return navigate("/login");
    } catch (error) {
      console.error("Error occurred while logout:", error);
    }
  };

  return (
    <div className="navbar bg-base">
      <div className="flex-1">
        <Link to={ "/" } className="btn btn-ghost text-xl">
          LinkToDev
        </Link>
      </div>
      {user && (
        <div className="flex-none font-bold text-lg gap-2">
          <div>{user.firstName}</div>
          <div className="dropdown dropdown-end mx-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="justify-between">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="justify-between">
                  Requests
                </Link>
              </li>

              <li>
                <Link to="/settings" className="justify-between">Settings</Link>
              </li>
              <li>
                <Link to="/login" className="justify-between" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
