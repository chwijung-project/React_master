import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callPostListAPI } from "../../api/PostingAPICall";
//채용공고 정보 받아옴
import './JobPosting.css';
import PostingList from "../../component/jobposting/PostingList";
import JobDropdown from "../../component/jobposting/JobDropdown"
import JobClick from "../../component/jobposting/JobClick"

//화면 크기 확인용
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

function JobPosting() {  
  const [width, height] = useWindowSize();

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

  const Order = [
      {label: '최신순', value: 'latest_order'},
      {label: '마감순', value: 'deadline_order'}
  ];

  useEffect(() => {
    dispatch(callPostListAPI({ currentPage, showOpenJobs, selectedJob,selectedRegion, selectedOrder }));
  }, [currentPage, showOpenJobs, selectedJob, selectedRegion, selectedOrder, dispatch]);

  return (
  <div className="total">
      <div className='top' style={{fontSize:'13px'}}>
        <div className='space'>
          <JobDropdown buttonText='All Jobs'
            dropdownContent={Jobnames}
            selectedOne = {selectedJob}
            handleChange={handleJobChange}
            backcolor={width <= 400 ? 'purple' : 'default'}
            showOptions={width <= 400 ? false : true}
            >
          </JobDropdown>
          <div className="cnt_job">
            {pageInfo && pageInfo.total}개 채용공고
          </div>
        </div>
        <div className='space'>
          <JobDropdown buttonText='지역'
            dropdownContent={Region}
            selectedOne = {selectedRegion}
            handleChange={handleRegionChange}
            backcolor={width <= 400 ? 'gray' : 'white'}
            underline={width <= 400 ? false : true}
            showOptions={width <= 400 ? false : true}>
          </JobDropdown>
          <JobDropdown buttonText='정렬'
            dropdownContent={Order}
            selectedOne = {selectedOrder}
            handleChange={handleOrderChange}
            backcolor={width <= 400 ? 'gray' : 'white'}
            underline={width <= 400 ? false : true}
            closeOnSelect ={true}
            multiple = {false}
            showOptions={width <= 400 ? false : true}>
          </JobDropdown>
          <JobClick buttonText={showOpenJobs ? '현재 모집' : '전체 공고'}
            toggleOpen = {toggleOpenJobs}
            showOpen = {showOpenJobs}
            size={width <= 400 ? 'small' : 'medium'}>
          </JobClick>
        </div>
      </div>

    <PostingList
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage} 
      pageInfo={pageInfo} 
      postList={postList} 
    />
  </div>)
  }    
  export default JobPosting;
  