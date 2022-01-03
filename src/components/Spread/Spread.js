import React from 'react';

function Spread({ spread = 17.0, percentage = 0.05 }) {
  return (
    <>
      <h2>
        Spread {spread.toFixed(1)} ({percentage.toFixed(2)}%)
      </h2>
    </>
  );
}

export default Spread;
