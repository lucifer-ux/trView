import { useState, useEffect, useRef } from "react";
import "./StockInput.css";
import { fetchStockHistory, fetchStockNames } from "../../TestingENV/BackendAPI/APIcall.js";
import PopupFilter from "../PopupFilter/PopupFilter.js";

interface StockInputProps {
  onSubmit: (symbol: string, filter: string) => void;
  onStockHistoryUpdate: (stockHistory: any[]) => void;
}

const StockInput = ({onStockHistoryUpdate, onSubmit }: StockInputProps) => {
  const [symbol, setSymbol] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [results, setResults] = useState<any[]>([]);
  const popupRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setIsPopupOpen(true);
        inputRef.current?.focus();
      }
      else if(event.key === "Escape") {
        event.preventDefault();
        setIsPopupOpen(false);
        inputRef.current?.blur();
      }
      else  if (results.length === 0) return;
    
        else if (event.key === "ArrowDown") {
          event.preventDefault();
          setActiveIndex((prevIndex) => (prevIndex + 1) % results.length);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          setActiveIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : results.length - 1
          );
        } else if (event.key === "Enter" && activeIndex !== -1) {
          event.preventDefault();
          handleItemClick(results[activeIndex]); // Call the click handler
        }
    };

    const handleClickOutside = (event: any) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsPopupOpen(false); // Close only if clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    if (!symbol.trim()) {
      setResults([]);
      return;
    }
    
    debounceTimeout.current = setTimeout(async () => {
      try {
        const response = await fetchStockNames(symbol);
        if (Array.isArray(response)) {
          setResults(response);
        } else {
          console.error("Unexpected response format:", response);
          setResults([]);
        }
      } catch (error) {
        console.error("Error fetching stock history:", error);
        setResults([]);
      }
    }, 500);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [symbol]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol.trim()) {
      onSubmit(symbol.toUpperCase(), selectedFilter);
      setSymbol("");
    }
  };

  const handleItemClick = async (selectedItem: any) => {
    const stockHistoryToMap = await fetchStockHistory(selectedItem?.instrument_key);
    onStockHistoryUpdate(stockHistoryToMap);
  };

  return (
    <div className="stock-input-container" ref={popupRef}>
      <form onSubmit={handleSubmit} className="stock-input-form">
        <div className="input-wrapper">
          <input
            type="text"
            ref = {inputRef}
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            onFocus={() => setIsPopupOpen(true)}
            placeholder="Type Ctrl + k to search.."
            className="stock-input"
            // onBlur={() => setTimeout(() => setIsPopupOpen(false), 150)}
          />
          <div className="input-border"></div>
        </div>
      </form>

      {isPopupOpen && <PopupFilter onItemClick = {handleItemClick} results = {results} selectedFilter={selectedFilter} onSelectFilter={setSelectedFilter} />}     
    </div>
  );
};

export default StockInput;