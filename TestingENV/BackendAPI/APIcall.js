import axios from "axios";

const serverUrl = "barchartserver.onrender.com";

const fetchStockNames = async (name) => {
    try{
        const url = `https://${serverUrl}/api/stocks/search/trading_symbol?searchStock=${name}`
  const response = await axios.get(
    `https://${serverUrl}/api/stocks/search/name_symbol?searchStock=${name}`,
    { key: "value" }, 
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data[0].instrument_key;
}
catch(e) 
{
    console.error(e);
}
};

const fetchStockHistory = async (tradingSymbol) => {
    const instrumentKey = await fetchStockNames (tradingSymbol);
    if(instrumentKey) {
  const response = await axios.get(
    `https://api.upstox.com/v2/historical-candle/${instrumentKey}/1minute/2025-01-01`
  );
  console.log(response.data, "ressponseeee");
  return response;
}
else return ""
};

export {fetchStockNames, fetchStockHistory}