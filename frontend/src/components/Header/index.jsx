import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Header() {

    const history = useHistory();

    function handleLogOut(){
        localStorage.removeItem('SESSIONJWT');
        history.push('/');
    }

    return(
        <div className="header-container">
            <h2>Header</h2>
            <button className="btn" onClick={ handleLogOut }>Log Out</button>
        </div>
    );
}