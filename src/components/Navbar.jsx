import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../redux/userSlice";
import { clearFeed } from "../redux/feedSlice";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(clearFeed());
      return navigate("/login");
    } catch (error) {
      console.error("Error occurred while logout:", error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-4 relative z-50">
      <div className="flex-1">
        <Link to={"/"} className=" text-xl font-bold">
          LinkToDev
        </Link>
      </div>
      {user && (
        <div className="flex-none flex items-center gap-4">
          <div className="flex-none mx-4">
            <SearchBar />
          </div>
          <div className="font-semibold text-lg">{user.firstName}</div>
          <div className="dropdown dropdown-end mx-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:bg-base-200"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img alt="profile" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content font-medium bg-base-100 rounded-box mt-4 w-52 p-2 shadow-lg z-[100] gap-1"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li><li>
                <Link to="/messages">Messages</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/premium">Premium</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-500">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
