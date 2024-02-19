import React, { useEffect, useState } from 'react';
import './main.css';
import Menu from '../../components/Menu/menu';
import AdminListCard from '../../components/AdminListCard/ListCard';
import { Button, List, Input } from 'antd';
import anime from 'animejs/lib/anime.es.js';
import ListService from '../../services/ListService/list.service';

function Main() {
  const [buttonPressed, setButtonPressed] = useState(false);
  const [queues, setQueues] = useState([]);
  const [newQueue, setNewQueue] = useState({ name: "" });
  const [formVisible, setFormVisible] = useState(false);

  async function fetchQueues() {
    try {
      const fetchedQueues = (await ListService.getLists()).data;
      setQueues(fetchedQueues);
      console.log(fetchedQueues);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchQueues();
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

  const createQueue = () => {

  };

  return (
    <>
      <div className="main-container">
        <Menu />
        {formVisible &&
          <form onSubmit={createQueue} className='formAddList form'>
            <Input id='listName' onChange={changeData} value={List.name} type="text" placeholder="Escribe aqui el nombre de la lista" required />
            <Button type="primary" htmlType="submit" style={{ borderColor: 'black', backgroundColor: '#BBC0BA', color: 'white' }}>Enter</Button>
          </form>
        }


        <div className='Admincardcontainer'>
          {queues.map((q) => (
            <AdminListCard key={q.list_description.id} queue={q} fetchQueus={fetchQueues} className="Items" />
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