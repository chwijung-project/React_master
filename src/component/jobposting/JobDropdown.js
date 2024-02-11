import React, {useEffect, useState} from "react";
import './JobDropdown.css';

function JobDropdown(
    {buttonText, 
    dropdownContent, 
    selectedOne, 
    handleChange,
    bsize='b-large',
    osize='o-large',
    color='basic',
    press='basic-pressed'
    }) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(selectedOne);
    // '전체' 선택시 초기로 돌아가도록

    useEffect(() => {
        setSelectedItem(selectedOne);
    }, [selectedOne]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setSelectedItem(selectedOne === "전체" ? null : selectedOne);
    };

    // 선택된 항목 표시
    const displayText = (
        <div className="dropdown-text">
            <span>{selectedItem || buttonText}</span>
            <span>{isOpen ? "⮝" : "⮟"}</span>
        </div>
    );
    
    
    const buttonClasses = `jobdropdown ${bsize} ${selectedItem ? `${press}` : ''}`;
    const dropdownClasses = `jobdropdown-options ${osize}`;
    
    // 선택 항목 처리&드롭다운 닫기
    const handleSelect = (item) => {
        setSelectedItem(item === "전체" ? null:item);
        handleChange(item === "전체" ? null:item);
        setIsOpen(false);
    }
    
    return (
        <div>
            <button 
            className={buttonClasses}
            onClick={toggleDropdown}>
            {displayText}
            </button>
            {isOpen && (
                <div className={dropdownClasses}>
                    {dropdownContent.map((item,index)=>(
                        <div key={index}
                        className={`${color}-hover`} 
                        onClick={()=>handleSelect(item)}>{item}</div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default JobDropdown;