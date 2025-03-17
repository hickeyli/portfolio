import React, { useState, useRef } from 'react';
import '../styles/Desktop.css';

const Desktop = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeWindow, setActiveWindow] = useState(null);
    const [windowPosition, setWindowPosition] = useState({ x: 50, y: 50 });
    const isDragging = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const windowDimensions = useRef({ width: 600, height: 400 });

    // Updated categories with projects and links
    const categories = [
      {
        id: 1,
        name: "Python",
        icon: "🐍",
        projects: [
          { 
            id: 1, 
            name: "Weather App", 
            description: "React Native weather application",
            link: "/projects/weather-app"
          },
          { 
            id: 2, 
            name: "Todo List", 
            description: "Mobile task manager",
            link: "/projects/todo-list"
          },
        ]
      },
      {
        id: 2,
        name: "React",
        icon: "⚛️",
        projects: [
          { 
            id: 3, 
            name: "Portfolio", 
            description: "Personal portfolio website",
            link: "/projects/portfolio"
          },
          { 
            id: 4, 
            name: "E-commerce", 
            description: "Online store platform",
            link: "/projects/ecommerce"
          },
        ]
      },
      {
        id: 3,
        name: "FiveM",
        icon: "🎮",
        projects: [
          { 
            id: 5, 
            name: "Puzzle Game", 
            description: "Browser-based puzzle game",
            link: "/projects/puzzle-game"
          },
          { 
            id: 6, 
            name: "RPG", 
            description: "Text-based adventure",
            link: "/projects/rpg"
          },
        ]
      },
    ];

    // Handle category click
    const handleCategoryClick = (category) => {
        setActiveWindow(category);
    };

    // Handle window close
    const handleCloseWindow = () => {
        setActiveWindow(null);
    };

    // Handle project click
    const handleProjectClick = (project) => {
        window.location.href = project.link;
        // Alternative: If you're using React Router, use navigation instead:
        // navigate(project.link);
    };

    // Handle drag start
    const handleMouseDown = (e) => {
        // Only allow dragging from the header, not the whole window
        if (e.target.closest('.window-content')) return;
        
        isDragging.current = true;
        const windowElement = e.currentTarget;
        const rect = windowElement.getBoundingClientRect();
        
        dragOffset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    // Handle drag
    const handleMouseMove = (e) => {
        if (!isDragging.current) return;

        const newX = e.clientX - dragOffset.current.x;
        const newY = e.clientY - dragOffset.current.y;
        
        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Calculate bounds using ref values
        const minX = 0;
        const maxX = viewportWidth - windowDimensions.current.width;
        const minY = 0;
        const maxY = viewportHeight - 50 - windowDimensions.current.height;
        
        // Clamp the position within bounds
        const boundedX = Math.max(minX, Math.min(maxX, newX));
        const boundedY = Math.max(minY, Math.min(maxY, newY));
        
        setWindowPosition({ x: boundedX, y: boundedY });
    };

    // Handle drag end
    const handleMouseUp = () => {
        isDragging.current = false;
    };

    // Add useEffect for global mouse events
    React.useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    // Add window resize handler
    React.useEffect(() => {
        const handleResize = () => {
            // Ensure window stays in bounds when viewport is resized
            setWindowPosition(prevPos => {
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                
                const maxX = viewportWidth - windowDimensions.current.width;
                const maxY = viewportHeight - 50 - windowDimensions.current.height;
                
                return {
                    x: Math.max(0, Math.min(maxX, prevPos.x)),
                    y: Math.max(0, Math.min(maxY, prevPos.y))
                };
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="desktop">
            {/* Desktop Icons */}
            <div className="desktop-icons">
                {categories.map((category) => (
                    <div 
                        key={category.id} 
                        className="desktop-icon"
                        onClick={() => handleCategoryClick(category)}
                    >
                        <div className="icon">{category.icon}</div>
                        <span className="icon-text">{category.name}</span>
                    </div>
                ))}
            </div>

            {/* Finder Window */}
            {activeWindow && (
                <div 
                    className="window finder-window"
                    style={{
                        left: `${windowPosition.x}px`,
                        top: `${windowPosition.y}px`,
                        cursor: isDragging.current ? 'grabbing' : 'auto'
                    }}
                    onMouseDown={handleMouseDown}
                >
                    <div className="window-header">
                        <div className="window-controls">
                            <div className="window-control window-close" onClick={handleCloseWindow}></div>
                        </div>
                        <div className="window-title">{activeWindow.name}</div>
                    </div>
                    <div className="window-content">
                        {activeWindow.projects.map(project => (
                            <div 
                                key={project.id} 
                                className="project-item"
                                onClick={() => handleProjectClick(project)}
                            >
                                <div className="project-icon">{activeWindow.icon}</div>
                                <div className="project-details">
                                    <h3>{project.name}</h3>
                                    <p>{project.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

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
