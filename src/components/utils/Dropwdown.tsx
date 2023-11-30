import React, { useState } from "react";

// Utils
import ButtonGray from "./buttons/ButtonGray";
import ArrowDownIcon from "./svg/ArrowDownIcon";

interface DropdownProps {
  languagesList: string[];
  filterByLanguage: string | undefined;
  setFilterByLanguage: React.Dispatch<React.SetStateAction<string | null>>;
}

const Dropwdown = ({
  languagesList,
  filterByLanguage,
  setFilterByLanguage,
}: DropdownProps) => {

  const [isDropdownOpen, setIsDropwdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropwdownOpen((isOpen) => !isOpen);
  };

  const handleOptionClick = (language: string) => {
    // Set option into state
    setFilterByLanguage(language);

    // Close dropdown
    setIsDropwdownOpen(false);
  };

  const textProp = () => (filterByLanguage !== null ? filterByLanguage : "All");  

  return (
    <div className="w-full md:w-auto mt-4 md:mt-0 relative inline-block text-left">
      <div onClick={toggleDropdown}>
        <ButtonGray text={`Language: ${textProp()}`} icon={<ArrowDownIcon />} />
      </div>

      {isDropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {languagesList?.map((language) => (
              <button
                key={language}
                onClick={() => handleOptionClick(language)}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-custom-lightGray hover:text-gray-900"
                role="menuitem"
              >
                {language}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropwdown;
