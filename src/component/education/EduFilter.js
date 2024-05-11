// import React, { useState,useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { updateFilters } from "../../modules/PostModule";
import { Region, Orders } from "../common/Information";
import DropdownSingle from '../common/DropdownSingle';
import DropdownMulti from '../common/DropdownMulti';
import { MdCheck } from "react-icons/md";
import { GoX } from "react-icons/go";
import "./EduFilter.css"
import { useState } from "react";


function EduFilter(){

    const [showOpenJobs, setShowOpenJobs] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState("전체")
    const [selectedOrder, setSelectedOrder] = useState("latest_order")
    const handleRegionChange = (value) => {
        setSelectedRegion(value);
    };
    const handleOrderChange = (value) => {
        setSelectedOrder(value);
    };
    const handleshowChange = () => {
        setShowOpenJobs(!showOpenJobs);
    };
    
        return (
            <div className='postingfilter_container'>
                <div className='postingfilter_wrapper'>
                    <div className='postingfilter_left'>
                        <div className='postingfilter_title'>
                            AI부트캠프
                        </div>
                    </div>
                    <div className='postingfilter_right'>
                        <DropdownMulti 
                            buttonText='지역'
                            dropdownContent={Region}
                            selectedItems = {selectedRegion}
                            handleChange={handleRegionChange}
                            backcolor= "c_white"
                            optionsize='o_default'>
                        </DropdownMulti>

                        <DropdownSingle 
                            buttonText='정렬'
                            dropdownContent={Orders}
                            selectedOne = {selectedOrder}
                            handleChange={handleOrderChange}
                            backcolor= "c_white"
                            optionsize='o_short'>
                        </DropdownSingle>

                        <button 
                            className="c_default s_middle postingfilter_toggle" 
                            onClick={handleshowChange}>
                            {showOpenJobs 
                                ? <span>
                                    <span style={{marginRight:"3px"}}><MdCheck/></span>
                                    모집중 교육만
                                </span> 
                                : '모집중 교육만 보기'}
                        </button>

                    </div>
                </div>
        </div>
            
        );
}; 
export default EduFilter;