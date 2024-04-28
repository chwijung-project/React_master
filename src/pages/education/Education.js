import EduBanner from "../../component/education/EduBanner";
import EduFilter from "../../component/education/EduFilter";
import EduList from "../../component/education/EduList";
import EduPgn from "../../component/education/EduPgn";
import './Education.css';

function Education() {

    return (
      <>
        <div className="edu_first">
          <EduBanner/>
        </div>
        <div className="edu_second">
          <EduFilter/>
        </div>
        <div className="total" style={{marginTop:"0.5rem"}}>  
            <div className="box">
                    <EduList/>
                    <EduPgn/>
            </div>
        </div>
      </>
    );
}

export default Education;