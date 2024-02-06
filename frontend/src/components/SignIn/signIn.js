import React from 'react';
import './signIn.css';
import { Button, Input } from 'antd';

function SignIn() {

  return (
    <>
      <div className="container">
        <div className='form'>
          <Input placeholder="Escribe aqui tu correo" />
          <Input placeholder="Escribe aqui tu contraseña" />
          <Button type="primary">Enter</Button>
        </div>
      </div>
    </>
  );
}

export default SignIn;
