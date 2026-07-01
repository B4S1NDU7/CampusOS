import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Departments } from './pages/Departments';
import { Courses } from './pages/Courses';
import { Students } from './pages/Students';
import { Lecturers } from './pages/Lecturers';
import { Assignments } from './pages/Assignments';
import { Exams } from './pages/Exams';
import { Attendance } from './pages/Attendance';
import { AI } from './pages/AI';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import {
  AuditLogsPage,
  EnrollmentsPage,
  EventsPage,
  GradesPage,
  NotificationsPage,
  UsersPage
} from './pages/ModulePages';
import { Library } from './pages/Library';
import { Finance } from './pages/Finance';
import { Hostel } from './pages/Hostel';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Toaster } from './components/ui/sonner';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to='/login' />;
};

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
            <Route path='/departments' element={<ProtectedRoute><DashboardLayout><Departments /></DashboardLayout></ProtectedRoute>} />
            <Route path='/courses' element={<ProtectedRoute><DashboardLayout><Courses /></DashboardLayout></ProtectedRoute>} />
            <Route path='/students' element={<ProtectedRoute><DashboardLayout><Students /></DashboardLayout></ProtectedRoute>} />
            <Route path='/lecturers' element={<ProtectedRoute><DashboardLayout><Lecturers /></DashboardLayout></ProtectedRoute>} />
            <Route path='/assignments' element={<ProtectedRoute><DashboardLayout><Assignments /></DashboardLayout></ProtectedRoute>} />
            <Route path='/exams' element={<ProtectedRoute><DashboardLayout><Exams /></DashboardLayout></ProtectedRoute>} />
            <Route path='/attendance' element={<ProtectedRoute><DashboardLayout><Attendance /></DashboardLayout></ProtectedRoute>} />
            <Route path='/users' element={<ProtectedRoute><DashboardLayout><UsersPage /></DashboardLayout></ProtectedRoute>} />
            <Route path='/enrollments' element={<ProtectedRoute><DashboardLayout><EnrollmentsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path='/grades' element={<ProtectedRoute><DashboardLayout><GradesPage /></DashboardLayout></ProtectedRoute>} />
            <Route path='/library' element={<ProtectedRoute><DashboardLayout><Library /></DashboardLayout></ProtectedRoute>} />
            <Route path='/hostel' element={<ProtectedRoute><DashboardLayout><Hostel /></DashboardLayout></ProtectedRoute>} />
            <Route path='/finance' element={<ProtectedRoute><DashboardLayout><Finance /></DashboardLayout></ProtectedRoute>} />
            <Route path='/events' element={<ProtectedRoute><DashboardLayout><EventsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path='/notifications' element={<ProtectedRoute><DashboardLayout><NotificationsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path='/audit-logs' element={<ProtectedRoute><DashboardLayout><AuditLogsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path='/ai' element={<ProtectedRoute><DashboardLayout><AI /></DashboardLayout></ProtectedRoute>} />
            <Route path='/analytics' element={<ProtectedRoute><DashboardLayout><Analytics /></DashboardLayout></ProtectedRoute>} />
            <Route path='/settings' element={<ProtectedRoute><DashboardLayout><Settings /></DashboardLayout></ProtectedRoute>} />
            <Route path='*' element={<Navigate to='/login' />} />
          </Routes>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
