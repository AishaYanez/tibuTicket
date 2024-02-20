import React from 'react';
import './main.css';
import ListCard from '../../components/ClientListCard/ListCard';

function Main() {

  return (
    <>
      <div className="main-container">
        <div className='Usercardcontainer'>
        <ListCard className="Items" />
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
