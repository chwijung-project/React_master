import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Main from './pages/main/Main';
import JobPosting from './pages/jobPosting/JobPosting';
import Education from './pages/education/Education';
import Coaching from './pages/coaching/Coaching';
import MoreInfo from './pages/moreInfo/MoreInfo';
import './global.css'


function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route path="/" element={ <Main/> }/>
          <Route path="/jobposting" element={ <JobPosting/> }/>
          <Route path="/education" element={ <Education/> }/>
          <Route path="/coaching" element={ <Coaching/> }/>
          <Route path="/moreInfo" element={ <MoreInfo/> }/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;
