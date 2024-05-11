import React, { useEffect, useState } from "react";
import './DropdownMulti.css'; 
import { 
    MdArrowDropDown, 
    MdArrowDropUp, 
    MdCheck, 
    MdClose,
    MdRefresh
} from "react-icons/md";

function DropdownMulti({
    buttonText,
    dropdownContent,
    selectedItems,
    handleChange,
    backcolor = 'c_default',
    backsize = 's_default',
    optionsize = 'o_short'
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    console.log("selected",selected)

    useEffect(() => {
        if (selectedItems) {
            // 모든 옵션 값이 selectedItems에 포함되어 있는지 확인
            const allValues = dropdownContent.slice(1).map(item => item.value);
            const allSelected = allValues.every(val => selectedItems.includes(val));
    
            if (allSelected) {
                // 모든 옵션이 선택되었으면 '전체'만 설정
                setSelected([{ value: "전체", label: "전체", short:'전체' }]);
            } else {
                // 그렇지 않다면 일반적으로 선택된 항목 설정
                const selections = dropdownContent.filter(item => selectedItems.includes(item.value));
                setSelected(selections);
            }
        }
    }, [selectedItems, dropdownContent]);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleReset = () => {
        const allValues = dropdownContent.slice(1).map(job => job.value).join(', ');
        handleChange(allValues);
        setSelected([]);
    };

    const handleSelect = (item) => {
        if (item.value === "전체") {
            const allValues = dropdownContent.slice(1).map(job => job.value).join(', ');
            handleChange(allValues);
            setSelected([{ value: "전체", label: "전체", short:'전체' }]);
        } else {
            let newSelected = selected.filter(s => s.value !== "전체");
            const index = newSelected.findIndex(v => v.value === item.value);
            if (index !== -1) {
                newSelected = newSelected.filter((_, i) => i !== index);
            } else {
                newSelected = [...newSelected, item];
            }
            // 모든 옵션을 선택한 경우 '전체'로 변경
            const allValues = dropdownContent.slice(1).map(job => job.value);
            const allSelected = allValues.every(val => newSelected.map(sel => sel.value).includes(val));
            if (allSelected) {
                handleChange(allValues);
                setSelected([{ value: "전체", label: "전체", short:'전체' }]);
            } else {
                handleChange(newSelected.map(sel => sel.value));
                setSelected(newSelected);
            }
        }
    };
    
    const displayLabel = selected.length > 0 
    ? (selected.length === 1 && selected[0].label !== '전체'
        ? selected[0].label
        : selected.length === 1 && selected[0].label === '전체'
        ? `${buttonText} 전체`
        : `${selected[0].label} 외 ${selected.length-1}`) 
    : `${buttonText} 전체`;

    const displayLabel_media = selected.length > 0 
    ? (selected.length === 1 && selected[0].label !== '전체'
        ? selected[0].short
        : selected.length === 1 && selected[0].label === '전체'
        ? `${buttonText} 전체`
        : `${selected[0].short} 외 ${selected.length-1}`) 
    : `${buttonText} 전체`;

return (
    <div className="dropdownmulti_container">
        <button className={`${backcolor} ${backsize}`} onClick={toggleDropdown}>
            <div className="dropdownmulti_wrapper">
                <div className="dropdownmulti_title">
                    {displayLabel}
                </div>
                <div className="dropdownmulti_title_media">
                    {displayLabel_media}
                </div>
                <div className="dropdownmulti_icon">
                    {isOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
                </div>
            </div>
        </button>

        {isOpen && (
        <div className={`dm_option_container ${optionsize}`}>
            <div className="dm_option_wrapper">
                <div className="dm_option_first">
                    <div className="dm_option_left">
                        <div className="dm_left_first">
                            {buttonText}
                        </div>
                        <div className="dm_left_second">
                        {dropdownContent.map((item) => (
                        <div className={`dm_option_button ${selected.map(i => i.value).includes(item.value) ? 'selected' : ''}`}
                        onClick={() => handleSelect(item)}>
                            <div className="dm_option_box">
                                {item.label}
                            </div>
                            <div className="dm_option_box_media">
                                {item.short}
                            </div>
                            <div>
                                {selected.map(i => i.value).includes(item.value) && <MdCheck />}
                            </div>
                        </div>
                        ))}
                        </div>
                    </div>

                    <div className="dm_option_right">
                        <div className="dm_option_close"
                        onClick={toggleDropdown}>
                            <MdClose/>
                        </div>
                        <div className="dm_right_first">
                            선택된 {buttonText}
                        </div>
                        <div className="dm_right_second">
                        {selected.map((item) => (
                            <div className="dm_option_checked"
                            onClick={() => handleSelect(item)}>
                            <div className="dm_option_box">
                                {item.label}
                            </div>
                            <div className="dm_option_box_media">
                                {item.short}
                            </div>
                                <div className="dm_option_checked_icon">
                                    <MdClose/>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <div className="dm_option_second">
                    <div className="dm_option_second_left">
                        <div className="dm_option_reset" 
                        onClick={handleReset}>
                            <span className="dm_option_reset_icon">
                                <MdRefresh />
                            </span>
                            초기화
                        </div>
                    </div>
                    <div className="dm_option_second_right">
                        <div className="dm_option_apply"
                        onClick={toggleDropdown}>
                            적용하기
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
    </div>
);
};

export default DropdownMulti;
