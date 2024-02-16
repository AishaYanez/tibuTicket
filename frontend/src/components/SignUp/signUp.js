import React, { useState } from 'react';
import './signUp.css';
import { Button, Input, Upload, message } from 'antd';
import AuthService from '../../services/AuthService/auth.service';

function SignUp() {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [newUser, setNewUser] = useState({ newNickname: "", newEmail: "", newPassword: ""});

  const handleChange = info => {
    if (info.fileList.length > 1) {
      info.fileList.shift();
    }
    setImageUploaded(info.fileList.length > 0);
  };

  const changeData = () => {
    setNewUser({
      newNickname: document.getElementById('newNickname').value || "",
      newEmail: document.getElementById('newEmail').value || "",
      newPassword: document.getElementById('newPassword').value || ""
    });
  }

  const submitUser = (event) => {
    event.preventDefault();
    
    let userData = {
        nickname: newUser.newNickname
    };

    let credentials = btoa(`${newUser.newEmail}:${newUser.newPassword}`);
    
    AuthService.createAccount(credentials, userData)
      .then(r => {
        console.log(r);
        message.success('Nuevo usuario creado correctamente')
      }).catch(e => {
        message.error(e)
      });
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
          <Input id='newNickname' value={newUser.newNickname} onChange={changeData} type="text" placeholder="Pon tu nombre y apellidos" required/>
          <Input id='newEmail' value={newUser.newEmail} onChange={changeData} type="email" placeholder="Escribe aqui tu correo" required/>
          <Input id='newPassword' value={newUser.newPassword} onChange={changeData} minLength="6" type="password" placeholder="Escribe aqui tu contraseña" pattern="^\S.*\S$" required/>
          <Button type="primary" htmlType="submit" style={{ borderColor: 'black', backgroundColor: '#BBC0BA', color:'white' }}>Enter</Button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
