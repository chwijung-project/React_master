import './PostingList.css';

function PostingList({postList}) {

    return(
        <div className="posting-table">
        {Array.isArray(postList) && postList.map((p) => (
          <div id={p.recru_idx} className="posting-list">
            <div className="sort-container">
              <div>
                <button className="posting-logo-able">
                </button>
                <br></br>
                {p.recru_closed === "false" ? (
                  <span style={{textAlign:'center',display:'flex',color:'blue',marginLeft:'35px',marginTop:'5px',marginBottom:'-10px',fontSize:'21px'}}>지원가능</span>
                ): (
                  <span style={{textAlign:'center',color:'gray',marginLeft:'35px',marginTop:'5px',marginBottom:'-10px',fontSize:'21px'}}>공고마감</span>
                )}
              </div>
              
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
              <div className="posting-enddate">
                {p.recru_end_date ? (
                  <span>{p.recru_end_date}</span>
                ): (
                  <span>상시채용</span>
                )}
              </div>
            </div>
          </div>
        ))
        }   
      </div>
    )
}
export default PostingList;