import React, { useState } from 'react';
import './ListCard.css';
import Meat from '../../assets/images/meat.png';
import { Button } from 'antd';

function ListCard() {
  const [buttonColor, setButtonColor] = useState('#D2D2D2');
  const [buttonTextColor, setButtonTextColor] = useState('#533D3D');
  const [displayText, setDisplayText] = useState(false);

  const handleButtonClick = () => {
    setButtonColor('#yourNewColor');
    setButtonTextColor('#000000');
    setDisplayText(true);
  };

  return (
    <>
      <div className="ClienItemlistcomponent">
        <div className="Group1">
          <div className="ContentBlock" />
          <img className="ListImg" src={Meat} alt=''/>
        </div>
        <div className="ListText">Charcutería</div>
        <div className="Number">00</div>
        <div className="ClientNumberText">Your number:</div>
        <Button className="TicketButton" style={{ backgroundColor: buttonColor, color: buttonTextColor }} onClick={handleButtonClick}>
          <div className="TicketText">Ticket</div>
        </Button>
        {displayText && <div className='ClientNumber'>01</div>}
      </div>
    </>
  );
}

export default ListCard;
