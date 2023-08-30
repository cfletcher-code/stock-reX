import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import React, {useState} from 'react';

function App() {
  const [loggedIn,setLoggedIn] = useState(false);
  const [user,setUser] = useState(null);

  const handleLogin = (user_id) => {
    setUser(user_id);
    setLoggedIn(true);
    
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="App">
      {loggedIn ? (
        <Dashboard user_id={user} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
