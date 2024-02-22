import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authpage from './pages/Auth/authPage';
import AdminMainPage from './pages/Main-Admin/main.js';
import UserMainPage from './pages/Main-User/main.js';
import ClientMainPage from './pages/Main-Client/main.js';
import { useEffect, useState } from 'react';
import ListService from './services/ListService/list.service.js';

function App() {
  const [queues, setQueues] = useState([]);
  

  async function fetchQueues() {
    try {
      const fetchedQueues = (await ListService.getLists()).data;
      setQueues(fetchedQueues);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQueues();
  }, []);

  const ws = new WebSocket("ws://localhost:4000/cable");

  ws.onopen = () => {
    // console.log('Connected to websocket server');

    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          channel: "ListChannel"
        })
      })
    );
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data).message ? JSON.parse(event.data).message.type : JSON.parse(event.data);
    if (message === 'broadcast') {
      fetchQueues();
    }
  };

    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Authpage />} />
          <Route path='/AdminPage' element={<AdminMainPage queues={queues}/>} />
          <Route path='/UserPage' element={<UserMainPage queues={queues}/>} />
          <Route path='/ClientPage' element={<ClientMainPage queues={queues}/>} />
        </Routes>
      </BrowserRouter>
    );
  }

  export default App;