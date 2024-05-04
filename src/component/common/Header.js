import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import './Header.css';
import { MdClose,MdLogout,MdHouse } from "react-icons/md";
import google_logo from "../../image/google.png";

//for 로그인
import { auth } from "../../pages/firebase-config";
import { GoogleAuthProvider, signInWithRedirect , setPersistence, signOut, onAuthStateChanged, browserLocalPersistence} from "firebase/auth";

function Header() {

  const navigate = useNavigate();
  const location = useLocation();

  // 페이지 이동
  const onClickLogoHandler = () => {
    navigate("/", { replace: false });
  };
  const onClickPostingHandler = () => {
    navigate("/jobposting", { replace: false });
  };
  const onClickEduHandler = () => {
    navigate("/education", { replace: false });
  };
  const onClickCoachingHandler = () => {
    navigate("/coaching", { replace: false });
  };

  // 페이지에 따른 색상 변경
  const headerClass = location.pathname === "/jobposting" ? "header_jobposting" : "header_normal";

  // for_login
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const provider = new GoogleAuthProvider(); // provider 구글 설정
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [showDropdown, setShowDropdown] = useState(false);

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
    signInWithRedirect(auth, provider) // 로그인 페이지로 이동
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

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

return (
  <div className={`header_container ${headerClass}`}>
    <div className="header_wrapper">
      <div className="header_left" onClick={ onClickLogoHandler }>
        <div className='header_logo'></div>
        <span className='header_title'>취몽
          <span style={{color:'#adb5bd', fontSize:'9px',marginLeft:'1px'}}>夢</span>
        </span>
      </div>

      <div className="header_middle">
        <button onClick={ onClickPostingHandler }>
          채용공고
        </button>
        <button onClick={ onClickEduHandler }>
          교육목록
        </button>
        <button onClick={ onClickCoachingHandler }>
          AI코칭
        </button>
      </div> 

      <div className="header_right">
        {userData ? (
          <>
            <div onClick={toggleDropdown}>
              <img src={userData.photoURL || 'default_profile.png'} alt="Profile" className="header_profile"/>
            </div>
            {showDropdown && (
              <div className="login_dropdown">
                <div className="login_dropdown_first">
                  <img src={userData.photoURL || 'default_profile.png'} alt="Profile" className="header_profile"/>
                  <div>{displayName}</div>
                </div>
                <div className="login_dropdown_second">
                  <div>
                    <MdHouse/>
                    <button >
                      내 정보
                    </button>
                  </div>
                  <div>
                    <MdLogout/>
                    <button onClick={handleGoogleLogout}>
                      로그아웃
                    </button>
                  </div>
                </div>    
              </div>
            )}
          </>
          ) : (
            <>
            <button className="login_button" onClick={openModal}>간편 로그인</button>
            <button className="login_button_media" onClick={openModal}>로그인</button>
            </>
          )}
      </div>

      {/* 모달 */}
      <div className={`login_container ${isModalOpen ? 'show' : ''}`}>
        <div className="login_wrapper">
          <div className="login_first">
            <div className="login_first_close" onClick={closeModal}>
              <MdClose />
            </div>
          </div>
          <div className="login_second">로그인</div>
          <div className="login_third">
            <div>당신을 위한 맞춤 취몽</div>
            <div>로그인하고 보기</div>
          </div>
          <div className="login_last">
            <button onClick={handleGoogleLogin}>
              <img src={google_logo}/>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
);
};    
export default Header;
