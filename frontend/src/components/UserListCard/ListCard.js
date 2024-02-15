import React from 'react';
import './ListCard.css';
import { Button } from 'antd';
import PlusIcon from '../../assets/images/Add.png';
import Meat from '../../assets/images/meat.png';

function ListCard() {

  return (
    <>
      <div className="Itemlistcomponent">
        <div className="Group1">
          <div className="ContentBlock" />
          <img className="CardImg" src={Meat} alt=''/>
        </div>
        <div className="CardText">Charcutería </div>
        <div className="Number">00</div>
        <Button className="StepperAdd">
            <img src={PlusIcon} alt="Plus"/>
        </Button>
        <Button className="StepperMinus">
            <div className="Vector2"></div>
        </Button> 
      </div>
    </>
  );
}

export default ListCard;