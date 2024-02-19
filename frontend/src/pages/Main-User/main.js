import React from 'react';
import './main.css';
import ListCard from '../../components/UserListCard/ListCard';

function Main() {

  return (
    <>
      <div className="main-container">
        <Menu />
        <div className='Usercardcontainer'>
        <ListCard className="Items" />
        <ListCard className="Items" />
        <ListCard className="Items" />
        <ListCard className="Items" />
        </div>
      </div>
    </>
  );
}

export default Main;
