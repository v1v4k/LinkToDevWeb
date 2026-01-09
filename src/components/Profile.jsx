
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";


const Profile = () => {

  const user = useSelector(store=>store.user)
  if(!user) return;
  return (
    <div className=" w-full h-full">< EditProfile user = {user}/></div>
  )
}

export default Profile
