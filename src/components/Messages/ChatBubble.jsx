import PropTypes from "prop-types"
import { useSelector } from "react-redux"

const formatTime = (dateString) => {
  if (!dateString) return ""
  return new Date(dateString).toLocaleTimeString([], { 
    hour: "2-digit", 
    minute: "2-digit" 
  })
}

const ChatBubble = ({ message }) => {
  const currentUserName = useSelector((store) => store.user?.firstName)
  const isMe = message?.firstName === currentUserName

  return (
    <div className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
      <div className={`chat-bubble text-sm ${
        isMe 
          ? "chat-bubble-primary" 
          : "bg-base-300 text-base-content"
      }`}>
        {message.text}
      </div>
      <div className="chat-footer text-[10px] text-base-content/40 mt-1">
        {formatTime(message?.textedAt)}
      </div>
    </div>
  )
}

ChatBubble.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    textedAt: PropTypes.string,
  }).isRequired,
}

export default ChatBubble