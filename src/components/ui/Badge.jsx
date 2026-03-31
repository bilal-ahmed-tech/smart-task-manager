import PropTypes from "prop-types";
const badgeConfig = {
  pending: { label: "Pending", style: "bg-yellow-100 text-yellow-700" },
  completed: { label: "Completed", style: "bg-green-100 text-green-700" },
  "in-progress": { label: "In Progress", style: "bg-blue-100 text-blue-700" },
  high: { label: "High", style: "bg-red-100 text-red-700" },
  medium: { label: "Medium", style: "bg-yellow-100 text-yellow-700" },
  low: { label: "Low", style: "bg-gray-100 text-gray-600" },
};
const Badge = ({ type }) => {
  const config = badgeConfig[type] || badgeConfig["low"];
  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded-full ${config.style}`}>
      {config.label}
    </span>
  );
};
Badge.propTypes = {
  type: PropTypes.oneOf([
    "pending",
    "completed",
    "in-progress",
    "high",
    "medium",
    "low",
  ]).isRequired,
};
export default Badge