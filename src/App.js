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
