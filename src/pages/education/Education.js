import React, {useEffect, useState} from 'react';
import './Education.css';
import Dropdown from "../../component/common/Dropdown"
import Clickbutton from "../../component/common/Clickbutton"
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdCircle,
} from "react-icons/md";
// npm i react-icons@4.11.0

function Education() {

// return(
//   <div className='total'>
//     <div className='box'>
//     <div className='top' style={{fontSize:'13px'}}>
//           <div className='space_left'>
//             <Dropdown buttonText='직무'>
//             </Dropdown>
//             <div className="cnt_job">
//               100 개 부트캠프
//             </div>
//           </div>
//           <div className='space_right'>
//             <Dropdown buttonText='지역'
//               backcolor='c_gray'
//               optionsize='o_small'>
//             </Dropdown>
//             <Dropdown buttonText='정렬'
//               backcolor= 'c_white'
//               multiple = {false}
//               optionsize='o_short'>
//             </Dropdown>
//             <Clickbutton buttonText='현재 모집'
//               size='medium'>
//             </Clickbutton>
//           </div>
//         </div>
// <div className='posting_container'>
//   <div className='posting_wrapper'>
//       <div className='list_wraper'>
//           <div className='list_start'>
//             <div className='recru_logo'>
//               <img/>
//             </div>
//             <div className='list_title_content'>
//               <div className='recru_title'>
//                 공고이름
//               </div>
//               {/* 미디어쿼리 적용부분 */}
//               <div className='recru_title_media'>
//                 공고이름
//               </div>
              
//               <div className='list_title_under'>
//                 {/* 미디어쿼리 적용부분 */}
//                 <div className='list_title_under_media'>
//                   <div className='list_title_top'>
//                     <div className='recru_endate'>
//                       날짜
//                     </div>
//                     <div style={{display:'flex'}}>
//                       색깔있는거
//                     </div>
//                     <div style={{color:'#adb5bd'}}>
//                       추가
//                     </div>
//                   </div>
//                   <div className='list_title_bottom'>
//                     <img/>
//                     회사
//                     <div className='recru_region'>
//                       <span style={{color:'#adb5bd'}}>지역</span> 
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className='recru_company'>
//                   회사
//                 </div>
//                 <div className='recru_period'>
//                   날짜 일 전
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className='list_middle'>
//             <div className='recru_endate'>
//               날짜
//             </div>
//             <div className='recru_region'>
//               <span style={{color:'#adb5bd'}}>In</span> 지역
//             </div>
//           </div>
//           <div className='list_end'>
//             <div style={{display:'flex',gap:'8px'}}>
//               몬가 색깔있는거
//             </div>
//             <div style={{color:'#adb5bd'}}>
//               추가정보
//             </div>
//           </div>
//           <div className='list_button'>
//               <button className='button view' onClick={() => window.open('_blank')}>
//               지원하기</button>
//           </div>

//           {/* 미디어쿼리 적용부분 */}
//           <div className='list_button_media'>
//             <button className='button view' onClick={() => window.open('_blank')}>
//             지원</button>
//           </div>
//           {/* 미디어쿼리 적용부분 */}
//       </div>
//   </div>

//   {/* <div className='pgn_wraper'>
//     {Array.isArray(postList) &&
//       <div className='pgn_button'>
//         <button onClick={() => {setCurrentPage(currentPage - 1);
//         window.scrollTo(0,0);}} 
//         disabled={currentPage === 1}> 
//           <span><MdArrowBackIos size={10}/></span> 
//           <span>이전</span>
//         </button>
//       </div>
//     }&nbsp;&nbsp;

//     {currentPageArray.map((num) => (
//       <div className='pgn_button' key={num} onClick={() => {setCurrentPage(num);
//           window.scrollTo(0,0);}}>
//           <button
//               style={ currentPage === num ? {color : '#b5179e', fontWeight:'bold', backgroundColor:'#b5179d30'} : {color:'#adb5bd'}}
//           > {num}
//           </button>&nbsp;&nbsp;
//       </div>
//     ))}

//     {Array.isArray(postList) &&
//       <div className='pgn_button'>
//         <button 
//             onClick={() => {setCurrentPage(currentPage + 1);
//             window.scrollTo(0,0);}}
//             // disabled={currentPage === pageInfo.pageEnd  || pageInfo.total === 0}
//             >
//             <span style={{marginRight:'5px'}}>다음</span>
//             <span><MdArrowForwardIos size={10}/></span> 
//         </button>
//       </div>
//     }
//   </div> */}
//   <br></br>
// </div>
// </div>
// </div>
// );
};
export default Education;