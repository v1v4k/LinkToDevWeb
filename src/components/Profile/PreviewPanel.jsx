import PropTypes from "prop-types";
import FeedCard from "../FeedCard";

const PreviewPanel = ({ values }) => {
  return (
    <div className="w-2/3">
      <h1 className="text-center text-2xl font-bold opacity-50 mb-2">
        Live Preview
      </h1>
      <FeedCard user={values} />
    </div>
  );
};

PreviewPanel.propTypes = {
  values: PropTypes.object.isRequired,
};
export default PreviewPanel;
