import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getConnections } from "../services/userApi"

const useConnections = (currentUserId) => {
  const [conversations, setConversations] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const location = useLocation()

  // Fetch connections
  useEffect(() => {
    if (!currentUserId) return

    const fetchConnections = async () => {
      try {
        const res = await getConnections()
        setConversations(res.data)
      } catch (err) {
        console.error("Failed to fetch connections:", err)
      }
    }
    fetchConnections()
  }, [currentUserId])

  // Handle navigation from other pages (Connections page → Chat)
  useEffect(() => {
    const targetUser = location.state?.targetUser
    if (!targetUser) return

    const existingUser = conversations.find(c => c._id === targetUser._id)

    if (existingUser) {
      setSelectedUser(existingUser)
    } else {
      setConversations(prev => [targetUser, ...prev])
      setSelectedUser(targetUser)
    }

    window.history.replaceState({}, document.title)
  }, [conversations, location.state])

  return { conversations, selectedUser, setSelectedUser }
}

export default useConnections