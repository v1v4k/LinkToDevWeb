const ChatSidebar = ({ conversations, selectedUser, onSelectUser }) => {
  
  return (
    <div className="w-full flex flex-col h-full bg-base-200">
      {/* Header */}
      <div className="p-4 border-b border-base-300 font-bold text-lg text-primary">
        Connections ({conversations.length})
      </div>

      {/* Scrollable User List */}
      <div className="overflow-y-auto flex-1">
        
        {/* Empty State Check */}
        {conversations.length === 0 && (
          <div className="text-center p-4 text-gray-500 text-sm">
            No connections yet. 
            <br />
            Go make some friends!
          </div>
        )}

        {conversations.map((user) => (
          <div
            key={user._id}
            onClick={() => onSelectUser(user)} // Pass the whole user object up
            className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-base-300 transition-colors ${
              // Active State: Check if this user is the selected one
              selectedUser?._id === user._id 
                ? "bg-base-300 border-l-4 border-primary" 
                : ""
            }`}
          >
            {/* Avatar */}
            <div className={`avatar ${user.isOnline ? "online" : ""}`}> 
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img 
                  src={user.photoUrl || "https://george-fx.github.io/coder_portfolio/assets/images/user-3.jpg"} 
                  alt={user.firstName} 
                />
              </div>
            </div>

            {/* Name & Subtitle */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-700 truncate capitalize">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {/* We can show "Typing..." or last message here later */}
                Click to start chatting
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;