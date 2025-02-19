import  { Request, Response } from 'express';
import express from 'express';
import mongoose from 'mongoose';
import UserModel from './models/User';
import TodoModel from './models/Todo';
import dotenv from 'dotenv';
import cors from 'cors';



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


const port = 3001;
const dbUser = process.env.DB_USER!;
const dbPassword = process.env.DB_PASSWORD!;

mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPassword}@authcluster.vzwg9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
)
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch(err => console.log(err));

// Rotas de Usuários
app.post('/login', async (req: Request, res: Response) => {
  try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });

      if (!user) {
         res.json('E-mail não registrado');
         return
      }
      if (user.password !== password) { 
        res.json('Senha incorreta');
        return
    }

      res.json('Login bem-sucedido');
      
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

app.post('/register', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) { 
          res.status(400).json({ message: 'E-mail já cadastrado' });
          return
        }

    const newUser = await UserModel.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
});

app.get('/get', async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
});

app.get('/get/:id', async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user)  {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return
  }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
});

app.patch('/update/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updateData = { name, email, password };
    if (password) updateData.password = password;

    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) res.status(404).json({ message: 'Usuário não encontrado' });

    res.status(200).json({ message: 'Usuário atualizado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
});

app.delete('/user/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) res.status(404).json({ message: 'Usuário não encontrado' });

    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
});

// Rotas de Tarefas

app.get('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const tasks = await TodoModel.find({ userID: req.params.id });
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar tarefas' });
  }
});

app.post('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const { task } = req.body;
    const newTask = new TodoModel({
      task: task,
      userID: req.params.id
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar tarefa' });
  }
});

app.put('/tasks/:id/:taskId', async (req: Request, res: Response) => {
  try {
    const { doing, done } = req.body;
    const updatedTask = await TodoModel.findByIdAndUpdate(req.params.taskId, { doing, done }, { new: true });
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar tarefa' });
  }
});

app.delete('/tasks/:id/:taskId', async (req: Request, res: Response) => {
  try {
    await TodoModel.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ message: 'Tarefa deletada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar tarefa' });
  }
});

