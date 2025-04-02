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
  return response.data;
}
catch(e) 
{
    console.error(e);
}
};

const getDates = ()  => {
  const today = new Date();
  const fourMonthsAgo = new Date();
  fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
  const formatDate = (date) =>
    `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;

  return {
    today: formatDate(today),
    fourMonthsAgo: formatDate(fourMonthsAgo),
  };
};

const fetchStockHistory = async (instrumentKey) => {
    if(instrumentKey) {
    const {today, fourMonthsAgo} = getDates();
    console.log(today, fourMonthsAgo,"dateeevaalluee")
  const response = await axios.get(
    `https://api.upstox.com/v2/historical-candle/${instrumentKey}/1minute/2025-03-31/2025-02-01`
  );
  return response;
}
else return []
};

export {fetchStockNames, fetchStockHistory}