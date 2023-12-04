/**
 * prop for the SearchIcon comp
 */
interface SearchIconProps {
  height: string;
  width: string;
  color?: string;
  isActive?: string
}

const SearchIcon = ({ height, width, color, isActive }: SearchIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${isActive ? isActive : color} ${height} ${width}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 18a7 7 0 100-14 7 7 0 000 14z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 20l-4-4"
      />
    </svg>
  );
};

export default SearchIcon;
