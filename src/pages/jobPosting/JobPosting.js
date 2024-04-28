import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callPostListAPI } from "../../api/PostingAPICall";
//채용공고 정보 받아옴
import './JobPosting.css';
import PostingList from "../../component/jobposting/PostingList";
import PostingFilter from "../../component/jobposting/PostingFilter";
import PostingPgn from "../../component/jobposting/PostingPgn";


function JobPosting() {  


  return (
  <>
    <PostingFilter/>
    <div className="total">
      <div className="box">
        <PostingList/>
      </div>
      <br></br>
      <PostingPgn/>
    </div>
  </>
  );
  };   
  export default JobPosting;
  