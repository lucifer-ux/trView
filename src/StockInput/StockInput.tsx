import { useState, useEffect, useRef } from "react";
import "./StockInput.css";
import { fetchStockHistory } from "../../TestingENV/BackendAPI/APIcall.js";
import PopupFilter from "../PopupFilter/PopupFilter.js";

interface StockInputProps {
  onSubmit: (symbol: string, filter: string) => void;
}

const StockInput = ({ onSubmit }: StockInputProps) => {
  const [symbol, setSymbol] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const popupRef = useRef<HTMLDivElement>(null); // Ref for detecting clicks outside

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsPopupOpen(false); // Close popup if click is outside
      }
    };

    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchResult = await fetchStockHistory(symbol);
    console.log(searchResult, "valueee");

    if (symbol.trim()) {
      onSubmit(symbol.toUpperCase(), selectedFilter);
      setSymbol("");
      setIsPopupOpen(false); // Close popup on submit
    }
  };

  return (
    <div className="stock-input-container" ref={popupRef}>
      <form onSubmit={handleSubmit} className="stock-input-form">
        <div className="input-wrapper">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            onFocus={() => setIsPopupOpen(true)} // Open popup on focus
            placeholder="Enter stock symbol..."
            className="stock-input"
          />
          <div className="input-border"></div>
        </div>
        <button type="submit" className="submit-button" disabled={!symbol.trim()}>
          <span className="button-content">Search</span>
          <span className="button-icon">→</span>
        </button>
      </form>

      {/* Popup Filter (Only show when open) */}
      {isPopupOpen && <PopupFilter selectedFilter={selectedFilter} onSelectFilter={setSelectedFilter} />}
    </div>
  );
};

export default StockInput;
