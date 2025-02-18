import { Link } from 'react-router-dom';
import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">            
      <div className="container-fluid">
        <Link to='/Login' className="nav-link text-dark">Acessar plataforma</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to='/home' className="nav-link text-dark">Tabela de usuários</Link>
            </li>
            <li className="nav-item">
              <Link to='/register' className="nav-link text-dark">Registro de novo Usuário</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;