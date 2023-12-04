/**
 * prop for the ButtonGray comp
 */
interface ButtonGrayProps {
  text: string;
  icon?: React.ReactElement;
}

const ButtonGray = ({ text, icon }: ButtonGrayProps) => {
  return (
    <div className="flex items-center justify-center">
      <button className="flex items-center gap-1 bg-custom-lightGray hover:bg-custom-darkGray text-custom-black border border-custom-black px-[12px] py-[3px] rounded-md">
        {text}
        {icon}
      </button>
    </div>
  );
};

export default ButtonGray;
