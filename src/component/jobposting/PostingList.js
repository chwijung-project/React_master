import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callPostListAPI } from "../../api/PostingAPICall";
import './PostingList.css';

function PostingList() {
    const dispatch = useDispatch();
    const posting = useSelector(state => state.postReducer);
    const postList = posting.data;
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedJob, setSelectedJob] = useState('');
  //직무 필터링 용

    const handleJobChange = (job) => {
        setSelectedJob(job);
        setCurrentPage(1); //선택하면 첫 페이지로 오도록
    };

    const [showOpenJobs, setShowOpenJobs] = useState(false);

    const toggleOpenJobs = () => {
        setShowOpenJobs(!showOpenJobs);
    };

    useEffect(
        () => {
            dispatch(callPostListAPI({
                currentPage: currentPage,
                jobCategory: selectedJob,
            }));            
        }
        ,[currentPage, selectedJob]
      );

    return(
        <div className="posting-table">
        {Array.isArray(postList) && postList
        .filter(p => !selectedJob || p.recru_job === selectedJob)
        .filter(p => !showOpenJobs || p.recru_closed === "false")
        .map((p) => (
          <div id={p.recru_idx} className="posting-list">
            <div className="sort-container">
              {p.recru_closed === "false" ? (
                <button className="posting-logo-able">
                  Apply</button>
              ): (
                <button className="posting-logo-unable">
                  ㅡ</button>
              )}
              <div className="posting-title">
                {p.recru_closed === "false" ? (
                  <a href={p.recru_url} target="_blank" rel="noreferrer" style={{fontWeight:'bold'}}>{p.recru_title}</a>
                ): (
                  <span style={{color:'#495057'}}>{p.recru_title}</span>
                )}
                <br></br>
                <div className="posting-company">
                {p.recru_company}
                </div>
                <div className="posting-job">
                {p.recru_job}
                </div>
              </div>

              <div className="posting-region">
                {p.recru_region}
              </div>
            </div>
          </div>
        ))
        }   
      </div>
    )
}
export default PostingList;