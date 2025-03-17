import React, { useState, useEffect } from 'react';
import '../styles/LoginHero.css';

const LoginHero = ({ onLogin }) => {
    const [time, setTime] = useState(new Date());
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
          setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
      }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      };
    
    const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
    };

    const handleScreenChange = () => {
        setShowLogin(true);
    };
    
    
    return (
        <div className="login-screen" onClick={handleScreenChange}>
          <div className="login-content">
            {!showLogin ? (
              <div className="locked-screen">
                <div className="time">{formatTime(time)}</div>
                <div className="date">{formatDate(time)}</div>
                <div className="instruction">Click anywhere to unlock</div>
              </div>
            ) : (
              <div className="login-form">
                <div className="avatar">
                  <img src="/67791385_2422213661169334_770790022239485952_n.jpg" alt="Profile" />
                </div>
                <div className="username">Liam Hickey</div>
                <button className="login-button" onClick={onLogin}>Enter Portfolio</button>
                <div className="login-footer">
                  Full Stack Developer
                </div>
              </div>
            )}
          </div>
        </div>
      );
}

export default LoginHero;
