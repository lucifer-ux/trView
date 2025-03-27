import React, { useState } from 'react';
import './HoverCard.css';

interface PriceData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface HoverCardProps {
  data: PriceData;
}

const HoverCard: React.FC<HoverCardProps> = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div 
      className="hover-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="candlestick-bar">
        <div className="price-point" />
      </div>
      
      <div className={`tooltip-card ${isHovered ? 'visible' : ''}`}>
        <div className="tooltip-header">
          <span className="date">{formatDate(data.timestamp)}</span>
        </div>
        
        <div className="tooltip-content">
          <div className="price-row">
            <span className="label">O</span>
            <span className="value">{formatNumber(data.open)}</span>
          </div>
          <div className="price-row">
            <span className="label">H</span>
            <span className="value">{formatNumber(data.high)}</span>
          </div>
          <div className="price-row">
            <span className="label">L</span>
            <span className="value">{formatNumber(data.low)}</span>
          </div>
          <div className="price-row">
            <span className="label">C</span>
            <span className="value">{formatNumber(data.close)}</span>
          </div>
          <div className="volume-row">
            <span className="label">Vol</span>
            <span className="value">{data.volume.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverCard;