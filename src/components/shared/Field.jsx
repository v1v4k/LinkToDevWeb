import PropTypes from "prop-types";
import { labelCls, errorCls } from "../../utils/formStyles";

const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-1">
    <label className={labelCls}>{label}</label>
    {children}
    {error && <span className={errorCls}>{error}</span>}
  </div>
);

Field.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Field;
