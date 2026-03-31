import PropTypes from "prop-types";
export default function EmptyState({ message, subMessage }) {
  return (
    <div className="text-center py-12">
      <p className="text-4xl mb-3">📋</p>
      <p className="text-gray-500 font-medium">{message}</p>
      {subMessage && <p className="text-gray-400 text-sm mt-1">{subMessage}</p>}
    </div>
  );
}
EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
  subMessage: PropTypes.string,
};
