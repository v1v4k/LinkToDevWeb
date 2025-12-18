import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearResults } from "../redux/searchSlice";
import { searchUsers } from "../redux/searchThunk";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const { results } = useSelector((state) => state.search);
  //console.log(results)
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
  return (
    <div>
      <div className="relative w-64">
        <input
          type="text"
          placeholder="Search user"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="input input-bordered w-full pl-10 rounded-full"
        />

        {/* Search Icon */}
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
      {results.length > 0 && (
        <div className="absolute mt-2 w-64 bg-base-100 shadow-lg rounded-lg z-50 max-h-64 overflow-y-auto">
          {results.map((user) => (
            <div
              key={user._id}
              className="p-2 hover:bg-base-200 cursor-pointer flex items-center gap-3 "
            >
              <img
                src={user.photoUrl}
                className="w-8 h-8 rounded-full"
                alt=""
              />
              <div>
                {user.firstName} {user.lastName}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
