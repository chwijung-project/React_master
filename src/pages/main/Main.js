import Analyze from "../../component/main/Analyze";
import RecruitGraph from "../../component/main/RecruitGraph";
import SmallCommunity from "../../component/main/SmallCommunity";
import SmallPosting from "../../component/main/SmallPosting";
import Commercial from "../../component/main/Commercial";
import './Main.css';

function Main() {


    return (
        <div className="total">  
            <div className="box">
                    {/* <Analyze/> */}
                    <RecruitGraph/>

                <div className="main_small">
                    <div className="main_left">
                        <SmallPosting/>
                    </div>
                    <div className="main_right">
                        <SmallCommunity/>
                    </div>
                </div>
                <br></br>
                <div>
                    <div className="main_commercial">
                        <Commercial/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;