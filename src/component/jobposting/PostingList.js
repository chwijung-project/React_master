import './PostingList.css';

function PostingList({postList}) {

    // 요일 출력용
    const getWeekday = (dateString) => {
      const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
      const date = new Date(year, month - 1, day);
      const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
      return WEEKDAY[date.getDay()];
    };

    // 줄 바꿈 용
    function addLineBreaksJSX(text, maxLineLength) {
      const words = text.split(' ');
      let lineLength = 0;
      let currentLine = 1;
      const formattedText = [];
      
      words.forEach((word, index) => {  
        if (lineLength + word.length + 1 > maxLineLength && index !== 0) { 
          formattedText.push(<br key={index}/>); 
          // 넘어가는 친구들만 확인
          console.log('text:',text, 'formattedText:',formattedText)
          lineLength = 0;
        }
    
        formattedText.push(word + ' ');
        lineLength += word.length + 1;
      });
    
      return formattedText;
    }


    return(
        <div className="posting-table">             
          {Array.isArray(postList) && postList.map((p) => (
          <div key={p.recru_idx} className="posting-list">
            <div className="sort-container">
              <div>
                <button className="posting-logo-able">
                </button>
                <br></br>
                {/* {p.recru_closed === "false" ? (
                  <span style={{textAlign:'center',display:'flex',color:'blue',marginLeft:'5px',marginTop:'5px',marginBottom:'-10px',fontSize:'21px'}}>지원가능</span>
                ): (
                  <span style={{textAlign:'center',color:'gray',marginLeft:'5px',marginTop:'5px',marginBottom:'-10px',fontSize:'21px'}}>공고마감</span>
                )} */}
              </div>
              
              <div className="posting-title">
                {p.recru_closed === "false" ? (
                  <a href={p.recru_url} target="_blank" rel="noreferrer" style={{fontWeight:'bold'}}>{addLineBreaksJSX(p.recru_title, 50)}</a>
                ): (
                  <span style={{color:'#495057'}}>{addLineBreaksJSX(p.recru_title, 50)}</span>
                )}
                <br></br>
                <div className="posting-company">
                {p.recru_company}
                </div>
                <div className="posting-job">
                {p.recru_job}
                </div>
              </div>
              <div>
                <div className="posting-region">
                📍{p.recru_region}
                </div>
                <div className="posting-enddate">
                  {p.recru_end_date ? (
                    <span>📅~{p.recru_end_date.substr(5)}({getWeekday(p.recru_end_date)})</span>
                  ): (
                    <span>📅상시채용</span>
                  )}
                </div>
              </div>
              <div className='input-style'>
                {p.recru_closed === "false" ? (
                     <input
                     type='button'
                     onClick={() => window.open(p.recru_url, '_blank')}
                     value='지원하기'
                     style={{ backgroundColor: '#00bbf9', color: '#f8f7ff', fontWeight:'bold'}}
                   />
                  ): (
                    <input
                     type='button'
                     onClick={() => window.open(p.recru_url, '_blank')}
                     value='공고마감'
                     style={{cursor:'text',color:'#6c757d'}}
                   />
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