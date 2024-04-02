import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './Header.css';
// import chwijung_logo from '../../image/chwijung_logo.jpg';

function Header() {

  const navigate = useNavigate();

  // 페이지 이동
  const onClickLogoHandler = () => {
    navigate("/", { replace: false });
  };
  const onClickPostingHandler = () => {
    navigate("/jobposting", { replace: false });
  };
  const onClickCommuHandler = () => {
    navigate("/community", { replace: false });
  };
  const onClickCoachingHandler = () => {
    navigate("/coaching", { replace: false });
  };

return (
  <div className="header_container">
    <div className="header_banner">
      <div className="header_start" onClick={ onClickLogoHandler }>
        <div className='header_logo'></div>
        <span className='header_title'>취중플젝</span>
      </div>

      <div className="header_middle">
        <button onClick={ onClickPostingHandler }>
          채용공고
        </button>
        <button onClick={ onClickCommuHandler }>
          커뮤니티
        </button>
        <button onClick={ onClickCoachingHandler }>
          AI코칭
        </button>
      </div> 

      <div className="header_end">
        <div className='header_profile'></div>
      </div>
    </div> 
  </div>
)
}    
export default Header;
