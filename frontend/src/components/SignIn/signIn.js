import React, { useState } from 'react';
import './signIn.css';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';
import AuthService from '../../services/AuthService/auth.service';

function SignIn() {
  const nav = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const changeData = () => {
    setUser({
      email: document.getElementById('email').value || "",
      password: document.getElementById('password').value || ""
    });
  }

  const loadPage = (cond) => {
    if (cond) {
      nav('/AdminPage');
    } else {
      nav('/UserPage');
    };
  }

  const submitUser = (credentials) => {
    AuthService.loginUser(credentials)
    .then(res => {
      loadPage(res.user_description.is_admin);
    })
    .catch(error => {
      console.error(error);
    });
  }

  const encodeUser = (event) => {
    event.preventDefault(); 
    let credentials =  btoa(`${user.email}:${user.password}`);

    submitUser(credentials)
  }

  return (
    <>
      <div className="container">
        <form onSubmit={encodeUser} className='form'>
          <h2>Iniciar sesion</h2>
          <Input id='email' onChange={changeData} value={user.email} type="email" placeholder="Escribe aqui tu correo" required/>
          <Input id='password' onChange={changeData} value={user.password} minLength="6" type="password" placeholder="Escribe aqui tu contraseña" pattern="^\S.*\S$" required/>
          <Button type="primary" htmlType="submit" style={{ borderColor: 'black', backgroundColor: '#BBC0BA', color:'white' }}>Enter</Button>
        </form>
      </div>
    </>
  );
}

export default SignIn;
