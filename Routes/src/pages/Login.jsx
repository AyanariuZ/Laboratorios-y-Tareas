import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onLogin = () => {
        if (username === 'admin' && password === '1234') {
            navigate('/Perfil');
        } else {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div className="dashboard-content" style={{ display: 'flex', justifyContent: 'center',  marginLeft: 100, alignItems: 'center', height:'90vh'}}>
            <div className=" p-4 shadow-lg" style={{ width: '350px'}}>
                <h2 className="text-center mb-4">Login</h2>
                {error && <div className="alert alert-danger text-center">{error}</div>}
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary w-100" onClick={onLogin}>Login</button>
            </div>
        </div>
    );
};
