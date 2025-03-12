import React, { useState } from 'react';
import '../styles/Desktop.css';

const Desktop = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    // Example project data
    const projects = [
      {
        id: 1,
        name: "Project 1",
        icon: "📱",
        type: "Mobile App"
      },
      {
        id: 2,
        name: "Project 2",
        icon: "💻",
        type: "Web App"
      },
      {
        id: 3,
        name: "Project 3",
        icon: "🎮",
        type: "Game"
      },
      // Add more projects as needed
    ];
  
    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    return (
        <div className="desktop">
        {/* Desktop Icons */}
        <div className="desktop-icons">
          {projects.map((project) => (
            <div key={project.id} className="desktop-icon">
              <div className="icon">{project.icon}</div>
              <span className="icon-text">{project.name}</span>
            </div>
          ))}
        </div>
  
        {/* Taskbar */}
        <div className="taskbar">
          <div className="start-menu">
            <button className="start-button">
              <span className="start-icon">👤</span>
            </button>
          </div>
          
          <div className="taskbar-items">
            {/* Add running applications here */}
          </div>
  
          <div className="system-tray">
            <div className="tray-item">🔊</div>
            <div className="tray-item">📶</div>
            <div className="tray-item">
              {currentTime.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Desktop;
