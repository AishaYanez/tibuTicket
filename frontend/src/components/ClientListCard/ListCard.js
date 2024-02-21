import React, { useCallback, useEffect, useState } from 'react';
import './ListCard.css';
import Meat from '../../assets/images/meat.png';
import { Button, message } from 'antd';
import ListService from '../../services/ListService/list.service';

function ListCard({ queue }) {
  const [buttonColor, setButtonColor] = useState('#D2D2D2');
  const [buttonTextColor, setButtonTextColor] = useState('#533D3D');
  const [yourNumber, setYourNumber] = useState();
  const [displayText, setDisplayText] = useState(false);

  const getNumber = useCallback(() => {
    const number = localStorage.getItem(queue.list_description.list_name) || null;
    setYourNumber(number);
    setDisplayText(number ? true : false);
  }, [queue.list_description.list_name]);

  useEffect(() => {
    getNumber();
  }, [getNumber]);

  const handleButtonClick = () => {
    setButtonColor('#yourNewColor');
    setButtonTextColor('#000000');
  };

  const actionsTicket = (ticket) => {
    localStorage.setItem(ticket[0], ticket[1])
    message.success(`Tu número es el ${ticket[1]} en la cola ${ticket[0]}`)
    getNumber();  
  }

  const getTicket = (id) => {
    handleButtonClick();
    ListService.getTicket(id).then((res) => {
      const ticket = res.data.list_ticket.split(':')
      actionsTicket(ticket);
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
      <div className="ClienItemlistcomponent">
        <div className="Group1">
          <div className="ContentBlock" />
          <img className="CardImg" src={queue.list_image ? queue.list_image.url : Meat} alt='Icono de la lista' />
        </div>
        <div className="ListText">{queue.list_description.list_name}</div>
        <div className="Number">{queue.list_description.list_current_number}</div>
        <div className="ClientNumberText">Your number:</div>
        <Button disabled={yourNumber !== null} onClick={() => getTicket(queue.list_description.id)} className="TicketButton" style={{ backgroundColor: buttonColor, color: buttonTextColor }}>
          <div className="TicketText">Ticket</div>
        </Button>
        {displayText && <div className='ClientNumber'>{yourNumber}</div>}
      </div>
    </>
  );
}

export default ListCard;