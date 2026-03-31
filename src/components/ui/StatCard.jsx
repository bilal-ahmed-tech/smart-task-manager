import PropTypes from "prop-types";
const colorConfig = {
  blue:   { text: "text-blue-600",   border: "border-blue-500"   },
  green:  { text: "text-green-600",  border: "border-green-500"  },
  yellow: { text: "text-yellow-500", border: "border-yellow-500" },
  purple: { text: "text-purple-600", border: "border-purple-500" },
  red:    { text: "text-red-600",    border: "border-red-500"    },
}
const StatCard = ({ title, value, color }) => {
const colorClass = colorConfig[color] || colorConfig.blue; // default to blue if color not found
  return (
    <div className={`bg-white rounded-xl shadow p-6 border-l-4 ${colorClass.border}`}>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className={`text-3xl font-bold mt-2 ${colorClass.text}`}>{value}</p>
    </div>
  );
};
StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  // Ensure only these specific colors are allowed
  color: PropTypes.oneOf(['blue', 'green', 'yellow', 'purple', 'red']).isRequired
};
export default StatCard;
