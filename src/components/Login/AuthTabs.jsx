const AuthTabs = ({ activeTab, onChange }) => {
  return (
    <div className="grid grid-cols-2 bg-base-100 border border-base-300 rounded-xl p-[3px] mb-6">
      <button
        className={`py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 border-0 cursor-pointer
          ${
            activeTab === "signin"
              ? "bg-base-200 text-primary shadow-sm"
              : "bg-transparent text-base-content/40 hover:text-base-content/60"
          }`}
        onClick={() => onChange("signin")}
      >
        Sign In
      </button>
      <button
        className={`py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 border-0 cursor-pointer
          ${
            activeTab === "signup"
              ? "bg-base-200 text-primary shadow-sm"
              : "bg-transparent text-base-content/40 hover:text-base-content/60"
          }`}
        onClick={() => onChange("signup")}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthTabs;
