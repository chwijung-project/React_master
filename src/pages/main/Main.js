import RecruitGraph from "../../component/main/RecruitGraph";
// import BannerSlider from "../../component/main/BannerSlider";
import SmallCommunity from "../../component/main/SmallCommunity";
import SmallPosting from "../../component/main/SmallPosting";

function Main() {


    return (
        <>
            <RecruitGraph/>
            {/* <CheckedJob/> */}
            {/* <BannerSlider/> */}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <SmallPosting/>
                <SmallCommunity/>
            </div>
        </>
    );
}

export default Main;