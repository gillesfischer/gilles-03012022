import React, { useContext } from 'react';
import './ToggleButton.css';

function ToggleButton({ title, onClick }) {
  return (
    <>
      <button className='toggle-button' onClick={onClick}>
        {title}
      </button>
    </>
  );
}

export default ToggleButton;
