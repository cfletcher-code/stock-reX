
import React from 'react';
import Feedback from './Feedback'
const Dashboard = ({user_id, onLogout}) => {
    return (
        <div>
            <div>
                <h1>User : {user_id}</h1>
                <button onClick={onLogout}>Logout</button>
            </div>
            <Feedback user={user_id} />
        </div>  
    )
};

export default Dashboard