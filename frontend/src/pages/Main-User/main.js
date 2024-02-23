import React from 'react';
import './main.css';
import Menu from '../../components/Menu/menu';
import ListCard from '../../components/UserListCard/ListCard';

function Main({queues}) {

  return (
    <>
      <div className="main-container">
        <Menu/>
        <div className='Usercardcontainer'>
        {queues.map((q) => (
            <ListCard key={q.list_description.id} queue={q} className="Items" />
          ))}
        </div>
      </div>
    </>
  );
}

export default Main;
