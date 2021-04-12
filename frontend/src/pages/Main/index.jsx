import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Header from '../../components/Header';

export default function Main(props) {

    const [user_id, setUser_id] = useState(0);
    const [name, setName] = useState('');
    const [id_number, setId_number] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [department_id, setDepartment_id] = useState('');
    const [active, setActive] = useState('');

    useEffect(() => {
        setUser_id(props.user_id);

        api.get(`/user/${user_id}`)
            .then(res => {
                setName(res.data.name);
                setId_number(res.data.id_number);
                setLogin(res.data.login);
                setEmail(res.data.email);
                setDepartment_id(res.data.department_id);
                setActive(res.data.active);
            });
    }, [props.user_id, user_id])

    return (
        <div className="main-container">
            <Header />
            <h1>Main page</h1>
            <ul>
                <li>Name: { name }</li>
                <li>ID Number: { id_number }</li>
                <li>Login: { login }</li>
                <li>Email: { email }</li>
                <li>Department: { department_id }</li>
                <li>Active: { active }</li>
            </ul>
        </div>
    );
}