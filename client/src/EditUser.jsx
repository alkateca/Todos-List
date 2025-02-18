import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3001/get/${id}`)
            .then((result) => {
                setName(result.data.name);
                setEmail(result.data.email);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!name || !email) {
            alert('Preencha todos os campos obrigatórios!');
            return;
        }

        const updateData = { name, email };
        if (password) updateData.password = password;

        axios.patch(`http://localhost:3001/update/${id}`, updateData)
            .then(() => {
                alert('Usuário atualizado com sucesso!');
                navigate('/home');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-4 rounded w-25'>
                <h2>Editar Usuário</h2>
                <form onSubmit={handleUpdate}>
                    <div className='mb-3'>
                        <label>Nome</label>
                        <input
                            type='text'
                            className='form-control'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label>E-mail</label>
                        <input
                            type='email'
                            className='form-control'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Nova Senha (opcional)</label>
                        <input
                            type='password'
                            className='form-control'
                            placeholder='Digite a nova senha'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100'>Salvar</button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
