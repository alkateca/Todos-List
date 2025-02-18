import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        axios.post('http://localhost:3001/register', { name, email, password })
            .then((result) => {
                console.log(result);
                navigate('/login');
            })
            .catch((err) => {
                if (err.response && err.response.data.message === 'E-mail já cadastrado') {
                    alert('Este e-mail já está em uso. Tente com outro e-mail.');
                } else {
                    console.log(err);
                    alert('Erro ao registrar. Tente novamente.');
                }
            });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>): void => {
        setter(e.target.value);
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2 className='d-flex justify-content-center'>Registro</h2>
                <div className='mb-3'>
                    <label htmlFor='name'>Nome</label>
                    <input
                        type='text'
                        placeholder='Digite seu nome'
                        autoComplete='off'
                        name='name'
                        className='form-control rounded-0'
                        onChange={(e) => handleChange(e, setName)}
                    />
                    
                    <label htmlFor='email' className='mt-3'>E-mail</label>
                    <input
                        type='email'
                        placeholder='Digite seu e-mail'
                        autoComplete='off'
                        name='email'
                        className='form-control rounded-0'
                        onChange={(e) => handleChange(e, setEmail)}
                    />
                    
                    <label htmlFor='password' className='mt-3'>Senha</label>
                    <input
                        type='password'
                        placeholder='Digite sua senha'
                        autoComplete='off'
                        name='password'
                        className='form-control rounded-0'
                        onChange={(e) => handleChange(e, setPassword)}
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>
                        Registro
                    </button>
                </form>

                <p className="mt-2">Já possuo uma conta</p>
                <Link to='/login' className='btn btn-light border w-100 rounded-0 text-decoration-none'>
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Signup;
