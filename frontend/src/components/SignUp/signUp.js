import React, { useState } from 'react';
import './signUp.css';
import { Button, Input, Upload, message } from 'antd';
import AuthService from '../../services/AuthService/auth.service';

function SignUp() {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [newUser, setNewUser] = useState({ newNickname: "", newEmail: "", newPassword: "" });

  const handleChange = info => {
    if (info.fileList.length > 1) {
      info.fileList.shift();
    }
  
    const file = info.file.originFileObj;
    
    if (file) {
        setImageFile(file);
    } else {
      setImageFile(null);
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

  const submitUser = (credentials) => {
    AuthService.createAccount(credentials, formattedUser())
      .then(r => {
        message.success(r.data.status.message)
      }).catch(e => {
        const mess = e.response.data.status.message;
        message.error(mess)
      });
  }

  const formattedUser = () => {
    const userData = new FormData();

    userData.append('nickname', newUser.newNickname);
    
    imageUploaded && userData.append('user_image', imageFile);

    return userData;
  }

  const encodeUser = (event) => {
    event.preventDefault();
    let credentials = btoa(`${newUser.newEmail}:${newUser.newPassword}`);
    submitUser(credentials);
  }

  return (
    <>
      <div className="container">
        <form onSubmit={encodeUser} className='form'>
          <h2>Registrarse</h2>
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            maxCount={1}
            onChange={handleChange}
          >
            {imageUploaded ? null : (
              <img alt="" />
            )}
          </Upload>
          <Input id='newNickname' value={newUser.newNickname} onChange={changeData} type="text" placeholder="Pon tu nombre y apellidos" required />
          <Input id='newEmail' value={newUser.newEmail} onChange={changeData} type="email" placeholder="Escribe aqui tu correo" required />
          <Input id='newPassword' value={newUser.newPassword} onChange={changeData} minLength="6" type="password" placeholder="Escribe aqui tu contraseña" pattern="^\S.*\S$" required />
          <Button type="primary" htmlType="submit" style={{ borderColor: 'black', backgroundColor: '#BBC0BA', color: 'white' }}>Enter</Button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
