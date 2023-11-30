// Hooks
import React, { useState, useRef, useContext } from 'react'

// Utils
import ButtonGreen from './buttons/ButtonGreen';
import ButtonWhite from './buttons/ButtonWhite';
import SearchIcon from './svg/SearchIcon';
import CloseIcon from './svg/CloseIcon';

// Context
import { SearchContext } from '../../api/context/SearchProvider';

const Searchbar = () => {
  // State
  const [isActive, setIsActive] = useState<boolean>(false);
  // Ref
  const inputRef = useRef<HTMLInputElement>(null);

  // Context
  const searchContext = useContext(SearchContext);
  if (!searchContext) return null; 
  const { setQuery } = searchContext;
  

  /**
   * Set new query into SearchContext.query
   */
  const submitQuery = () => {
    // Get input value
    const newQuery = inputRef.current?.value;
    // Set query 
    setQuery(newQuery || "");
  }


  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") submitQuery();
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value === "") handleReset();
  };

  const handleReset = () => {
    if (inputRef.current) inputRef.current.value = ""
  };


  return (
    <div className="w-5/6 mx-auto flex items-center relative searchbar">
      <div className="absolute left-2">
        <SearchIcon
          height="h-4"
          width="w-4"
          isActive={isActive ? "text-custom-black" : "text-gray-400"}
        />
      </div>
      <input
        type="text"
        placeholder="Type / to search"
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        className={`w-full py-1 px-2 pl-8 border border-custom-darkGray rounded-md focus:outline-0 focus:border-2 focus:border-custom-black h-10 text-xs md:text-sm`}
        id="searchInput"
      />
      <div
        className="flex gap-2 absolute right-0 scale-75"
        onClick={submitQuery}
      >
        <ButtonGreen text={"Search"} />
        <div onClick={handleReset}>
          <div className="md:hidden">
            <CloseIcon
              color="text-gray-400"
              isActive={isActive ? "text-custom-black" : "text-gray-400"}
            />
          </div>
          <div className="hidden md:block">
            <ButtonWhite text={"Reset"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar
