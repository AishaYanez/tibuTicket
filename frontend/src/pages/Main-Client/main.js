import React from 'react';
import './main.css';
import ListCard from '../../components/ClientListCard/ListCard';

function Main() {

  return (
    <>
      <div className="main-container">
        <ListCard className="Items" />
        <ListCard className="Items" />
      </div>
    </>
  );
}

export default Main;
