import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../../modules/PostModule";
import { callPostListAPI } from "../../api/PostingAPICall";
import { Region, Jobnames, Orders } from "../common/Information";
import DropdownSingle from '../common/DropdownSingle';
import DropdownMulti from '../common/DropdownMulti';
import { MdCheck } from "react-icons/md";
import { GoX } from "react-icons/go";
import { useLocation, useNavigate } from 'react-router-dom';
import "./PostingFilter.css"


function PostingFilter(){
    const dispatch = useDispatch();
    const { pageInfo, selectedJob, selectedRegion, selectedOrder, showOpenJobs, currentPage } = useSelector(state => state.postReducer);

    const handleJobChange= (value) => {
        dispatch(updateFilters({["selectedJob"]: value}))
    }
    const handleRegionChange= (value) => {
        dispatch(updateFilters({["selectedRegion"]: value}))
    }
    const handleOrderChange= (value) => {
        dispatch(updateFilters({["selectedOrder"]: value}))
    }
    const handleshowChange= (value) => {
        dispatch(updateFilters({["showOpenJobs"]: value}))
    }

    useEffect(() => {
            console.log("호출데이터",{ selectedJob, selectedRegion, selectedOrder, currentPage, showOpenJobs })
            dispatch(callPostListAPI({
                selectedJob,
                selectedRegion,
                selectedOrder,
                currentPage,
                showOpenJobs
            }));  
        }
        ,[selectedJob, selectedRegion, selectedOrder,  currentPage,showOpenJobs, dispatch]
    );
    console.log("selectedItems_selectedJob",selectedJob)
    console.log("selectedItems_selectedRegion",selectedRegion)

    return (
        <div className='postingfilter_container'>
            <div className='postingfilter_wrapper'>
                <div className='postingfilter_left'>
                    <DropdownMulti 
                        buttonText='직무'
                        dropdownContent={Jobnames}
                        selectedItems = {selectedJob}
                        handleChange={handleJobChange}
                        backcolor= "c_default"
                        optionsize='o_default'>
                    </DropdownMulti>

                    <div className='postingfilter_text'>
                        총 {pageInfo.total}개
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
                        onClick={() => handleshowChange(!showOpenJobs)}>
                        {showOpenJobs 
                            ? <span>
                                <span style={{marginRight:"3px"}}><MdCheck/></span>
                                채용중 공고만
                            </span> 
                            : '채용중 공고만 보기'}
                    </button>

                </div>
            </div>
        </div>
);
}; 
export default PostingFilter;



