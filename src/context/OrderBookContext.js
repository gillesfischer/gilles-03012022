import React, { createContext, useState, useEffect } from 'react';

const OrderbookContext = React.createContext();

function OrderBookProvider({ children }) {
  const [market, setMarket] = useState('PI_XBTUSD');

  const toggleMarket = () => {
    let newMarket = market === 'PI_ETHUSD' ? 'PI_XBTUSD' : 'PI_ETHUSD';
    setMarket(newMarket);
  };
  return (
    <OrderbookContext.Provider value={{ toggleMarket, market }}>
      {children}
    </OrderbookContext.Provider>
  );
}
const OrderBookConsumer = OrderbookContext.Consumer;

export default OrderbookContext;
export { OrderBookProvider, OrderBookConsumer };
