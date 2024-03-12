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
    const [selectedItem, setSelectedItem] = useState([]);

    useEffect(() => {
        const foundItems = dropdownContent.filter(item => selectedOne.includes(item.value));
        setSelectedItem(foundItems);
    }, [selectedOne, dropdownContent]);    

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // 선택 항목 처리&드롭다운 닫기
    const handleSelect = (value) => {
        if (value === null) {
            setSelectedItem([]); 
            handleChange([]); 
        } else {
            const currentIndex = selectedItem.findIndex(item => item.value === value);
            let newSelectedItem = [...selectedItem];
        
            if (currentIndex === -1) {
                const selectedItemToAdd = dropdownContent.find(item => item.value === value);
                newSelectedItem = newSelectedItem.filter(item => item.value !== null);
                newSelectedItem.push(selectedItemToAdd);
            } else {
                newSelectedItem.splice(currentIndex, 1);
            }
            setSelectedItem(newSelectedItem);
            handleChange(newSelectedItem.map(item => item.value));
        }
    };
    
    
    
    // 선택여부에 따라 css지정
    const buttonClasses = `jobdropdown ${bsize} ${selectedItem ? `${press}` : ''}`;
    const dropdownClasses = `jobdropdown-options ${osize}`;
    
    return (
        <div>
            <button 
            className={buttonClasses}
            onClick={toggleDropdown}>
            <div className="dropdown-text">
            <span>{selectedItem.length > 0 ? selectedItem.length === 1 ? selectedItem[0].label : `${selectedItem[0].label}...`
            : buttonText}</span>
                <span>{isOpen ? "⮝" : "⮟"}</span>
            </div>
            </button>
            {isOpen && (
                <div className={dropdownClasses}>
                    {dropdownContent.map(item => (
    <div key={item.value} className={`${color}-hover checkbox-container`} onClick={() => handleSelect(item.value)}>
        <input 
            type="checkbox" 
            checked={Array.isArray(selectedItem) && selectedItem.some(selected => selected.value === item.value)}
            onChange={() => {}} // 실제 로직은 handleSelect에서 처리
            className="real-checkbox"
        />
        <span className="custom-checkbox"></span>
        {item.label}
    </div>
))}

                </div>
            )}
        </div>
    )
}
export default JobDropdown;