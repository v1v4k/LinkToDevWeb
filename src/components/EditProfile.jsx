/* eslint-disable react/prop-types */
import FeedCard from "./FeedCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addProfile } from "../redux/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  //const [skills, setSkills] = useState(user.skills);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const updateProfile = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, gender, about, photoUrl },
        {
          withCredentials: true,
        }
      );
      dispatch(addProfile(res?.data?.data));
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      //console.error("Error occurred while updating profile:", error);
      setError(error.response.data);
    }
  };

  useEffect(() => {
    updateProfile();
  }, []);

  return (
    <div className="pb-12">
      <div className="flex flex-col items-center justify-center md:flex-row">
        <div className="bg-primary w-80 h-auto m-4 rounded-xl">
          <FeedCard
            user={{ firstName, lastName, age, gender, about, photoUrl }}
          />
        </div>
        <div className="card bg-base-300 w-96  shadow-xl m-2">
          <form className="card-body" onSubmit={(e) => e.preventDefault()}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder={firstName}
                className="input input-bordered"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder={lastName}
                className="input input-bordered"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="text"
                placeholder={age}
                className="input input-bordered"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <input
                type="text"
                placeholder={gender}
                className="input input-bordered"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">About</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-80"
                placeholder={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="text"
                placeholder={photoUrl}
                className="input input-bordered"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
            <p className="text-red-500">{error}</p>

            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={()=>{
                updateProfile();
                setShowToast(true)}
              }>
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
