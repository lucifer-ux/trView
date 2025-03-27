import React from "react";
import "./PopupFilter.css";

interface PopupFilterProps {
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
}

const PopupFilter = ({ selectedFilter, onSelectFilter }: PopupFilterProps) => {
  const filters = ["All", "Trading Symbol", "Industry", "Stock Exchange"];

  return (
    <div className="popup-filter">
      <p className="popup-p">Select a filter:</p>
      <div className="filter-buttons">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onSelectFilter(filter)}
            className={`filter-button ${selectedFilter === filter ? "selected" : ""}`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopupFilter;
