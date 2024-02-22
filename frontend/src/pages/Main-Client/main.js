import './main.css';
import ListCard from '../../components/ClientListCard/ListCard';

function Main({queues}) {

  return (
    <>
      <div className="main-container">
        <div className='Usercardcontainer'>
        {queues.map((q) => (
            <ListCard key={q.list_description.id} queue={q} className="Items" />
          ))}
        </div>
      </div>
    </>
  );
}

export default Main;
