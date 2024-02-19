import React from 'react';
import './ListCard.css';
import { Button, message } from 'antd';
import DelIcon from '../../assets/images/delete.jpg';
import PlusIcon from '../../assets/images/Add.png';
import Meat from '../../assets/images/meat.png';
import ListService from '../../services/ListService/list.service';

function AdminListCard({queue, fetchQueues}) {

  const deleteQueue = (id) => {
      ListService.deleteList(id).then(res => {
        fetchQueues();
        // message.warning(res.data.status.message);
        console.log(res);
      }).catch(err => {
        // message.error(err.response.data.status.message);
        console.error('No se ha podido crear');
      })
  };

  return (
    <>
      <div key={queue.list_description.id} className="AdminItemlistcomponent">
        <div className="Group1">
          <div className="ContentBlock" />
          <img className="CardImg" src={queue.list_image ? queue.list_image.url : Meat} alt='Icono de la lista' />
        </div>
        <div className="CardText">{queue.list_description.list_name}</div>
        <div className="Number">{queue.list_description.list_current_number}</div>
        <Button className="StepperAdd">
          <img src={PlusIcon} alt="Plus" />
        </Button>
        <Button className="StepperMinus">
          <div className="Vector2"></div>
        </Button>
        <Button onClick={() => {deleteQueue(queue.list_description.id)}} className="Delete">
          <img src={DelIcon} alt="Delete" />
        </Button>
      </div>
    </>
  );
}

export default AdminListCard;