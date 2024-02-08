import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callPostListAPI } from "../../api/PostingAPICall";
import './Pagination.css';


function Pagination() {

    const dispatch = useDispatch();
    const posting = useSelector(state => state.postReducer);
    //Redux사용->Redux스토어 업데이트 및 정보 가져오기
    //postReducer:Modules>PostModule.js에 있음

    const postList = posting.data; //채용공고 정보
    const [currentPage, setCurrentPage] = useState(1);
    const pageInfo = posting.pageInfo; //전체 공고 개수
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
            }));            
        }
        ,[currentPage]
    );

    return (
        <div className="paging-container">
            {Array.isArray(postList) &&
            <button
                className="pagingbtn"
                onClick={() => {setCurrentPage(currentPage - 1);
                window.scrollTo(0,0);}} 
                disabled={currentPage === 1}
            >
                &lt; 이전
            </button>
            }&nbsp;&nbsp;
            {pageNumber.map((num) => (
            <div key={num} onClick={() => {setCurrentPage(num);
                window.scrollTo(0,0);}}>
                <button
                    className="pagingbtn"
                    style={ currentPage === num ? {color : '#FFC34E', fontWeight:'bold' } : null}
                >
                    {num}
                </button>&nbsp;&nbsp;
            </div>
            ))}
            {Array.isArray(postList) &&
            <button 
                className="pagingbtn"
                onClick={() => {setCurrentPage(currentPage + 1);
                window.scrollTo(0,0);}} 
                disabled={currentPage === pageInfo.pageEnd  || pageInfo.total === 0}
            >
                다음 &gt;
            </button>
            }
            </div>
    )
}
export default Pagination;


