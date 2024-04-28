import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Main from './pages/main/Main';
import JobPosting from './pages/jobPosting/JobPosting';
import Coaching from './pages/coaching/Coaching';
import MoreInfo from './pages/moreInfo/MoreInfo';
import Education from './pages/education/Education';
import './global.css'

import { auth } from "./pages/firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";


function App() {
  const [userData, setUserData] = useState(null);

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
      .then((data) => {
        setUserData(data.user); // user data 설정
        console.log(data); // console에 UserCredentialImpl 출력
      })
      .catch((err) => {
        console.log(err);
      });
  }

  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route path="/" element={ <Main/> }/>
          <Route path="/jobposting" element={ <JobPosting/> }/>
          <Route path="/coaching" element={ <Coaching/> }/>
          <Route path="/education" element={ <Education/> }/>
          <Route path="/moreInfo" element={ <MoreInfo/> }/>
        </Route>
      </Routes>
    </BrowserRouter>

    <div>
    <h3>구글 로그인 테스트</h3>
    <button onClick={handleGoogleLogin}>로그인</button>
    <h4>로그인하면 아래쪽에 이름이 나타납니다.</h4>
    <div>
      {userData
        ? "당신의 이름은 : " + userData.displayName
        : "로그인 버튼을 눌러주세요 :)"}
    </div>
    </div>
    </>

  );
}

export default App;
