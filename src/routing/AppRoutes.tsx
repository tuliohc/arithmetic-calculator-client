import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LoadingProvider } from '../contexts/LoadingProvider';
import ProtectedRoute from './ProtectedRoute';
import MainPage from '../components/MainPage/MainPage';
import RecordsList from '../components/RecordsList/RecordsList';
import SignIn from '../components/SignIn/SignIn';

const AppRoutes: React.FC = () => {
  return (
    <LoadingProvider>
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/main-page" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
        <Route path="/records-list" element={<ProtectedRoute><RecordsList /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Routes>
    </Router>
    </LoadingProvider>
  );
};

export default AppRoutes;