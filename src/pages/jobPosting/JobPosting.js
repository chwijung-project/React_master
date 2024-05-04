import './JobPosting.css';
import PostingBanner from '../../component/jobposting/PostingBanner';
import PostingList from "../../component/jobposting/PostingList";
import PostingFilter from "../../component/jobposting/PostingFilter";
import PostingPgn from "../../component/jobposting/PostingPgn";


function JobPosting() {  

  return (
  <>
    <div className="edu_first">
      <PostingBanner/>
    </div>
    <div className="total">
      <div className="box">
        <PostingFilter/>
        <PostingList/>
        <br></br>
        <PostingPgn/>
      </div>
    </div>
  </>
  );
  };   
  export default JobPosting;
  