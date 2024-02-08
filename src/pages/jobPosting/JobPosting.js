import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callPostListAPI } from "../../api/PostingAPICall";
//채용공고 정보 받아옴
import './JobPosting.css';
import Pagination from "../../component/jobposting/Pagination";
import PostingList from "../../component/jobposting/PostingList";


function JobPosting() {  
  //공고 열림 닫힘 모드 변경
  const [showOpenJobs, setShowOpenJobs] = useState(false);

  const toggleOpenJobs = () => {
    setShowOpenJobs(!showOpenJobs);
  };

  const [filterdropdown, setFilterDropdown] = useState(false);
  const onClickFilterDropdown = () => {
    setFilterDropdown(!filterdropdown);
  };

  //직무명 필터링
  const jobCategories = [
    { label: '머신러닝/딥러닝 엔지니어', value: '머신러닝/딥러닝 엔지니어' },
    { label: '머신러닝/딥러닝 리서처', value: '머신러닝/딥러닝 리서처' },  //
    { label: '데이터 사이언티스트', value: '데이터 사이언티스트' },
    { label: '데이터 엔지니어', value: '데이터 엔지니어' },   //
    { label: 'AI 서비스 개발자', value: 'AI 서비스 개발자' },
    { label: 'AI 서비스 기획자', value: 'AI 서비스 기획자' }, 
    { label: 'AI 아티스트', value: 'AI 아티스트' }
];

  const [selectedJob, setSelectedJob] = useState('');
  //직무 필터링 용

  const handleJobChange = (job) => {
    setSelectedJob(job);
    setCurrentPage(1); //선택하면 첫 페이지로 오도록
};

  const [jobdropdown, setjobDropdown] = useState(false);
  const onClickjobDropdown = () => {
    setjobDropdown(!jobdropdown);
  };

  const dispatch = useDispatch();
  const posting = useSelector(state => state.postReducer);
  //Redux사용->Redux스토어 업데이트 및 정보 가져오기
  //postReducer:Modules>PostModule.js에 있음

  const postList = posting.data; //채용공고 정보
  const pageInfo = posting.pageInfo; //전체 공고 개수
  const [currentPage, setCurrentPage] = useState(1);
  //현재 페이지 정보(초기값1) 저장

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
  <hr color="#f1f3f5"></hr> {/* 구분선 */}
  <div className="posting-container"> {/* 전체 가운데로 */}
    <div className="posting-box">
      <br></br>
      <div className="title"><a href="/jobposting">Click, Get AI Jobs</a></div>
      <div className="small">이 사이트에서는 머신러닝과 딥러닝 기술을 개발, 응용 및 관리하는 직업을 찾아볼 수 있습니다.</div>
      
      <div className="jobdropdown-container">
        <div className="middle">AI채용공고를 직무별로 확인해보세요.</div>
        
        {/* 직무 필터 드롭다운 */}
        {/* 클릭 되면 바뀌는 로직 깔끔하게 정리할 것 */}
        <div class="jobdropdown">
          <button onClick={onClickjobDropdown} style={{fontWeight: selectedJob ? 'bold': 'transparent'}}>
            <span>
              {selectedJob || 'Job Filter'}
            </span>
            <span style={{fontSize: '25px' }}>∨</span>
          </button>
          {jobdropdown && (
            <div class="jobdropdown-options">
              {jobCategories.map(job => (
                <div key={job.value} onClick={()=>handleJobChange(job.value)}>
                  {job.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <br></br>

      <div className="sort-container">
        <div className="middle-count">{pageInfo && pageInfo.total}개 채용공고</div>
        <div className="right-buttons">
          
          {/* 체크박스 */}
          <div className="filterdropdown">
            <button onClick={toggleOpenJobs} style={{width:'fit-content'}}>
              {showOpenJobs && (
                <label className='checkbox-container'>
                  <input
                    type="checkbox"
                    checked={showOpenJobs}
                    onChange={toggleOpenJobs}
                    style={{ display: 'none' }} // 체크박스 숨기기
                  />
                  <span style={{ display: 'inline-block'.replace, fontSize:'25px'}}>∨</span> 
                </label>
              )}
              <span>채용중</span>
            </button>
          </div>

          {/* 지역 필터링 */}
          <div class="filterdropdown">
            <button onClick={onClickjobDropdown}>
              <span>{selectedJob ? selectedJob : '지역'}</span> 
              <span style={{fontSize:'25px'}}>∨</span> 
            </button>
          {jobdropdown && (
            <div class="jobdropdown-options">
              {jobCategories.map(job => (
                <div key={job.value} onClick={()=>handleJobChange(job.value)}>
                  {job.label}
                </div>
              ))}
            </div>
          )}
          </div>
          
          {/* 정렬 필터링 */}
          <div className="filterdropdown"
          style={{marginRight:'12px'}}>
            <button onClick={onClickFilterDropdown}>
              <span>정렬</span> 
              <span>☰</span> 
            </button>
            <div>
             {filterdropdown && (
              <div>
              </div>
             )}
            </div>
          </div>
        </div>
      </div>

      {/* 채용공고 리스트 */}
      <PostingList/>
    </div>
  </div>
  
  {/* 페이지네이션 구현 */}
  <Pagination/>
  </>
  )
  }    
  export default JobPosting;
  