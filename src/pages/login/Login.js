import { useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { GoogleAuthProvider, signInWithRedirect , setPersistence, signOut, onAuthStateChanged, browserLocalPersistence} from "firebase/auth";
import "./Login.css"

function Login(){
    const [userData, setUserData] = useState(null);
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
    signInWithRedirect(auth, provider) // 팝업창 띄워서 로그인
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

    return(
    <>
    <div className={`header_container header_normal`}>
        <div className="header_banner">
            <div className="header_start">
                <div className='header_logo'></div>
                <span className='header_title'>취몽<span style={{color:'#adb5bd', fontSize:'9px',marginLeft:'1px'}}>夢</span>간편 로그인</span>
            </div>
        </div>
    </div>

    <div className="total" style={{marginTop:"80px"}}>
        <div className="box">
            <div className="login_container">

            </div>
            <h3>구글 간편 로그인</h3>
            <button onClick={handleGoogleLogin}>로그인</button>
            <button onClick={handleGoogleLogout}>로그아웃</button>
            <h4>로그인하면 아래쪽에 이름이 나타납니다.</h4>
            <div>
            {userData
                ? "당신의 이름은 : " + displayName
                : (<button onClick={handleGoogleLogin}>로그인</button>)}
            </div>
        </div>
    </div>            
    </>
);
};
export default Login;
