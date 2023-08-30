import React, {useState} from 'react';
import logo from './stock-rex.png';
const LoginPage = ({onLogin}) => {

    const [formUserId,setFormUserId] = useState('')

    const handleLogin = () => {
        onLogin(formUserId);
    }
    
    
    return (
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor="formUserId">User ID:</label>
                <input type="text" id="formUserId" value={formUserId} onChange={(e)=>setFormUserId(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Login</button>
            <div>
                <image src={logo} />
            </div>
        </div> 
    )
};

export default LoginPage