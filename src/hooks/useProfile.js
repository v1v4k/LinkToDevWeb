import { useDispatch } from "react-redux";
import { updateProfile } from "../services/profileApi";
import { addProfile } from "../redux/userSlice";
import { useState } from "react";

const useProfile = () => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const handleUpdateProfile = async (formData) => {
    const result = await updateProfile(formData);
    dispatch(addProfile(result.data));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return { handleUpdateProfile, showToast };
};

export default useProfile;
