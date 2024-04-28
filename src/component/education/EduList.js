import React, {useEffect, useState} from 'react';
import './EduList.css';
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdCircle,
} from "react-icons/md";
// npm i react-icons@4.11.0

const edu_data  = [
  {
    'edu_idx': 1,
    'edu_company': '패스트캠퍼스강남학원',
    'edu_region': '서울 강남구',
    'edu_title': 'AI Lab',
    'edu_start': '2024-04-01',
    'edu_end': '2024-11-08',
    'edu_period': 151,
    'edu_time': "1,120",
    'edu_cost': "20,328,000",
    'edu_fee': 0,
    'edu_can': false,
    'edu_url': "https://www.hrd.go.kr/hrdp/co/pcobo/PCOBO0100P.do?tracseId=AIG20230000412718&tracseTme=4&crseTracseSe=C0061&trainstCstmrId=500033945638#undefined",
    'edu_logo': "https://www.hrd.go.kr/comm/com/fileDownload.do?athfilId=PzSCGOZ2jayzXp2gwmS1Aw&athfilSeqNo=4"
  },
  {
    'edu_idx': 2,
    'edu_company': '러닝팩토리 원격평생교육원',
    'edu_region': '서울 서초구',
    'edu_title': '당장 시작해야 하는 ChatGPT와 AI 스마트워크',
    'edu_start': '2024-04-08',
    'edu_end': '2024-05-08',
    'edu_period': null,
    'edu_time': 21,
    'edu_cost': "62,370",
    'edu_fee': "34,310",
    'edu_can': true,
    'edu_url': "https://www.hrd.go.kr/hrdp/co/pcobo/PCOBO0100P.do?tracseId=ACG20243000972933&tracseTme=43&crseTracseSe=C0031&trainstCstmrId=500020035790#undefined",
    'edu_logo': "https://www.hrd.go.kr/comm/com/fileDownload.do?athfilId=DDYAHDFbsMGzXp2gwmS1Aw&athfilSeqNo=1"
  },
  {
    'edu_idx': 3,
    'edu_company': '에듀퓨어',
    'edu_region': '경기 고양시',
    'edu_title': '디지털융합시대를 향한 필수 선택! UPGRADE-BLOCKCHAIN',
    'edu_start': '2024-04-29',
    'edu_end': '2024-05-28',
    'edu_period': null,
    'edu_time': 21,
    'edu_cost': "87,780",
    'edu_fee': "48,280",
    'edu_can': true,
    'edu_url': "https://www.hrd.go.kr/hrdp/co/pcobo/PCOBO0100P.do?tracseId=ACG20233000921188&tracseTme=341&crseTracseSe=C0031&trainstCstmrId=500020034527#undefined",
    'edu_logo': "https://www.hrd.go.kr/comm/com/fileDownload.do?athfilId=Ah9BkK0yiPRqzXp2gwmS1Aw&athfilSeqNo=1"
  },
  {
    'edu_idx': 4,
    'edu_company': '러닝플러스 주식회사',
    'edu_region': '부산 부산진구',
    'edu_title': '당장 시작해야 하는 ChatGPT와 AI 스마트워크',
    'edu_start': '2024-04-01',
    'edu_end': '2024-04-30',
    'edu_period': null,
    'edu_time': 21,
    'edu_cost': "62,370",
    'edu_fee': "34,310",
    'edu_can': true,
    'edu_url': "https://www.hrd.go.kr/hrdp/co/pcobo/PCOBO0100P.do?tracseId=ACG20243000986106&tracseTme=21&crseTracseSe=C0031&trainstCstmrId=500020021711#undefined",
    'edu_logo': "https://www.hrd.go.kr/comm/com/fileDownload.do?athfilId=37sCz2DqD5OzXp2gwmS1Aw&athfilSeqNo=1"
  },
  {
    'edu_idx': 5,
    'edu_company': '러닝플러스 주식회사',
    'edu_region': '부산 부산진구',
    'edu_title': '빠르고 쉽게 배우는 파이썬을 이용한 인공지능',
    'edu_start': '2024-04-01',
    'edu_end': '2024-04-30',
    'edu_period': null,
    'edu_time': 21,
    'edu_cost': "129,360",
    'edu_fee': "71,150",
    'edu_can': true,
    'edu_url': "https://www.hrd.go.kr/hrdp/co/pcobo/PCOBO0100P.do?tracseId=ACG20233000912503&tracseTme=229&crseTracseSe=C0031&trainstCstmrId=500020021711#undefined",
    'edu_logo': "https://www.hrd.go.kr/comm/com/fileDownload.do?athfilId=37sCz2DqD5OzXp2gwmS1Aw&athfilSeqNo=1"
  },
  {
    'edu_idx': 6,
    'edu_company': '한국직업개발원원격평생교육시설',
    'edu_region': '서울 성동구',
    'edu_title': '처음 배우는 AIoT, 인공지능 개발과 적용 프로세스',
    'edu_start': '2024-04-29',
    'edu_end': '2024-06-07',
    'edu_period': 40,
    'edu_time': 58,
    'edu_cost': "490,000",
    'edu_fee': "49,000",
    'edu_can': true,
    'edu_url': "https://www.hrd.go.kr/hrdp/co/pcobo/PCOBO0100P.do?tracseId=AIG20220000409530&tracseTme=88&crseTracseSe=C0105&trainstCstmrId=500020046229#undefined",
    'edu_logo': "https://www.hrd.go.kr/comm/com/fileDownload.do?athfilId=jQEcAWgmxRyzXp2gwmS1Aw&athfilSeqNo=4"
  },
  {
    'edu_idx': 7,
    'edu_company': '이룸캠퍼스',
    'edu_region': '경기 수원시',
    'edu_title': '디지털융합시대를 향한 필수 선택! UPGRADE-BLOCKCHAIN',
    'edu_start': '2024-05-01',
    'edu_end': '2024-05-31',
    'edu_period': null,
    'edu_time': 21,
    'edu_cost': "129,360",
    'edu_fee': "71,150",
    'edu_can': true,
    'edu_url': "https://www.hrd.go.kr/hrdp/co/pcobo/PCOBO0100P.do?tracseId=ACG20233000920549&tracseTme=24&crseTracseSe=C0031&trainstCstmrId=500020055230#undefined",
    'edu_logo': "https://www.hrd.go.kr/comm/com/fileDownload.do?athfilId=Yk48vWEVSsGzXp2gwmS1Aw&athfilSeqNo=1"
  },
  {
    'edu_idx': 8,
    'edu_company': '주식회사스마트동스쿨',
    'edu_region': '서울 마포구',
    'edu_title': 'AItopia - 인공지능이 만들어갈 세상',
    'edu_start': '2024-04-01',
    'edu_end': '2024-04-30',
    'edu_period': null,
    'edu_time': 21,
    'edu_cost': "62,370",
    'edu_fee': "34,310",
    'edu_can': true,
    'edu_url': "https://www.hrd.go.kr/hrdp/co/pcobo/PCOBO0100P.do?tracseId=ACG20243000987711&tracseTme=11&crseTracseSe=C0031&trainstCstmrId=500020049047#undefined",
    'edu_logo': "https://www.hrd.go.kr/comm/com/fileDownload.do?athfilId=1Z9CxCUC09B6CzXp2gwmS1Aw&athfilSeqNo=1"
  },
  {
    'edu_idx': 9,
    'edu_company': '동성인재개발교육원',
    'edu_region': '부산 부산진구',
    'edu_title': 'AI기반 스마트융합(JAVA, PYTHON) 풀스택 개발자 양성',
    'edu_start': '2024-04-01',
    'edu_end': '2024-09-30',
    'edu_period': 123,
    'edu_time': 980,
    'edu_cost': "9,287,460",
    'edu_fee': 0,
    'edu_can': false,
    'edu_url': "https://www.hrd.go.kr/hrdp/co/pcobo/PCOBO0100P.do?tracseId=AIG20230000455673&tracseTme=2&crseTracseSe=C0061&trainstCstmrId=500020041918#undefined",
    'edu_logo': "https://www.hrd.go.kr/comm/com/fileDownload.do?athfilId=26jjDUcxv1yzXp2gwmS1Aw&athfilSeqNo=8"
  },
  {
    'edu_idx': 10,
    'edu_company': '러닝플러스 주식회사',
    'edu_region': '부산 부산진구',
    'edu_title': '[전사원 UP!] 빅데이터로 관통하는 4차산업의 미래',
    'edu_start': '2024-04-01',
    'edu_end': '2024-04-30',
    'edu_period': null,
    'edu_time': 21,
    'edu_cost': "62,370",
    'edu_fee': "21,830",
    'edu_can': true,
    'edu_url': "https://www.hrd.go.kr/hrdp/co/pcobo/PCOBO0100P.do?tracseId=ACG20233000911258&tracseTme=229&crseTracseSe=C0031&trainstCstmrId=500020021711#undefined",
    'edu_logo': "https://www.hrd.go.kr/comm/com/fileDownload.do?athfilId=37sCz2DqD5OzXp2gwmS1Aw&athfilSeqNo=1"
  }
]

