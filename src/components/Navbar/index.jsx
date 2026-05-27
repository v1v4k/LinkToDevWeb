import { useState } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"
import useAuth from "../../hooks/useAuth"
import UserMenu from "./UserMenu"
import MobileDrawer from "./MobileDrawer"
import SearchBar from "./SearchBar"

const Navbar = () => {
  const user = useSelector((store) => store.user)
  const { handleSignout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()

  const onLogout = async () => {
    setIsLoggingOut(true)
    await handleSignout()
    setIsLoggingOut(false)
    setDrawerOpen(false)
  }

  return (
    <div className="relative z-50">
      <div className="h-[2px] w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-80" />

      <div className="navbar bg-base-200 border-b border-base-300 px-4 md:px-6">
        {user && (
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden btn btn-ghost btn-sm btn-circle"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        <div className="flex-1 flex items-center gap-2 md:gap-8 ml-2 md:ml-0">
          <Link to="/" className="text-base font-extrabold tracking-tight">LinkToDev</Link>
          {user && (
            <Link
              to="/messages"
              className={`hidden md:block text-sm font-semibold transition-colors
                ${location.pathname === "/messages"
                  ? "text-primary"
                  : "text-base-content/70 hover:text-base-content"
                }`}
            >
              Messages
            </Link>
          )}
        </div>
        <div className="flex-none flex items-center gap-2 md:gap-4">
          {user && <div className="hidden md:block"><SearchBar /></div>}

          <ThemeToggle />

          {user && (
            <>
              <div className="hidden md:block text-sm font-semibold">{user.firstName}</div>
              <div className="hidden md:block">
                <UserMenu user={user} onLogout={onLogout} isLoggingOut={isLoggingOut} />
              </div>
              <div className="md:hidden w-9 h-9 rounded-full ring-2 ring-primary overflow-hidden">
                <img alt="profile" src={user.photoUrl} className="w-full h-full object-cover" />
              </div>
            </>
          )}
        </div>
      </div>

      {user && (
        <MobileDrawer
          user={user}
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onLogout={onLogout}
          isLoggingOut={isLoggingOut}
        />
      )}
    </div>
  )
}

export default Navbar