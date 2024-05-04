// import React, { useState,useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { updateFilters } from "../../modules/PostModule";
import { Region, Orders } from "../common/Information";
import DropdownSingle from '../common/DropdownSingle';
import DropdownMulti from '../common/DropdownMulti';
import { MdCheck } from "react-icons/md";
import { GoX } from "react-icons/go";
import "./EduFilter.css"


function EduFilter(){
    
        return (
            <div className="edufilter_container">
                <div className="edufilter_left">
                    <div>AI 부트캠프</div>
                    <div>총 개수</div>
                </div>
                <div className='postingfilter_first_right'>
                    {/* <DropdownMulti 
                        buttonText='지역'
                        dropdownContent={Region}
                        selectedItems = {selectedRegion}
                        handleChange={handleRegionChange}
                        backcolor= "c_default"
                        backsize="s_default"
                        optionsize='o_short'>
                    </DropdownMulti> */}

                    {/* <DropdownSingle 
                        buttonText='정렬'
                        dropdownContent={Orders}
                        selectedOne = {selectedOrder}
                        handleChange={handleOrderChange}
                        backcolor= "c_white"
                        backsize="s_default"
                        optionsize='o_short'>
                    </DropdownSingle> */}

                    {/* <button className='c_default s_default postingfilter_toggle' 
                        onClick={() => handleshowChange(!showOpenJobs)}>
                        {showOpenJobs 
                        ? <span><MdCheck/>채용중 공고만</span> 
                        : '채용중 공고만 보기'}
                    </button> */}
                </div>
            </div>
            
        );
}; 
export default EduFilter;