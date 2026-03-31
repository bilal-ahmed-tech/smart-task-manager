import PropTypes from "prop-types";
const Button = ({
  children,
  variant = "primary",
  onClick,
  disabled,
  type = "button",
}) => {
  const baseClass = "sm:px-4 py-2 px-2 rounded-lg cursor-pointer font-medium transition";
  const variantClass = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    link: "text-blue-600 hover:underline mt-4"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      {children}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "link"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Button;
