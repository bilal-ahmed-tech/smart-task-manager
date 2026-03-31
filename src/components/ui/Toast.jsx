import PropTypes from "prop-types";
const Toast = ({ message, onUndo, onClose }) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-4">
        
        {/* Message */}
        <span className="text-sm font-medium">{message}</span>

        {/* Undo button — only shows if undoAction exists */}
        {onUndo && (
          <button
            onClick={onUndo}
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition"
          >
            Undo
          </button>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition text-sm"
        >
          ✕
        </button>

      </div>
    </div>
  )
}
Toast.propTypes = {
  message: PropTypes.string.isRequired,
  onUndo: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};
export default Toast