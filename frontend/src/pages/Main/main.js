import React from 'react';
import './main.css';
import Menu from '../../components/Menu/menu';
import ListCard from '../../components/ListCard/ListCard';
function Main() {

  return (
    <>
    <div  className="main-container">
      <Menu />
      <ListCard className="Items"/>
    </div>
    </>
  );
}

export default Main;
