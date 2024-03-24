import React, {useEffect, useState} from 'react';
import './PostingList.css';
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdCircle,
} from "react-icons/md";
// npm i react-icons@4.11.0

function PostingList({currentPage, setCurrentPage, pageInfo, postList}) {

  // 직무별 색깔 다르게
  const jobStyles = {
    '머신러닝/딥러닝 엔지니어': { backgroundColor: '#f8ad9d40', color: '#e5383b' },
    '머신러닝/딥러닝 리서처': { backgroundColor: '#fae58840', color: '#ffc300' },
    '데이터 사이언티스트': { backgroundColor: '#b2f7ef40', color: '#72efdd' },
    '데이터 엔지니어': { backgroundColor: '#caf0f850', color: '#4361ee' },
    'AI 서비스 개발자': { backgroundColor: '#eae2b750', color: '#f77f00' },
    'AI 서비스 기획자': { backgroundColor: '#d8f3dc60', color: '#52b788' },
    'AI 아티스트': { backgroundColor: '#fff0f360', color: '#ff758f' },
  };

  // 얼마나 지난 공고인지
  function countdate(date){
    const today = new Date();
    const crawlingdate = new Date(date);
    let diff = Math.abs(today.getTime()-crawlingdate.getTime());
    diff = Math.ceil(diff/(1000*60*60*24));
    return diff
  };
  

  // 요일 출력용
  function getWeekday (dateString) {
    const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
    const date = new Date(year, month - 1, day);
    const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
    return WEEKDAY[date.getDay()];
  };

  // 줄 바꿈 용
  function addLineBreaks(text, maxLineLength) {
    const words = text.split(' ');
    let lineLength = 0;
    const formattedText = [];
    words.forEach((word, index) => {  
      if (lineLength + word.length + 1 > maxLineLength && index !== 0) { 
        formattedText.push(<br key={index}/>); 
        // 넘어가는 친구들만 확인
        // console.log('text:',text, 'formattedText:',formattedText)
        lineLength = 0;
      }
      formattedText.push(word + ' ');
      lineLength += word.length + 1;
    });
    return formattedText;
  };

  //최대 단어 갯수 세고 나머지 ...으로 대체
  function addLineBreaksAndErase(text, maxLineLength) {
    const words = text.split(' ');
  let lineLength = 0;
  const formattedText = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (lineLength + word.length + 1 > maxLineLength) {
      formattedText.push("...");
      break;
    }
    formattedText.push(word + ' ');
    lineLength += word.length + 1;
  }
  return formattedText;
  }


  //페이지네이션 용
  const pageNumber = [];
  const limit = 10 ;
  const [currentPageArray, setCurrentPageArray] = useState([]);

  if(pageInfo){
      for(let i = 1; i <= pageInfo.pageEnd ; i++){
          pageNumber.push(i);
      }
  }

  useEffect(()=>{
      const startIndex = Math.floor((currentPage-1)/limit)*limit;
      setCurrentPageArray(pageNumber.slice(startIndex,startIndex+limit));
  }, [currentPage, pageInfo]);


