"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export interface SearchCriteria {
  keyword: string;
  propertyType: string;
}

interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
  isLoading: boolean;
  propertyTypes: string[];
}

export default function SearchForm({ onSearch, isLoading, propertyTypes }: SearchFormProps) {
  const [keyword, setKeyword] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ keyword, propertyType });
  };

  return (
    <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg mb-16">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* Keyword Search */}
        <div className="md:col-span-1">
          <label htmlFor="keyword" className="block text-sm font-medium text-gray-400 mb-2">
            คำค้นหา (ชื่อโครงการ, ทำเล)
          </label>
          <input
            type="text"
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="เช่น อมตะนคร, บางแสน"
            className="w-full bg-[#121212] border border-gray-600 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#cda946]"
          />
        </div>

        {/* Property Type Select */}
        <div className="md:col-span-1">
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-400 mb-2">
            ประเภทอสังหาฯ
          </label>
          <select
            id="propertyType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full bg-[#121212] border border-gray-600 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#cda946]"
          >
            <option value="">ทั้งหมด</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="md:col-span-1">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#cda946] text-black font-bold py-3 rounded-md flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer"
          >
            <FaSearch />
            {isLoading ? "กำลังค้นหา..." : "ค้นหา"}
          </button>
        </div>
      </form>
    </div>
  );
}