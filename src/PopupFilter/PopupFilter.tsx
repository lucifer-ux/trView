import React from "react";
import "./PopupFilter.css";
import Loader from "../assets/Loader.tsx"

interface PopupFilterProps {
  results: any[];
  onItemClick: (selectedItem: any) => void;
}

const PopupFilter: React.FC<PopupFilterProps> = ({onItemClick, results }) => {

  return (
    <div className="popup-filter">
      {/* Search Results */}
      <div className="results">
        {results.length > 0 ? (
          <ul className="popup-list">
            {results.slice(0, 7).map((result, index) => (
              <li key={index} className="popup-item" onClick={() => onItemClick(result)}>
                <span className="stock-name">{result.name}</span>
                <span className="stock-symbol">{result.trading_symbol}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Loader/>
        )}
      </div>
    </div>
  );
};

export default PopupFilter;