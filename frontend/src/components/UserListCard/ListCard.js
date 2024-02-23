import React from 'react';
import './ListCard.css';
import { Button, message } from 'antd';
import PlusIcon from '../../assets/images/Add.png';
import Meat from '../../assets/images/meat.png';
import ListService from '../../services/ListService/list.service';

function ListCard({ queue }) {
  const increaseNumber = (id) => {
    ListService.increaseNumber(id).then(() => {
    }).catch(err => {
      const mess = err.response ? err.response.data.message : err.message;
      message.error(mess);
    })
  }

  const decreaseNumber = (id) => {
    ListService.decreaseNumber(id).then(res => {
    }).catch(err => {
      const mess = err.response ? err.response.data.message : err.message;
      message.error(mess);
    })
  }

  return (
    <>
      <div key={queue.list_description.id} className="Itemlistcomponent">
        <div className="Group1">
          <div className="ContentBlock" />
          <img className="CardImg" src={queue.list_image ? queue.list_image.url : Meat} alt='Icono de la lista' />
        </div>
        <div className="CardText">{queue.list_description.list_name}</div>
        <div className="Number">{queue.list_description.list_current_number}</div>
        <Button onClick={() => { increaseNumber(queue.list_description.id) }} className="StepperAdd" data-testid="increase-button">
          <img src={PlusIcon} alt="Plus" />
        </Button>
        <Button onClick={() => { decreaseNumber(queue.list_description.id) }} className="StepperMinus" data-testid="decrease-button">
          <div className="Vector2"></div>
        </Button>

      </div>
    </>
  );
}

export default ListCard;