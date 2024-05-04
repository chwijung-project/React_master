import { useNavigate } from "react-router-dom";
import { 
    MdArrowForwardIos,
    MdCircleNotifications 
 } from "react-icons/md";
import './Commercial.css';
import c_logo from '../../image/c_logo.png'
import c_logo_2 from '../../image/c_logo_2.png'
import c_logo_3 from '../../image/c_logo_3.png'

function Commercial() {

    const navigate = useNavigate();

    const onClickNaviHandler = () => {
        navigate("/education");};

    return (
        <div className = "commercial_container">
            <div className="commercial_wrapper">
                <div className="commercial_first">
                <div className="smallpost_left">
                    <div className="smallpost_title">
                        부트캠프
                    </div>
                </div>
                    <div className="smallpost_nav" onClick={onClickNaviHandler}>
                        더보기
                        <span className="smallpost_nav_icon">
                            <MdArrowForwardIos/>
                        </span>
                    </div>
                </div>
                <div className="commercial_box">
                    <div className="commercial_contents">
                        <div className="commercial_second">
                            <div className="commercial_second_left">
                                <img src={c_logo}></img>
                            </div>
                            <div className="commercial_second_right">
                                <div className="commercial_style">내일배움캠프</div>
                                <div className="commercial_title">
                                    <span>
                                        <MdCircleNotifications color="#80868d" />
                                    </span>
                                    <span>
                                        안드로이드 앱개발 부트캠프 4기
                                    </span>
                                </div>
                            </div>                       
                        </div>
                        <div className="commercial_third">
                            <div>
                                <span className="commercial_third_title">
                                    Summary
                                </span>
                                <span className="commercial_style_rev">
                                    안드로이드
                                </span>
                                <span className="commercial_style_rev">
                                    무료 | 온라인
                                </span>
                            </div>
                            <div className="commercial_third_contents">
                                내 아이디어로 만드는 앱 출시까지! 전액 무료 Android 앱 개발 취업 부트캠프
                            </div>
                        </div>
                        <div className="commercial_last">
                            <div className='smallist_button'>
                                <button className='button url'>
                                신청페이지 가기</button>
                            </div>
                        </div>
                    </div>
                    <div className="commercial_contents">
                        <div className="commercial_second">
                            <div className="commercial_second_left">
                                <img src={c_logo_2}></img>
                            </div>
                            <div className="commercial_second_right">
                                <div className="commercial_style">멋쟁이사자처럼</div>
                                <div className="commercial_title">
                                    <span>
                                        <MdCircleNotifications color="#80868d" />
                                    </span>
                                    <span>
                                        테킷 앱 스쿨 : iOS 6기
                                    </span>
                                </div>
                            </div>                       
                        </div>
                        <div className="commercial_third">
                            <div>
                                <span className="commercial_third_title">
                                    Summary
                                </span>
                                <span className="commercial_style_rev">
                                    iOS
                                </span>
                                <span className="commercial_style_rev">
                                    무료 | 온라인
                                </span>
                            </div>
                            <div className="commercial_third_contents">iOS 개발 실무부터 앱 스토어 배포까지 실무에 최적화된 경험을 갖춘 신입 iOS 개발자로 취업할 부트캠프</div>
                        </div>
                        <div className="commercial_last">
                            <div className='smallist_button'>
                                <button className='button url'>
                                신청페이지 가기</button>
                            </div>
                        </div>
                    </div>
                    <div className="commercial_contents">
                        <div className="commercial_second">
                            <div className="commercial_second_left">
                                <img src={c_logo_3}></img>
                            </div>
                            <div className="commercial_second_right">
                                <div className="commercial_style">코드잇 스프린트</div>
                                <div className="commercial_title">
                                    <span>
                                        <MdCircleNotifications color="#80868d" />
                                    </span>
                                    <span>
                                        프론트엔드 트랙 8기
                                    </span>
                                </div>
                            </div>                       
                        </div>
                        <div className="commercial_third">
                            <div>
                                <span className="commercial_third_title">
                                    Summary
                                </span>
                                <span className="commercial_style_rev">
                                    프론트엔드
                                </span>
                                <span className="commercial_style_rev">
                                    무료 | 온오프 혼합
                                </span>
                            </div>
                            <div className="commercial_third_contents">iOS 개발 실무부터 앱 스토어 배포까지 실무에 최적화된 경험을 갖춘 신입 iOS 개발자로 취업할 부트캠프</div>
                        </div>
                        <div className="commercial_last">
                            <div className='smallist_button'>
                                <button className='button url'>
                                신청페이지 가기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Commercial;