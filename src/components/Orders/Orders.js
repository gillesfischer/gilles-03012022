import React from 'react';
import OrderbookChart from '../Chart/OrderBookChart';
import OrderBookTable from '../Table/OrderBookTable';
import './Orders.css';

function Orders({
  data,
  reverse = false,
  maxDisplay = 100,
  priceColor,
  displayTableTopBorder = true,
}) {
  return (
    <div className='ordercontainer'>
      <div className='ordertable'>
        <OrderBookTable
          data={data}
          reverse={reverse}
          maxDisplay={maxDisplay}
          priceColor={priceColor}
          displayTableTopBorder={displayTableTopBorder}
        ></OrderBookTable>
      </div>

      <div className='orderchart'>
        {/* <OrderbookChart chartData={data}></OrderbookChart> */}
      </div>
    </div>
  );
}

export default Orders;