return(
<>
  <div className='container'>
    <table className='table'>
      <tbody>
        {Array.isArray(postList) && postList.map((p,index) => (
          <tr key={index}>
            <td>
              <span className='space_posting'>
                <div className='user'>
                  <img src='https://static.wanted.co.kr/images/wdes/0_5.be5f31e8.png' alt='' width={30} height={30}/>
                </div>
                <div>
                  <div className='title'>
                    {addLineBreaks(p.recru_title, 45)}
                  </div>
                  <div style={{marginTop:'5px', fontSize:'10px'}}>
                    {p.recru_company}
                    <span className='period'>
                      {countdate(p.recru_crawling_date)}일 전
                    </span>
                  </div>
                </div>
              </span>
            </td>
            <td>
              <div style={{width:'80px'}}>
                  {p.recru_end_date ? ( <span>~{p.recru_end_date.substr(5)}({getWeekday(p.recru_end_date)})</span>
                  ):( <span>상시채용</span>
                  )}
              </div>
              <div style={{marginTop:'4px'}}>
                <span style={{color:'#adb5bd'}}>In</span> {p.recru_region}
              </div>
            </td>
            <td>
              <div style={{width:'150px'}}>
                <div style={{backgroundColor:jobStyles[p.recru_job].backgroundColor, padding:'8px', borderRadius:'12px', width:'fit-content'}}>
                  <MdCircle size={10} color={jobStyles[p.recru_job].color}/><span style={{marginLeft:'4px'}}>{p.recru_job}</span>
                </div>
              </div>
            </td>
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

    <div className="paging-container">
      {Array.isArray(postList) &&
        <div>
          <button
              className="pagingbtn"
              onClick={() => {setCurrentPage(currentPage - 1);
              window.scrollTo(0,0);}} 
              disabled={currentPage === 1}> 
              <div className='pagingbtn-text'>
                <span><MdArrowBackIos size={10}/></span> 
                <span>이전</span>
              </div>
          </button>
        </div>
      }&nbsp;&nbsp;
      {currentPageArray.map((num) => (
        <div key={num} onClick={() => {setCurrentPage(num);
            window.scrollTo(0,0);}}>
            <button
                className="pagingbtn"
                style={ currentPage === num ? {color : '#b5179e', fontWeight:'bold' } : {color:'#adb5bd'}}
            > {num}
            </button>&nbsp;&nbsp;
        </div>
      ))}
      {Array.isArray(postList) &&
        <div>
          <button 
              className="pagingbtn"
              onClick={() => {setCurrentPage(currentPage + 1);
              window.scrollTo(0,0);}}
              // disabled={currentPage === pageInfo.pageEnd  || pageInfo.total === 0}
              >
              <div className='pagingbtn-text'>
                <span style={{marginRight:'5px'}}>다음</span>
                <span><MdArrowForwardIos size={10}/></span> 
              </div>
          </button>
        </div>
      }
    </div>
  </div>

<div className='container_media'>
<table className='table'>
  <tbody>
    {Array.isArray(postList) && postList.map((p,index) => (
      <tr key={index}>
        <td>
          <div className='space'>
            <div>
              <div className='title'>
                {addLineBreaksAndErase(p.recru_title, 30)}
              </div>
              <div className='space_first'>
                <div>
                  {p.recru_end_date ? ( <span>~{p.recru_end_date.substr(5)}({getWeekday(p.recru_end_date)})</span>
                  ):( <span>상시채용</span>
                  )}
                </div>
                <div style={{backgroundColor:jobStyles[p.recru_job].backgroundColor, padding:'2px 7px', borderRadius:'12px', width:'fit-content'}}>
                  <MdCircle size={7} color={jobStyles[p.recru_job].color}/><span style={{marginLeft:'4px',fontSize:'10px'}}>{p.recru_job}</span>
                </div>
              </div>
            </div>
            <div>
              <div className='buttons'>
                {p.recru_closed === 'false' ? (
                  <button className='button view'
                  onClick={() => window.open(p.recru_url, '_blank')}>
                    지원
                  </button>
                ):(<button className='button delete'>
                    마감
                  </button>)}
              </div>
            </div>
          </div>
          <br></br>
          
          <span className='space_posting'>
            <div className='user'>
              <img src='https://static.wanted.co.kr/images/wdes/0_5.be5f31e8.png' alt='' width={20} height={20}/>
            </div>
            <div>
              <div style={{marginTop:'5px', fontSize:'10px'}}>
                {p.recru_company}
                <span className='period'>
                  {p.recru_region}
                </span>
              </div>
            </div>
          </span>
        </td>
      </tr>
       ))}
  </tbody>
</table>

<div className="paging-container">
  {Array.isArray(postList) &&
    <div>
      <button
          className="pagingbtn"
          onClick={() => {setCurrentPage(currentPage - 1);
          window.scrollTo(0,0);}} 
          disabled={currentPage === 1}> 
          <div className='pagingbtn-text'>
            <span><MdArrowBackIos size={10}/></span> 
            <span>이전</span>
          </div>
      </button>
    </div>
  }&nbsp;&nbsp;
  {Array.isArray(postList) &&
    <div>
      <button 
          className="pagingbtn"
          onClick={() => {setCurrentPage(currentPage + 1);
          window.scrollTo(0,0);}}
          // disabled={currentPage === pageInfo.pageEnd  || pageInfo.total === 0}
          >
          <div className='pagingbtn-text'>
            <span style={{marginRight:'5px'}}>다음</span>
            <span><MdArrowForwardIos size={10}/></span> 
          </div>
      </button>
    </div>
  }
</div>
</div>
</>)
}
export default PostingList;