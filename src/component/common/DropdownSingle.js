import React, { useEffect, useState } from "react";
import './DropdownSingle.css';
import {
    MdArrowDropDown,
    MdArrowDropUp,
    MdCheck
} from "react-icons/md";

function DropdownSingle({
    buttonText, //옵션 제목
    dropdownContent, //옵션 목록
    selectedOne, //선택된 것
    handleChange, //옵션 클릭시 일어나는 일
    backcolor = 'c_default', //버튼 배경색
    backsize = 's_default', //버튼 크기
    optionsize = 'o_short' //옵션 크기
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const selection = 
            dropdownContent.find(item => item.value === selectedOne);
        if (selection) {
            setSelectedItem(selection);
        }
    }, [selectedOne, dropdownContent]);

    const handleSelect = (item) => {
        console.log("item",item)
        if (selectedItem.value !== item.value) {
            setSelectedItem(item);
            handleChange(item.value);
            setIsOpen(false);
        }
    };
    const displayLabel = selectedItem.label || buttonText;

    return (
    <div className="dropdownsingle_container">
        {/* 미디어쿼리 */}
        {isOpen && <div className="dropdownsingle_overlay"></div>}

        <button className={`${backcolor} ${backsize}`} onClick={toggleDropdown}>
            <div className="dropdownsingle_wrapper">
                <div className="dropdownsingle_title">
                    {displayLabel}
                </div>
                <div className="dropdownsingle_icon">
                    {isOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
                </div>
            </div>
        </button>

        {isOpen && (
            <div className={`ds_option_container ${optionsize}`}>
                <div className="ds_option_wrapper">
                    <div className="ds_option_first">
                        {buttonText}
                    </div>
                    <div className="ds_option_second">
                        {dropdownContent.map((item) => (
                            <div className={`ds_option_button ${selectedItem.value === item.value ? 'selected' : ''}`}
                            key={item.value}
                            onClick={() => handleSelect(item)}>
                                <div>
                                {item.label}
                                </div>
                                <div>
                                {selectedItem.value === item.value && 
                                    <MdCheck />
                                }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </div>
    );
};
export default DropdownSingle;
