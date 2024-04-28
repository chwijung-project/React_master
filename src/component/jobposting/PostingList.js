import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { callPostListAPI } from "../../api/PostingAPICall";
import './PostingList.css';
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdCircle,
} from "react-icons/md";
// npm i react-icons@4.11.0

function PostingList() {
  // const dispatch = useDispatch();
  const postList = useSelector(state => state.postReducer.data);
  console.log("postList",postList)

  //직무별 다른 색깔
  const jobStyles = {
    '머신러닝/딥러닝 엔지니어': { backgroundColor: '#e69f0030', color: '#e69f00',short:'MLE' },
    '머신러닝/딥러닝 리서처': { backgroundColor: '#56b4e930', color: '#56b4e9', short:'MLR' },
    '데이터 사이언티스트': { backgroundColor: '#009e7330', color: '#009e73',short:'DS' },
    '데이터 엔지니어': { backgroundColor: '#d5cb3b40', color: '#d5cb3b',short:'DE' },
    'AI 서비스 개발자': { backgroundColor: '#0072b230', color: '#0072b2',short:'AI DEV' },
    'AI 서비스 기획자': { backgroundColor: '#d55e0030', color: '#d55e00',short:'AI PM' },
    'AI 아티스트': { backgroundColor: '#cc79a730', color: '#cc79a7',short:'AI ART' },
  };

  //2차 직무 요약어
  const jobSub = {
    'natural language proc':{short:'NLP'},
    'computer vision':{short:'CV'},
    'computer graphics':{short:'CG'},
    'robotics':{short:'RO'},
    'speech/sigProc':{short:'SP'},
    'data mining':{short:'DM'},
    'automated planning':{short:'AP'},
    'knowledge representation':{short:'KR'},
    'human-computer interaction':{short:'HCI'},
    'medical AI':{short:'Medical'},
    'null':{short:''}
  }

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

return(
<div className='postinglist_container'>
  <div className='postinglist_wrapper'>
    {Array.isArray(postList)&&postList.map((p,index) => (
      <div key={index} className='postinglist_contents'>
          <div className='postinglist_first'>
            <div className='postinglist_logo'>
              <img src={p.recru_logo} alt=''/>
            </div>
            <div className='postinglist_first_right' onClick={() => window.open(p.recru_url, '_blank')}>
              <div className='postinglist_title' >
                {addLineBreaks(p.recru_title, 45)}
              </div>
              {/* 미디어쿼리 적용부분 */}
              <div className='postinglist_title_media'>
                {addLineBreaksAndErase(p.recru_title, 30)}
              </div>
              
              <div className='postinglist_subinfo'>
                {/* 미디어쿼리 적용부분 */}
                <div className='postinglist_subinfo_media'>
                  <div className='postinglist_media_first'>
                    <div className='postinglist_endate'>
                      {p.recru_end_date ? ( <span>~{p.recru_end_date.substr(5)}
                        ({getWeekday(p.recru_end_date)})</span>):
                        (<span>상시채용</span>)}
                    </div>
                    <div style={{display:'flex'}}>
                      {p.job_names.split(', ').map((job,index) => (
                        <div key={index} className='postinglist_jobstyle' style={{backgroundColor: jobStyles[job].backgroundColor}}>
                          <MdCircle size={6} color={jobStyles[job].color}/>
                          <span className='postinglist_jobname'>
                          {jobStyles[job].short === 'MLR'?(
                            <span>{jobStyles[job].short}<span style={{marginLeft:'5px',color:'#80868d', fontSize:'9px'}}>{jobSub[p.job_sub_names].short}</span></span>):
                            (<span>{jobStyles[job].short}</span>)}   
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='postinglist_media_second'>
                    <img src={p.recru_logo} alt=''/>
                    {p.recru_company}
                    <div className='postinglist_region'>
                      <span style={{color:'#adb5bd'}}>{p.recru_region}</span> 
                    </div>
                  </div>
                </div>
                
                <div className='postinglist_company'>
                  {p.recru_company}
                </div>
                <div className='postinglist_period'>
                  {countdate(p.recru_crawling_date)}일 전
                </div>
              </div>
            </div>
          </div>
          
          <div className='postinglist_second'>
            <div className='postinglist_endate'>
              {p.recru_end_date ? ( <span>~{p.recru_end_date.substr(5)}
                ({getWeekday(p.recru_end_date)})</span>):
                (<span>상시채용</span>)}
            </div>
            <div className='postinglist_region'>
              <span style={{color:'#adb5bd'}}>In</span> {p.recru_region}
            </div>
          </div>
          <div className='postinglist_third'>
            <div style={{display:'flex',gap:'8px'}}>
              {p.job_names.split(', ').map((job,index) => (
                <div key={index} className='postinglist_jobstyle' style={{backgroundColor: jobStyles[job].backgroundColor}}>
                  <MdCircle size={6} color={jobStyles[job].color}/>
                  <span className='postinglist_jobname'>
                    {job === '머신러닝/딥러닝 리서처'?(
                      <span>{job}<span style={{marginLeft:'5px',color:'#80868d',fontSize:'9px'}}>{jobSub[p.job_sub_names].short}</span></span>):
                      (<span>{job}</span>)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className='postinglist_last'>
            {p.recru_closed_date ? (
              <button className='button delete'>
              공고마감</button>):(<button className='button view' onClick={() => window.open(p.recru_url, '_blank')}>
              지원하기</button>
              )}
          </div>

          {/* 미디어쿼리 적용부분 */}
          <div className='postinglist_last_media'>
            {p.recru_closed_date ? (
            <button className='button delete'>
            마감</button>):(<button className='button view' onClick={() => window.open(p.recru_url, '_blank')}>
            지원</button>)}
          </div>
          {/* 미디어쿼리 적용부분 */}
      </div>
    ))}
  </div>
  <br></br>
</div>
)
}
export default PostingList;