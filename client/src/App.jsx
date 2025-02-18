import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './Login'
import Home from './Home';
import EditUser from './EditUser';
import Task from './Task';
import Header from './Header';

function App() {

  return (
        <BrowserRouter>
        <Header />
          <Routes>
              <Route path='/' element={<Signup />}/>
              <Route path='/register' element={<Signup />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/home' element={<Home />}/>
              <Route path="/edit/:id" element={<EditUser />} />
              <Route path="/task/:id" element={<Task />} />                    
          </Routes>
      </BrowserRouter>
  )
}

export default App
