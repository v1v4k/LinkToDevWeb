import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ChatBubble = ({ message }) => {
  //console.log("from bubble:", message);
  const user = useSelector((store) => store.user);

  const isMe = message?.firstName === user?.firstName;

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  console.log(message);

  return (
    <div className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
      <div
        className={`chat-bubble ${isMe ? "chat-bubble-primary" : "chat-bubble-secondary"}`}
      >
        {message.text}
      </div>
      <div className="chat-footer opacity-50">
        <time className="text-xs ">{formatTime(message?.textedAt)}</time>
      </div>
    </div>
  );
};

ChatBubble.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    senderId: PropTypes.string,
    textedAt: PropTypes.string,
  }).isRequired,
};

export default ChatBubble;
