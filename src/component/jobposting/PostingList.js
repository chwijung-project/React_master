import './PostingList.css';

function PostingList({postList, selectedJob, showOpenJobs}) {

    return(
        <div className="posting-table">
        {Array.isArray(postList) && postList
        .filter(p => !selectedJob || p.recru_job === selectedJob)
        .filter(p => !showOpenJobs || p.recru_closed === "false")
        .map((p) => (
          <div id={p.recru_idx} className="posting-list">
            <div className="sort-container">
              {p.recru_closed === "false" ? (
                <button className="posting-logo-able">
                  Apply</button>
              ): (
                <button className="posting-logo-unable">
                  ㅡ</button>
              )}
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
            </div>
          </div>
        ))
        }   
      </div>
    )
}
export default PostingList;