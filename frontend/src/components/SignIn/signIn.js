import React from 'react';
import './signIn.css';
import { Button, Input } from 'antd';

function SignIn() {
  const submitUser = (event) => {
    event.preventDefault(); 
    console.log('hola');
  }

  return (
    <>
      <div className="container">
        <form onSubmit={submitUser} className='form'>
          <h2>Iniciar sesion</h2>
          <Input type="email" placeholder="Escribe aqui tu correo" required/>
          <Input minLength="6" type="password" placeholder="Escribe aqui tu contraseña" pattern="^\S.*\S$" required/>
          <Button type="primary" htmlType="submit" style={{ borderColor: 'black', backgroundColor: '#BBC0BA', color:'white' }}>Enter</Button>
        </form>
      </div>
    </>
  );
}

export default SignIn;
