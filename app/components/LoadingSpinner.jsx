const LoadingSpinner = ({ size = "h-5 w-5" }) => (
  <svg
    className={`animate-spin ${size}`}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      className="opacity-25"
    />
    <path
      d="M4 12a8 8 0 018-8"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      className="opacity-75"
    />
  </svg>
);

export default LoadingSpinner;
