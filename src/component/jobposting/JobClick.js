import React from "react";
import './JobClick.css';

function JobClick(
  {buttonText, 
  toggleOpen, 
  showOpen, 
  size = 'medium',
  color = 'default',
  check = '✔',
  press = 'red-pressed'
    }) {
  //showOpen=True, selected=exist->buttonText&check 출력
  const displayText = showOpen && buttonText ?(<span><span style={{marginRight:'12px'}}>{check}</span>{buttonText}</span>
  ): buttonText;

  //showOpen T이면-> pressed 스타일대로 변경
  const buttonClasses = `filterbutton ${size} ${color} ${showOpen ? `${press}` : ''}`;

  return (
    <div>
      <button
        className={buttonClasses}
        onClick={toggleOpen} 
        aria-pressed={showOpen ? "true" : "false"}
      >
        {displayText}
      </button>
    </div>
  );
}

export default JobClick;
