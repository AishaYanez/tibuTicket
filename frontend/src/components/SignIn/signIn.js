import React from 'react';
import './signIn.css';
import { Button, Input } from 'antd';

function SignIn() {

  return (
    <>
      <div className="container">
        <div className='form'>
          <h2>Iniciar sesion</h2>
          <Input placeholder="Escribe aqui tu correo" />
          <Input placeholder="Escribe aqui tu contraseña" type='password'/>
          <Button type="primary" style={{ borderColor: 'black', backgroundColor: '#BBC0BA', color:'white' }} >Enter</Button>
        </div>
      </div>
    </>
  );
}

export default SignIn;
