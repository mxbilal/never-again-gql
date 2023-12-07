import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SearchProps } from "@/types";
import mpTracker from '../../lib/mixpanel';

const Search: React.FC<SearchProps> = ({  pageName, isBrandSearch, onSearch }) => {
  const placeholder = isBrandSearch ? "Search brands" : "Search people";
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      const queryClean = inputValue.trim().toLowerCase();
      mpTracker.track('Search ' + pageName + ' - Value - ' + inputValue);
      onSearch(queryClean);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="h-[3.75rem] w-full flex items-center">
      <div className="h-full w-[5.799rem] border border-neverOutline bg-neverSearch rounded-l-lg flex justify-center items-center">
        <span className="rounded-s-lg text-xl px-4">Search</span>
      </div>
      <Input
        className="h-full bg-white rounded-none text-2xl p-4 -ml-[1px]"
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleEnterPress}
      />
      <div
        className={`h-full w-[60px] border border-neverBlack rounded-r-lg bg-neverGray flex justify-center items-center group hover:bg-neverSearchHover hover:text-white cursor-pointer ${
          !inputValue.trim() && "pointer-events-none opacity-50"
        }`}
        onClick={handleSearch}
      >
        <i className="fas fa-search fa-lg text-gray-500 group-hover:text-white"></i>
      </div>
    </div>
  );
};

export default Search;