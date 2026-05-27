import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { NAV_ITEMS } from "./navConfig"

const DESKTOP_MENU_ITEMS = NAV_ITEMS.filter(item => 
  ["/profile", "/connections", "/requests", "/premium", "/settings"].includes(item.path)
)

const UserMenu = ({ user, onLogout, isLoggingOut }) => (
  <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-base-300">
      <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <img alt="profile" src={user.photoUrl} />
      </div>
    </div>
    <ul tabIndex={0} className="menu menu-sm dropdown-content font-medium bg-base-100 rounded-box mt-4 w-52 p-2 shadow-lg z-[100] gap-1">
      {DESKTOP_MENU_ITEMS.map(item => (
        <li key={item.path}><Link to={item.path}>{item.label}</Link></li>
      ))}
      <li>
        <button onClick={onLogout} disabled={isLoggingOut} className="text-error">
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </li>
    </ul>
  </div>
)

UserMenu.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  isLoggingOut: PropTypes.bool.isRequired,
}

export default UserMenu