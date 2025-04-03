import { FC, useState } from 'react';
import StockInput from './StockInput/StockInput';
import Chart from './ChartComponent/Chart.tsx';


const App: FC = () => {
  type StockSubmitHandler = (symbol: string) => void;
   // @ts-ignore: Unreachable code error
  const handleStockSubmit: StockSubmitHandler = (symbol : string) => {
  };
  const [stockHistoryToMap, setStockHistoryToMap] = useState<any[]>([]);

  const handleStockHistoryUpdate = (newStockHistory: any[]) => {
    setStockHistoryToMap(newStockHistory);
  };

  return (
    <div style={{   
      backgroundColor: '#131722',
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <StockInput onStockHistoryUpdate={handleStockHistoryUpdate} onSubmit={handleStockSubmit} />
      { stockHistoryToMap.length !== 0 && <Chart dataResponse = {stockHistoryToMap} />} 
    </div>
  );
};

export default App;