import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SearchProps } from "@/types";

const Search: React.FC<SearchProps> = ({ isBrandSearch, onSearch }) => {
  const placeholder = isBrandSearch ? "Search brands" : "Search people";
  const [inputValue, setInputValue] = useState("");
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
        onChange={(e) => {
          setInputValue(e.target.value)
          onSearch(e.target.value)
        }}
      />
      <div className="h-full w-[60px] border border-neverBlack rounded-r-lg bg-neverGray flex justify-center items-center group hover:bg-neverSearchHover hover:text-white">
        <i className="fas fa-search fa-lg text-gray-500 group-hover:text-white"></i>
      </div>
    </div>
  );
};

export default Search;
