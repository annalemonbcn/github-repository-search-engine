/**
 * prop for the ArrowDown comp
 */
interface ArrowDownProps {
  color?: string
}

const ArrowDownIcon = ({ color }: ArrowDownProps) => {
  return (
    <svg
      aria-hidden="true"
      height="16"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      data-view-component="true"
      className={`${color}`}
    >
      <path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"></path>
    </svg>
  );
};

export default ArrowDownIcon;
