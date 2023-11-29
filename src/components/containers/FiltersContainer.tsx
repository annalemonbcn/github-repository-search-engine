import ButtonGray from "../../utils/buttons/ButtonGray";

interface FiltersContainerProps {
  toggleSortByName: () => void;
  sortByName: boolean;
  setFilterByName: React.Dispatch<React.SetStateAction<string | null>>;
}

const FiltersContainer = (props: FiltersContainerProps) => {
  const {
    toggleSortByName,
    sortByName,
    setFilterByName,
  } = props;

  return (
    <div className="flex flex-col md:flex-row items-center justify-end gap-2 filtersContainer">
      <div onClick={toggleSortByName}>
        <ButtonGray text={sortByName ? "No order by name" : "Order by name"} />
      </div>
      <input
        type="text"
        className="border border-slate-300 rounded-md px-[12px] py-[3px]"
        placeholder="Filter by name"
        onChange={(e) => setFilterByName(e.target.value)}
      />
    </div>
  );
};

export default FiltersContainer;
