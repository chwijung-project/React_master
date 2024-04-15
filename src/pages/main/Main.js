import Analyze from "../../component/main/Analyze";
import RecruitGraph from "../../component/main/RecruitGraph";
import SmallCommunity from "../../component/main/SmallCommunity";
import SmallPosting from "../../component/main/SmallPosting";
import './Main.css';

function Main() {


    return (
        <div className="total">  
            <div className="main_container">
                <div className="main_contents">
                    <Analyze/>
                    <RecruitGraph/>
                </div>
            </div>

            <div className="small_list">
                <div className="main_left">
                    <SmallPosting/>
                </div>
                <div className="main_right">
                    <SmallCommunity/>
                </div>
            </div>
            <br></br>
        </div>
    );
}

export default Main;