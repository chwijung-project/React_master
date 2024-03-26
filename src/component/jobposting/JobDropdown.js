import React, { useEffect, useState } from "react";
import './JobDropdown.css';
import {
    MdArrowDropDown,
    MdArrowDropUp
} from "react-icons/md";

function JobDropdown({
    buttonText,
    dropdownContent,
    selectedOne,
    handleChange,
    backcolor = 'default',
    underline = false, //글자에 밑줄 표시 여부
    closeOnSelect = false, //선택하면 닫기 결정
    multiple = true, //복수 응답여부 결정
    showOptions = true //드롭다운 표시 여부
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(multiple ? [] : {}); //여러개[], 한개{}

    useEffect(() => {
        if (multiple) {
            const foundItems = dropdownContent.filter(item => selectedOne.includes(item.value));
            setSelectedItem(foundItems);
        } else {
            const foundItem = dropdownContent.find(item => item.value === selectedOne);
            setSelectedItem(foundItem ? foundItem : {});
            //(multiple false)한 개 일때 처리하는 방법
        }
    }, [selectedOne, dropdownContent, multiple]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (value) => {
        if (multiple) {
            const currentIndex = selectedItem.findIndex(item => item.value === value);
            let newSelectedItem = [...selectedItem];
    
            if (currentIndex === -1) {
                const selectedItemToAdd = dropdownContent.find(item => item.value === value);
                newSelectedItem.push(selectedItemToAdd);
            } else {
                newSelectedItem.splice(currentIndex, 1);
            }
            setSelectedItem(newSelectedItem);
            handleChange(newSelectedItem.map(item => item.value));
        } else {
            const selectedItemToAdd = dropdownContent.find(item => item.value === value);
            setSelectedItem(selectedItemToAdd);
            handleChange(selectedItemToAdd.value);
            if (closeOnSelect) {
                setIsOpen(false);
            }
        }
    };


return (
    <div>
        <button className={`jobdropdown-${backcolor}`} onClick={toggleDropdown}>
            <div className="dropdown-text">
                <span className={underline ? "underline" : ""}>
                    {multiple ? (selectedItem.length > 0 ? selectedItem.length === 1 ? selectedItem[0].label : `${selectedItem[0].label}...`
                    : buttonText) : (selectedItem.label || buttonText)}
                </span>
                <span style={{ marginTop: '2px' }}>{isOpen ? <MdArrowDropUp size={18} /> : <MdArrowDropDown size={18} />}</span>
            </div>
        </button>
        {isOpen  && (
            <div className={`jobdropdown-options ${!showOptions ? "centered-options" : ""}`}>
                {dropdownContent.map(item => (
                    <div className='checkbox-container' key={item.value} onClick={() => handleSelect(item.value)}>
                        {multiple ? (
                            <input
                                type="checkbox"
                                checked={Array.isArray(selectedItem) && selectedItem.some(selected => selected.value === item.value)}
                                onChange={() => {}}
                                className="real-checkbox"
                            />
                        ) : (
                            <input
                                type="radio"
                                name="jobDropdownRadio"
                                checked={selectedItem.value === item.value}
                                onChange={() => {}}
                                className="real-checkbox"
                            />
                        )}
                        <span className='custom-checkbox'></span>
                        {item.label}
                    </div>
                ))}
            </div>
        )}
    </div>);
}

export default JobDropdown;
