import React, { useEffect, useState } from "react";
import './Dropdown.css';
import {
    MdArrowDropDown,
    MdArrowDropUp,
    MdClose,
    MdCheck,
    MdRefresh 
} from "react-icons/md";

function Dropdown({
    buttonText, //버튼 위 텍스트
    dropdownContent, //옵션 목록
    selectedOne, //선택된 것
    handleChange, //옵션 선택시 일어나는 일
    backcolor = 'c_default', //버튼 배경색
    backsize = 's_default', //버튼 크기
    multiple = true, //복수 응답여부 결정
    optionsize = 'o_default' //옵션 크기,
}) {
    const [isOpen, setIsOpen] = useState(false); //열림,닫힘 상태
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const selection = 
            dropdownContent.filter(item => selectedOne.includes(item.value))
        setSelectedItems(selection);
    }, [selectedOne, dropdownContent, multiple]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }; //드롭다운 열기, 닫기 기능

    const handleSelect = (value) => {
        let updatedSelection = [];
        if (multiple) {
            updatedSelection = selectedItems.some(item => item.value === value)
                ? selectedItems.filter(item => item.value !== value)
                : [...selectedItems, dropdownContent.find(item => item.value === value)];
        } else {
            // 단일 선택 로직
            const selectedItem = dropdownContent.find(item => item.value === value);
            updatedSelection = selectedItem ? [selectedItem] : [];
            setIsOpen(false);
        }
        setSelectedItems(updatedSelection);
        handleChange(updatedSelection.map(item => item.value));
    };
    
    //버튼에 표시할 텍스트
    const displayLabel = selectedItems.length > 0
        ? selectedItems.length === 1
            ? selectedItems[0].label
            : selectedItems.every(item => item.short)
                ? selectedItems.map(item => item.short).join(", ")
                : `${selectedItems[0].label} 외`
        :buttonText
    
    //초기화 하는 함수
    const handleReset = () => {
        handleChange([]);
    };

return (
<div className="dropdown_container">
{isOpen && <div className="overlay"></div>}
    <button className={`${backcolor} ${backsize}`} onClick={toggleDropdown}>
        <div className="dropdown_text">
            {displayLabel}
            <span style={{marginTop:'2px'}}>{isOpen ? <MdArrowDropUp size={18} /> : <MdArrowDropDown size={18} />}</span>
        </div>
    </button>

    {isOpen && (
    <div className={`dropdown_option ${optionsize}`}>
        <div className="option_left" style={{ width: multiple ? '' : '100%'}}>
            <div className="option_header">
                {buttonText}
            </div>
            <div className="option_content" style={{border: multiple ? '' : 'none'}}>
                {dropdownContent.map((item) => (
                    <div className={`option_button ${selectedItems.some(selected => selected.value === item.value) ? 'selected' : ''}`}
                    key={item.value}
                    onClick={() => handleSelect(item.value)}
                    >
                        {item.label}
                        {selectedItems.some(selected => selected.value === item.value) && <span style={{alignItems:"center"}}><MdCheck /></span>}
                    </div>
                ))}
            </div>
            {multiple && (
                <div className="option_bottom" onClick={handleReset}>
                    <MdRefresh />초기화
                </div>
            )}
        </div>
        {multiple && (
            <div className="option_right">
                <div className="option_header">
                    선택 항목
                </div>
                <div className="option_content">
                    {selectedItems.map((item) => (
                        <div className="checked_item" key={item.value} onClick={() => handleSelect(item.value)}>
                            {item.label}
                            <span style={{alignItems:"center"}}>
                                <MdClose size={8}/>
                            </span>
                        </div>
                    ))}
                </div>
                <div className="option_bottom_r" onClick={toggleDropdown}>
                    <div className="box">
                        적용하기
                    </div>
                </div>
            </div>
        )}
    </div>
)}


</div>);

} export default Dropdown;
