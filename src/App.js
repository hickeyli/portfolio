import React, { useState } from 'react';
import './App.css';
// import Hero from './components/Hero';
import LoginHero from './components/LoginHero';
import Desktop from './components/Desktop';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LoginHero onLogin={handleLogin} />
      ) : (
        <Desktop />
      )}
    </div>
  );
}

export default App;
