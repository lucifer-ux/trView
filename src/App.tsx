import { FC } from 'react';
import StockInput from './StockInput/StockInput';
import Chart from './ChartComponent/Chart.tsx';

const App: FC = () => {
  type StockSubmitHandler = (symbol: string) => void;
  const handleStockSubmit: StockSubmitHandler = (symbol : String) => {
    console.log('Searching for:', symbol);
  };

  return (
    <div style={{
      backgroundColor: '#131722',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <StockInput onSubmit={handleStockSubmit} />
      <Chart />
    </div>
  );
};

export default App;