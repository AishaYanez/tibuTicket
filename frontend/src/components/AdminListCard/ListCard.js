  import React from 'react';
  import './ListCard.css';
  import { Button, message } from 'antd';
  import DelIcon from '../../assets/images/delete.jpg';
  import PlusIcon from '../../assets/images/Add.png';
  import Meat from '../../assets/images/meat.png';
  import ListService from '../../services/ListService/list.service';

function AdminListCard({queue}) {

  const increaseNumber = (id) => {
    ListService.increaseNumber(id).then(() => {
    }).catch(err => {  
      const mess =  err.response ? err.response.data.message : err.message;
      message.error(mess);
    })
  }

  const decreaseNumber = (id) => {
    ListService.decreaseNumber(id).then(res => {
    }).catch(err => {
      const mess =  err.response ? err.response.data.message : err.message;
      message.error(mess);
    })
  }

  const deleteQueue = (id) => {
      ListService.deleteList(id).then(res => {
        message.warning(res.data.message);
      }).catch(err => {
        const mess =  err.response ? err.response.data.message : err.message;
        message.error(mess);
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
          <Button  data-testid="increase-button" onClick={() => {increaseNumber(queue.list_description.id)}} className="StepperAdd">
            <img src={PlusIcon} alt="Plus" />
          </Button>
          <Button data-testid="decrease-button" onClick={() => {decreaseNumber(queue.list_description.id)}} className="StepperMinus">
            <div className="Vector2"></div>
          </Button>
          <Button data-testid="delete-button" onClick={() => {deleteQueue(queue.list_description.id)}} className="Delete">
            <img src={DelIcon} alt="Delete" />
          </Button>
        </div>
      </>
    );
  }

  export default AdminListCard;