import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';
import AuthenticatedApp from './AuthenticatedLayout';

interface PrivateRouteWrapperProps {
  children: React.ReactElement;
}

enum AuthStatus {
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated',
  Unknown = 'unknown',
}

const PrivateRouteWrapper: React.FC<PrivateRouteWrapperProps> = ({ children }) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.Unknown);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticatedResult = await isAuthenticated();
      setAuthStatus(isAuthenticatedResult ? AuthStatus.Authenticated : AuthStatus.Unauthenticated);
    };

    checkAuthentication();
  }, []);

  if (authStatus === AuthStatus.Unknown) {
    return <div>Loading...</div>;
  }

  return authStatus === AuthStatus.Authenticated ? (
    <AuthenticatedApp>
      {children}
    </AuthenticatedApp>
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default PrivateRouteWrapper;