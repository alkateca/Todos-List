import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface TaskType {
  _id: string;
  task: string;
  doing: boolean;
  done: boolean;
}

interface UserResponse {
  name: string;
}

const Task = () => {
    const { id } = useParams<{ id: string }>();  
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [newTask, setNewTask] = useState<string>(''); 
    const [userName, setUserName] = useState<string>('');  

    useEffect(() => {
        axios.get(`http://localhost:3001/tasks/${id}`)
            .then((response) => {
                setTasks(response.data);  
            })
            .catch((error) => console.log(error));

        axios.get<UserResponse>(`http://localhost:3001/get/${id}`)
            .then((response) => {
                setUserName(response.data.name);  
            })
            .catch((error) => console.log(error));
    }, [id]);

    const handleAddTask = () => {
        if (newTask.trim()) {
            axios.post<TaskType>(`http://localhost:3001/tasks/${id}`, { task: newTask })
                .then((response) => {
                    setTasks([...tasks, response.data]);  
                    setNewTask('');
                })
                .catch((error) => console.log(error));
        }
    };

    const handleStatusChange = (taskId: string, doing: boolean, done: boolean) => {
        axios.put(`http://localhost:3001/tasks/${id}/${taskId}`, { doing, done })
            .then(() => {
                setTasks(tasks.map(task => task._id === taskId ? { ...task, doing, done } : task));  
            })
            .catch((error) => console.log(error));
    };

    const handleDeleteTask = (taskId: string) => {
        axios.delete(`http://localhost:3001/tasks/${id}/${taskId}`)
            .then(() => {
                setTasks(tasks.filter(task => task._id !== taskId));  
            })
            .catch((error) => console.log(error));
    };

    const notStartedTasks = tasks.filter(task => !task.doing && !task.done);
    const inProgressTasks = tasks.filter(task => task.doing && !task.done);
    const completedTasks = tasks.filter(task => task.done);

    return (
        <div className="justify-content-center align-items-center bg-secondary vh-100 py-5">
            <div className='container bg-light rounded p-5'>
                <h2>Tarefas de {userName}</h2> 
                
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Nova tarefa"
                    className="form-control mb-3"
                />
                <button onClick={handleAddTask} className="btn btn-success">Adicionar Tarefa</button>

                <div className="col mt-4">
                    <div className="col-md-4 border rounded mt-5 ">
                        <h3 className="mt-2 ms-4 ">Não Iniciada</h3>
                        <ul className="list-group">
                            {notStartedTasks.map(task => (
                                <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>{task.task}</span>
                                    <div className="d-flex gap-2">
                                        <button 
                                            onClick={() => handleStatusChange(task._id, true, false)} 
                                            className="btn btn-info btn-sm">
                                            Em Execução
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteTask(task._id)} 
                                            className="btn btn-danger btn-sm">
                                            Excluir
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-md-4 border rounded mt-5 ">
                        <h3 className="mt-2 ms-4 ">Em Execução</h3>
                        <ul className="list-group">
                            {inProgressTasks.map(task => (
                                <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>{task.task}</span>
                                    <div className="d-flex gap-2">
                                        <button 
                                            onClick={() => handleStatusChange(task._id, false, true)} 
                                            className="btn btn-success btn-sm">
                                            Finalizada
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteTask(task._id)} 
                                            className="btn btn-danger btn-sm">
                                            Excluir
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-md-4 border rounded mt-5 ">
                        <h3 className="mt-2 ms-4 ">Finalizada</h3>
                        <ul className="list-group">
                            {completedTasks.map(task => (
                                <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>{task.task}</span>
                                    <div className="d-flex gap-2">
                                        <button 
                                            onClick={() => handleDeleteTask(task._id)} 
                                            className="btn btn-danger btn-sm">
                                            Excluir
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task;
