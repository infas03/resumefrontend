import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'  
import Resume from './pages/resume.js';
import SummeryEdit from './pages/edit/summeryEdit.js';
import HeadingEdit from './pages/edit/headingEdit.js';
import EducationEdit from './pages/edit/educationEdit.js';
import ExperienceEdit from './pages/edit/experienceEdit.js';
import SkillsEdit from './pages/edit/skillsEdit.js';
import CompetenciesEdit from './pages/edit/competenciesEdit.js';
import HeadingSetup from './pages/setup/headingsetup.js';
import SignUp from './pages/authentication/signup.js';
import EducationSetup from './pages/setup/educationSetup.js';
import ExperienceSetup from './pages/setup/experienceSetup.js';
import SkillsSetup from './pages/setup/skillsSetup.js';
import CompetenciesSetup from './pages/setup/competenciesSetup.js';
import SummerySetup from './pages/setup/summerySetup.js';
import Login from './pages/authentication/login.js';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<SignUp/>} />
          <Route path='/resume' element={<Resume/>} />
          <Route path='/headingedit' element={<HeadingEdit/>} />
          <Route path='/summeryedit' element={<SummeryEdit/>} />
          <Route path='/educationedit' element={<EducationEdit/>} />
          <Route path='/experienceedit' element={<ExperienceEdit/>} />
          <Route path='/skillsedit' element={<SkillsEdit/>} />
          <Route path='/competenciesedit' element={<CompetenciesEdit/>} />
          <Route path='/headingsetup' element={<HeadingSetup />} />
          <Route path='/educationsetup' element={<EducationSetup />} />
          <Route path='/experiencesetup' element={<ExperienceSetup />} />
          <Route path='/skillssetup' element={<SkillsSetup />} />
          <Route path='/competenciessetup' element={<CompetenciesSetup />} />
          <Route path='/summerysetup' element={<SummerySetup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
