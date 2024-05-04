import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callPostListAPI } from "../../api/PostingAPICall";
import {
    MdArrowBackIos,
    MdArrowForwardIos,
  } from "react-icons/md";
import "./PostingPgn.css"

const PostingPgn = () => {
    const dispatch = useDispatch();
    const { pageInfo, selectedJob, selectedRegion, selectedOrder, showOpenJobs } = useSelector(state => state.postReducer);
    console.log("pageInfo",pageInfo)

    const handlePageChange = (page) => {
        console.log("page",page)
        dispatch(callPostListAPI({
            selectedJob,
            selectedRegion,
            selectedOrder,
            currentPage: page,
            showOpenJobs
        }));
    };

    return (
<div className='postingpgn_container'>
    {pageInfo.prev && 
    <button className='else_page'
    onClick={() => handlePageChange(pageInfo.pageStart - 1)}>
        <span className='postingpgn_icon'>
            <MdArrowBackIos/>
        </span>
        이전
    </button>
    }
     {Array.from({ length: pageInfo.pageEnd - pageInfo.pageStart + 1 }, (_, i) => {
        const pageNumber = pageInfo.pageStart + i;
        console.log("Current Page:", pageInfo.cri.pageNum);
        return (
            <button key={i} 
                onClick={() => handlePageChange(pageNumber)}
                className={pageNumber === pageInfo.cri.pageNum ? 'current_page' : "else_page"}>
                {pageNumber}
            </button>
        );
    })}
    {pageInfo.next &&
    <button className='else_page'
    onClick={() => handlePageChange(pageInfo.pageEnd + 1)}>
        다음
        <span className='postingpgn_icon'>
            <MdArrowForwardIos/>
        </span>
    </button>}
</div>
    );
};

export default PostingPgn;
