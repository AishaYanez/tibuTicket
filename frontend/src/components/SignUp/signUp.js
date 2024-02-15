import React, { useState } from 'react';
import './signUp.css';
import { Button, Input, Upload } from 'antd';

function SignUp() {
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleChange = info => {
    if (info.fileList.length > 1) {
      info.fileList.shift();
    }
    setImageUploaded(info.fileList.length > 0);
  };

  return (
    <>
      <div className="container">
        <h2>Registrarse</h2>
        <div className='form'>
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
          <Input placeholder="Pon tu nombre y apellidos" />
          <Input placeholder="Escribe aqui tu correo" />
          <Input placeholder="Escribe aqui tu contraseña" type='password'/>
          <Button type="primary" style={{ borderColor: 'black', backgroundColor: '#BBC0BA', color:'white' }} >Enter</Button>
        </div>
      </div>
    </>
  );
}

export default SignUp;
