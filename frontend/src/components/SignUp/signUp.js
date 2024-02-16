import React, { useState } from 'react';
import './signUp.css';
import { Button, Input, Upload } from 'antd';

function SignUp() {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [newUser, setNewUser] = useState({ newNickname: "", newEmail: "", newPassword: ""});

  const handleChange = info => {
    if (info.fileList.length > 1) {
      info.fileList.shift();
    }
    setImageUploaded(info.fileList.length > 0);
  };

  const submitUser = (event) => {
    event.preventDefault(); 
    console.log('hola');
  //   let discriminator = newUser.newEmail.includes('@stillhigher.es') ? 'Employee' : 'Client';
    
  //   let userData = {
  //     user: {
  //       nickname: newUser.newNickname,
  //       discriminator: discriminator
  //     }
  //   };

  //   let credentials = btoa(`${newUser.newEmail}:${newUser.newPassword}`);

  //   AuthService.createAccount(credentials, userData)
  //     .then(r => {
  //       changeForm()
  //       message.success('Nuevo usuario creado correctamente')
  //     }).catch(e => {
  //       message.error('Email o nickname ya en uso')
  //     });
  }

  return (
    <>
      <div className="container">
        <form onSubmit={submitUser} className='form'>
        <h2>Registrarse</h2>
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            maxCount={1}
            onChange={handleChange}        
          >
            {imageUploaded ? null : (
              <img alt=""/>
            )}
          </Upload>
          <Input type="text" placeholder="Pon tu nombre y apellidos" required/>
          <Input type="email" placeholder="Escribe aqui tu correo" required/>
          <Input minLength="6" type="password" placeholder="Escribe aqui tu contraseña" pattern="^\S.*\S$" required/>
          <Button type="primary" htmlType="submit" style={{ borderColor: 'black', backgroundColor: '#BBC0BA', color:'white' }}>Enter</Button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
