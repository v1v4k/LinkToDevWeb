import PropTypes from "prop-types"
import { useState } from "react"

const ChatInput = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    onSendMessage(newMessage)
    setNewMessage("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSendMessage()
  }

  return (
    <div className="w-full flex items-center gap-2 p-4 border-t border-base-300 bg-base-200">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="input input-bordered flex-1 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        className="btn btn-primary"
        onClick={handleSendMessage}
        disabled={!newMessage.trim()}
      >
        Send
      </button>
    </div>
  )
}

ChatInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
}

export default ChatInput