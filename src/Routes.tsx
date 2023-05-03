import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import RecordsList from './components/RecordsList/RecordsList';
import SignIn from './components/SignIn/SignIn';
import { isAuthenticated } from './services/auth';

const PrivateRouteWrapper: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [authStatus, setAuthStatus] = useState<'authenticated' | 'unauthenticated' | null>(null);

  useEffect(() => {
    console.log('useEffect')
    const checkAuthentication = async () => {
      const isAuthenticatedResult = await isAuthenticated();
      setAuthStatus(isAuthenticatedResult ? 'authenticated' : 'unauthenticated');
    };

    checkAuthentication();
  }, []);

  if (authStatus === null) {
    return <div>Loading...</div>;
  }

  return authStatus === 'authenticated' ? children : <Navigate to="/sign-in" />;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/main-page" element={<PrivateRouteWrapper><MainPage /></PrivateRouteWrapper>} />
        <Route path="/records-list" element={<PrivateRouteWrapper><RecordsList /></PrivateRouteWrapper>} />
        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;