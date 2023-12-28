import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Main from './pages/main/Main';
import JobPosting from './pages/jobPosting/JobPosting';
import Coaching from './pages/coaching/Coaching';
import MoreInfo from './pages/moreInfo/MoreInfo';
import Community from './pages/community/Community';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route path="/" element={ <Main/> }/>
          <Route path="/jobposting" element={ <JobPosting/> }/>
          <Route path="/coaching" element={ <Coaching/> }/>
          <Route path="/community" element={ <Community/> }/>
          <Route path="/moreInfo" element={ <MoreInfo/> }/>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
