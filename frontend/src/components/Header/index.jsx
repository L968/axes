import React from 'react';
import { useHistory } from 'react-router-dom';

import M from 'materialize-css';
import './styles.css';

export default function Header() {

    M.AutoInit();

    const history = useHistory();

    function handleLogOut() {
        localStorage.removeItem('SESSIONJWT');
        history.push('/');
    }

    return (
        <div className="header-container">

            <nav>
                <div className="nav-wrapper grey darken-1">
                    <ul className="left hide-on-med-and-down">
                        <li><a className="dropdown-trigger" data-target="dropdown1" href="#">Administration</a></li>
                    </ul>
                    <button className="btn right" onClick={ handleLogOut }>Log Out</button>
                </div>
            </nav>

            <ul id="dropdown1" className="dropdown-content">
                <li><a href="#!">one</a></li>
                <li><a href="#!">two</a></li>
                <li><a href="#!">three</a></li>
            </ul>

        </div>
    );
}