import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:3001/get')
            .then((result) => setUsers(result.data))
            .catch((err) => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/user/${id}`)
            .then(() => {
                setUsers(users.filter(user => user._id !== id));
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100 '>
            <div className='bg-white p-3 rounded w-50 justify'>
                <h2 className='mt-5 d-flex justify-content-center' >Usuários</h2>
                {
                    users.length === 0 ?
                <h3 className='mt-5 d-flex justify-content-center'>Não há usuários para serem mostrados</h3> 
                :
                <div className='mb-3'>
                    {users.map(user => (
                        <div className="align-items-center card p-3 mb-2" key={user._id}>
                            <p className="fw-bold mb-1">{user.name}</p>
                            <p className="text-muted small">E-mail: {user.email}</p>
                            <div className='d-flex gap-2'>
                                <Link to={`/task/${user._id}`} className="btn btn-primary">
                                    Tarefas
                                </Link>
                                <Link to={`/edit/${user._id}`} className="btn btn-warning">
                                    Editar
                                </Link>
                                <button 
                                    onClick={() => handleDelete(user._id)} 
                                    className="btn btn-danger">
                                    Deletar
                                </button>
                            </div>    
                        </div>
                    ))}
                </div>   
                }
            </div>
        </div>
    );
};

export default Home;
