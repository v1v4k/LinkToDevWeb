import PropTypes from "prop-types"
import { Link, useLocation } from "react-router-dom"

import { NAV_ITEMS } from "./navConfig"
import SearchBar from "./SearchBar"

const MobileDrawer = ({ user, isOpen, onClose, onLogout, isLoggingOut }) => {
  const location = useLocation()

  if (!isOpen) return null

  const navLinkClass = (path) =>
    `block px-4 py-3 rounded-lg text-sm font-semibold transition-colors
     ${location.pathname === path
       ? "bg-primary/10 text-primary"
       : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
     }`

  return (
    <>
      <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="md:hidden fixed top-0 left-0 h-full w-72 bg-base-100 z-50 shadow-2xl flex flex-col">
        <div className="p-4 border-b border-base-300 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full ring-2 ring-primary overflow-hidden">
            <img src={user?.photoUrl} alt="profile" className="w-full h-full object-cover" />
          </div>
          <div className="overflow-hidden">
            <p className="font-bold text-base-content truncate">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-base-content/50 truncate">{user?.emailId}</p>
          </div>
        </div>
        <div className="p-4 border-b border-base-300">
          <SearchBar />
        </div>
        <nav className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={navLinkClass(item.path)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-base-300">
          <button
            onClick={onLogout}
            disabled={isLoggingOut}
            className="btn btn-outline btn-error w-full"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>

      </div>
    </>
  )
}

MobileDrawer.propTypes = {
  user: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  isLoggingOut: PropTypes.bool.isRequired,
}

export default MobileDrawer