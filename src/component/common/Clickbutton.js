import React from "react";
import './Clickbutton.css';

function Clickbutton(
  {buttonText, 
  toggleOpen, 
  showOpen,
  size = 'medium'
  }) {

  // showOpen T이면-> pressed 스타일대로 변경
  const buttonClasses = `filterbutton ${showOpen ? `click` : ''} ${size}`;

  return (
    <div>
      <button
        className={buttonClasses}
        onClick={toggleOpen} 
        aria-pressed={showOpen ? "true" : "false"}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default Clickbutton;
