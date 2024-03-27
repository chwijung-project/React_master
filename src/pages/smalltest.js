import SmallPosting from '../component/main/SmallPosting';
import Bottomcomponent2 from '../component/main/bottomcomponent2';
import './smalltest.css';

function smalltest(){

    return (
        <>
            <div className="bottomside">
                <SmallPosting/>
                <div className="bottomSpace"></div>
                <SmallPosting/>
            </div>
        </>
    )
}

export default smalltest;