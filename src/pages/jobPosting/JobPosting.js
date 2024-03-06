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
  const [showOrder, setShowOrder] = useState('');
  const [showOpenJobs, setShowOpenJobs] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const posting = useSelector(state => state.postReducer);
  const postList = posting.data;
  const pageInfo = posting.pageInfo;

  const toggleOpenJobs = () => {setShowOpenJobs(!showOpenJobs)};
  const toggleAndSetOrder = () => {
    setShowOrder(!showOrder);
    if (!showOrder) {
      setShowOrder('deadline_order');
      setCurrentPage(1);
    } else {
    }
  };
  const handleJobChange = (job) => {
    setSelectedJob(job);
    setCurrentPage(1); //선택하면 첫 페이지로 오도록
  };
  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setCurrentPage(1); //선택하면 첫 페이지로 오도록
  };


  const Jobnames = [
    {label: '머신러닝/딥러닝 엔지니어', value: '머신러닝/딥러닝 엔지니어'},
    {label: '머신러닝/딥러닝 리서처', value: '머신러닝/딥러닝 리서처'},
    {label: '데이터 사이언티스트', value: '데이터 사이언티스트'},
    {label: '데이터 엔지니어', value: '데이터 엔지니어'},
    {label: 'AI 서비스 개발자', value: 'AI 서비스 개발자'},
    {label: 'AI 서비스 기획자', value: 'AI 서비스 기획자'},
    {label: 'AI 아티스트', value: 'AI 아티스트'}
  ];

  const Region = [
      {label: '서울', value: '서울'},
      {label: '경기', value: '경기'},
      {label: '인천', value: '인천'},
      {label: '대전', value: '대전'},
      {label: '울산', value: '울산'},
      {label: '부산', value: '부산'},
      {label: '광주', value: '광주'},
      {label: '대구', value: '대구'}
  ];

  // const Order = [
  //     {label: '최신순', value: 'latest_order'},
  //     {label: '마감순', value: 'deadline_order'}
  // ];

  useEffect(() => {
    dispatch(callPostListAPI({ currentPage, showOpenJobs, selectedJob,selectedRegion, showOrder }));
  }, [currentPage, showOpenJobs, selectedJob, selectedRegion, showOrder, dispatch]);

  return (
  <>
  <hr color="#f1f3f5"></hr> {/* 구분선 */}
  <div className="posting-container"> {/* 전체 가운데로 */}
  <div className="posting-box">
  <br></br>
    <div className="title">Click, Get AI Jobs</div>
          <div className="middle">AI채용공고를 직무별로 확인해보세요.</div>
          <br></br>
          <br></br>
    <div className="sort-container-main">
      <JobDropdown buttonText='All Jobs'
        dropdownContent={Jobnames}
        selectedOne = {selectedJob}
        handleChange={handleJobChange}>
      </JobDropdown>
      <div className="middle-count">
      {pageInfo && pageInfo.total}개 채용공고</div>
    <div className="right-buttons">
      <JobClick buttonText='채용중'
        toggleOpen = {toggleOpenJobs}
        showOpen = {showOpenJobs}>
      </JobClick>
      <JobClick buttonText={showOrder === 'deadline_order' ? '마감순' : '최신순'}
        toggleOpen = {toggleAndSetOrder}
        showOpen = {setShowOrder}
        check = '✔'
        press = "blue-pressed">
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
    </div>
    </div>
    <div>
    </div>
    <PostingList
      postList={postList}
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
  