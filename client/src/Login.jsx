import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login', {email,password})
        .then((result) => {console.log(result)
            if(result.data === 'Login bem-sucedido'){
            navigate('/home')
            } 
        })
        .catch((err) => console.log(err))}


  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
        <div className=' bg-white p-3 rounded w-25'>
            <h2 className='d-flex justify-content-center'>Todo List</h2>
            <div className='mb-3'> 
                <label htmlFor='email'> 
                    <a>E-mail</a>
                </label>
                <input
                    type='text'
                    placeholder='Digite seu e-mail'
                    autoComplete='off'
                    name='email'
                    className='form-control rouded-0'
                    onChange={(e) => setEmail(e.target.value)}>
                </input>
                <label htmlFor='password' className='mt-3'>
                        <a >Senha</a>
                    </label>
                    <input
                    type='password'
                    placeholder='Digite sua senha'
                    autoComplete='off'
                    name='password'
                    className='form-control rouded-0'
                    onChange={(e) => setPassword(e.target.value)}>
                </input>
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
  )
}

export default Login