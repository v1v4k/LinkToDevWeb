import PropTypes from "prop-types";
import ProfileCard from "../shared/ProfileCard";

const PreviewPanel = ({ values }) => (
  <div className="flex flex-col items-center gap-3 w-full px-4">
    <p className="text-sm font-bold text-base-content/40 uppercase tracking-widest">
      Live Preview
    </p>
    <div className=" w-[300px] md:w-[50%] md:max-w-[420px]  rounded-2xl overflow-hidden shadow-2xl ">
      <ProfileCard user={values} />
    </div>
  </div>
);
PreviewPanel.propTypes = {
  values: PropTypes.object.isRequired,
};
export default PreviewPanel;
