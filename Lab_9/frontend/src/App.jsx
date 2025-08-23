import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import UserRegistration from './components/UserRegistration';
import UserList from './components/UserList';
import CyberAuth from './components/CyberAuth';
import { Users, UserPlus, Database, Github } from 'lucide-react';
import './cyberpunk-signup.css';

function App() {
  const [currentView, setCurrentView] = useState('auth'); // 'auth', 'register', 'users'
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUserRegistered = () => {
    // Trigger refresh of user list
    setRefreshTrigger(prev => prev + 1);
    // Switch to user list view
    setCurrentView('users');
  };

  const handleNavigation = (view) => {
    console.log('Navigation clicked:', view);
    if (view === 'home') {
      setCurrentView('auth');
    } else {
      setCurrentView(view);
    }
  };

  // Show Cyber-Auth landing screen
  if (currentView === 'auth') {
    return <CyberAuth onNavigate={handleNavigation} />;
  }

  return (
    <div className="cyber-bg min-h-screen">
      <div className="cyber-grid" />
      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0a0f1c',
            color: '#00fff7',
            border: '1px solid #00fff7',
            fontFamily: 'Share Tech Mono, Orbitron, monospace'
          },
          success: {
            style: {
              background: '#0a0f1c',
              color: '#00fff7',
              border: '1px solid #00fff7'
            },
          },
          error: {
            style: {
              background: '#0a0f1c',
              color: '#ff00ea',
              border: '1px solid #ff00ea'
            },
          },
        }}
      />

      {/* Header */}
      <header className="cyber-card border-b-2" style={{borderColor: '#00fff7', boxShadow: '0 0 16px #00fff7'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex items-center">
                <Database className="w-8 h-8 text-cyan-400 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold" style={{color:'#00fff7', fontFamily:'Share Tech Mono, Orbitron, monospace', textShadow:'0 0 8px #ff00ea'}}>
                    User Management System
                  </h1>
                  <p className="text-sm" style={{color:'#ff00ea', fontFamily:'Share Tech Mono, Orbitron, monospace'}}>
                    Full-stack application with React, Node.js, Express & MySQL
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-magenta-400 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="cyber-card border-b-2" style={{borderColor: '#ff00ea', boxShadow: '0 0 8px #ff00ea'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setCurrentView('auth')}
              className="py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors border-transparent text-magenta-400 hover:text-cyan-400 hover:border-cyan-400"
              style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}
            >
              <Database className="w-5 h-5 mr-2" />
              Back to Auth
            </button>
            <button
              onClick={() => setCurrentView('register')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${
                currentView === 'register'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-magenta-400 hover:text-cyan-400 hover:border-cyan-400'
              }`}
              style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Initialize Profile
            </button>
            <button
              onClick={() => setCurrentView('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${
                currentView === 'users'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-magenta-400 hover:text-cyan-400 hover:border-cyan-400'
              }`}
              style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}
            >
              <Users className="w-5 h-5 mr-2" />
              Access Grid
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'register' && (
          <div className="animate-fade-in">
            <UserRegistration onUserRegistered={handleUserRegistered} onNavigate={handleNavigation} />
          </div>
        )}
        
        {currentView === 'users' && (
          <div className="animate-fade-in">
            <UserList refreshTrigger={refreshTrigger} onNavigate={handleNavigation} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="cyber-card border-t-2 mt-16" style={{borderColor: '#00fff7', boxShadow: '0 0 16px #00fff7'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-cyan-400" style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}>User Management System</span>
            </div>
            
            <div className="text-sm text-magenta-400">
              <p style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}>Built with React.js, Node.js, Express.js, MySQL & TailwindCSS</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t-2" style={{borderColor: '#ff00ea'}}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-cyan-400">
              <div>
                <h4 className="font-semibold text-cyan-400 mb-2" style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}>Features</h4>
                <ul className="space-y-1" style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}>
                  <li>• User Registration with Profile Picture</li>
                  <li>• Email Confirmation with Nodemailer</li>
                  <li>• Complete CRUD Operations</li>
                  <li>• REST API with Express.js</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-cyan-400 mb-2" style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}>Technologies</h4>
                <ul className="space-y-1" style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}>
                  <li>• Frontend: React.js + TailwindCSS</li>
                  <li>• Backend: Node.js + Express.js</li>
                  <li>• Database: MySQL</li>
                  <li>• File Upload: Multer</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-cyan-400 mb-2" style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}>Security</h4>
                <ul className="space-y-1" style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}>
                  <li>• Input Validation</li>
                  <li>• File Type Restrictions</li>
                  <li>• CORS Protection</li>
                  <li>• Error Handling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
