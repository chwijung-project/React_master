import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Main from './pages/main/Main';
import JobPosting from './pages/jobPosting/JobPosting';
import Coaching from './pages/coaching/Coaching';
import MoreInfo from './pages/moreInfo/MoreInfo';
import Education from './pages/education/Education';
import './global.css'
import { auth } from "./pages/firebase-config";
import { GoogleAuthProvider, signInWithPopup , setPersistence, signOut, onAuthStateChanged, browserLocalPersistence} from "firebase/auth";
import { useState, useEffect } from "react";


function App() {
  const [userData, setUserData] = useState(null);
  // const [displayName, setDisplayName] = useState(null);
  const provider = new GoogleAuthProvider(); // provider 구글 설정

  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 실행되도록 useEffect 안에 넣습니다.
    setPersistence(auth, browserLocalPersistence) // 지속성 설정
      .then(() => {
        onAuthStateChanged(auth, (user) => { // 사용자 로그인 상태 감시
          if (user) {
            setUserData(user); // 사용자 정보 저장
          } else {
            setUserData(null); // 로그아웃 상태 처리
          }
        });
      });
  }, []); 


  function handleGoogleLogin() {
    signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
      .then((data) => {
        setUserData(data.user); // user data 설정
        const credential = GoogleAuthProvider.credentialFromResult(data);
        const token = credential.accessToken;
        console.log(token);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleGoogleLogout(){
    signOut(auth).then(() => {
      console.log("success logout");
      setUserData(auth.currentUser);
    }).catch((error) => {
      // An error happened.
    });
  }
  
  let displayName = '';
  let user = auth.currentUser;
  console.log(user);
  if (user !== null) {
    displayName = user.displayName;
    console.log("displayName", displayName);
  }



  // setPersistence(auth, browserLocalPersistence)
  // .then(() => {
  //   // In memory persistence will be applied to the signed in Google user
  //   // even though the persistence was set to 'none' and a page redirect
  //   // occurred.
  // })

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     console.log(uid);
  //     localStorage.setItem(
  //       'user',
  //       JSON.stringify({
  //         uid: user.uid,
  //         displayName: user.displayName,
  //         email: user.email, // github의 경우 이메일 공개 여부에 따라 null로 할당되기도 함.
  //         photoURL: user.photoURL,
  //       }),
  //     )
  //     console.log(localStorage)
  //   } else {
  //     console.log("상태 변경")
  //     // ...
  //   }
  // });
  




  
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
    <button onClick={handleGoogleLogout}>로그아웃</button>
    <h4>로그인하면 아래쪽에 이름이 나타납니다.</h4>
    <div>
      {userData
        ? "당신의 이름은 : " + displayName
        : "로그인 버튼을 눌러주세요 :)"}
    </div>
    </div>
    </>
  );
}

export default App;
