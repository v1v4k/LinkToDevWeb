import { useState } from "react"
import PropTypes from "prop-types"
import PreviewPanel from "./PreviewPanel"
import ProfileForm from "./ProfileForm"

const EditProfile = ({ user }) => {
  const [watchedValues, setWatchedValues] = useState(user)

  return (
    <div className="h-full flex overflow-hidden">
      <div className="w-1/2 flex flex-col justify-center items-center shrink-0 bg-base-200 ">
        <PreviewPanel values={watchedValues} />
      </div>

      <ProfileForm user={user} onValuesChange={setWatchedValues} />
    </div>
  )
}

EditProfile.propTypes = {
  user: PropTypes.object.isRequired
}

export default EditProfile