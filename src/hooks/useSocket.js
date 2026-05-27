import { useEffect, useRef, useState } from "react"
import { createSocketConnection } from "../utils/socket"

const useSocket = (currentUserId) => {
  const socketRef = useRef(null)
  const [onlineUsers, setOnlineUsers] = useState([])

  useEffect(() => {
    if (!currentUserId) return

    if (!socketRef.current) {
      socketRef.current = createSocketConnection(currentUserId)
    }

    socketRef.current.on("getOnlineUsers", (users) => {
      setOnlineUsers(users)
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.off("getOnlineUsers")
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
  }, [currentUserId])

  return { socketRef, onlineUsers }
}

export default useSocket