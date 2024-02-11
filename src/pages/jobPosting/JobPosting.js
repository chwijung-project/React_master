import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callPostListAPI } from "../../api/PostingAPICall";
//채용공고 정보 받아옴
import './JobPosting.css';
import PostingList from "../../component/jobposting/PostingList";
import Pagination from "../../component/jobposting/Pagination";
import JobDropdown from "../../component/jobposting/JobDropdown"
import JobClick from "../../component/jobposting/JobClick"

function JobPosting() {  
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const [showOpenJobs, setShowOpenJobs] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const posting = useSelector(state => state.postReducer);
  const postList = posting.data;
  const pageInfo = posting.pageInfo;

  const toggleOpenJobs = () => {setShowOpenJobs(!showOpenJobs)};
  const handleJobChange = (job) => {
    setSelectedJob(job);
    setCurrentPage(1); //선택하면 첫 페이지로 오도록
  };
  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setCurrentPage(1); //선택하면 첫 페이지로 오도록
  };
  const handleOrderChange = (order) => {
    setSelectedOrder(order);
    setCurrentPage(1); //선택하면 첫 페이지로 오도록
  };

  const Jobnames = ['전체','머신러닝/딥러닝 엔지니어', '머신러닝/딥러닝 리서처', '데이터 사이언티스트', '데이터 엔지니어', 'AI 서비스 개발자', 'AI 서비스 기획자', 'AI 아티스트']
  const Region = ['전체', '서울', '경기']
  const Order = ['최신순', '마감순']


  useEffect(() => {
    dispatch(callPostListAPI({ currentPage, jobCategory: selectedJob }));
  }, [currentPage, selectedJob, dispatch]);

  return (
  <>
  <hr color="#f1f3f5"></hr> {/* 구분선 */}
  <div className="posting-container"> {/* 전체 가운데로 */}
  <div className="posting-box">
  <br></br>
    <div className="title">Click, Get AI Jobs</div>
          <div className="small">이 사이트에서는 머신러닝과 딥러닝 기술을 개발, 응용 및 관리하는 직업을 찾아볼 수 있습니다.</div>

          <div className="jobdropdown-container">
              <div className="middle">AI채용공고를 직무별로 확인해보세요.</div>
              <JobDropdown buttonText='Job Filter'
                dropdownContent={Jobnames}
                selectedOne = {selectedJob}
                handleChange={handleJobChange}>
              </JobDropdown>
          </div>
          <br></br>
    <div className="sort-container-main">
      <div className="middle-count">
      {pageInfo && pageInfo.total}개 채용공고</div>
    <div className="right-buttons">
      <JobClick buttonText='채용중'
        toggleOpen = {toggleOpenJobs}
        showOpen = {showOpenJobs}>
      </JobClick>
      <JobDropdown buttonText='지역'
        dropdownContent={Region}
        selectedOne = {selectedRegion}
        handleChange={handleRegionChange}
        bsize='b-mid'
        osize='o-mid'
        color="blue"
        press="blue-pressed">
      </JobDropdown>
      <JobDropdown buttonText='정렬'
        dropdownContent={Order}
        selectedOne = {selectedOrder}
        handleChange={handleOrderChange}
        bsize='b-mid'
        osize='o-mid'
        color="blue"
        press="blue-pressed">
      </JobDropdown>
    </div>
    </div>

    <PostingList
      postList={postList}
      selectedJob={selectedJob}
      showOpenJobs={showOpenJobs} 
    />
  </div>
  </div>

  <Pagination 
    currentPage={currentPage} 
    setCurrentPage={setCurrentPage} 
    pageInfo={pageInfo} 
    postList={postList} 
  />
  </>
  )
  }    
  export default JobPosting;
  