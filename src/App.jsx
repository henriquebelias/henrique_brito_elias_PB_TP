import React from 'react';
import { UserProvider } from './context/UserContext';
import { LandingPage } from './pages/LandingPage';

export default function App() {
  return (
    <UserProvider>
      <LandingPage />
    </UserProvider>
  );
}
