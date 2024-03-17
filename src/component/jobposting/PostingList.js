import './PostingList.css';
import {
  MdArrowDropDown,
  MdSearch,
  MdAutoFixHigh
} from "react-icons/md";
// npm i react-icons@4.11.0

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
      <div className='container'>
        <div className='top' style={{fontSize:'14px'}}>
          <div className='space'>
            <div className='container_search'>
              <MdSearch />
              <input 
                type='text'
                placeholder='Search for job'
                className='input_search'
              />
            </div>
            <div>1505개 채용공고</div>
          </div>
          <div className='space'>
            <button className='addButton'>
              <MdAutoFixHigh size={12}/>
              채용중
            </button>
            <button className='addButton'>
              최신순 
              <MdArrowDropDown size={12}/>
            </button>
            <button className='addButton'>
              지역
              <MdArrowDropDown size={12}/>
            </button>
          </div>
        </div>
        <br></br>

        <table className='table'>
          <thead>
              <tr>
              <td>공고명</td>
              <td>회사명</td>
              <td>직무명</td>
              <td>위치</td>
              <td>마감일</td>
              <td>공고지원</td>
              </tr>
          </thead>
          <tbody>
           {Array.isArray(postList) && postList.map((p,index) => (
            <tr key={index}>
              <td>
                <div className='user'>
                  <img src='noavatar.png' alt='' width={40} height={40}/>
                  {addLineBreaksJSX(p.recru_title, 50)}
                </div>
              </td>
              <td>{p.recru_company}</td>
              <td>{p.recru_job}</td>
              <td>{p.recru_region}</td>
              <td>{p.recru_end_date ? ( <span>~{p.recru_end_date.substr(5)}({getWeekday(p.recru_end_date)})</span>
              ):( <span>상시채용</span>
              )}</td>
              <td>
                <div className='buttons'>
                  {p.recru_closed === 'false' ? (
                    <button className='button view'
                    onClick={() => window.open(p.recru_url, '_blank')}>
                      지원하기
                    </button>
                  ):(<button className='button delete'>
                      공고마감
                    </button>)}
                </div>
              </td>

            </tr>
           ))}
          </tbody>
        </table>
        <br></br>
        <div className='container_pgn'>
          <button className='button_pgn disabled'>
            이전
          </button>
          <button className='button_pgn'>
            다음
          </button>
        </div>
        {/* <div className="posting-table">             
          {Array.isArray(postList) && postList.map((p) => (
          <div key={p.recru_idx} className="posting-list">
            <div className="sort-container">
              <div>
                <button className="posting-logo-able">
                </button>
                <br></br>
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
      </div> */}
      </div>
    )
}
export default PostingList;