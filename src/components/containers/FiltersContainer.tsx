import { useContext } from "react";

// Button
import ButtonGray from "../utils/buttons/ButtonGray";
import Dropwdown from "../utils/Dropwdown";
import ArrowDownIcon from "../utils/svg/ArrowDownIcon";

// Tooltip
import { Tooltip } from "@nextui-org/tooltip";

// Context
import { ReposContext } from "../../api/context/ReposProvider";

const ArrowsIcon = () => {
  return (
    <Tooltip
      showArrow={true}
      placement="top"
      content="Order from A-Z"
      classNames={{
        base: [
          "bg-white border border-slate-200 rounded-md",
          "before:bg-white before:border-slate-200",
        ],
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

const FiltersContainer = () => {
  const { setSortByName, setFilterByName } = useContext(ReposContext)!;

  const handleToggleSortByName = () => {
    setSortByName((prevSort) => !prevSort);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between filtersContainer">
      <div className="flex items-center gap-2 w-1/2">
        <div onClick={handleToggleSortByName}>
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
        <Dropwdown />
      </div>
    </div>
  );
};

export default FiltersContainer;
