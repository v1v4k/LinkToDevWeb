import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearResults } from "../redux/searchSlice";
import { searchUsers } from "../redux/searchThunk";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { results } = useSelector((state) => state.search);

  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput.trim().length === 0) {
        dispatch(clearResults());
        return;
      }
      dispatch(searchUsers(searchInput));
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput, dispatch]);

  const handleResultClick = () => {
    setShowSuggestions(false);
    setSearchInput("");
    dispatch(clearResults());
  };

  return (
    <div>
      <div className="relative w-64">
        <input
          type="text"
          placeholder="Search user"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="input input-bordered w-full pl-10 rounded-full"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-3 top-3 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 
      0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      {showSuggestions && results.length > 0 && (
        <div className="absolute mt-2 w-64 bg-base-100 shadow-lg rounded-lg z-50 max-h-64 overflow-y-auto">
          {results.map((user) => (
            <Link
              to={"/"}
              key={user._id}
              onClick={handleResultClick}
              className="p-3 hover:bg-base-200 cursor-pointer flex items-center gap-3 transition-colors text-base-content"
            >
              <img
                src={user.photoUrl}
                className="w-8 h-8 rounded-full object-cover"
                alt={user.firstName}
              />
              <div className="font-medium">
                {user.firstName} {user.lastName}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
