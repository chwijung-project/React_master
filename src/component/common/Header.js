import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './Header.css';
import chwijung_logo from '../../image/chwijung_logo.jpg';

function Header() {

  const navigate = useNavigate();
  const [postingdropdown, setPostingDropdown] = useState(false);
  const [communitydropdown, setCommunityDropdown] = useState(false);

  const onClickPostingDropdown = () => {
    setPostingDropdown(!postingdropdown);
    setCommunityDropdown(false);
  };

  const onClickCommunityDropdown = () => {
    setCommunityDropdown(!communitydropdown);
    setPostingDropdown(false);
  };

  const onClickLogoHandler = () => {
    navigate("/", { replace: false });
  };

  const onClickCoachingHandler = () => {
    console.log("코칭 페이지로 이동");
    navigate("/coaching", { replace: false });
  };


  const onClickMoreIndoHandler = () => {
    console.log("더 보기 페이지로 이동");
    navigate("/moreInfo", { replace: false });
  };

  return (
    <>
      <div className="header-container">
        <div
          className="header-logo"
          onClick={ onClickLogoHandler }
        >
          <img src={ chwijung_logo } alt= ""/>
        </div>
        
        <div className="header-banner">

          <div className="dropdown-container">
            <button onClick={ onClickPostingDropdown }>
              채용 공고
            </button>
            {postingdropdown && (
              <div className="drop-content">
                <a href="/jobposting">채용공고</a>
                <a href="/">머신러닝/딥러닝 엔지니어</a>
                <a href="/">딥러닝 리서처</a>
                <a href="/">데이터 사이언티스트</a>
                <a href="/">데이터 엔지니어</a>
                <a href="/">AI 서비스 개발자</a>
              </div>
            )}
          </div>
          <div className="SPACE"></div>
          <div className="dropdown-container">
            <button onClick={ onClickCommunityDropdown }>
              감자 커뮤니티
            </button>
            {communitydropdown && (
              <div className="drop-content">
                <a href="/community">감자 커뮤니티</a>
              </div>
            )}
          </div>
          <div className="SPACE"></div>
          <button onClick={ onClickCoachingHandler }>
            코칭
          </button>
          <div className="SPACE"></div>
          <button onClick={ onClickMoreIndoHandler }>
            더 보기
          </button>
        </div>  
      </div>
      <div class="bottom-line2"></div>
    </>
  )
}    
export default Header;
