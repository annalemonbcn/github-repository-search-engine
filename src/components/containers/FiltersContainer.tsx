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


const FiltersContainer = () => {

  const reposContext = useContext(ReposContext)

  return (
    <div className="flex flex-col md:flex-row items-center justify-between filtersContainer">
      <div className="flex items-center gap-2 w-1/2">
        <div onClick={reposContext?.toggleSortByName}>
          <ButtonGray text="Name" icon={<ArrowsIcon />} />
        </div>
        <input
          type="text"
          className="border border-slate-300 rounded-md px-[12px] py-[3px]"
          placeholder="Or filter by name"
          onChange={(e) => reposContext?.setFilterByName(e.target.value)}
        />
      </div>
      <div className="w-1/2 text-right">
        <Dropwdown />
      </div>
    </div>
  );
};

export default FiltersContainer;
