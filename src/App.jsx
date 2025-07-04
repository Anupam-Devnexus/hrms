import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './Components/Navigation/Navigation';

import Dashboard from './Page/Dashboard';
import EmployeeManagement from './Page/EmployeeManagament';
import Attendance from './Page/Attendance';
import Payroll from './Page/Payroll';
import Recruitment from './Page/Recruitment';
import LeaveManagement from './Page/LeaveManagement';
import Setting from './Page/Setting';
import Support from './Page/Support';

function App() {
  return (
    <Router>
      <div className='w-[99vw] h-[96vh] mt-3 flex mx-auto rounded-2xl bg-[var(--primary-color)]'>
        
        {/* Sidebar Navigation */}
        <Navigation />

        {/* Main Content */}
        <div className='flex-1 p-4 overflow-y-auto'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/employee-management' element={<EmployeeManagement />} />
            <Route path='/attendance' element={<Attendance />} />
            <Route path='/payroll' element={<Payroll />} />
            <Route path='/recruitment' element={<Recruitment />} />
            <Route path='/leave-management' element={<LeaveManagement />} />
            <Route path='/settings' element={<Setting />} />
            <Route path='/support' element={<Support />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
