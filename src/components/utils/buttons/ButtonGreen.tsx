/**
 * prop for the ButtonGreen comp
 */
interface ButtonGreenProps {
  text: string;
  icon?: React.ReactElement;
}

const ButtonGreen = ({ text, icon }: ButtonGreenProps) => {
  return (
    <div className="flex items-center justify-center">
      <button className="flex items-center gap-1 bg-custom-green hover:bg-custom-darkGreen  text-white font-medium border border-custom-darkGreen px-[8px] py-[2px] rounded-md">
        {icon}
        {text}
      </button>
    </div>
  );
};

export default ButtonGreen;
