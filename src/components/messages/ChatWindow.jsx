import { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import ChatBubble from "./ChatBubble"
import ChatInput from "./ChatInput"

const ChatWindow = ({ selectedUser, messages, onSendMessage }) => {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!selectedUser) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 bg-base-100">
        <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center">
          <svg className="w-8 h-8 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-base-content/50">Select a conversation</p>
        <p className="text-xs text-base-content/30">Choose someone to start chatting</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-base-100">
      <div className="bg-base-200 px-4 py-3 border-b border-base-300 flex gap-3 items-center shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-base-300">
          <img src={selectedUser.photoUrl} alt={selectedUser.firstName} className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="font-bold text-sm capitalize text-base-content">
            {selectedUser.firstName} {selectedUser.lastName}
          </h2>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">
        {messages?.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={onSendMessage} />

    </div>
  )
}

ChatWindow.propTypes = {
  selectedUser: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    photoUrl: PropTypes.string,
  }),
  messages: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    firstName: PropTypes.string,
  })),
  onSendMessage: PropTypes.func.isRequired,
}

export default ChatWindow