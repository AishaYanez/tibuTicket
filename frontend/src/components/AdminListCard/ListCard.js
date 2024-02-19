import React from 'react';
import './ListCard.css';
import { Button } from 'antd';
import DelIcon from '../../assets/images/delete.jpg';
import PlusIcon from '../../assets/images/Add.png';
import Meat from '../../assets/images/meat.png';

function AdminListCard({queue, fetchQueues}) {

  return (
    <>
      <div className="AdminItemlistcomponent">
        <div className="Group1">
          <div className="ContentBlock" />
          <img className="CardImg" src={Meat} alt='Icono de la lista' />
        </div>
        <div className="CardText">{queue.list_description.list_name}</div>
        <div className="Number">{queue.list_description.list_current_number}</div>
        <Button className="StepperAdd">
          <img src={PlusIcon} alt="Plus" />
        </Button>
        <Button className="StepperMinus">
          <div className="Vector2"></div>
        </Button>
        <Button className="Delete">
          <img src={DelIcon} alt="Delete" />
        </Button>
      </div>
    </>
  );
}

export default AdminListCard;