function EduList() {
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

  //개강일 며칠 남았는지
  function countdate(date){
    const today = new Date();
    const startdate = new Date(date);
    let diff = Math.ceil(startdate.getTime()-today.getTime());
    if (diff > 0) {
      return Math.ceil(diff/(1000*60*60*24));
    } else if (diff === 0) {
      return "day";
    } else {
      return null;
    }
  };

  return(
  <>
    <div className='edulist_container'>
      <div className='postinglist_wrapper'>
        {Array.isArray(edu_data)&&edu_data.map((p,index) => (
          <div className='postinglist_contents'>
              <div className='postinglist_first'>
                <div className='postinglist_logo'>
                  <img src={p.edu_logo} alt=''/>
                </div>
                <div className='postinglist_first_right' onClick={() => window.open(p.edu_url, '_blank')}>
                  <div className='postinglist_title' >
                    {addLineBreaks(p.edu_title, 45)}
                  </div>
                  {/* 미디어쿼리 적용부분 */}
                  <div className='postinglist_title_media'>
                    {addLineBreaksAndErase(p.edu_title, 30)}
                  </div>
                  
                  <div className='postinglist_subinfo'>
                    {/* 미디어쿼리 적용부분 */}
                    <div className='postinglist_subinfo_media'>
                      <div className='postinglist_media_first'>
                        <div className='postinglist_endate'>
                          <span>{p.edu_start.slice(2)}~{p.edu_end.slice(2)}</span>
                          <span style={{marginLeft:"2px", fontSize:"7px"}}>
                            (총{p.edu_time}시간 {p.edu_fee === 0 ? "무료":(<span>{p.edu_fee}원</span>)})
                          </span>
                        </div>
                      </div>
                      <div className='postinglist_media_second'>
                        <img src={p.edu_logo} alt=''/>
                        {p.edu_company}
                        <div className='postinglist_region'>
                          <span style={{color:'#adb5bd'}}>{p.edu_region}</span> 
                        </div>
                      </div>
                    </div>
                    
                    <div className='postinglist_company'>
                      {p.edu_company}
                    </div>
                    <div className='postinglist_period'>
                      {countdate(p.edu_start) ? `D-${countdate(p.edu_start)}` : null}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className='postinglist_second' style={{ width:"22%"}}>
                <div className='postinglist_endate'>
                  {p.edu_start}~{p.edu_end}
                </div>
                <div className='postinglist_region'>
                  <span style={{color:'#adb5bd'}}>In</span> {p.edu_region}
                </div>
              </div>
              <div className='postinglist_third' style={{width:"14%"}}>
                <div className='postinglist_jobstyle'>
                  총{p.edu_time}시간
                </div>
              </div>
              <div className='postinglist_forth' style={{width:"14%"}}>
                <div className='postinglist_jobstyle'>
                  {p.edu_fee === 0 ? "무료":(<span>{p.edu_fee}원</span>)}
                </div>
              </div>
              <div className='postinglist_last'>
                {p.edu_can ? (
                <button className='button url' onClick={() => window.open(p.edu_url, '_blank')}>
                  지원하기
                </button>):(<button className='button no'>
                  모집마감
                </button>)}
              </div>

              {/* 미디어쿼리 적용부분 */}
              <div className='postinglist_last_media'>
                {p.edu_can ? (
                <button className='button url' onClick={() => window.open(p.edu_url, '_blank')}>
                  지원
                </button>):(<button className='button no'>
                  마감
                </button>)}
              </div>
              {/* 미디어쿼리 적용부분 */}
          </div>
        ))}
      </div>

      {/* <div className='pgn_wraper'>
        {Array.isArray(edu_data) &&
          <div className='pgn_button'>
            <button onClick={() => {setCurrentPage(currentPage - 1);
            window.scrollTo(0,0);}} 
            disabled={currentPage === 1}> 
              <span><MdArrowBackIos size={10}/></span> 
              <span>이전</span>
            </button>
          </div>
        }&nbsp;&nbsp;

        {currentPageArray.map((num) => (
          <div className='pgn_button' key={num} onClick={() => {setCurrentPage(num);
              window.scrollTo(0,0);}}>
              <button
                  style={ currentPage === num ? {color : '#b5179e', fontWeight:'bold', backgroundColor:'#b5179d30'} : {color:'#adb5bd'}}
              > {num}
              </button>&nbsp;&nbsp;
          </div>
        ))}

        {Array.isArray(postList) &&
          <div className='pgn_button'>
            <button 
                onClick={() => {setCurrentPage(currentPage + 1);
                window.scrollTo(0,0);}}
                // disabled={currentPage === pageInfo.pageEnd  || pageInfo.total === 0}
                >
                <span style={{marginRight:'5px'}}>다음</span>
                <span><MdArrowForwardIos size={10}/></span> 
            </button>
          </div>
        }
      </div> */}
      <br></br>
    </div>
  </>
    
  )
};
export default EduList;