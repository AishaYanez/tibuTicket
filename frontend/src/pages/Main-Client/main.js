import React, { useEffect, useState } from 'react';
import './main.css';
import ListCard from '../../components/ClientListCard/ListCard';
import ListService from '../../services/ListService/list.service';

function Main() {
  const [queues, setQueues] = useState([]);

  async function fetchQueues() {
    try {
      const fetchedQueues = (await ListService.getLists()).data;
      setQueues(fetchedQueues);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchQueues();
  }, []);


  return (
    <>
      <div className="main-container">
        <div className='Usercardcontainer'>
        {queues.map((q) => (
            <ListCard key={q.list_description.id} queue={q} fetchQueues={fetchQueues} className="Items" />
          ))}
        </div>
      </div>
    </>
  );
}

export default Main;
