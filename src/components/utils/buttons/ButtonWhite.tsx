/**
 * prop for the ButtonWhite comp
 */
interface ButtonWhiteProps {
  text: string;
  icon?: React.ReactElement;
}

const ButtonWhite = ({ text, icon }: ButtonWhiteProps) => {
  return (
    <div className="flex items-center justify-center">
      <button className="flex items-center gap-1 bg-white hover:bg-custom-lightGray text-custom-black font-semibold px-[8px] py-[6px] rounded-md">
        {icon}
        {text}
      </button>
    </div>
  )
}

export default ButtonWhite
