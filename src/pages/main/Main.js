import CheckedJob from "../../component/main/CheckedJob";
import BannerSlider from "../../component/main/BannerSlider";
import SmallCommunity from "../../component/main/SmallCommunity";
import SmallPosting from "../../component/main/SmallPosting";

function Main() {

    return (
        <>
            <CheckedJob/>
            <BannerSlider/>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <SmallPosting/>
                <SmallCommunity/>
            </div>
        </>
    );
}

export default Main;