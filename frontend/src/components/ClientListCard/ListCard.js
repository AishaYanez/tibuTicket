import React, { useState } from 'react';
import './ListCard.css';
import Meat from '../../assets/images/meat.png';
import { Button } from 'antd';
import ListService from '../../services/ListService/list.service';

function ListCard({queue}) {
  const [buttonColor, setButtonColor] = useState('#D2D2D2');
  const [buttonTextColor, setButtonTextColor] = useState('#533D3D');
  const [displayText, setDisplayText] = useState(false);

  const handleButtonClick = () => {
    setButtonColor('#yourNewColor');
    setButtonTextColor('#000000');
    setDisplayText(true);
  };

  const getTicket = (id) => {
    handleButtonClick();

    // ListService.getTicket(id).then((res) => {

    // }).catch((err) => {
      
    // })
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
        <Button onClick={() => getTicket(queue.list_description.id)} className="TicketButton" style={{ backgroundColor: buttonColor, color: buttonTextColor }}>
          <div className="TicketText">Ticket</div>
        </Button>
        {displayText && <div className='ClientNumber'>01</div>}
      </div>
    </>
  );
}

export default ListCard;