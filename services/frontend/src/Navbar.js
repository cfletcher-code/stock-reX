import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext';
import logo from './stock-rex.png';

function Navbar() {
  const { user_id, setUser_id } = useUser();
  const [inputUser, setInputUser] = useState('');

  const handleLogin = () => {
    if (inputUser.trim() !== '') {
      setUser_id(inputUser);
    }
  };

  const handleLogout = () => {
    setUser_id(null);
    setInputUser('');
  };

  return (
      <div className="navbar">
        <div className="logo-container">
          <img className="logo" src={logo} />
        </div>
        <div className="login-container">
          {user_id ? (
            <>
              <span>User: {user_id}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter User ID"
                value={inputUser}
                onChange={(e) => setInputUser(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
            </>
          )}
        </div>
        <div className="tabs">
          <ul>
            <li>
              <Link to="/recommendation">Recommendations</Link>
            </li>
            <li>
              <Link to="/feedback">Feedback</Link>
            </li>
          </ul>
        </div>
      </div>
  );
}

export default Navbar;
