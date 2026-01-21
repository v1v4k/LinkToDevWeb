import { useSelector } from "react-redux";

const ChatBubble = ({ message }) => {
  const user = useSelector((store) => store.user);

  const isMe = message.senderId?._id === user?._id;

  return (
    <div className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-header mb-1">
        {!isMe && (
          <span className="text-xs font-bold opacity-70 mr-2">
            {message.senderId?.firstName}
          </span>
        )}
        <time className="text-xs opacity-50">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      </div>
      <div
        className={`chat-bubble ${isMe ? "chat-bubble-primary" : "chat-bubble-secondary"}`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default ChatBubble;
