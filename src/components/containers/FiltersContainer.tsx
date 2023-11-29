import React from "react";

// Button
import ButtonGray from "../../utils/buttons/ButtonGray";
import Dropwdown from "../../utils/Dropwdown";

interface FiltersContainerProps {
  languagesList: string[];
  sortByName: boolean;
  toggleSortByName: () => void;
  setFilterByName: React.Dispatch<React.SetStateAction<string | null>>;
  filterByLanguage: string | undefined;
  setFilterByLanguage: React.Dispatch<React.SetStateAction<string | null>>;
}

const FiltersContainer = (props: FiltersContainerProps) => {
  const {
    languagesList,
    sortByName,
    toggleSortByName,
    setFilterByName,
    filterByLanguage,
    setFilterByLanguage,
  } = props;

  const DropdownProps = {
    languagesList,
    filterByLanguage,
    setFilterByLanguage,
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between filtersContainer">
      <div className="flex items-center gap-2 w-1/2">
        <div onClick={toggleSortByName}>
          <ButtonGray
            text={sortByName ? "No order by name" : "Order by name"}
          />
        </div>
        <input
          type="text"
          className="border border-slate-300 rounded-md px-[12px] py-[3px]"
          placeholder="Or filter by name"
          onChange={(e) => setFilterByName(e.target.value)}
        />
      </div>
      <div className="w-1/2 text-right">
        <Dropwdown {...DropdownProps} />
      </div>
    </div>
  );
};

export default FiltersContainer;
