import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callPostListAPI } from "../../api/PostingAPICall";
import './JobPosting.css';

function JobPosting() {

  const dispatch = useDispatch();
  const posting = useSelector(state => state.postReducer);
  const postList = posting.data;
  const pageInfo = posting.pageInfo;
  const [currentPage, setCurrentPage] = useState(1);
  
  const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
  }

  useEffect(
    () => {
        dispatch(callPostListAPI({
            currentPage: currentPage
        }));            
    }
    ,[currentPage]
  );

    return (
      <>
        <div className="posting-container">
          <div className="posting-box">
            <div className="title">채용공고</div>
            <div className="posting-list">
                <table className="posting-table">
                <thead>
                  <button>정렬버튼1</button>
                  <button>정렬버튼2</button>
                  <button>정렬버튼3</button>
                </thead>
                  {Array.isArray(postList) && postList.map((p) => (
                    <tr 
                      key={p.idx} 
                    >
                      <td
                        className="postarticle"
                        onClick={() => window.location.href = p.url}>
                          <div>{p.recruit}</div>
                          <div>{p.company}</div>
                      </td>
                      <td>{p.jobname}</td>
                      <td>{p.region}</td>
                    </tr>
                  ))}
                </table>
            </div>
          </div>
        </div>


        <div className="paging-container" style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
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
        </div>
      </>


    )
  }    
  export default JobPosting;
  