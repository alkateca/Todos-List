import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then((result) => {
                console.log(result);
                if ( result.data === 'E-mail não registrado' ){
                    alert('E-mail não registrado' )
                    navigate('/register');
                }
                if (result.data === 'Login bem-sucedido') {
                    navigate('/home');
                } if ( result.data === 'Senha incorreta' ){
                    alert('Senha incorreta' )
                }
            })
            .catch((err) => console.log(err));
            
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2 className='d-flex justify-content-center'>Todo List</h2>
                <div className='mb-3'> 
                    <label htmlFor='email'> 
                        <span>E-mail</span>
                    </label>
                    <input
                        type='text'
                        placeholder='Digite seu e-mail'
                        autoComplete='off'
                        name='email'
                        className='form-control rounded-0'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor='password' className='mt-3'>
                        <span>Senha</span>
                    </label>
                    <input
                        type='password'
                        placeholder='Digite sua senha'
                        autoComplete='off'
                        name='password'
                        className='form-control rounded-0'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmit} type='submit' className='btn btn-success w-100 rounded-0 mt-3'>
                    Acessar plataforma
                </button>
                <p className='mt-3'>Não possuo uma conta</p>
                <Link to='/register' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
                    Registrar novo usuário
                </Link>
            </div>
        </div>
    );
};

export default Login;