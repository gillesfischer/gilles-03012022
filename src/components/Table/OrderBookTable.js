import React, { useEffect, useState } from 'react';
import { numberWithCommas } from '../../helpers/helpersNumber';
import './OrderBookTable.css';

function OrderBookTable({
  data,
  reverse = false,
  maxDisplay = 100,
  priceColor,
  displayTableTopBorder = true,
}) {
  const [TableTopBorder, setTableTopBorder] = useState(
    '2px solid var(--grey-color)'
  );

  useEffect(() => {
    if (displayTableTopBorder) {
      setTableTopBorder('2px solid var(--grey-color)');
    } else {
      setTableTopBorder('none');
    }
  }, [displayTableTopBorder]);

  return (
    <>
      {!reverse ? (
        <table
          className='bottom'
          style={{
            borderTop: TableTopBorder,
          }}
        >
          <tbody>
            <tr className='first-row'>
              <th>TOTAL</th>
              <th>SIZE</th>
              <th>PRICE</th>
            </tr>
            {data.slice(0, maxDisplay).map(({ price, size, total }, index) => (
              <tr key={index} className='table-row'>
                <td>{numberWithCommas(total)}</td>
                <td>{numberWithCommas(size)}</td>
                <td className='price' style={{ color: priceColor }}>
                  {numberWithCommas(price.toFixed(2))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table style={{ borderTop: TableTopBorder }}>
          <tbody>
            <tr className='first-row'>
              <th>PRICE</th>
              <th>SIZE</th>
              <th>TOTAL</th>
            </tr>
            {data.slice(0, maxDisplay).map(({ price, size, total }, index) => (
              <tr key={index} className='table-row'>
                <td className='price' style={{ color: priceColor }}>
                  {numberWithCommas(price.toFixed(2))}
                </td>
                <td>{numberWithCommas(size)}</td>
                <td>{numberWithCommas(total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default OrderBookTable;
