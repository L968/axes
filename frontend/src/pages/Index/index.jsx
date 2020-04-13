import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Login() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleLogIn(e) {
        try {
            e.preventDefault();

            const response = await api.post('/session', { login, password });

            if (response.status === 200) {
                localStorage.setItem('SESSIONJWT', response.data.token);
                history.push('/main');
            }else {
                alert(response.data.message);
            }
        } catch (error) {
            alert(error);
        }
    }

    return(
        <div className="index-container container">
            <h1>Index page</h1>

            <form onSubmit={ handleLogIn }>
                <input type="text"     placeholder="Login"    value={ login }    onChange={ e => setLogin(e.target.value) }/>
                <input type="password" placeholder="Password" value={ password } onChange={ e => setPassword(e.target.value) }/>

                <button type="submit" className="btn">Log In</button>
            </form>
        </div>
    );
}