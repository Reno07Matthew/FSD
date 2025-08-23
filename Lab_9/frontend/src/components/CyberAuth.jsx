import React, { useState, useEffect } from 'react';
import { Terminal, UserPlus, Users, Zap, Shield, Code } from 'lucide-react';
import '../cyber-auth.css';

const CyberAuth = ({ onNavigate }) => {
  const [hoveredPanel, setHoveredPanel] = useState(null);
  const [hexCode, setHexCode] = useState('');

  // Generate random hex code for hover effect
  useEffect(() => {
    const generateHexCode = () => {
      const chars = '0123456789ABCDEF';
      let result = '';
      for (let i = 0; i < 32; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
        if (i % 4 === 3 && i !== 31) result += ' ';
      }
      return result;
    };

    if (hoveredPanel) {
      const interval = setInterval(() => {
        setHexCode(generateHexCode());
      }, 100);
      return () => clearInterval(interval);
    }
  }, [hoveredPanel]);

  const handlePanelClick = (type) => {
    // Add glitch effect animation before navigation
    document.body.classList.add('glitch-transition');
    setTimeout(() => {
      onNavigate(type);
      document.body.classList.remove('glitch-transition');
    }, 800);
  };

  return (
    <div className="cyber-auth-container">
      {/* Animated Background */}
      <div className="digital-rain"></div>
      <div className="nebula-effect"></div>
      
      {/* Main Content */}
      <div className="cyber-auth-content">
        {/* Holographic Title */}
        <div className="cyber-title-container">
          <h1 className="cyber-title">
            <Terminal className="title-icon" />
            CYBER-AUTH
            <div className="holographic-flicker"></div>
          </h1>
          <div className="title-subtitle">
            SECURE ACCESS PROTOCOL v2.1.5
          </div>
        </div>

        {/* Authentication Panels */}
        <div className="auth-panels-container">
          {/* Initialize Profile Panel */}
          <div 
            className={`auth-panel initialize-panel ${hoveredPanel === 'register' ? 'panel-hovered' : ''}`}
            onMouseEnter={() => setHoveredPanel('register')}
            onMouseLeave={() => setHoveredPanel(null)}
            onClick={() => handlePanelClick('register')}
          >
            <div className="panel-border magenta-border"></div>
            <div className="panel-content">
              <div className="panel-icon">
                <UserPlus className="icon" />
                <div className="icon-glow magenta-glow"></div>
              </div>
              <h2 className="panel-title">INITIALIZE PROFILE</h2>
              <p className="panel-description">
                CREATE NEW USER CREDENTIALS<br/>
                BIOMETRIC REGISTRATION PROTOCOL
              </p>
              <div className="panel-status">
                <Shield className="status-icon" />
                <span>ENCRYPTION: AES-256</span>
              </div>
            </div>
            {hoveredPanel === 'register' && (
              <div className="hex-code-overlay">
                <div className="hex-code">{hexCode}</div>
              </div>
            )}
            <div className="panel-hover-effect magenta-effect"></div>
          </div>

          {/* Access Grid Panel */}
          <div 
            className={`auth-panel access-panel ${hoveredPanel === 'users' ? 'panel-hovered' : ''}`}
            onMouseEnter={() => setHoveredPanel('users')}
            onMouseLeave={() => setHoveredPanel(null)}
            onClick={() => handlePanelClick('users')}
          >
            <div className="panel-border cyan-border"></div>
            <div className="panel-content">
              <div className="panel-icon">
                <Users className="icon" />
                <div className="icon-glow cyan-glow"></div>
              </div>
              <h2 className="panel-title">ACCESS GRID</h2>
              <p className="panel-description">
                VIEW REGISTERED USERS<br/>
                DATABASE ACCESS PROTOCOL
              </p>
              <div className="panel-status">
                <Code className="status-icon" />
                <span>PROTOCOL: SECURE-HASH</span>
              </div>
            </div>
            {hoveredPanel === 'users' && (
              <div className="hex-code-overlay">
                <div className="hex-code">{hexCode}</div>
              </div>
            )}
            <div className="panel-hover-effect cyan-effect"></div>
          </div>
        </div>

        {/* System Status */}
        <div className="system-status">
          <div className="status-item">
            <Zap className="status-icon" />
            <span>SYSTEM STATUS: ONLINE</span>
          </div>
          <div className="status-item">
            <Shield className="status-icon" />
            <span>SECURITY LEVEL: MAXIMUM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberAuth;
