import './App.css';
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DocumentsManagement from './pages/DocumentManagement/DocumentsManagement';
import DocumentAdd from './components/DocumentComponents/DocumentAdd/DocumentAdd';
import DocumentUpdate from './components/DocumentComponents/DocumentUpdate/DocumentUpdate';
import UserManagement from './pages/UserManagement/UserManagement';
import EventManagement from './pages/EventManagement/EventManagement';
import EventAdd from './components/EventComponents/EventAdd/EventAdd';
import EventEdit from './components/EventComponents/EventEdit/EventEdit';
import LiveSessionManagement from './pages/LiveSessionManagement/LiveRequestManagement';
import MatiereManagement from "./pages/MatiereManagement/MatiereManagement";
import MatiereAdd from "./components/MatiereComponents/MatiereAdd/MatiereAdd";
import MatiereUpdate from "./components/MatiereComponents/MatiereUpdate/MatiereUpdate";
import UniversityManagement from "./pages/UniversityManagement/UniversityManagement";
import UniveristyAdd from "./components/UniversityComponents/UniversityAdd/UniversityAdd";
import UniversityUpdate from "./components/UniversityComponents/UniversityUpdate/UniversityUpdate";
import InstitutManagement from "./pages/InstitutManagement/InstitutManagement";
import InstitutAdd from "./components/InstitutComponents/InstitutAdd/InstitutAdd";
import InstitutUpdate from "./components/InstitutComponents/InstitutUpdate/InstitutUpdate";
import MessageAdd from "./components/MessageComponents/MessageAdd/MessageAdd";
import MessageList from "./components/MessageComponents/MessageList/MessageList";
import MessageDetails from "./components/MessageComponents/MessageDetails/MessageDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="AppGlass">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<MainDash />} />
              <Route path="/documents" element={<DocumentsManagement />} />
              <Route path="/documents/add" element={<DocumentAdd />} />
              <Route path="/documents/update/:id" element={<DocumentUpdate />} />

              <Route path="/live" element={<LiveSessionManagement />} />
              <Route path="/users" element={<UserManagement/>} />
              <Route path="/events/" element={<EventManagement/>} />
              <Route path="/events/add" element={<EventAdd/>} />
              <Route path="/events/update/:id" element={<EventEdit/>} />


              <Route path="/matiere/" element={<MatiereManagement/>} />
              <Route path="/matiere/add" element={<MatiereAdd/>} />
              <Route path="/matiere/update/:id" element={<MatiereUpdate/>} />

              <Route path="/university/" element={<UniversityManagement/>} />
              <Route path="/university/insert" element={<UniveristyAdd/>} />
              <Route path="/admin/university/:id" element={<UniversityUpdate/>} />

              <Route path="/institut/" element={<InstitutManagement/>} />
              <Route path="/instituts/add" element={<InstitutAdd/>} />
              <Route path="/institut/update/:id" element={<InstitutUpdate/>} />

              <Route path="/messages/" element={<MessageList/>} />
              <Route path="/messages/add" element={<MessageAdd/>} />
              <Route path="/messages/:id" element={<MessageDetails/>} />


              <Route path="*" element={<MainDash />} />
            </Routes>
          </div>
          <RightSide />
        </div>
      </div>
    </Router>
  );
}

export default App;
