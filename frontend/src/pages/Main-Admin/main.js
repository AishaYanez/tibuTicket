import React, { useEffect, useState } from 'react';
import './main.css';
import Menu from '../../components/Menu/menu';
import AdminListCard from '../../components/AdminListCard/ListCard';
import { Button, Input, Upload, message } from 'antd';
import anime from 'animejs/lib/anime.es.js';
import ListService from '../../services/ListService/list.service';
import { useNavigate } from 'react-router-dom';

function Main({queues}) {
  const nav = useNavigate();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [buttonPressed, setButtonPressed] = useState(false);
  const [newQueue, setNewQueue] = useState({ name: "" });
  const [formVisible, setFormVisible] = useState(false);
  // const [queues, setQueues] = useState([]);

  // async function fetchQueues() {
  //   try {
  //     const fetchedQueues = (await ListService.getLists()).data;
  //     setQueues(fetchedQueues);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    
  }, []);

  const handleMouseDown = () => {
    setButtonPressed(true);
    anime({
      targets: '.Add .ant-btn',
      backgroundColor: '#E6DED3',
      duration: 300,
    });
  };

  const handleMouseUp = () => {
    setButtonPressed(false);
    anime({
      targets: '.Add .ant-btn',
      backgroundColor: '#BBC0BA',
      duration: 300,
    });
  };

  const changeData = () => {
    setNewQueue({
      name: document.getElementById('listName').value || ""
    });
  }

  const formattedQueue = () => {
    const listData = new FormData();

    listData.append('list[list_name]', newQueue.name);

    imageUploaded && listData.append('list[list_image]', imageFile);

    return listData;
  }


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

  const logoutActions = () => {
    message.error('Inicia sesión para crear listas')
    localStorage.removeItem('token');
    localStorage.removeItem('user_image');
    localStorage.removeItem('lastLoginTime');
    nav('/');
};

  const createQueue = (event) => {
    event.preventDefault();
    localStorage.getItem('token') ?
    ListService.createList(formattedQueue()).then(r => {
      message.success(r.data.status.message);
    }).catch(err => {
      const mess = err.response ? err.response.data.status.message : err.message;
      message.error(mess);
    }) : logoutActions();
    setFormVisible(!formVisible)
  };

  return (
    <>
      <div className="main-container">
        <Menu />
        {formVisible &&
          <form onSubmit={createQueue} className='ListForm form'>
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
         <Input id='listName' onChange={changeData} value={newQueue.name} type="text" placeholder="Escribe aqui el nombre de la lista" required />
         <Button type="primary" htmlType="submit" style={{ borderColor: 'black', backgroundColor: '#BBC0BA', color: 'white' }}>Enter</Button>
       </form>
        }

        <div className='Admincardcontainer'>
          {queues && queues.map((q) => (
            <AdminListCard key={q.list_description.id} queue={q} className="Items" />
          ))}
        </div>

        <div className="Group4">
          <Button
            className="Add"
            style={{
              backgroundColor: buttonPressed ? '#E6DED3' : '#BBC0BA',
              color: buttonPressed ? 'black' : 'white'
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={() => { setFormVisible(!formVisible) }}
          >
            <div className="Title">+</div>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Main;