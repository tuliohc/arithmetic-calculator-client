import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../api/auth';
import './MainPage.css';



const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const result = await signOut();
      // Redirect to the sign-in page
      console.log(result)
      navigate('/sign-in');
    } catch (error) {
      console.error('Sign-out failed:', error);
      // TODO: Handle any errors that may occur during sign-out
      // TOAST
    }
  };
  
  return (
    <div className="main-page">
      <h1>Main Page</h1>
      {/* Add more content as needed */}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default MainPage;