import React from "react";

// Button
import ButtonGray from "../utils/buttons/ButtonGray";
import Dropwdown from "../utils/Dropwdown";
import ArrowDownIcon from "../utils/svg/ArrowDownIcon";

import { Tooltip } from "@nextui-org/tooltip";

const ArrowsIcon = () => {
  // TODO: check
  return (
    <Tooltip
      showArrow={true}
      placement="top"
      content="Order from A-Z"
      classNames={{
        base: [
          "bg-white border border-black",
          "before:bg-slate-400"
        ]
      }}
    >
      <div className="flex flex-col">
        <div className="rotate-180 -mb-2.5">
          <ArrowDownIcon />
        </div>
        <div>
          <ArrowDownIcon />
        </div>
      </div>
    </Tooltip>
  );
};

interface FiltersContainerProps {
  languagesList: string[];
  toggleSortByName: () => void;
  setFilterByName: React.Dispatch<React.SetStateAction<string | null>>;
  filterByLanguage: string | undefined;
  setFilterByLanguage: React.Dispatch<React.SetStateAction<string | null>>;
}

const FiltersContainer = (props: FiltersContainerProps) => {
  const {
    languagesList,
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
          <ButtonGray text="Name" icon={<ArrowsIcon />} />
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
