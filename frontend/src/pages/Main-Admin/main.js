import React, { useState } from 'react';
import './main.css';
import MainMenu from '../../components/Menu/MainMenu';
import AdminListCard from '../../components/AdminListCard/ListCard';
import { Button } from 'antd';
import anime from 'animejs/lib/anime.es.js';

function Main() {
  const [buttonPressed, setButtonPressed] = useState(false);

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

  return (
    <>
      <div className="main-container">
        <MainMenu />
        <div className='Admincardcontainer'>
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
          <AdminListCard className="Items" />
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
          >
            <div className="Title">+</div>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Main;
