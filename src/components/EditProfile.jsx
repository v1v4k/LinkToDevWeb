
import FeedCard from "./FeedCard";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addProfile } from "../redux/userSlice";
import PropTypes from "prop-types";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const updateProfile = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      if (res?.data?.data) {
        dispatch(addProfile(res?.data?.data));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      setError(error.response?.data || "Update failed");
    }
  };

  return (
    <div className="h-full flex overflow-hidden">
      <div className="w-1/2 flex  flex-col justify-center items-center shrink-0 pb-8 bg-base-100 ">
        <div className="w-2/3">
          <h1 className="text-center text-2xl font-bold opacity-50 mb-2">
            Live Preview
          </h1>
          <FeedCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>
      <div className="flex-1 h-full flex flex-col justify-center ">
        <div className="p-4  shrink-0">
          <div className="max-w-xl mx-auto w-full border-b border-base-300">
            <h1 className="text-2xl font-bold ">Edit Profile</h1>
            <p className=" opacity-60 my-1">Update your personal details</p>
          </div>
        </div>
        <div className=" overflow-y-auto p-4">
          <div className="max-w-xl mx-auto w-full">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex gap-4 mb-4">
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex gap-4 mb-4">
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Age</span>
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Gender</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">About</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32 w-full resize-none"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex items-center justify-end gap-2">
                <button
                  className="btn btn-primary w-full"
                  onClick={updateProfile}
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>Profile Updated Successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

EditProfile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gender: PropTypes.string,
    about: PropTypes.string,
    photoUrl: PropTypes.string,
  }),
};

export default EditProfile;
