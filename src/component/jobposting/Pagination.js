import './Pagination.css';


function Pagination({ currentPage, setCurrentPage, pageInfo, postList }) {
    const pageNumber = [];

    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
  }

    return (
        <div className="paging-container">
            {Array.isArray(postList) &&
                <button
                    className="pagingbtn"
                    onClick={() => {setCurrentPage(currentPage - 1);
                    window.scrollTo(0,0);}} 
                    disabled={currentPage === 1}
                    > &lt; 이전
                </button>
            }&nbsp;&nbsp;
            {pageNumber.map((num) => (
            <div key={num} onClick={() => {setCurrentPage(num);
                window.scrollTo(0,0);}}>
                <button
                    className="pagingbtn"
                    style={ currentPage === num ? {color : '#FFC34E', fontWeight:'bold' } : null}
                > {num}
                </button>&nbsp;&nbsp;
            </div>
            ))}
            {Array.isArray(postList) &&
                <button 
                    className="pagingbtn"
                    onClick={() => {setCurrentPage(currentPage + 1);
                    window.scrollTo(0,0);}} 
                    // disabled={currentPage === pageInfo.pageEnd  || pageInfo.total === 0}
                > 다음 &gt;
                </button>
            }
        </div>
    )
}
export default Pagination;


