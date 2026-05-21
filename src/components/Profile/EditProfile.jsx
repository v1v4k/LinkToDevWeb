import { useState } from "react";
import PropTypes from "prop-types";
import PreviewPanel from "./PreviewPanel";
import ProfileForm from "./ProfileForm";

const EditProfile = ({ user }) => {
  const [watchedValues, setWatchedValues] = useState(user);

  return (
    <div className="h-full flex flex-col md:flex-row overflow-auto md:overflow-hidden">
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center shrink-0 bg-base-100 py-4">
        <PreviewPanel values={watchedValues} />
      </div>

      <ProfileForm user={user} onValuesChange={setWatchedValues} />
    </div>
  );
};

EditProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default EditProfile;
