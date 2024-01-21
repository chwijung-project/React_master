import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callPostListAPI } from "../../api/PostingAPICall";
//채용공고 정보 받아옴

import './JobPosting.css';

function JobPosting() {

  const jobCategories = [
    { label: '머신러닝/딥러닝 엔지니어', value: '머신러닝/딥러닝 엔지니어' },
    { label: '머신러닝/딥러닝 리서처', value: '머신러닝/딥러닝 리서처' },  //
    { label: '데이터 사이언티스트', value: '데이터 사이언티스트' },
    { label: '데이터 엔지니어', value: '데이터 엔지니어' },   //
    { label: 'AI 서비스 개발자', value: 'AI 서비스 개발자' },
    { label: 'AI 서비스 기획자', value: 'AI 서비스 기획자' }, 
    { label: 'AI 아티스트', value: 'AI 아티스트' }
];

  const [regiondropdown, setRegionDropdown] = useState(false);
  const [sortdropdown, setSortDropdown] = useState(false);

  const onClickRegionDropdown = () => {
    setRegionDropdown(!regiondropdown);
    setSortDropdown(false);
  };

  const onClickSortDropdown = () => {
    setSortDropdown(!sortdropdown);
    setRegionDropdown(false);
  };

  const [selectedJob, setSelectedJob] = useState('');
  //직무 필터링 용

  const handleRadioChange = (job) => {
    setSelectedJob(job);
    setCurrentPage(1); //선택하면 첫 페이지로 오도록
};

  const dispatch = useDispatch();
  const posting = useSelector(state => state.postReducer);
  //Redux사용->Redux스토어 업데이트 및 정보 가져오기
  //postReducer:Modules>PostModule.js에 있음

  const postList = posting.data;
  const pageInfo = posting.pageInfo;
  const [currentPage, setCurrentPage] = useState(1);
  //현재 페이지 정보(초기값1) 저장
  
  const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
  }

  useEffect(
    () => {
        dispatch(callPostListAPI({
            currentPage: currentPage,
            jobCategory: selectedJob,
        }));            
    }
    ,[currentPage, selectedJob]
  );
  //정보 가져오기

    return (
      <>
        <hr color="#f1f3f5"></hr>
        <div className="posting-container">
          <div className="posting-box">
            <br></br>
            <div className="title">Click, Get AI Jobs</div>
            <div className="job-category">
                {jobCategories.map(job => (
                    <label key={job.label}>
                        <input
                            type="radio"
                            name="jobCategory"
                            value={job.value}
                            checked={selectedJob === job.value}
                            onChange={() => handleRadioChange(job.value)}
                        />
                        <span>
                            {job.label}
                        </span>
                    </label> 
                ))}
            </div>
            <br></br>
            <div className="sort-container">
              <div className="sort">{pageInfo && pageInfo.total}개 채용공고</div>
            
              <div className="right-buttons">
                <div className="sort-button">
                  <button onClick={ onClickRegionDropdown }>
                  지역&nbsp;&nbsp;&nbsp;&#9661;&nbsp;
                  </button>
                  {regiondropdown && (
                    <div className="sort-content">
                      <a href="/">서울</a>
                      <a href="/">경기</a>
                      <a href="/">부산</a>
                    </div>
                  )}
                </div>

                <div className="sort-button">  
                  <button onClick={ onClickSortDropdown }>
                    최신순&nbsp;&nbsp;&#9661;&nbsp;
                  </button>
                  {sortdropdown && (
                    <div className="sort-content">
                      <a href="/">조회순</a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="posting-list">
                <table className="posting-table">
                  {Array.isArray(postList) && postList
                  .filter(p => !selectedJob || p.recru_job === selectedJob)
                  .map((p) => (
                    <tr key={p.idx}>                      
                      <td>
                        <div className="company-logo">
                        {/* <img src={ chwijung_logo } /> */}
                        <button></button>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 'bold',marginRight:'30px', fontSize:'24px'}}>
                          <a href={p.recru_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                            {p.recru_title}
                          </a>
                          </div>
                        <div style={{color: 'gray' }}>{p.recru_company}</div>
                      </td>
                      <td>
                        <div className="post-job-design">
                          {p.recru_job}
                        </div>
                      </td>
                      <td className="region-cell">{p.recru_region}</td>
                    </tr>
                  ))}
                </table>
            </div>
          </div>
        </div>
        
        
        <div className="moreinfo-container">
          { Array.isArray(postList) &&
                <button 
                  onClick={() => setCurrentPage(currentPage + 1)} 
                  disabled={currentPage === pageInfo.pageEnd  || pageInfo.total === 0}
                >
                    채용공고 더보기
                </button>
            }
        </div>
        {/* 페이지네이션 구현 */}
        {/* <div className="paging-container" style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(postList) &&
                <button
                  className="pagingbtn"
                  onClick={() => setCurrentPage(currentPage - 1)} 
                  disabled={currentPage === 1}
                >
                    &lt; 이전
                </button>
            }&nbsp;&nbsp;
            {pageNumber.map((num) => (
                <div key={num} onClick={() => setCurrentPage(num)}>
                    <button
                      className="pagingbtn"
                      style={ currentPage === num ? {backgroundColor : '#FFC34E' } : null}
                    >
                        {num}
                    </button>&nbsp;&nbsp;
                </div>
            ))}
            { Array.isArray(postList) &&
                <button 
                  className="pagingbtn"
                  onClick={() => setCurrentPage(currentPage + 1)} 
                  disabled={currentPage === pageInfo.pageEnd  || pageInfo.total === 0}
                >
                    다음 &gt;
                </button>
            }
        </div> */}
      </>


    )
  }    
  export default JobPosting;
  